import context from '../context';
import { writeConfig } from '../utils';

// 获取代理 hosts 列表
export const listHosts = () => {
	const { hostConfig } = context;
	return hostConfig.hosts;
};

// 增加/修改 host
export const addOrUpdateHost = (host: {
	id?: number;
	host: string;
	port: number;
	type: string;
}) => {
	const { hostConfig } = context;
	console.log(host)
	if (host.id) {
		// 修改 host
		const index = hostConfig.hosts.findIndex((item) => item.id === host.id);
		if (index > -1) {
			hostConfig.hosts[index] = { id: host.id, ...host };
		}
	} else {
		// 增加 host
		const id =
			hostConfig.hosts.length > 0 ? hostConfig.hosts[hostConfig.hosts.length - 1].id + 1 : 1;
		hostConfig.hosts.push({ id, ...host });
	}
	writeConfig(hostConfig);
};

// 删除 host
export const delHost = (id: number) => {
	const { hostConfig } = context;
	const index = hostConfig.hosts.findIndex((item) => item.id === id);
	if (index > -1) {
		hostConfig.hosts.splice(index, 1);
	}
	writeConfig(hostConfig);
};

// 获取 rules 列表
export const listRules = () => {
	const { hostConfig } = context;
	return hostConfig.rules;
};

// 增加/修改 rule
export const addOrUpdateRule = (rule: [string, number[]]) => {
	const { hostConfig } = context;
	const existingRuleIndex = hostConfig.rules.findIndex((item) => item[0] === rule[0]);
	if (existingRuleIndex === -1) {
		hostConfig.rules.push(rule);
	} else {
		hostConfig.rules[existingRuleIndex] = rule;
	}
	writeConfig(hostConfig);
};

// 删除 rule
export const delRule = (ruleName: string) => {
	const { hostConfig } = context;
	const index = hostConfig.rules.findIndex((item) => item[0] === ruleName);
	hostConfig.rules.splice(index, 1);
	writeConfig(hostConfig);
};
