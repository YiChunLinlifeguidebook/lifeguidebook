export async function onRequestPost({ request, env }) {
  try {
    const requestBody = await request.json().catch(() => null);

    if (!requestBody || typeof requestBody.prompt !== 'string') {
      return new Response(
        JSON.stringify({ error: "Invalid request: 'prompt' is required" }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }

    const prompt = requestBody.prompt || "你好";

    const abortController = new AbortController();
    const requestTimeoutId = setTimeout(() => abortController.abort(), 30000);

    const openAiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
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
      signal: abortController.signal,
    });

    clearTimeout(requestTimeoutId);

    if (!openAiResponse.ok) {
      const openAiErrorText = await openAiResponse.text().catch(() => "Unknown error");
      return new Response(
        JSON.stringify({ error: `OpenAI API error: ${openAiResponse.status}`, details: openAiErrorText }),
        { status: openAiResponse.status, headers: { "content-type": "application/json" } }
      );
    }

    const completionData = await openAiResponse.json();
    return new Response(JSON.stringify(completionData), {
      headers: {
        "content-type": "application/json",
        "Cache-Control": "public, max-age=300, s-maxage=600"
      },
    });
  } catch (error) {
    if (error.name === 'AbortError') {
      return new Response(
        JSON.stringify({ error: "Request timeout" }),
        { status: 504, headers: { "content-type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({ error: "Internal server error", message: error.message }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
