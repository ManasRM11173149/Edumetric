# Implementation Guide: CBSE Syllabus Integration

## Overview
This guide explains how to integrate the CBSE syllabus-based grade, subject, and topic selection into your Edumetric application.

---

## Files Provided

### 1. **syllabus.js** - New Syllabus Data Structure
Contains the complete CBSE 2026-27 syllabus mapping:
- Grades: K, 1-12
- Subjects: English, Mathematics, Hindi, Science, Social Science, EVS, Sanskrit, Physics, Chemistry, Biology
- Topics: All topics for each subject in each grade

**Key Functions:**
- `getSubjectsForGrade(grade)` - Returns array of subjects for a grade
- `getTopicsForGradeAndSubject(grade, subject)` - Returns array of topics for a grade+subject combination

### 2. **quiz-functions-updated.js** - Updated JavaScript Functions
Contains all event handlers and initialization functions:
- `populateQuizSubjects()` - Populates subject dropdown when grade changes
- `populateQuizTopics()` - Populates topics when subject changes
- Similar functions for Student Quiz, Materials, Grades Page, etc.
- `initializeXxx()` - Functions that run on page load to populate grade dropdowns

### 3. **create-quiz-updated.html** - Updated Create Quiz Tab
Shows the new form structure with:
- Grade Selector
- **NEW: Subject Selector**
- Topic Selector

### 4. **student-create-quiz-updated.html** - Updated Student Quiz Tab
Similar structure for creating quizzes for individual students

### 5. **materials-updated.html** - Updated Materials Tab
Similar structure for material generation

---

## Integration Steps

### Step 1: Add syllabus.js to index.html
Add this line in the `<head>` section of index.html, BEFORE any other script that uses it:

```html
<script src="syllabus.js"></script>
```

**Location:** After the `<link rel="stylesheet" href="styles.css">` line, add:
```html
<script src="syllabus.js"></script>
```

### Step 2: Update the Create Quiz Form (Lines 169-255)
Replace the existing Create Quiz section with the HTML from `create-quiz-updated.html`.

**Key Changes:**
- Line 179: Changed from `onchange="populateQuizTopics()"` to `onchange="populateQuizSubjects()"`
- Added NEW lines 184-189: Subject selector dropdown
- Updated Topic selector to use datalist

### Step 3: Update the Student Create Quiz Form (Lines 484-508)
Replace with HTML from `student-create-quiz-updated.html`.

**Key Changes:**
- Added subject selector between grade and topic
- Changed topic from input to select dropdown

### Step 4: Update the Materials Form (Lines 510-551)
Replace with HTML from `materials-updated.html`.

**Key Changes:**
- Added subject selector
- Changed topic from select to dedicated select dropdown

### Step 5: Add JavaScript Functions
Add ALL functions from `quiz-functions-updated.js` to your JavaScript in index.html.

**Location:** Add them near the end of your JavaScript, before the closing `</script>` tag.

### Step 6: Update Page Load Initialization
Find the `DOMContentLoaded` event or similar page load code, and ensure these initialization functions are called:

```javascript
document.addEventListener("DOMContentLoaded", function() {
    // ... existing code ...
    
    // Add these lines:
    initializeQuizGrades();
    initializeStudentQuizGrades();
    initializeMaterialGrades();
    initializeGradesPageGrades();
    initializeSendResultsGrades();
    initializeAddStudentModal();
});
```

---

## How It Works

### User Flow for Create Quiz:

1. **User selects Grade** (K, 1, 2, ..., 12)
   - `populateQuizSubjects()` is triggered
   - Fetches subjects from `CBSE_SYLLABUS[grade].subjects`
   - Populates the Subject dropdown

2. **User selects Subject** (English, Mathematics, Hindi, Science, etc.)
   - `populateQuizTopics()` is triggered
   - Fetches topics from `CBSE_SYLLABUS[grade].subjects[subject]`
   - Populates the Topic datalist with the specific topics

3. **User selects Topic**
   - Can type or select from the datalist
   - Selects question types, difficulty, etc.
   - Clicks "Generate Questions"

---

## Data Structure Example

The CBSE_SYLLABUS structure looks like:

```javascript
CBSE_SYLLABUS = {
  "6": {
    label: "Grade 6",
    subjects: {
      "English": [
        "Prose & Poetry",
        "Grammar - 8 Parts of Speech",
        "All Tenses",
        "Active & Passive Voice",
        // ... more topics
      ],
      "Mathematics": [
        "Number System",
        "Whole Numbers",
        // ... more topics
      ],
      "Science": [
        // ... topics
      ],
      // ... more subjects
    }
  },
  // ... more grades
}
```

---

## Testing Checklist

- [ ] syllabus.js loads without errors
- [ ] Grade dropdown populates on page load
- [ ] Selecting a grade populates Subject dropdown
- [ ] Selecting a subject populates Topic datalist
- [ ] Topic selection works correctly
- [ ] Same flow works for Student Create Quiz
- [ ] Same flow works for Materials section
- [ ] Grade selectors on other pages (Grades, Send Results) populate correctly

---

## Troubleshooting

### Problem: Subject dropdown is empty
- **Cause:** syllabus.js not loaded or `populateQuizSubjects()` not called
- **Fix:** 
  - Verify syllabus.js script tag is in index.html
  - Check that `onchange="populateQuizSubjects()"` is on the grade select
  - Check browser console for errors

### Problem: Topics not appearing
- **Cause:** Subject dropdown value not passed correctly
- **Fix:**
  - Verify `populateQuizTopics()` is called when subject changes
  - Check that the selected subject exists in `CBSE_SYLLABUS[grade].subjects`

### Problem: Old ELA topics still showing
- **Cause:** Old `populateQuizTopics()` function still being used
- **Fix:**
  - Make sure you're using the NEW `populateQuizTopics()` function from quiz-functions-updated.js
  - Remove the old function that uses `ELA_QUIZ_BANK`

---

## Backwards Compatibility

The old `ELA_QUIZ_BANK` (quiz-bank.js) is still available. If you want to:
- Keep using ELA quizzes only: Keep quiz-bank.js and only update the Create Quiz form
- Use CBSE subjects for topics but still generate ELA questions: Modify `generateQuestions()` to match topics with ELA_QUIZ_BANK

---

## File Locations

Place these files in the same directory as index.html:
- `syllabus.js` ← **Add this new file**
- `quiz-functions-updated.js` ← Copy functions to index.html
- `index.html` ← Update the HTML sections and add new functions

---

## Next Steps After Integration

1. **Test the complete flow** with all grades and subjects
2. **Update question generation** to support all subjects (currently uses ELA_QUIZ_BANK)
3. **Extend quiz-bank.js** with questions for all subjects, or use AI generation
4. **Update Student Progress** tracking to include subject/topic metadata
5. **Add filtering** in Student Progress by subject and topic

---

## Questions?

Refer back to the specific implementation files for detailed code examples.
