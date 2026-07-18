/**
 * Updated Quiz Functions - Handle Grade/Subject/Topic Selection
 * Add these functions to your main JavaScript in index.html
 */

// ===== POPULATE GRADE OPTIONS ON PAGE LOAD =====
function initializeQuizGrades() {
    const gradeSelect = document.getElementById("quizGrade");
    if (!gradeSelect) return;

    // Clear existing options except the first one
    gradeSelect.innerHTML = '<option value="">-- Select Grade --</option>';

    // Add grades from CBSE_SYLLABUS
    if (typeof GRADE_ORDER !== "undefined") {
        GRADE_ORDER.forEach(grade => {
            const option = document.createElement("option");
            option.value = grade;
            option.textContent = CBSE_SYLLABUS[grade].label;
            gradeSelect.appendChild(option);
        });
    }
}

// ===== POPULATE SUBJECTS BASED ON SELECTED GRADE =====
function populateQuizSubjects() {
    const gradeSelect = document.getElementById("quizGrade");
    const subjectSelect = document.getElementById("quizSubject");

    if (!gradeSelect || !subjectSelect) return;

    const selectedGrade = gradeSelect.value;

    // Reset subject selector
    subjectSelect.innerHTML = '<option value="">-- Select a subject --</option>';

    // Reset topic selector
    const topicSelect = document.getElementById("quizTopic");
    const topicList = document.getElementById("quizTopicList");
    if (topicSelect) topicSelect.value = "";
    if (topicList) topicList.innerHTML = '<option value="">-- Select a subject first --</option>';

    if (!selectedGrade) return;

    // Get subjects for selected grade
    const subjects = getSubjectsForGrade(selectedGrade);

    // Populate subject dropdown
    subjects.forEach(subject => {
        const option = document.createElement("option");
        option.value = subject;
        option.textContent = subject;
        subjectSelect.appendChild(option);
    });
}

// ===== POPULATE TOPICS BASED ON SELECTED SUBJECT =====
function populateQuizTopics() {
    const gradeSelect = document.getElementById("quizGrade");
    const subjectSelect = document.getElementById("quizSubject");
    const topicSelect = document.getElementById("quizTopic");
    const topicList = document.getElementById("quizTopicList");

    if (!gradeSelect || !subjectSelect || !topicSelect || !topicList) return;

    const selectedGrade = gradeSelect.value;
    const selectedSubject = subjectSelect.value;

    // Reset topic selector
    topicSelect.value = "";
    topicList.innerHTML = '<option value="">-- Select a topic --</option>';

    if (!selectedGrade || !selectedSubject) return;

    // Get topics for selected grade and subject
    const topics = getTopicsForGradeAndSubject(selectedGrade, selectedSubject);

    // Populate topic datalist
    topics.forEach(topic => {
        const option = document.createElement("option");
        option.value = topic;
        topicList.appendChild(option);
    });
}

// ===== STUDENT QUIZ CREATION - SIMILAR UPDATES =====
function initializeStudentQuizGrades() {
    const gradeSelect = document.getElementById("studentQuizGrade");
    if (!gradeSelect) return;

    gradeSelect.innerHTML = '<option value="">-- Select Grade --</option>';

    if (typeof GRADE_ORDER !== "undefined") {
        GRADE_ORDER.forEach(grade => {
            const option = document.createElement("option");
            option.value = grade;
            option.textContent = CBSE_SYLLABUS[grade].label;
            gradeSelect.appendChild(option);
        });
    }
}

function populateStudentQuizSubjects() {
    const gradeSelect = document.getElementById("studentQuizGrade");
    const subjectSelect = document.getElementById("studentQuizSubject");

    if (!gradeSelect || !subjectSelect) return;

    const selectedGrade = gradeSelect.value;

    subjectSelect.innerHTML = '<option value="">-- Select a subject --</option>';

    // Reset topic selector
    const topicSelect = document.getElementById("studentQuizTopic");
    if (topicSelect) topicSelect.innerHTML = '<option value="">-- Select a subject first --</option>';

    if (!selectedGrade) return;

    const subjects = getSubjectsForGrade(selectedGrade);
    subjects.forEach(subject => {
        const option = document.createElement("option");
        option.value = subject;
        option.textContent = subject;
        subjectSelect.appendChild(option);
    });
}

