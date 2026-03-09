import { jsonResponse } from "../utils/response.js";

export async function onRequest({ env }) {
  const isPro = env.IS_PRO === "true";
  return jsonResponse({ isPro }, { cacheControl: "public, max-age=60" });
}
