export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return new Response(JSON.stringify({ ok: true, ts: Date.now() }), {
        headers: {
          "content-type": "application/json; charset=utf-8",
          "cache-control": "public, max-age=10"
        },
      });
    }

    return new Response("LifeGuide API alive ✅", {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "public, max-age=60"
      },
    });
  },
};
