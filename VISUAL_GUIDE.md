# 🎨 Visual Guide - Data Flow & Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         EduMetric Dashboard                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────┐   ┌─────────────────┐   ┌──────────────┐   │
│  │  Create Quiz    │   │ Student Quiz    │   │  Materials   │   │
│  │  Main Form      │   │  Form           │   │  Form        │   │
│  └────────┬────────┘   └────────┬────────┘   └──────┬───────┘   │
│           │                     │                    │            │
│           └─────────────────────┼────────────────────┘            │
│                                 │                                 │
│                    Grade/Subject/Topic Selection                 │
│                                 │                                 │
│           ┌─────────────────────┼────────────────────┐            │
│           │                     │                    │            │
│  ┌────────▼────────┐  ┌────────▼────────┐  ┌──────▼──────────┐  │
│  │ populate        │  │ populateQuiz    │  │ populateMaterial│  │
│  │ QuizSubjects()  │  │ Topics()        │  │ Subjects()      │  │
│  └────────┬────────┘  └────────┬────────┘  └──────┬──────────┘  │
│           │                    │                   │              │
│           └────────────────────┼───────────────────┘              │
│                                │                                 │
│                    CBSE_SYLLABUS Data Structure                  │
│                                │                                 │
│           ┌─────────────────────┴────────────────────┐            │
│           │                                         │            │
│  ┌────────▼───────────┐               ┌────────────▼────────┐   │
│  │ getSubjectsFor     │               │ getTopicsFor        │   │
│  │ Grade(grade)       │               │ GradeAndSubject()   │   │
│  └────────────────────┘               └─────────────────────┘   │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │              syllabus.js                                  │   │
│  │  {                                                        │   │
│  │    "6": {                                                 │   │
│  │      subjects: {                                          │   │
│  │        English: [topics...],                              │   │
│  │        Mathematics: [topics...],                          │   │
│  │        Science: [topics...]                               │   │
│  │      }                                                    │   │
│  │    }                                                      │   │
│  │  }                                                        │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
USER ACTION                  TRIGGER                    RESULT
═════════════════════════════════════════════════════════════════

┌──────────────────┐
│  Opens Dashboard │
└────────┬─────────┘
         │
         └──────────────────────────────────────────────┐
                                                        │
                                                   DOMContentLoaded
                                                        │
                            ┌───────────────────────────┘
                            │
                    ┌───────▼──────────┐
                    │ Initialize Grades│
                    │ (from CBSE_      │
                    │  SYLLABUS)       │
                    └───────┬──────────┘
                            │
                    ┌───────▼──────────────────┐
                    │ Grade Dropdowns Populated│
                    │ (K, 1, 2, ..., 12)      │
                    └───────┬──────────────────┘
                            │
                            │
┌──────────────────────────┐│
│  User Selects Grade      │──────────────────────────┐
│ (e.g., Grade 6)          │                          │
└──────────────────────────┘                   populateQuiz
                                                Subjects()
                                                      │
                                               ┌──────▼──────┐
                                               │ Get Subjects │
                                               │ for Grade 6  │
                                               └──────┬───────┘
                                                      │
                    ┌─────────────────────────────────▼────────────┐
                    │ Subject Options: English, Math, Science, etc.│
                    └─────────────────────────────────┬────────────┘
                                                      │
┌──────────────────────────┐                         │
│  User Selects Subject    │─────────────────────────┘
│ (e.g., Mathematics)      │
└──────────────────────────┘                   populateQuiz
                                                Topics()
                                                      │
                                               ┌──────▼──────────┐
                                               │ Get Topics for  │
                                               │ Grade 6 + Math  │
                                               └──────┬──────────┘
                                                      │
                    ┌─────────────────────────────────▼────────────────┐
                    │ Topic Options: Number System, Fractions, etc.   │
                    └──────────────────────────────────────────────────┘
                                                      │
┌──────────────────────────┐                         │
│  User Selects Topic      │◄────────────────────────┘
│ (e.g., Fractions)        │
└──────────────────────────┘
         │
         └─────► Continue with quiz creation...
```

---

## Grade → Subject → Topic Hierarchy

```
GRADE K
├── Development
│   ├── Language Development
│   ├── Numeracy & Mathematical Thinking
│   ├── Motor Skills Development
│   ├── Social-Emotional Learning
│   └── Cognitive Development

GRADE 1
├── English
│   ├── Alphabet Recognition
│   ├── Phonetic Awareness
│   ├── Sight Words
│   └── ...
├── Mathematics
│   ├── Numbers 1-50
│   ├── Addition Concept
│   ├── Subtraction Concept
│   └── ...
└── Hindi
    ├── Devanagari Alphabet
    ├── Simple Words
    └── ...

