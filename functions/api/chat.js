// Configuration constants
const API_TIMEOUT_MS = 30000; // 30 seconds
const DEFAULT_TEMPERATURE = 0.7;

export async function onRequestPost({ request, env }) {
  const body = await request.json().catch(() => ({}));
  const prompt = body.prompt || "你好";

  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // Fixed: use valid OpenAI model name
        messages: [
          { role: "system", content: "你是 LifeGuide，一個溫柔、同理、情緒優先的人生陪伴型 AI。" },
          { role: "user", content: prompt }
        ],
        temperature: DEFAULT_TEMPERATURE
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Validate response before parsing
    if (!resp.ok) {
      const errorText = await resp.text();
      return new Response(JSON.stringify({ 
        error: "API request failed", 
        status: resp.status,
        message: errorText
      }), {
        status: resp.status,
        headers: { "content-type": "application/json" },
      });
    }

    const data = await resp.json();
    return new Response(JSON.stringify(data), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    clearTimeout(timeoutId);
    
    // Handle timeout and other errors
    if (error.name === 'AbortError') {
      return new Response(JSON.stringify({ 
        error: "Request timeout", 
        message: "The API request took too long to respond" 
      }), {
        status: 504,
        headers: { "content-type": "application/json" },
      });
    }
    
    return new Response(JSON.stringify({ 
      error: "Internal server error", 
      message: error.message 
    }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
