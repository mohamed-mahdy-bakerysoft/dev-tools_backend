import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOST = process.env.HOST || 'localhost';
const SERVER_PORT = parseInt(process.env.SERVER_PORT || '3000');

export function toKebabCase(value: string) {
  return value
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function generateStaticUrl(value: string) {
  return `http://${SERVER_HOST}:${SERVER_PORT}/public/${value}`;
}