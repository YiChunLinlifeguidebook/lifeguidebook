export async function onRequestPost({ request, env }) {
  try {
    // Validate request body
    const body = await request.json().catch(() => ({}));
    const prompt = body.prompt || "你好";

    // Validate prompt length to prevent abuse
    if (typeof prompt !== 'string' || prompt.length > 10000) {
      return new Response(JSON.stringify({ error: "Invalid prompt" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    // Check if API key is configured
    if (!env.OPENAI_API_KEY) {
      return new Response(JSON.stringify({ error: "API key not configured" }), {
        status: 500,
        headers: { "content-type": "application/json" },
      });
    }

    // Add timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: "你是 LifeGuide，一個溫柔、同理、情緒優先的人生陪伴型 AI。" },
          { role: "user", content: prompt }
        ],
        temperature: 0.7
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Check if the API request was successful
    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({ error: "Unknown error" }));
      return new Response(JSON.stringify(errorData), {
        status: resp.status,
        headers: { "content-type": "application/json" },
      });
    }

    const data = await resp.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    // Handle timeout and other errors
    if (error.name === 'AbortError') {
      return new Response(JSON.stringify({ error: "Request timeout" }), {
        status: 504,
        headers: { "content-type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