GRADE 6
├── English
│   ├── Prose & Poetry
│   ├── Grammar - 8 Parts of Speech
│   ├── All Tenses
│   ├── Active & Passive Voice
│   └── ...
├── Mathematics
│   ├── Number System
│   ├── Whole Numbers
│   ├── Playing with Numbers
│   ├── Basic Geometry
│   ├── Integers
│   ├── Fractions
│   └── ...
├── Hindi
│   ├── Grammar
│   ├── Reading Material
│   └── ...
├── Science
│   ├── Life Processes & Organization
│   ├── Physical Environment
│   ├── Matter & Materials
│   └── ...
├── Social Science
│   ├── Ancient India History
│   ├── Earth & Solar System
│   ├── Climate & Vegetation
│   └── ...
└── Sanskrit
    ├── Devanagari Script
    ├── Vocabulary
    └── ...

GRADE 12 (Science)
├── Physics
│   ├── Electromagnetism
│   ├── Optics
│   ├── Modern Physics
│   └── ...
├── Chemistry
│   ├── Solutions & Colloids
│   ├── Electrochemistry
│   ├── Chemical Kinetics
│   └── ...
├── Biology
│   ├── Reproduction
│   ├── Genetics
│   ├── Molecular Basis of Life
│   └── ...
└── Mathematics
    ├── Relations & Functions
    ├── Inverse Trigonometry
    ├── Matrices & Determinants
    └── ...
```

---

## Component Interaction

```
┌────────────────────────────────────────────────────────────────┐
│                     Quiz Creation Flow                         │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  INPUT FORM                    JAVASCRIPT               DATA  │
│  ═════════                    ══════════                ════  │
│                                                                │
│  ┌─────────────┐              ┌──────────────┐               │
│  │Grade Select │◄─────────────│ Grade Options│               │
│  └──────┬──────┘ onchange     └──────────────┘               │
│         │        populateQuiz                                │
│         │        Subjects()                                  │
│         │                                                     │
│         ▼               ┌──────────────────────┐              │
│  ┌─────────────┐        │ CBSE_SYLLABUS        │              │
│  │Subject      │◄───────│ .getSubjectsFor      │ ◄───────┐   │
│  │Select       │        │ Grade(grade)         │         │   │
│  └──────┬──────┘        └──────────────────────┘    syllabus │
│         │        onchange                            .js    │
│         │        populateQuiz                             │   │
│         │        Topics()                                 │   │
│         │                                                    │
│         ▼               ┌──────────────────────┐            │
│  ┌─────────────┐        │ CBSE_SYLLABUS        │            │
│  │Topic Input/ │◄───────│ .getTopicsFor        │            │
│  │Datalist     │        │ GradeAndSubject()    │            │
│  └─────────────┘        └──────────────────────┘            │
│         │                                                    │
│         └───────────► Continue with form...                 │
│                                                              │
└────────────────────────────────────────────────────────────────┘
```

---

## Form Updates Map

```
index.html Sections to Update:

┌─────────────────────────────────────────────────────────────┐
│  SECTION 1: CREATE QUIZ TAB (Lines 169-255)                 │
│  ─────────────────────────────────────────                  │
│  FROM: create-quiz-updated.html                             │
│                                                              │
│  Before: Grade → Topic                                      │
│  After:  Grade → Subject → Topic ✨                         │
│                                                              │
│  Key changes:                                               │
│  • Grade onchange: populateQuizTopics()                     │
│    ➜ populateQuizSubjects()                                 │
│  • Add Subject selector with onchange:                      │
│    populateQuizTopics()                                     │
│  • Update Topic placeholder messages                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  SECTION 2: STUDENT QUIZ TAB (Lines 484-508)                │
│  ────────────────────────────────────────────               │
│  FROM: student-create-quiz-updated.html                     │
│                                                              │
│  Before: Grade → Topic (input field)                        │
│  After:  Grade → Subject → Topic (select) ✨                │
│                                                              │
│  Key changes:                                               │
│  • Add Subject selector                                     │
│  • Change Topic from input to select                        │
│  • Add onchange handlers                                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  SECTION 3: MATERIALS TAB (Lines 510-551)                   │
│  ──────────────────────────────────────────                 │
│  FROM: materials-updated.html                               │
│                                                              │
│  Before: Grade → Topic (select)                             │
│  After:  Grade → Subject → Topic (select) ✨                │
│                                                              │
│  Key changes:                                               │
│  • Add Subject selector between Grade & Topic               │
│  • Wire up onchange handlers                                │
└─────────────────────────────────────────────────────────────┘
```

---

## File Integration Map

```
YOUR PROJECT FOLDER
│
├── index.html (MODIFY - Update 3 form sections + add JS functions)
│   ├── SECTION 1: Lines 169-255 (Create Quiz)
│   │               ↑ Replace with create-quiz-updated.html
│   │
│   ├── SECTION 2: Lines 484-508 (Student Quiz)
│   │               ↑ Replace with student-create-quiz-updated.html
│   │
│   ├── SECTION 3: Lines 510-551 (Materials)
│   │               ↑ Replace with materials-updated.html
│   │
│   └── ADD: JavaScript functions from quiz-functions-updated.js
│       └── Call initialization functions on page load
│
├── syllabus.js (NEW FILE - Copy syllabus.js here)
│               Add <script src="syllabus.js"></script> to index.html
│
├── quiz-bank.js (EXISTING - No changes needed)
│
├── quiz.html (EXISTING - No changes needed)
│
├── styles.css (EXISTING - No changes needed)
│
└── documentation/
    ├── SUMMARY.md (Reference)
    ├── IMPLEMENTATION_GUIDE.md (Reference)
    ├── BEFORE_AFTER_COMPARISON.md (Reference)
    ├── INDEX.md (Reference)
    ├── VISUAL_GUIDE.md (This file)
    └── ... (other docs)
