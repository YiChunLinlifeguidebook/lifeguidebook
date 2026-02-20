const SYSTEM_PROMPT = "你是 LifeGuide，一個溫柔、同理、情緒優先的人生陪伴型 AI。";

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: "Invalid JSON input" }), {
      status: 400,
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  const prompt = (body.prompt || "你好").trim();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: prompt }
        ],
        temperature: 0.7
      }),
    });

    clearTimeout(timeoutId);

    if (!resp.ok) {
      const errorText = await resp.text().catch(() => "Unknown error");
      console.error("OpenAI API error:", resp.status, errorText);
      return new Response(JSON.stringify({ error: "Failed to process request" }), {
        status: resp.status,
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const data = await resp.json();
    return new Response(JSON.stringify(data), {
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === "AbortError") {
      return new Response(JSON.stringify({ error: "Request timeout" }), {
        status: 504,
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
