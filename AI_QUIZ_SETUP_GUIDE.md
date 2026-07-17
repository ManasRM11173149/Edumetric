# 🤖 AI Quiz Generator Setup Guide

## Overview
The AI Quiz Generator is a **secret feature** that uses Groq AI to generate custom quizzes on ANY topic. It's hidden from the UI and triggered with a keyboard shortcut.

---

## Step 1: Set Up Groq API Key in Supabase

### 1.1 Get Your Groq API Key
- Go to https://console.groq.com/keys
- Create a new API key
- Copy the key

### 1.2 Add Key to Supabase Secrets
1. Open your Supabase project dashboard
2. Go to **Settings → Secrets**
3. Create a new secret:
   - **Name:** `GROQ_API_KEY`
   - **Value:** Paste your Groq API key
4. Click **Save**

---

## Step 2: Deploy the Supabase Edge Function

### 2.1 Create the Edge Function
1. In Supabase dashboard, go to **Edge Functions**
2. Click **Create a new function**
3. Name it: `generate-quiz-groq`
4. Copy the code from `generate-quiz-groq.ts` into the editor
5. Deploy the function

### 2.2 Get Your Function URL
After deployment, you'll see the function URL. It should look like:
```
https://your-project-id.supabase.co/functions/v1/generate-quiz-groq
```

---

## Step 3: Update Your Website

### 3.1 Add Files to Your Project
1. Copy `ai-quiz-generator.js` to your project root
2. Update `index.html`:
   - Add this script tag before `</body>`:
   ```html
   <script src="ai-quiz-generator.js"></script>
   ```

### 3.2 Verify Supabase Config
Make sure your `supabase-config.js` has correct credentials:
```javascript
const SUPABASE_URL = "https://your-project-id.supabase.co";
const SUPABASE_ANON_KEY = "your-anon-key";
```

---

## Step 4: Use the Secret AI Quiz Generator

### 4.1 Activation
1. Go to **Quiz Tab → Create Quiz**
2. Select a **Grade Level**
3. Enter a **Topic** (any topic you want!)
4. Press **Ctrl+Shift+G** on your keyboard (Windows/Linux) or **Cmd+Shift+G** (Mac)

### 4.2 Generate Quiz
1. A popup will ask: "How many questions? (1-100)"
2. Enter a number and press Enter
3. AI will generate quiz questions using Groq
4. Questions appear in the quiz editor automatically

### 4.3 Edit & Save
- Edit any questions as needed
- Select question types (MCQ, Fill-in-the-blank, Short Answer)
- Click **Generate Questions** to save the quiz

---

## Features

✅ **Secret Trigger** - Keyboard shortcut (Ctrl+Shift+G) keeps it hidden  
✅ **No API Key Exposed** - Key stored securely in Supabase  
✅ **Any Topic** - Generate quizzes on ANY subject/topic  
✅ **Any Grade** - Works for all grades K-10  
✅ **Smart Formatting** - Generates properly formatted multiple choice questions  
✅ **Full Integration** - Works with existing quiz system  

---

## API Details

### Request Format
```json
{
  "topic": "Photosynthesis",
  "grade": "6",
  "numQuestions": 5
}
```

### Response Format
```json
{
  "success": true,
  "topic": "Photosynthesis",
  "grade": "6",
  "questions": [
    {
      "q": "What is the primary purpose of photosynthesis?",
      "options": ["To produce energy", "To create oxygen", "To convert light into chemical energy", "To absorb water"],
      "answer": 2
    }
  ],
  "generatedAt": "2024-01-20T10:30:00Z"
}
```

---

## Troubleshooting

### Issue: "AI Quiz Generator not configured"
- Check that Supabase credentials are correct in `supabase-config.js`
- Verify `ai-quiz-generator.js` is loaded (check browser console)

### Issue: "Failed to generate quiz from Groq"
- Check that GROQ_API_KEY is set in Supabase Secrets
- Verify the Edge Function is deployed
- Check Groq API key is valid

### Issue: Keyboard shortcut not working
- Make sure you're pressing **Ctrl+Shift+G** (not Cmd)
- Try on Windows/Linux first
- Check that `ai-quiz-generator.js` is loaded

### Issue: Questions appear but look wrong
- Regenerate the quiz
- Groq's responses are sometimes inconsistent
- Edit manually if needed

---

## Security Notes

🔒 **API Key is NEVER exposed:**
- Stored only in Supabase Secrets
- Never sent to browser
- Only Supabase server calls Groq

🔒 **Users can't access the API key:**
- Feature is hidden behind keyboard shortcut
- No API endpoints exposed on frontend
- Only authenticated users can use it

---

## Advanced: Custom Groq Model

If you want to use a different Groq model, edit `generate-quiz-groq.ts`:

Available fast models:
- `mixtral-8x7b-32768` (default - fast)
- `llama2-70b-4096` (more capable)
- `gemma-7b-it` (smaller, faster)

Change this line:
```typescript
model: "mixtral-8x7b-32768", // Change this
```

---

## Example Use Cases

1. **Custom Topics**: Generate quizzes on "Machine Learning" (not in the pre-built bank)
2. **Real-time**: Create pop quizzes instantly
3. **Variety**: Get different questions every time (Groq generates fresh content)
4. **Any Subject**: Math, Science, History, Languages, etc.

---

## Support

If you encounter issues:
1. Check browser console for errors (F12)
2. Verify Groq API key is valid
3. Check that Edge Function is deployed
4. Test the Edge Function directly using cURL:

```bash
curl -X POST https://your-project-id.supabase.co/functions/v1/generate-quiz-groq \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"topic":"Math","grade":"5","numQuestions":3}'
```

---

**That's it! Your AI Quiz Generator is ready. Press Ctrl+Shift+G to activate! 🚀**
