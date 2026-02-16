// Cache the header to avoid redundant object creation
const HEALTH_HEADERS = { "content-type": "application/json; charset=utf-8" };

export async function onRequest(context) {
  // Include timestamp for monitoring while caching headers
  return new Response(JSON.stringify({ ok: true, ts: Date.now() }), {
    headers: HEALTH_HEADERS,
  });
}
