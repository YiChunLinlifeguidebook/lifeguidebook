export async function onRequestPost({ request, env }) {
  // Validate JSON input with proper error handling
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: "Invalid JSON input" }), {
      status: 400,
      headers: { 
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
    });
  }
  
  const prompt = body.prompt || "你好";

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
  });

  // Handle API errors properly
  if (!resp.ok) {
    const errorText = await resp.text();
    console.error("OpenAI API error:", resp.status, errorText);
    return new Response(JSON.stringify({ 
      error: "Failed to process request",
      status: resp.status 
    }), {
      status: resp.status,
      headers: { 
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
    });
  }

  const data = await resp.json();
  return new Response(JSON.stringify(data), {
    headers: { 
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
  });
}
