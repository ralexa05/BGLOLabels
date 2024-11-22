import 'dotenv/config';

function getNumberEnv(envVariable: string | undefined, defaultValue: number): number {
  const value = Number(envVariable);
  return isNaN(value) ? defaultValue : value;
}

export const DID = process.env.DID ?? '';
export const SIGNING_KEY = process.env.SIGNING_KEY ?? '';
export const HOST = process.env.HOST ?? '127.0.0.1';
export const PORT = getNumberEnv(process.env.PORT, 4100);
export const METRICS_PORT = getNumberEnv(process.env.METRICS_PORT, 4101);
export const FIREHOSE_URL = process.env.FIREHOSE_URL ?? 'wss://jetstream.atproto.tools/subscribe';
export const WANTED_COLLECTION = 'app.bsky.feed.like';
export const BSKY_IDENTIFIER = process.env.BSKY_IDENTIFIER ?? '';
export const BSKY_PASSWORD = process.env.BSKY_PASSWORD ?? '';
export const CURSOR_UPDATE_INTERVAL = getNumberEnv(process.env.CURSOR_UPDATE_INTERVAL, 60000);

