/* ============================================================================
   AI QUIZ GENERATOR - Secret Feature (Groq + Supabase)
   ============================================================================
   Generates quizzes using Groq AI via Supabase Edge Function.
   Triggered by Ctrl+Shift+G keyboard shortcut (secret/hidden).
   API key stored securely in Supabase environment - never exposed to frontend.
   ========================================================================== */

let aiQuizGeneratorReady = false;
let supabaseUrl = "";
let supabaseAnonKey = "";

// Initialize Supabase connection for AI quiz generation
function initAIQuizGenerator() {
  if (typeof SUPABASE_URL !== "undefined" && typeof SUPABASE_ANON_KEY !== "undefined") {
    supabaseUrl = SUPABASE_URL;
    supabaseAnonKey = SUPABASE_ANON_KEY;
    aiQuizGeneratorReady = true;
    console.log("🤖 AI Quiz Generator initialized");
  }
}

// Call Groq API via Supabase Edge Function to generate quiz
async function generateAIQuiz(topic, grade, numQuestions = 5) {
  if (!aiQuizGeneratorReady) {
    alert("AI Quiz Generator not configured. Please check Supabase setup.");
    return null;
  }

  // Show loading indicator
  const loadingMsg = document.createElement("div");
  loadingMsg.id = "ai-loading";
  loadingMsg.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,0.8);
    color: white;
    padding: 30px 50px;
    border-radius: 12px;
    font-size: 16px;
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 15px;
  `;
  loadingMsg.innerHTML = `
    <div style="animation: spin 1s linear infinite; display: inline-block;">⏳</div>
    <span>Generating quiz with AI...</span>
  `;
  document.body.appendChild(loadingMsg);

  try {
    // Call Supabase Edge Function
    const response = await fetch(`${supabaseUrl}/functions/v1/generate-quiz-groq`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${supabaseAnonKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic,
        grade,
        numQuestions,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to generate quiz");
    }

    const data = await response.json();

    if (!data.questions || !Array.isArray(data.questions)) {
      throw new Error("Invalid response format from AI");
    }

    loadingMsg.remove();
    console.log("✅ AI Quiz generated successfully:", data);
    return data;
  } catch (error) {
    console.error("❌ AI Quiz generation failed:", error);
    loadingMsg.remove();
    alert(`AI Quiz Generation Error:\n${error.message}`);
    return null;
  }
}

// Secret keyboard shortcut: Ctrl+Shift+G to generate AI quiz
document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.shiftKey && e.key === "G") {
    e.preventDefault();
    triggerAIQuizMode();
  }
});

// Trigger AI Quiz generation mode
async function triggerAIQuizMode() {
  const grade = document.getElementById("quizGrade")?.value;
  const topic = document.getElementById("quizTopic")?.value;

  if (!grade || !topic) {
    alert("🤖 AI Quiz Generator (Secret Mode)\n\nPlease select a Grade and enter a Topic first.");
    return;
  }

  // Ask for number of questions
  const numQ = prompt("🤖 AI Quiz Generator\n\nHow many questions? (1-100)", "10");
  if (!numQ) return;

  const num = Math.max(1, Math.min(parseInt(numQ, 10) || 5, 100));

  // Generate AI quiz
  const aiData = await generateAIQuiz(topic, grade, num);
  if (!aiData) return;

  // Get the quiz title
  const title = document.getElementById("quizTitle")?.value || `AI Generated ${topic} Quiz`;

  // Get question type preferences
  const wantMcq = document.getElementById("mcqCheck")?.checked ?? true;
  const wantFill = document.getElementById("fillCheck")?.checked ?? false;
  const wantShort = document.getElementById("shortAnswerCheck")?.checked ?? false;

  // Build quiz HTML (similar to generateQuestions)
  const typeCycle = [];
  if (wantMcq) typeCycle.push("mcq");
  if (wantFill) typeCycle.push("fill");
  if (wantShort) typeCycle.push("short");

  let html = "";
  aiData.questions.forEach((question, i) => {
    const qType = typeCycle.length > 0 ? typeCycle[i % typeCycle.length] : "mcq";
    const qNum = i + 1;

    html += `
      <div class="question-block" data-q-index="${i}">
        <div class="question-header">
          <span class="q-number">Q${qNum}</span>
          <span class="q-type">${qType.toUpperCase()}</span>
          <button type="button" class="delete-q-btn" onclick="deleteQuestionFromQuiz(${i})">✕</button>
        </div>
        <textarea class="question-input" placeholder="Question text" rows="3">${escapeHtml(question.q)}</textarea>
    `;

    if (qType === "mcq") {
      html += `<div class="options-group">`;
      question.options.forEach((opt, optIdx) => {
        const isCorrect = optIdx === question.answer ? "checked" : "";
        html += `
          <div class="option-row">
            <input type="radio" name="correct_${i}" value="${optIdx}" ${isCorrect} class="correct-option">
            <input type="text" class="option-input" value="${escapeHtml(opt)}" placeholder="Option ${String.fromCharCode(65 + optIdx)}">
          </div>
        `;
      });
      html += `</div>`;
    } else if (qType === "fill") {
      html += `
        <div class="fill-answer">
          <label>Correct Answer:</label>
          <input type="text" class="fill-input" value="${escapeHtml(question.options[question.answer])}" placeholder="Fill-in answer">
        </div>
      `;
    } else if (qType === "short") {
      html += `
        <div class="short-answer">
          <label>Sample/Suggested Answer:</label>
          <textarea class="short-input" placeholder="Sample answer" rows="2">${escapeHtml(question.options[question.answer])}</textarea>
        </div>
      `;
    }

    html += `</div>`;
  });

  // Display the quiz editor
  const quizEditor = document.getElementById("generatedQuiz");
  if (quizEditor) {
    quizEditor.innerHTML = html;
    quizEditor.style.display = "block";

    // Show success message
    const successMsg = document.createElement("div");
    successMsg.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4CAF50;
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      z-index: 10000;
      font-weight: 600;
    `;
    successMsg.textContent = `✅ AI generated ${aiData.questions.length} questions for "${topic}"!`;
    document.body.appendChild(successMsg);

    setTimeout(() => successMsg.remove(), 4000);
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", initAIQuizGenerator);