function populateStudentQuizTopics() {
    const gradeSelect = document.getElementById("studentQuizGrade");
    const subjectSelect = document.getElementById("studentQuizSubject");
    const topicSelect = document.getElementById("studentQuizTopic");

    if (!gradeSelect || !subjectSelect || !topicSelect) return;

    const selectedGrade = gradeSelect.value;
    const selectedSubject = subjectSelect.value;

    topicSelect.innerHTML = '<option value="">-- Select a topic --</option>';

    if (!selectedGrade || !selectedSubject) return;

    const topics = getTopicsForGradeAndSubject(selectedGrade, selectedSubject);
    topics.forEach(topic => {
        const option = document.createElement("option");
        option.value = topic;
        option.textContent = topic;
        topicSelect.appendChild(option);
    });
}

// ===== MATERIAL GENERATION - SIMILAR UPDATES =====
function initializeMaterialGrades() {
    const gradeSelect = document.getElementById("materialGrade");
    if (!gradeSelect) return;

    gradeSelect.innerHTML = '<option value="">-- Select Grade --</option>';

    if (typeof GRADE_ORDER !== "undefined") {
        GRADE_ORDER.forEach(grade => {
            const option = document.createElement("option");
            option.value = grade;
            option.textContent = CBSE_SYLLABUS[grade].label;
            gradeSelect.appendChild(option);
        });
    }
}

function populateMaterialSubjects() {
    const gradeSelect = document.getElementById("materialGrade");
    const subjectSelect = document.getElementById("materialSubject");

    if (!gradeSelect || !subjectSelect) return;

    const selectedGrade = gradeSelect.value;

    subjectSelect.innerHTML = '<option value="">-- Select a subject --</option>';

    const topicSelect = document.getElementById("materialTopic");
    if (topicSelect) topicSelect.innerHTML = '<option value="">-- Select a subject first --</option>';

    if (!selectedGrade) return;

    const subjects = getSubjectsForGrade(selectedGrade);
    subjects.forEach(subject => {
        const option = document.createElement("option");
        option.value = subject;
        option.textContent = subject;
        subjectSelect.appendChild(option);
    });
}

function populateMaterialTopics() {
    const gradeSelect = document.getElementById("materialGrade");
    const subjectSelect = document.getElementById("materialSubject");
    const topicSelect = document.getElementById("materialTopic");

    if (!gradeSelect || !subjectSelect || !topicSelect) return;

    const selectedGrade = gradeSelect.value;
    const selectedSubject = subjectSelect.value;

    topicSelect.innerHTML = '<option value="">-- Select a topic --</option>';

    if (!selectedGrade || !selectedSubject) return;

    const topics = getTopicsForGradeAndSubject(selectedGrade, selectedSubject);
    topics.forEach(topic => {
        const option = document.createElement("option");
        option.value = topic;
        option.textContent = topic;
        topicSelect.appendChild(option);
    });
}

// ===== GRADES PAGE - UPDATE GRADE SELECTOR =====
function initializeGradesPageGrades() {
    const gradeSelect = document.getElementById("gradesGradeSelect");
    if (!gradeSelect) return;

    gradeSelect.innerHTML = '<option value="">-- Choose Grade --</option>';

    if (typeof GRADE_ORDER !== "undefined") {
        GRADE_ORDER.forEach(grade => {
            const option = document.createElement("option");
            option.value = grade;
            option.textContent = CBSE_SYLLABUS[grade].label;
            gradeSelect.appendChild(option);
        });
    }
}

// ===== SEND RESULTS PAGE - UPDATE GRADE SELECTOR =====
function initializeSendResultsGrades() {
    const gradeSelect = document.getElementById("gradeSelect");
    if (!gradeSelect) return;

    gradeSelect.innerHTML = '<option value="">-- Choose Grade --</option>';

    if (typeof GRADE_ORDER !== "undefined") {
        GRADE_ORDER.forEach(grade => {
            const option = document.createElement("option");
            option.value = grade;
            option.textContent = CBSE_SYLLABUS[grade].label;
            gradeSelect.appendChild(option);
        });
    }
}

// ===== ADD STUDENT MODAL - UPDATE GRADE SELECTOR =====
function initializeAddStudentModal() {
    const gradeSelect = document.getElementById("newStudentGrade");
    if (!gradeSelect) return;

    gradeSelect.innerHTML = '';

    if (typeof GRADE_ORDER !== "undefined") {
        GRADE_ORDER.forEach(grade => {
            const option = document.createElement("option");
            option.value = grade;
            option.textContent = CBSE_SYLLABUS[grade].label;
            gradeSelect.appendChild(option);
        });
    }
}

// ===== CALL INITIALIZATION FUNCTIONS ON PAGE LOAD =====
// Add this to your existing page load event:
document.addEventListener("DOMContentLoaded", function() {
    initializeQuizGrades();
    initializeStudentQuizGrades();
    initializeMaterialGrades();
    initializeGradesPageGrades();
    initializeSendResultsGrades();
    initializeAddStudentModal();
});
