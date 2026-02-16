// Cache the header to avoid redundant object creation
const HEALTH_HEADERS = { "content-type": "application/json; charset=utf-8" };

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      // Include timestamp for monitoring while caching headers
      return new Response(JSON.stringify({ ok: true, ts: Date.now() }), {
        headers: HEALTH_HEADERS,
      });
    }

    return new Response("LifeGuide API alive ✅", {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  },
};
