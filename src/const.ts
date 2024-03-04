import path from 'path';

export const CONFIG_FILE =
  process.env.CONFIG_FILE ?? path.join(global.__dirname, '../config/host.json');
