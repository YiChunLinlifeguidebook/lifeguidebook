export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      const currentTimestamp = Date.now();
      return new Response(JSON.stringify({ ok: true, timestamp: currentTimestamp, ts: currentTimestamp }), {
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    }

    return new Response("LifeGuide API alive ✅", {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  },
};
