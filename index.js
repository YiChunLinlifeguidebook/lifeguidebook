export default {
  async fetch(request, env, ctx) {
    return new Response("LifeGuide API alive ✅", {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  },
};
