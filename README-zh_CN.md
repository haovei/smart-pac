# Smart PAC

![GitHub license](https://img.shields.io/github/license/haovei/smart-pac.svg)
![GitHub issues](https://img.shields.io/github/issues/haovei/smart-pac.svg)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/haovei/smart-pac/docker.yml)
![Docker Pulls](https://img.shields.io/docker/pulls/qutea/smart-pac)

Smart proxy auto configuration (PAC)

一个轻量，快速的 PAC 代理配置服务。只需要一处配置，多个设备上自动生效。

[English](README.md) | 中文

## 功能

- 支持 http、socks 代理
- 支持配置域名代理
- 支持代理分流。根据域名自动分流到不同代理，省去配置麻烦

## 使用

使用 docker 运行，支持 amd64、arm64

```bash
docker run -it -p 3000:3000 -v ./config/host.json:/app/config/host.json qutea/smart-pac
```

启动服务后，即可访问 `http://localhost:3000/auto.pac` 获取 pac 配置文件，将该文件配置到浏览器或系统代理设置中即可。

- 服务内部端口 3000
- 需要将外部配置文件映射到容器内部。防止容器重启后配置丢失

## 服务 API

- `GET /auto.pac` 获取 pac 文件
- `GET /api/hostList` 获取代理 host 列表
- `POST /api/updateHost` 添加/修改代理 host，参数 `{id: number, host: string, port: number, type: string}`
- `POST /api/deleteHost` 删除代理 host, 参数 `{id: number}`
- `GET /api/ruleList` 获取代理规则列表
- `POST /api/updateRule` 添加/修改代理规则, 参数 `[string, number[]]`
- `POST /api/deleteRule` 删除代理规则，参数 `{rule: string}`

## 环境变量

- `PORT` 服务端口，默认 3000
- `CONFIG_FILE` 配置文件路径，默认 `./config/host.json`
- `ACCESS_TOKEN` 访问服务的 token，默认为空。设置后需要在请求头中添加 `Authorization: Bearer ${ACCESS_TOKEN}`

## 配置文件实例

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
