# Smart PAC

![GitHub license](https://img.shields.io/github/license/haovei/smart-pac.svg)
![GitHub issues](https://img.shields.io/github/issues/haovei/smart-pac.svg)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/haovei/smart-pac/docker.yml)
![Docker Pulls](https://img.shields.io/docker/pulls/qutea/smart-pac)

Smart proxy auto configuration (PAC)

A lightweight, fast PAC proxy configuration service. Only need to configure once, it will take effect on multiple devices automatically.

English | [中文](README-zh_CN.md)

## Features

- Support http, socks proxy
- Support configuring domain proxy
- Support proxy shunting. Automatically shunt to different proxies according to the domain name, saving the trouble of configuration

## Usage

Run with docker, support amd64, arm64

```bash
docker run -it -p 3000:3000 -v ./config/host.json:/app/config/host.json qutea/smart-pac
```

After starting the service, you can access `http://localhost:3000/auto.pac` to get the pac configuration file, and configure this file in the browser or system proxy settings.

- The internal port of the service is 3000
- It is necessary to map the external configuration file to the inside of the container. Prevent the configuration from being lost after the container restarts

## Service API

- `GET /auto.pac` Get pac file
- `GET /api/hostList` Get proxy host list
- `POST /api/updateHost` Add/modify proxy host, parameters `{id: number, host: string, port: number, type: string}`
- `POST /api/deleteHost` Delete proxy host, parameters `{id: number}`
- `GET /api/ruleList` Get proxy rule list
- `POST /api/updateRule` Add/modify proxy rule, parameters `[string, number[]]`
- `POST /api/deleteRule` Delete proxy rule, parameters `{rule: string}`

## Environment Variables

- `PORT` Service port, default 3000
- `CONFIG_FILE` Configuration file path, default `./config/host.json`
- `ACCESS_TOKEN` Access token for the service, default is empty. After setting, you need to add `Authorization: Bearer ${ACCESS_TOKEN}`

## Configuration File Example

```json
{
	"hosts": [{ "id": 1, "host": "1.example.com", "port": 8080, "type": "HTTP" }],
	"rules": [
		["*.google.com", [1]],
		["*.google.com.hk", [1]],
		["*.github.com", [1]],
		["*.githubusercontent.com", [1]],
		["*.googleapis.com", [1]],
		["*.gstatic.com", [1]],
		["*.ggpht.com", [1]],
		["*.googlevideo.com", [1]],
		["*.googleusercontent.com", [1]],
		["*.youtu.be", [1]],
		["*.youtube.com", [1]],
		["*.ytimg.com", [1]],
		["*.twitter.com", [1]],
		["*.twimg.com", [1]],
		["*.facebook.com", [1]],
		["*.wikipedia.org", [1]]
	]
}
```
