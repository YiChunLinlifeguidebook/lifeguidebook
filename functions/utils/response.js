export function jsonResponse(data, options = {}) {
  const { status = 200, cacheControl } = options;
  const headers = {
    "content-type": "application/json; charset=utf-8",
  };

  if (cacheControl) {
    headers["Cache-Control"] = cacheControl;
  }

  return new Response(JSON.stringify(data), {
    status,
    headers,
  });
}

export function textResponse(text, options = {}) {
  const { status = 200, cacheControl } = options;
  const headers = {
    "content-type": "text/plain; charset=utf-8",
  };

  if (cacheControl) {
    headers["Cache-Control"] = cacheControl;
  }

  return new Response(text, {
    status,
    headers,
  });
}
