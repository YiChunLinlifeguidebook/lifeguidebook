export default {
  async fetch(request, environment, executionContext) {
    const requestUrl = new URL(request.url);

    if (requestUrl.pathname === "/health") {
      return new Response(JSON.stringify({ ok: true, timestamp: Date.now() }), {
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    }

    return new Response("LifeGuide API alive ✅", {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  },
};
