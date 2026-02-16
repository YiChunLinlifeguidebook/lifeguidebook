// Cache the health response to avoid redundant object creation
const HEALTH_RESPONSE = JSON.stringify({ ok: true });
const HEALTH_HEADERS = { "content-type": "application/json; charset=utf-8" };

export async function onRequest(context) {
  return new Response(HEALTH_RESPONSE, {
    headers: HEALTH_HEADERS,
  });
}
