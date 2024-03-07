import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const CONFIG_FILE = process.env.CONFIG_FILE ?? join(__dirname, '../config/host.json');
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN ?? '';
export const PORT = process.env.PORT ?? 3000;
