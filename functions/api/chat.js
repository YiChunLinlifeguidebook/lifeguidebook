export async function onRequestPost({ request, env }) {
  const body = await request.json().catch(() => ({}));
  const prompt = body.prompt || "你好";

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
      temperature: 0.7,
      stream: true,
    }),
  });

  if (!resp.ok) {
    return new Response("AI 服務暫時無法使用，請稍後再試。", { status: 502 });
  }

  return new Response(resp.body, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache",
      "X-Accel-Buffering": "no",
    },
  });
}
