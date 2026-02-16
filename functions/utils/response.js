/**
 * Creates a JSON response with appropriate headers
 * @param {Object} data - The data to be JSON stringified
 * @param {Object} options - Optional response options
 * @param {number} options.status - HTTP status code (default: 200)
 * @param {Object} options.headers - Additional headers to merge
 * @returns {Response} A Response object with JSON content-type header
 */
export function createJsonResponse(data, options = {}) {
  const { status = 200, headers = {} } = options;

  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...headers,
    },
  });
}

/**
 * Creates a health check response with timestamp
 * @returns {Response} A Response with { ok: true, ts: timestamp }
 */
export function createHealthResponse() {
  return createJsonResponse({ ok: true, ts: Date.now() });
}
