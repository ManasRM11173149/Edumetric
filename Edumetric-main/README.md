# EduMetric — Teacher Dashboard

A clean, mobile-friendly teacher dashboard for creating **English / Language
Arts quizzes (Grades K–10)**, managing students, generating downloadable study
materials, and tracking tuition finances. It's a **static website** — pure
HTML, CSS, and vanilla JavaScript with **no build step and no backend**. All
data is stored locally in the browser.

> Built from the provided `edumetricadvancedfinal.html` design, with the
> behaviour and content upgrades described below.

---

## ✨ Features

| Area | What it does |
| --- | --- |
| **Fresh workspace** | Starts completely empty — no demo students, quizzes, or finance entries. Your data persists in the browser via `localStorage`. |
| **One-click start** | The opening screen has **no name field** — just *Get Started*. |
| **Quiz creation (up to 100 questions)** | Pick a **Grade (K–10)** and an **ELA topic**, choose MCQ, fill-in-the-blank, and/or **Short Answer**, and request **1–100 questions**. Each topic ships 5 curated questions; requesting more reshuffles and reuses the bank with freshly randomized answer-choice order each pass, so a 100-question quiz never just repeats the same 5 questions verbatim. |
| **Difficulty meter** | Set an overall **Easy / Medium / Hard** label for each quiz. Shown as a badge in the teacher's saved-quiz list, on the external quiz link, and printed on the PDF. |
| **Textbook upload + Notes** | Attach a **.txt or .pdf** as reference material (PDF text is extracted client-side — no server, no upload anywhere) and add free-text **notes on which section/pages to focus on**. Both are shown to students on the external link and printed on the PDF as a "Study Reference" panel, so they know exactly what to study from. *(Note: this attaches the material for reference — it does not auto-generate questions from it, since this is a static site with no backend/AI service; questions still come from the curated ELA bank.)* |
| **Short Answer questions** | A third question type alongside MCQ and fill-in-the-blank. Students type a free response; it's collected and flagged for the teacher to review manually in Student Progress rather than being auto-graded — auto-graded score percentages only count MCQ/fill questions. |
| **Host externally** | *Platform Launch* first **prompts you to pick which quiz**, then generates a shareable link (`quiz.html#…`) where students take the quiz online and get an instant, auto-graded score — including 100-question quizzes. |
| **Student intake on the quiz link** | Before a student can start the external quiz, they enter their **Name, Grade, and Batch**, shown throughout the quiz so results are never anonymous. |
| **Printable PDF** | *Print Version* prompts you to pick a quiz, then opens a high-quality, print-optimised sheet (with a separate answer key) — use your browser's *Save as PDF*. |
| **Study materials** | In **Student A → Materials**, generate real **Study Guides, Flashcards, Practice Problems, or Summary Notes** from the ELA bank, then **download** them as HTML or TXT (or print to PDF). |
| **Students** | Add / edit / delete students with optional quiz score & GPA. Dashboard stats (totals, averages, grade-wise table) are computed from **your real data**. |
| **Students Progress sync** | When a student finishes the external quiz, their **Name/Grade/Batch + score** flow into **Students → Students Progress**. If the student is on the same browser/device, this happens automatically; otherwise they get a **Result Code** to send back, which you paste into *Import Result Code*. New students are created automatically if they don't already exist; repeat quizzes average into the same student's score. |
| **Finance tracker** | Password-protected. Credentials: **username `teacher`, password `air`.** A wrong password shows a generic error and **never reveals the credentials**. Stats start at zero and update as you add payments. |
| **Responsive** | Works on phones: the sidebar collapses behind a ☰ menu button. |

---

## 📁 Project structure

```
.
├── index.html          # Main dashboard (login, quiz, students, Student A, finance)
├── quiz.html           # Student-facing quiz player (opened via the shared link)
├── css/
│   └── styles.css      # All styles (faithful to the design + mobile support)
├── js/
│   ├── quiz-bank.js    # Curated ELA question bank, Grades K–10 (55 topics, 275 questions)
│   └── app.js          # All application logic
├── test/               # Automated tests (Node + jsdom)
│   ├── quiz-bank.test.js
│   ├── integration.test.js
│   └── quiz-player.test.js
├── package.json
└── README.md
```

---

## 🚀 Running it

It's a static site, so just open `index.html` in a browser.

For the **shareable quiz links** to be copy-paste shareable across devices, serve
the folder over HTTP (recommended). Any of these work:

```bash
# Python
python3 -m http.server 8000
# then visit http://localhost:8000

# or Node
npx serve .
```

### Deploy to GitHub Pages
1. Push these files to a GitHub repository.
2. Repo **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
3. Choose your branch and the `/ (root)` folder, then **Save**.
4. Your site goes live at `https://<user>.github.io/<repo>/`, and hosted quiz
   links (`…/quiz.html#data=…`) will work for any student you share them with.

---

## 🔐 Finance tracker credentials

```
Username: teacher
Password: air
```

These are intentionally simple for a classroom demo. An incorrect attempt shows
only a generic *"Invalid credentials"* message — it does **not** display the
real username or password.

---

## 🔄 How external quiz results reach Students Progress

1. A student opens the shared `quiz.html#data=…` link and enters their **Name, Grade, and Batch** before the quiz unlocks.
2. After they submit, EduMetric tries three sync paths, in order of convenience:
   - **Same-browser sync** — if the student is on the same browser/device as the teacher dashboard (e.g. testing locally, or a shared classroom computer), the result lands in Students Progress the next time the dashboard refreshes — no action needed.
   - **Live tab sync** — if the teacher opened the quiz link from a tab/window they still control (e.g. a quick preview), the result syncs the instant it's submitted.
   - **Result Code (cross-device)** — for the common case of a student on their own phone/computer, they'll see a **Result Code** after submitting. They copy it and send it to the teacher, who pastes it into **Students → Students Progress → Import Result Code**.
3. In every path, EduMetric matches the result to an existing student by **name + grade + batch**; if no match exists, a new student is created automatically. Multiple quiz attempts for the same student average into their overall score.

---

## 📚 Quiz content coverage

The ELA bank in `js/quiz-bank.js` covers every grade from Kindergarten to
Grade 10, with five topics per grade and 5 curated questions per topic (275
total). When you request more questions than a topic's unique pool (e.g. a
50- or 100-question quiz), EduMetric reshuffles and reuses the pool with a
freshly randomized answer-choice order on each pass, so large quizzes never
just repeat the same 5 questions verbatim.

Example topics:

- **K:** Letter Recognition, Beginning Sounds, Rhyming, Sight Words, Upper/Lowercase
- **2:** Nouns & Verbs, Plurals, Contractions, Synonyms & Antonyms, Sentence Types
- **5:** Verb Tenses, Conjunctions, Greek & Latin Roots, Point of View, Summarizing
- **8:** Verbals, Sentence Structure, Mood & Tone, Sound Devices, Analyzing Arguments
- **10:** Rhetorical Devices, Tone & Diction, Allusion, Syntax, Literary Analysis

---

## ✅ Tests

Automated tests use Node + [`jsdom`](https://github.com/jsdom/jsdom) to load the
real pages and exercise every flow (fresh-start state, login, quiz generation,
hosting/printing, material download, finance login & credential-safety, and the
student quiz player's grading).

```bash
npm install   # installs jsdom (dev dependency only)
npm test
```

---

## 🛠️ Tech notes

- No frameworks, no bundler — just open the files.
- State persists in `localStorage` under the key `edumetric_state_v1`.
  To reset to a brand-new workspace, clear site data for the page.
- User-entered text is HTML-escaped before rendering.

