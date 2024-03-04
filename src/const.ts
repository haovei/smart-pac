import path from 'path';

export const CONFIG_FILE = process.env.CONFIG_FILE ?? path.join(import.meta.dir, '../config/host.json');
