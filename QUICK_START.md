# 🚀 Quick Start: AI Quiz Generator (5 Minutes)

## What You Get
A **secret AI-powered quiz generator** that creates quizzes on ANY topic using Groq AI. Triggered with **Ctrl+Shift+G**.

---

## Prerequisites
- ✅ Groq API key (from https://console.groq.com/keys)
- ✅ Supabase project already set up
- ✅ The updated files from this package

---

## Install (3 Steps)

### Step 1: Add Groq API Key to Supabase
1. Supabase Dashboard → **Settings → Secrets**
2. Create new secret:
   - **Name:** `GROQ_API_KEY`
   - **Value:** Your Groq API key
3. Save

### Step 2: Deploy Edge Function
1. Supabase Dashboard → **Edge Functions**
2. Create function: `generate-quiz-groq`
3. Copy code from `generate-quiz-groq.ts` into editor
4. Deploy

### Step 3: Update Your Website
1. Add `ai-quiz-generator.js` to your project folder
2. In `index.html`, add before `</body>`:
   ```html
   <script src="ai-quiz-generator.js"></script>
   ```
3. Replace your `index.html` with the updated version (it has the script tag added)

---

## Use It

1. Go to **Quiz Tab → Create Quiz**
2. Pick **Grade Level**
3. Enter **Topic** (any topic! "Machine Learning", "Photosynthesis", etc.)
4. Press **Ctrl+Shift+G**
5. Enter number of questions (1-100)
6. AI generates questions instantly! ✨
7. Edit & save as normal

---

## Files Included

| File | Purpose |
|------|---------|
| `ai-quiz-generator.js` | Main JavaScript (add to project root) |
| `generate-quiz-groq.ts` | Supabase Edge Function (deploy to Supabase) |
| `index-updated.html` | Updated HTML with script tag (replace your index.html) |
| `AI_QUIZ_SETUP_GUIDE.md` | Full setup guide with troubleshooting |
| `QUICK_START.md` | This file |

---

## Keyboard Shortcut Reference

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Generate AI Quiz | **Ctrl+Shift+G** | **Cmd+Shift+G** |

---

## Troubleshooting

**"AI Quiz Generator not configured"**
- Check Supabase credentials in `supabase-config.js`

**"Failed to generate quiz from Groq"**
- Verify `GROQ_API_KEY` is set in Supabase Secrets
- Check that Edge Function is deployed

**Shortcut not working**
- Make sure `ai-quiz-generator.js` is loaded
- Check browser console (F12) for errors

---

## Example Quiz Generation

**Request:**
- Grade: 6
- Topic: Photosynthesis
- Questions: 5

**Response:** 5 MCQ questions on Photosynthesis suitable for Grade 6 ✅

---

## Security

🔒 **Your API key is completely hidden:**
- Stored in Supabase Secrets (not in code)
- Only server uses it (not browser)
- Never exposed to users

---

## What's Next?

- Generate quizzes on ANY topic
- Support students with real-time quiz creation
- No more waiting for pre-built quiz banks
- Expand beyond ELA to any subject

---

**Need help?** See `AI_QUIZ_SETUP_GUIDE.md` for detailed instructions.

**Ready?** Follow the 3-step Install above, then press **Ctrl+Shift+G**! 🎯
