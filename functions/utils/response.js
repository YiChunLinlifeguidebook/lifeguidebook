/**
 * Shared utility functions for creating HTTP responses
 */

/**
 * Creates a JSON response with proper headers
 * @param {Object} data - The data to serialize as JSON
 * @param {Object} options - Response options
 * @param {number} options.status - HTTP status code (default: 200)
 * @param {Object} options.headers - Additional headers to merge
 * @returns {Response} Response object with JSON content
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
 * Creates a health check response
 * @returns {Response} Response with OK status and timestamp
 */
export function createHealthResponse() {
  return createJsonResponse({ ok: true, ts: Date.now() });
}
