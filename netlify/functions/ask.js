export async function handler(event) {
  try {
    const body = JSON.parse(event.body);
    const question = body.question;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: question }]
      })
    });

    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ answer: data.choices[0].message.content })
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ answer: "The Oracle is lost in the void..." })
    };
  }
}
