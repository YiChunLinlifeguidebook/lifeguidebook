import { jsonResponse, textResponse } from "./utils/response.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return jsonResponse(
        { ok: true, ts: Date.now() },
        { cacheControl: "public, max-age=60" }
      );
    }

    return textResponse("LifeGuide API alive ✅", {
      cacheControl: "public, max-age=300",
    });
  },
};
