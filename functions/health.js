import { createJsonResponse } from './utils/response.js';

export async function onRequest(context) {
  return createJsonResponse({ ok: true, ts: Date.now() });
}
