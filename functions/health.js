export async function onRequest(context) {
  return new Response(JSON.stringify({ ok: true, timestamp: Date.now() }), {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
