export default {
  async fetch(request, workerEnv, workerContext) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return new Response(JSON.stringify({ ok: true, ts: Date.now() }), {
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    }

    return new Response("LifeGuide API alive ✅", {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  },
};
