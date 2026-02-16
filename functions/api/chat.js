export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json().catch(() => ({}));
    const prompt = body.prompt || "你好";

    if (!env.OPENAI_API_KEY) {
      return new Response(JSON.stringify({ error: "API key not configured" }), {
        status: 500,
        headers: { "content-type": "application/json" },
      });
    }

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
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({ error: "Unknown error" }));
      return new Response(JSON.stringify({ error: errorData.error || "API request failed" }), {
        status: resp.status,
        headers: { "content-type": "application/json" },
      });
    }

    const data = await resp.json();
    return new Response(JSON.stringify(data), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || "Internal server error" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
