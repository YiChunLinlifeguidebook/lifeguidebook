/**
 * Creates a JSON response with proper content-type headers
 * 
 * Note: This utility adds charset=utf-8 to the content-type header, which is
 * an improvement over plain "application/json" as it explicitly specifies the
 * character encoding for better interoperability.
 * 
 * @param {*} data - The data to be serialized as JSON
 * @param {number} status - HTTP status code (default: 200)
 * @returns {Response} A Response object with JSON content
 */
export function createJsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
