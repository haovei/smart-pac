# Smart PAC

Smart proxy auto configuration (pac)

一个轻量，快速的 PAC 代理配置服务。只需要一处配置，多个设备上自动生效。

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
