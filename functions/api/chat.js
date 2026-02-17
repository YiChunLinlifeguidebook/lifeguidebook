export async function onRequestPost({ request, env }) {
  const body = await request.json().catch(() => ({}));
  const prompt = (body.prompt || "你好").trim();
  const maxTokens = Math.min(Math.max(Number(body.max_tokens) || 256, 1), 512);
  const abortSignal = AbortSignal.timeout(15000);

  const resp = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    signal: abortSignal,
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "你是 LifeGuide，一個溫柔、同理、情緒優先的人生陪伴型 AI。" },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: maxTokens
    }),
  });

  if (!resp.ok) {
    const details = await resp.text();
    return new Response(JSON.stringify({ error: "Upstream OpenAI request failed", details }), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }

  const { choices = [], usage } = await resp.json();
  const message = choices[0]?.message?.content ?? "";

  return new Response(JSON.stringify({ message, usage }), {
    headers: { "content-type": "application/json" },
  });
}
