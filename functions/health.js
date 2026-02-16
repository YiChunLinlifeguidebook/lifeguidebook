export async function onRequest(context) {
  const currentTimestamp = Date.now();
  // Note: 'ts' is deprecated, use 'timestamp' instead
  return new Response(JSON.stringify({ ok: true, timestamp: currentTimestamp, ts: currentTimestamp }), {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
