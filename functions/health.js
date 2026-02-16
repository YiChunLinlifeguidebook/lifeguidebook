export async function onRequest(requestContext) {
  return new Response(JSON.stringify({ ok: true, ts: Date.now() }), {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
