export interface Host {
	id: number;
	host: string;
	port: number;
	type: string;
}

export type Rule = [string, number[]];

export interface HostConfig {
	hosts: Host[];
	rules: Rule[];
}
