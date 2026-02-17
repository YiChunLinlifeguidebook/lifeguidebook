export async function onRequest(workerContext) {
  return new Response(JSON.stringify({ ok: true, ts: Date.now() }), {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
