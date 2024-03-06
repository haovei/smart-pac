import { expect, describe, it, beforeEach } from 'bun:test';
import { addOrUpdateHost, listHosts, delHost, listRules, addOrUpdateRule, delRule } from './index';
import context from '../context';

describe('addOrUpdateHost', () => {
	let hostConfig: any;

	beforeEach(() => {
		hostConfig = context.hostConfig = {
			hosts: [
				{ id: 1, host: 'example.com', port: 8080, type: 'http' },
				{ id: 2, host: 'example.org', port: 8081, type: 'https' },
			],
			rules: [],
		};
	});

	it('should add a new host when id is not provided', () => {
		const newHost = {
			host: 'example.net',
			port: 8082,
			type: 'http',
		};

		const newId = addOrUpdateHost(newHost);

		expect(newId).toBeDefined();
		expect(hostConfig.hosts.length).toBe(3);
		expect(hostConfig.hosts[2]).toEqual({ id: newId, ...newHost });
	});

	it('should update an existing host when id is provided', () => {
		const updatedHost = {
			id: 2,
			host: 'example.org',
			port: 8082,
			type: 'http',
		};

		addOrUpdateHost(updatedHost);

		expect(hostConfig.hosts.length).toBe(2);
		expect(hostConfig.hosts[1]).toEqual(updatedHost);
	});

	it('should delete an existing host', () => {
		const idToDelete = 1;

		delHost(idToDelete);

		expect(hostConfig.hosts.length).toBe(1);
		expect(hostConfig.hosts[0].id).not.toBe(idToDelete);
	});
});

describe('listHosts', () => {
	let hostConfig: any;

	beforeEach(() => {
		hostConfig = context.hostConfig = {
			hosts: [
				{ id: 1, host: 'example.com', port: 8080, type: 'http' },
				{ id: 2, host: 'example.org', port: 8081, type: 'https' },
			],
			rules: [],
		};
	});

	it('should return the list of hosts', () => {
		const hosts = listHosts();

		expect(hosts).toEqual(hostConfig.hosts);
	});
});

describe('addOrUpdateRule', () => {
	let hostConfig: any;

	beforeEach(() => {
		hostConfig = context.hostConfig = {
			hosts: [],
			rules: [['rule1', [1, 2, 3]]],
		};
	});

	it('should add a new rule when it does not exist', () => {
		const newRule = ['rule2', [4, 5, 6]];

		addOrUpdateRule(newRule);

		expect(hostConfig.rules.length).toBe(2);
		expect(hostConfig.rules[1]).toEqual(newRule);
	});

	it('should update an existing rule', () => {
		const updatedRule = ['rule1', [7, 8, 9]];

		addOrUpdateRule(updatedRule);

		expect(hostConfig.rules.length).toBe(1);
		expect(hostConfig.rules[0]).toEqual(updatedRule);
	});

	it('should delete an existing rule', () => {
		const ruleNameToDelete = 'rule1';

		delRule(ruleNameToDelete);

		expect(hostConfig.rules.length).toBe(0);
	});
});

describe('listRules', () => {
	let hostConfig: any;

	beforeEach(() => {
		hostConfig = context.hostConfig = {
			hosts: [],
			rules: [['rule1', [1, 2, 3]]],
		};
	});

	it('should return the list of rules', () => {
		const rules = listRules();

		expect(rules).toEqual(hostConfig.rules);
	});
});