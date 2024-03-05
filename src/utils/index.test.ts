import { expect, describe, it } from 'bun:test';
import { hostMatch, FindProxyForURL, setConfig } from '../utils';
import type { HostConfig } from '../types';

const hostConfig: HostConfig = {
  hosts: [
    { id: 1, host: 'proxy.example.com', port: 8080, type: 'SOCKS' },
    { id: 2, host: 'proxy2.example.com', port: 8081, type: 'HTTP' },
  ],
  rules: [
    ['*.google.com', [1]],
    ['*.github.com', [1, 2]],
    ['a.youtube.com', [2]],
  ],
};

describe('hostMatch', () => {
  it('当主机与没有通配符的规则匹配', () => {
    const host = 'example.com';
    const rule = 'example.com';

    const result = hostMatch(host, rule);

    expect(result).toBe(true);
  });

  it('根域名的匹配', () => {
    const host = 'example.com';
    const rule = '*.example.com';

    const result = hostMatch(host, rule);

    expect(result).toBe(true);
  });

  it('当主机与带有通配符的规则匹配', () => {
    const host = 'sub.example.com';
    const rule = '*.example.com';

    const result = hostMatch(host, rule);

    expect(result).toBe(true);
  });

  it('当主机与没有通配符的规则不匹配', () => {
    const host = 'example.com';
    const rule = 'example.org';

    const result = hostMatch(host, rule);

    expect(result).toBe(false);
  });

  it('当主机与带有通配符的规则不匹配', () => {
    const host = 'sub.example.com';
    const rule = '*.example.org';

    const result = hostMatch(host, rule);

    expect(result).toBe(false);
  });

  it('绝对域名不匹配', () => {
    const host = 'a.example.com';
    const rule = 'example.com';

    const result = hostMatch(host, rule);

    expect(result).toBe(false);
  });
});

describe('FindProxyForURL', () => {
  setConfig(hostConfig);
  it('不匹配是，返回"DIRECT"', () => {
    const url = 'https://example.com';
    const host = 'example.com';
    const result = FindProxyForURL(url, host);
    expect(result).toBe('DIRECT');
  });

  it('匹配代理', () => {
    const url = 'https://www.google.com';
    const host = 'www.google.com';
    const result = FindProxyForURL(url, host);
    expect(result).toBe('SOCKS proxy.example.com:8080;DIRECT');
  });

  it('代理分流', () => {
    const url = 'https://a.youtube.com';
    const host = 'a.youtube.com';
    const result = FindProxyForURL(url, host);
    expect(result).toBe('HTTP proxy2.example.com:8081;DIRECT');
  });

  it('返回多个代理', () => {
    const url = 'https://www.github.com';
    const host = 'www.github.com';
    const result = FindProxyForURL(url, host);
    expect(result).toBe('SOCKS proxy.example.com:8080;HTTP proxy2.example.com:8081;DIRECT');
  });
});
