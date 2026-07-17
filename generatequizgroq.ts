// Supabase Edge Function: generate-quiz-groq
// File path: supabase/functions/generate-quiz-groq/index.ts
// Deploy with: supabase functions deploy generate-quiz-groq

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "https://deno.land/std@0.168.0/http/cors.ts";

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { topic, grade, numQuestions = 5 } = await req.json();

    if (!topic || !grade) {
      return new Response(
        JSON.stringify({ error: "Missing topic or grade" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get Groq API key from environment (stored in Supabase secrets)
    const groqApiKey = Deno.env.get("GROQ_API_KEY");
    if (!groqApiKey) {
      return new Response(
        JSON.stringify({ error: "Groq API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Call Groq API to generate quiz questions
    const prompt = `Generate exactly ${numQuestions} multiple choice quiz questions for Grade ${grade} ${topic}.

Format your response as a JSON array with this exact structure:
[
  {
    "q": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": 0
  }
]

Requirements:
- Each question must have exactly 4 options
- The "answer" field is the 0-based index of the correct option (0-3)
- Questions should be age-appropriate for Grade ${grade}
- Questions should focus on ${topic}
- Do NOT include any text outside the JSON array
- Ensure questions are diverse and cover different aspects of the topic`;

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${groqApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768", // Fast Groq model
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!groqResponse.ok) {
      const error = await groqResponse.text();
      console.error("Groq API error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to generate quiz from Groq" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const groqData = await groqResponse.json();
    const generatedText = groqData.choices[0].message.content;

    // Parse the JSON from the response
    const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return new Response(
        JSON.stringify({ error: "Could not parse quiz data from AI response" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const questions = JSON.parse(jsonMatch[0]);

    return new Response(
      JSON.stringify({
        success: true,
        topic,
        grade,
        questions,
        generatedAt: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-quiz-groq:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