```

---

## Function Call Chain

```
USER OPENS PAGE
      │
      ├─► DOMContentLoaded event fires
      │
      ├─► initializeQuizGrades()
      │   ├─► Gets GRADE_ORDER
      │   ├─► Loops through grades
      │   ├─► Creates options from CBSE_SYLLABUS[grade].label
      │   └─► Populates #quizGrade select
      │
      ├─► initializeStudentQuizGrades()
      │   └─► Same pattern for #studentQuizGrade
      │
      ├─► initializeMaterialGrades()
      │   └─► Same pattern for #materialGrade
      │
      └─► ... other initializations
           └─► Page ready! ✓

USER SELECTS GRADE (e.g., "6")
      │
      └─► onchange="populateQuizSubjects()" fires
          │
          ├─► Gets selected grade value ("6")
          │
          ├─► Calls getSubjectsForGrade("6")
          │   ├─► Looks up CBSE_SYLLABUS["6"].subjects
          │   └─► Returns ["English", "Math", "Science", ...]
          │
          ├─► Clears #quizSubject dropdown
          │
          ├─► Loops through subjects
          │
          ├─► Creates & adds options to #quizSubject
          │
          └─► Clears #quizTopic (reset)

USER SELECTS SUBJECT (e.g., "Mathematics")
      │
      └─► onchange="populateQuizTopics()" fires
          │
          ├─► Gets selected subject value ("Mathematics")
          │
          ├─► Calls getTopicsForGradeAndSubject("6", "Mathematics")
          │   ├─► Looks up CBSE_SYLLABUS["6"].subjects["Mathematics"]
          │   └─► Returns [topics array]
          │
          ├─► Clears #quizTopicList datalist
          │
          ├─► Loops through topics
          │
          ├─► Creates & adds options to #quizTopicList
          │
          └─► Topic selection ready! ✓

USER SELECTS TOPIC
      │
      └─► Form is ready to continue...
          └─► Can generate questions, select difficulty, etc.
```

---

## State Diagram

```
                    PAGE LOADS
                        │
                        ▼
                 ┌─────────────┐
                 │   INITIAL   │
                 │   STATE     │
                 └─────────────┘
                        │
                        │ Grade Dropdowns populated
                        │
                        ▼
                 ┌─────────────┐
                 │   GRADE     │
                 │  SELECTED   │
                 └─────────────┘
                        │
                        │ Subject Options Shown
                        │
                        ▼
                 ┌─────────────┐
                 │  SUBJECT    │
                 │  AVAILABLE  │
                 └─────────────┘
                        │
                        │ Subject Selected
                        │
                        ▼
                 ┌─────────────┐
                 │  TOPIC      │
                 │  OPTIONS    │
                 │  AVAILABLE  │
                 └─────────────┘
                        │
                        │ Topic Selected
                        │
                        ▼
                 ┌─────────────┐
                 │   READY TO  │
                 │  GENERATE   │
                 │   QUIZ      │
                 └─────────────┘
```

---

## Coverage Matrix

```
                English  Math  Hindi  Science  Social  EVS  Sanskrit
Grade K           ✓              ✓      ✓       ✓      ✓
Grade 1           ✓      ✓      ✓                      ✓
Grade 2           ✓      ✓      ✓                      ✓
Grade 3           ✓      ✓      ✓       ✓      ✓      ✓
Grade 4           ✓      ✓      ✓       ✓      ✓
Grade 5           ✓      ✓      ✓       ✓      ✓
Grade 6           ✓      ✓      ✓       ✓      ✓             ✓
Grade 7           ✓      ✓      ✓       ✓      ✓             ✓
Grade 8           ✓      ✓      ✓       ✓      ✓             ✓
Grade 9           ✓      ✓      ✓       ✓      ✓             ✓
Grade 10          ✓      ✓      ✓       ✓      ✓             ✓
Grade 11                       Physics, Chemistry, Biology, Math
Grade 12                       Physics, Chemistry, Biology, Math

✓ = Available with topics
```

---

This visual guide should help you understand the complete system architecture and flow!
