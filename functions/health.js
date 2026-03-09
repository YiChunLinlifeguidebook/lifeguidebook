import { jsonResponse } from "../../utils/response.js";

export async function onRequest(context) {
  return jsonResponse(
    { ok: true, ts: Date.now() },
    { cacheControl: "public, max-age=60" }
  );
}
