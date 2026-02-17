/**
 * Utility functions for creating consistent HTTP responses
 */

/**
 * Creates a JSON response with consistent headers
 * @param {*} data - The data to serialize as JSON
 * @param {number} status - HTTP status code (default: 200)
 * @returns {Response}
 */
export function createJsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

/**
 * Creates a text response with consistent headers
 * @param {string} text - The text content
 * @param {number} status - HTTP status code (default: 200)
 * @returns {Response}
 */
export function createTextResponse(text, status = 200) {
  return new Response(text, {
    status,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
