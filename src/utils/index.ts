import fs from 'fs';
import type { Host, HostConfig } from '../types';
import { CONFIG_FILE } from '../const';
import logger from './logger';
import context from '../context';

let hostConfig: HostConfig;

// 读取配置文件
export function readConfig() {
	const config = fs.readFileSync(CONFIG_FILE, {
		encoding: 'utf-8',
	});
	return JSON.parse(config) as HostConfig;
}

// 写配置文件
export function writeConfig(config: HostConfig) {
	fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

// 缓存配置文件
export function setConfig(config: HostConfig) {
	hostConfig = config;
	context.hostConfig = hostConfig;
	return hostConfig;
}

// 初始化配置
export function initConfig() {
	const config = readConfig();
	setConfig(config);
	fs.watchFile(CONFIG_FILE, () => {
		logger.info('Config file changed, reloading...');
		const config = readConfig();
		setConfig(config);
	});
}

// host 通配符匹配
export function hostMatch(host: string, rule: string): boolean {
	if (rule.startsWith('*.')) {
		return host.endsWith(rule.slice(2));
	}
	return host === rule;
}

export function FindProxyForURL(url: string, host: string) {
	const { hosts, rules } = hostConfig;

	let proxy: string[] = [];
	const hostRule = rules.find((item) => hostMatch(host, item[0]));
	if (hostRule) {
		const rules: Host[] = [];
		hostRule[1].forEach((hostId) => {
			const rule = hosts.find((host) => host.id === hostId);
			if (rule) {
				rules.push(rule);
			}
		});
		proxy = rules.map((item) => `${item.type || 'PROXY'} ${item.host}:${item.port}`);
	}
	proxy.push('DIRECT');
	return proxy.join(';');
}

// 生成 PAC 文件
export function generatePac() {
	const stringList: string[] = [];
	stringList.push(`const hostConfig=${JSON.stringify(hostConfig)}`);
	stringList.push(hostMatch.toString());
	stringList.push(FindProxyForURL.toString());
	return stringList.join(';\n');
}
