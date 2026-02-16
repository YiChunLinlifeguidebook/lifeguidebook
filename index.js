// Cache the health response to avoid redundant object creation
const HEALTH_RESPONSE = JSON.stringify({ ok: true });
const HEALTH_HEADERS = { "content-type": "application/json; charset=utf-8" };

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return new Response(HEALTH_RESPONSE, {
        headers: HEALTH_HEADERS,
      });
    }

    return new Response("LifeGuide API alive ✅", {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  },
};
