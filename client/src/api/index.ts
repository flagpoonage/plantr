import wretch, { Wretcher } from 'wretch';

const address = `${process.env.SRV_PROTOCOL}://${process.env.SRV_HOST}:${process.env.SRV_PORT}`;

wretch().errorType('json');

export function apiPublic(endpoint: string): Wretcher {
  return wretch(`${address}${endpoint}`);
}
