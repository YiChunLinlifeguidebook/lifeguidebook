export async function onRequest(context) {
  return new Response(JSON.stringify({ ok: true, ts: Date.now() }), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=10"
    },
  });
}
