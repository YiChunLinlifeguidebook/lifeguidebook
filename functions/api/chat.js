import { jsonResponse } from "../../utils/response.js";

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body.prompt !== 'string') {
      return jsonResponse(
        { error: "Invalid request: 'prompt' is required" },
        { status: 400 }
      );
    }

    const prompt = body.prompt || "你好";

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "你是 LifeGuide，一個溫柔、同理、情緒優先的人生陪伴型 AI。" },
          { role: "user", content: prompt }
        ],
        temperature: 0.7
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!resp.ok) {
      const errorText = await resp.text().catch(() => "Unknown error");
      return jsonResponse(
        { error: `OpenAI API error: ${resp.status}`, details: errorText },
        { status: resp.status }
      );
    }

    const data = await resp.json();
    return jsonResponse(data, { cacheControl: "public, max-age=300, s-maxage=600" });
  } catch (error) {
    if (error.name === 'AbortError') {
      return jsonResponse({ error: "Request timeout" }, { status: 504 });
    }
    return jsonResponse(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}
