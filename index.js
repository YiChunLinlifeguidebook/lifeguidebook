import { createJsonResponse, createTextResponse } from './functions/utils/response.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return createJsonResponse({ ok: true, ts: Date.now() });
    }

    return createTextResponse("LifeGuide API alive ✅");
  },
};
