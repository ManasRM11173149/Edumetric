 /* ==========================================================================
   EduMetric — Teacher Dashboard
   Application logic
   --------------------------------------------------------------------------
   Design goals (per project requirements):
     1. Starts as a brand-new, empty workspace (no demo data).
     2. Login has no name field — one click to start.
     3. Quizzes are drawn from an accurate ELA bank for Grades K–10.
     4. Quizzes export to a high-quality PDF and a shareable external link;
        both first prompt the teacher to pick which quiz.
     5. The Student A material generator produces real, downloadable content.
     6. Finance login = teacher / air, and never reveals the credentials.
     7. Responsive / mobile friendly (off-canvas sidebar).
   All data is persisted locally in the browser (localStorage).
   ========================================================================== */

/* ----------------------------- State ----------------------------- */
const STORAGE_KEY = "edumetric_state_v1";
const DB_NAME = "EduMetricDB";
const DB_STORE = "state";
const DB_VERSION = 1;
const FINANCE_USER = "teacher";
const FINANCE_PASS = "air";

let state = {
    students: {},      // { gradeKey: [ {id,name,grade,batch,phone,score,gpa} ] }
    savedQuizzes: [],  // [ {id,title,grade,topic,questions:[...]} ]
    financeData: []    // [ {name,amount,status,date} ]
};

let quizzesCreated = 0;
let financeUnlocked = false;
let selectedStudentId = null;

/* Transient state for the Create Quiz form — reset after each save. */
let currentQuizDifficulty = "medium";
let currentTextbook = null; // { fileName, text } | null
let selectedStudentGrade = null;
let editingStudentId = null;
let editingStudentGrade = null;
let lastMaterial = null;       // { title, html, text }
let pendingShareUrl = "";

/* IndexedDB connection */
let db = null;

/* Initialize IndexedDB */
function initIndexedDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        
        request.onerror = () => {
            console.warn("IndexedDB failed to open, falling back to localStorage");
            reject(request.error);
        };
        
        request.onsuccess = () => {
            db = request.result;
            console.log("IndexedDB initialized successfully");
            resolve(db);
        };
        
        request.onupgradeneeded = (event) => {
            const database = event.target.result;
            if (!database.objectStoreNames.contains(DB_STORE)) {
                database.createObjectStore(DB_STORE, { keyPath: "id" });
            }
        };
    });
}

/* Save state to IndexedDB */
async function saveToIndexedDB(data) {
    if (!db) return false;
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([DB_STORE], "readwrite");
        const store = transaction.objectStore(DB_STORE);
        const request = store.put({ id: STORAGE_KEY, ...data });
        
        request.onerror = () => {
            console.warn("Failed to save to IndexedDB");
            reject(request.error);
        };
        
        request.onsuccess = () => {
            resolve(true);
        };
    });
}

/* Load state from IndexedDB */
async function loadFromIndexedDB() {
    if (!db) return null;
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([DB_STORE], "readonly");
        const store = transaction.objectStore(DB_STORE);
        const request = store.get(STORAGE_KEY);
        
        request.onerror = () => {
            console.warn("Failed to load from IndexedDB");
            reject(request.error);
        };
        
        request.onsuccess = () => {
            const result = request.result;
            resolve(result ? { students: result.students, savedQuizzes: result.savedQuizzes, financeData: result.financeData } : null);
        };
    });
}

/* Fallback to localStorage if IndexedDB is not available */
async function loadState() {
    try {
        // Try IndexedDB first
        if (db) {
            const idbData = await loadFromIndexedDB();
            if (idbData) {
                state.students = idbData.students || {};
                state.savedQuizzes = idbData.savedQuizzes || [];
                state.financeData = idbData.financeData || [];
                quizzesCreated = state.savedQuizzes.length;
                return;
            }
        }
        
        // Fall back to localStorage
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            state.students = parsed.students || {};
            state.savedQuizzes = parsed.savedQuizzes || [];
            state.financeData = parsed.financeData || [];
            quizzesCreated = state.savedQuizzes.length;
            
            // Migrate to IndexedDB if available
            if (db) {
                await saveToIndexedDB(state);
            }
        }
    } catch (e) {
        console.warn("Could not load saved state:", e);
    }
    // Guarantee an (empty) bucket for every grade.
    GRADE_ORDER.forEach(g => { if (!state.students[g]) state.students[g] = []; });
}

async function saveState() {
    try {
        // Save to IndexedDB (primary)
        if (db) {
            await saveToIndexedDB(state);
        } else {
            // Fallback to localStorage
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        }
    } catch (e) {
        console.warn("Could not save state:", e);
        // If IndexedDB fails, fallback to localStorage
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (lse) {
            console.error("Both IndexedDB and localStorage save failed:", lse);
        }
    }
}

/* ----------------------------- Utils ------------------------------ */
function escapeHtml(str) {
    return String(str == null ? "" : str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function gradeLabel(g) {
    return g === "K" ? "Kindergarten" : "Grade " + g;
}

function allStudents() {
    return GRADE_ORDER.reduce((acc, g) => acc.concat(state.students[g] || []), []);
}

function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function letter(i) { return ["A", "B", "C", "D", "E", "F"][i] || "?"; }

function downloadBlob(filename, content, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1500);
}

/* --------------------- Grade dropdown wiring ---------------------- */
function fillGradeSelect(el, placeholder) {
    if (!el) return;
    let html = placeholder ? `<option value="">${placeholder}</option>` : "";
    GRADE_ORDER.forEach(g => {
        html += `<option value="${g}">${gradeLabel(g)}</option>`;
    });
    el.innerHTML = html;
}

function fillTopicSelect(el, grade, { includeMixed = true } = {}) {
    if (!el) return;
    if (!grade || !ELA_QUIZ_BANK[grade]) {
        el.innerHTML = `<option value="">-- Select a grade first --</option>`;
        return;
    }
    const topics = Object.keys(ELA_QUIZ_BANK[grade].topics);
    let html = `<option value="">-- Select Topic --</option>`;
    if (includeMixed) html += `<option value="__ALL__">All Topics (Mixed)</option>`;
    topics.forEach(t => { html += `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`; });
    el.innerHTML = html;
}

/* Pull a set of questions for a grade + topic from the ELA bank.
   Supports requesting MORE questions than exist in the underlying bank
   (up to 100): once the unique pool is exhausted, the pool is reshuffled
   and reused, with each MCQ's answer-choice order independently re-shuffled
   so repeats don't look identical or have an obviously-memorizable answer
   position. */
function getQuestionsFor(grade, topic, count) {
    if (!ELA_QUIZ_BANK[grade]) return [];
    let basePool = [];
    if (!topic || topic === "__ALL__") {
        Object.values(ELA_QUIZ_BANK[grade].topics).forEach(arr => { basePool = basePool.concat(arr); });
    } else if (ELA_QUIZ_BANK[grade].topics[topic]) {
        basePool = ELA_QUIZ_BANK[grade].topics[topic].slice();
    }
    if (!basePool.length) return [];

    const wanted = Math.max(1, Math.min(count || 1, 100));
    const result = [];

    // Keep drawing shuffled passes over the pool until we have enough.
    while (result.length < wanted) {
        const pass = shuffle(basePool);
        for (let i = 0; i < pass.length && result.length < wanted; i++) {
            result.push(reshuffleOptions(pass[i]));
        }
    }
    return result;
}

/* Return a copy of a question item with its MCQ options (and the answer
   index) randomized to a fresh order. Leaves fill-in-the-blank items as-is. */
function reshuffleOptions(item) {
    if (!item || !Array.isArray(item.options)) return item;
    const correctText = item.options[item.answer];
    const order = shuffle(item.options.map((_, i) => i));
    const newOptions = order.map(i => item.options[i]);
    const newAnswer = newOptions.indexOf(correctText);
    return Object.assign({}, item, { options: newOptions, answer: newAnswer });
}

/* ========================= MODALS ============================ */
function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove("active");
}

function openModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add("active");
}

/* ============================ LOGIN ============================== */
function handleLogin(e) {
    if (e) e.preventDefault();
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("mainApp").style.display = "block";
    refreshAll();
}

function logout() {
    document.getElementById("mainApp").style.display = "none";
    document.getElementById("loginScreen").style.display = "flex";
    financeUnlocked = false;
    document.getElementById("financePassword").value = "";
    document.getElementById("financeUsername").value = "";
    closeSidebar();
}

/* ======================== SIDEBAR (mobile) ====================== */
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("open");
    document.getElementById("sidebarOverlay").classList.toggle("show");
}
function closeSidebar() {
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("sidebarOverlay").classList.remove("show");
}

/* ========================= NAVIGATION =========================== */
function openPage(pageId, navItem) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(pageId).classList.add("active");

    document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
    if (navItem) navItem.classList.add("active");

    const titles = {
        "dashboard": "Dashboard",
        "quiz": "Quiz Management",
        "students": "Manage Students",
        "student-a": "Student A - Individual Dashboard",
        "finance": "Finance Tracker"
    };
    document.getElementById("pageTitle").textContent = titles[pageId] || "EduMetric";

    if (pageId === "finance") {
        if (!financeUnlocked) {
            document.getElementById("financeLoginScreen").style.display = "block";
            document.getElementById("financeContent").style.display = "none";
        } else {
            document.getElementById("financeLoginScreen").style.display = "none";
            document.getElementById("financeContent").style.display = "block";
        }
    }
    closeSidebar();
}

/* =========================== TABS ============================== */
function switchQuizTab(tabId, btn) { switchTab("#quiz", tabId, btn); }
function switchStudentsTab(tabId, btn) { switchTab("#students", tabId, btn); }
function switchStudentTab(tabId, btn) { switchTab("#student-a", tabId, btn); }
function switchTab(scope, tabId, btn) {
    document.querySelectorAll(scope + " .tab-content").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(scope + " .tab-btn").forEach(b => b.classList.remove("active"));
    document.getElementById(tabId).classList.add("active");
    btn.classList.add("active");
}

/* ========================= DASHBOARD =========================== */
function updateDashboard() {
    const all = allStudents();
    document.getElementById("totalStudents").textContent = all.length;
    document.getElementById("totalStudentCount").textContent = all.length;
    document.getElementById("quizzesCreated").textContent = quizzesCreated;

    const scored = all.filter(s => typeof s.score === "number" && !isNaN(s.score));
    const avg = scored.length
        ? Math.round(scored.reduce((sum, s) => sum + s.score, 0) / scored.length)
        : null;
    document.getElementById("avgPerformance").textContent = avg === null ? "—" : avg + "%";

    // Grade-wise table — only grades that have students.
    let html = "";
    let any = false;
    GRADE_ORDER.forEach(grade => {
        const list = state.students[grade] || [];
        if (!list.length) return;
        any = true;
        const gradeScored = list.filter(s => typeof s.score === "number");
        const gAvg = gradeScored.length
            ? Math.round(gradeScored.reduce((a, s) => a + s.score, 0) / gradeScored.length) + "%"
            : "—";
        html += `<tr>
            <td><strong>${gradeLabel(grade)}</strong></td>
            <td>${gAvg}</td>
            <td>English / Language Arts</td>
            <td>${list.length}</td>
        </tr>`;
    });
    document.getElementById("gradePerformance").innerHTML = html;
    document.getElementById("gradePerformanceEmpty").style.display = any ? "none" : "block";
}

/* ====================== STUDENT MANAGEMENT ===================== */
function updateStudentsList() {
    let html = "";
    let any = false;
    GRADE_ORDER.forEach(grade => {
        const list = state.students[grade] || [];
        if (!list.length) return;
        any = true;
        html += `<div class="grade-section"><div class="grade-title">${gradeLabel(grade)}</div>`;
        list.forEach(student => {
            const phone = student.phone || "—";
            const batch = student.batch || "—";
            html += `
                <div class="student-item" data-student-id="${escapeHtml(student.id)}" data-student-grade="${escapeHtml(grade)}">
                    <div class="student-info">
                        <h4>${escapeHtml(student.name)}</h4>
                        <p>Batch: ${escapeHtml(batch)} • 📱 ${escapeHtml(phone)}</p>
                    </div>
                    <div style="display:flex; gap:8px;">
                        <button type="button" class="btn-small" data-student-action="edit">Edit</button>
                        <button type="button" class="btn-small" style="background:rgba(239,68,68,0.2);border-color:rgba(239,68,68,0.4);color:#f87171;" data-student-action="delete">Delete</button>
                    </div>
                </div>`;
        });
        html += `</div>`;
    });
    document.getElementById("studentsList").innerHTML = html;
    document.getElementById("studentsEmpty").style.display = any ? "none" : "block";
}

// Event delegation for the Students list: bound once to the (persistent)
// container instead of re-attaching inline onclick handlers on every
// re-render. This avoids relying on per-button event.stopPropagation()
// ordering and keeps working even if a hosting environment's CSP blocks
// inline event-handler attributes.
function setupStudentsListDelegation() {
    const container = document.getElementById("studentsList");
    if (!container || container.dataset.delegationBound) return;
    container.dataset.delegationBound = "true";
    container.addEventListener("click", function (event) {
        const item = event.target.closest(".student-item");
        if (!item || !container.contains(item)) return;
        const id = item.getAttribute("data-student-id");
        const grade = item.getAttribute("data-student-grade");

        const actionBtn = event.target.closest("[data-student-action]");
        if (actionBtn && item.contains(actionBtn)) {
            const action = actionBtn.getAttribute("data-student-action");
            if (action === "edit") {
                editStudentModal(id, grade);
            } else if (action === "delete") {
                deleteStudent(id, grade, event);
            }
            return; // Never let an Edit/Delete click also select the student.
        }

        selectStudent(id, grade);
    });
}

function updateProgressTable() {
    let html = "";
    const all = allStudents();
    const quizFilter = document.getElementById("progressQuizFilter").value;
    
    all.forEach(s => {
        const scoreTxt = typeof s.score === "number" ? s.score + "%" : "—";
        const gpaTxt = (s.gpa || s.gpa === 0) ? s.gpa : "—";
        const hasPendingReview = s.quizHistory && s.quizHistory.some(qh => qh.status === "Pending Review" || qh.shortAnswerCount > 0);
        let progress;
        if (typeof s.score !== "number" && hasPendingReview) progress = "📝 Pending Review";
        else if (typeof s.score !== "number") progress = "Not assessed";
        else if (s.score >= 80) progress = "📈 Excellent";
        else if (s.score >= 60) progress = "➡️ Good";
        else progress = "📉 Needs Help";
        
        let quizDisplay = "--";
        if (quizFilter && state.savedQuizzes.length > 0) {
            const quiz = state.savedQuizzes.find(q => q.id === quizFilter);
            quizDisplay = quiz ? escapeHtml(quiz.title) : "--";
        } else if (s.quizHistory && s.quizHistory.length) {
            // Show the most recent externally-taken quiz by default.
            const recent = s.quizHistory.slice().sort((a, b) =>
                new Date(b.timestamp || b.date) - new Date(a.timestamp || a.date)
            )[0];
            quizDisplay = escapeHtml(recent.quizTitle || "Quiz");
        } else if (!quizFilter && state.savedQuizzes.length > 0) {
            quizDisplay = `<select style="width:150px;padding:6px;border:1px solid rgba(255,255,255,0.1);border-radius:4px;background:var(--surface-bright);color:var(--on-surface);"><option value="">-- Select Quiz --</option>${state.savedQuizzes.map(q => `<option value="${q.id}">${escapeHtml(q.title)}</option>`).join('')}</select>`;
        }
        
        html += `<tr>
            <td><strong>${escapeHtml(s.name)}</strong></td>
            <td>${gradeLabel(s.grade)}</td>
            <td>${escapeHtml(s.batch || "—")}</td>
            <td>${quizDisplay}</td>
            <td>${scoreTxt}</td>
            <td>${gpaTxt}</td>
            <td>${progress}</td>
        </tr>`;
    });
    document.getElementById("progressTableBody").innerHTML = html;
    document.getElementById("progressEmpty").style.display = all.length ? "none" : "block";
}

function openAddStudentModal() {
    openModal("addStudentModal");
}

function addStudent() {
    const name = document.getElementById("newStudentName").value.trim();
    const grade = document.getElementById("newStudentGrade").value;
    const batch = document.getElementById("newStudentBatch").value.trim();
    const phone = document.getElementById("newStudentPhone").value.trim();
    const scoreRaw = document.getElementById("newStudentScore").value;
    const gpaRaw = document.getElementById("newStudentGPA").value;

    if (!name || !grade || !batch || !phone) {
        alert("Please fill in name, grade, batch and phone.");
        return;
    }

    state.students[grade].push({
        id: grade + "-" + Date.now(),
        name, grade, batch, phone,
        score: scoreRaw === "" ? null : Math.max(0, Math.min(100, parseInt(scoreRaw, 10))),
        gpa: gpaRaw === "" ? null : Math.max(0, Math.min(4, parseFloat(gpaRaw))).toFixed(1)
    });

    saveState();
    refreshAll();
    closeModal("addStudentModal");

    ["newStudentName", "newStudentBatch", "newStudentPhone", "newStudentScore", "newStudentGPA"].forEach(id => {
        document.getElementById(id).value = "";
    });
    alert("✓ Student added!");
}

function editStudentModal(id, grade, event) {
    if (event) event.stopPropagation();
    editingStudentId = id;
    editingStudentGrade = grade;
    const student = state.students[grade].find(s => s.id === id);
    if (!student) return;
    document.getElementById("editStudentName").value = student.name;
    document.getElementById("editStudentGrade").value = grade;
    document.getElementById("editStudentBatch").value = student.batch;
    document.getElementById("editStudentPhone").value = student.phone;
    document.getElementById("editStudentScore").value = (typeof student.score === "number") ? student.score : "";
    document.getElementById("editStudentGPA").value = (student.gpa || student.gpa === 0) ? student.gpa : "";
    document.getElementById("editStudentModal").classList.add("active");
}

function saveStudentEdit() {
    const oldGrade = editingStudentGrade;
    const newGrade = document.getElementById("editStudentGrade").value;
    const idx = state.students[oldGrade].findIndex(s => s.id === editingStudentId);
    if (idx === -1) return;
    const student = state.students[oldGrade][idx];

    student.name = document.getElementById("editStudentName").value.trim() || student.name;
    student.batch = document.getElementById("editStudentBatch").value.trim();
    student.phone = document.getElementById("editStudentPhone").value.trim();
    const scoreRaw = document.getElementById("editStudentScore").value;
    const gpaRaw = document.getElementById("editStudentGPA").value;
    student.score = scoreRaw === "" ? null : Math.max(0, Math.min(100, parseInt(scoreRaw, 10)));
    student.gpa = gpaRaw === "" ? null : Math.max(0, Math.min(4, parseFloat(gpaRaw))).toFixed(1);

    // Handle grade change.
    if (newGrade !== oldGrade) {
        student.grade = newGrade;
        state.students[oldGrade].splice(idx, 1);
        state.students[newGrade].push(student);
    }

    saveState();
    refreshAll();
    // Keep the Student A view in sync if the edited student is selected.
    if (selectedStudentId === editingStudentId) selectStudent(editingStudentId, student.grade, true);
    closeModal("editStudentModal");
}

function deleteStudent(id, grade, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    if (!confirm("Delete this student?")) return;
    state.students[grade] = state.students[grade].filter(s => s.id !== id);
    if (selectedStudentId === id) {
        selectedStudentId = null;
        document.getElementById("studentAHeader").style.display = "none";
        document.getElementById("studentAContent").style.display = "none";
        document.getElementById("studentAEmpty").style.display = "block";
    }
    saveState();
    refreshAll();
}

function clearAllStudents() {
    const total = allStudents().length;
    if (total === 0) { alert("There are no students to clear."); return; }
    if (!confirm(`Are you sure you want to delete ALL ${total} student${total > 1 ? "s" : ""}? This cannot be undone.`)) return;
    GRADE_ORDER.forEach(g => { state.students[g] = []; });
    selectedStudentId = null;
    const hdr = document.getElementById("studentAHeader");
    const cnt = document.getElementById("studentAContent");
    const emp = document.getElementById("studentAEmpty");
    if (hdr) hdr.style.display = "none";
    if (cnt) cnt.style.display = "none";
    if (emp) emp.style.display = "block";
    saveState();
    refreshAll();
    alert("✓ All students have been removed.");
}

/* ========================= STUDENT A =========================== */
function selectStudent(id, grade, stayOnPage) {
    selectedStudentId = id;
    selectedStudentGrade = grade;
    const student = state.students[grade].find(s => s.id === id);
    if (!student) return;

    // Sync external quiz results
    syncAllExternalQuizResults();

    document.getElementById("studentAName").textContent = student.name;
    document.getElementById("studentAGrade").textContent = gradeLabel(grade);
    document.getElementById("studentABatch").textContent = student.batch;
    document.getElementById("studentAPhone").textContent = student.phone;
    document.getElementById("studentScore").textContent = (typeof student.score === "number") ? student.score + "%" : "—";
    document.getElementById("studentGPA").textContent = (student.gpa || student.gpa === 0) ? student.gpa : "—";
    document.getElementById("studentAIInsight").textContent = buildInsight(student);
    const quizCount = document.getElementById("studentQuizzesCount");
    if (quizCount) quizCount.textContent = (student.quizHistory || []).length;

    // Populate quiz history
    populateQuizHistory(id, grade);

    document.getElementById("studentAHeader").style.display = "block";
    document.getElementById("studentAEmpty").style.display = "none";
    document.getElementById("studentAContent").style.display = "block";

    if (!stayOnPage) openPage("student-a", document.querySelectorAll(".nav-item")[3]);
}

/* ----- External quiz result intake (from quiz.html submissions) -----
   A "result record" looks like:
   { timestamp, studentName, studentGrade, studentBatch, quizTitle,
     quizGrade, quizTopic, score, correctCount, totalQuestions, answers }
   Records can arrive via:
     1. localStorage key "edumetric_external_quiz_results" (same-browser sync)
     2. a postMessage from a quiz.html window/tab the teacher still controls
     3. a pasted "Result Code" (base64 of a single record) from a student
        who took the quiz on a different device
   All three funnel into applyExternalQuizResult(), which finds-or-creates
   the matching student (by name + grade + batch) and appends to their
   quiz history — directly powering Students → Students Progress. */

function normName(s) { return String(s || "").trim().toLowerCase(); }

function findOrCreateStudentForResult(record) {
    const grade = record.studentGrade;
    if (!grade || !GRADE_ORDER.includes(grade)) return null;
    if (!state.students[grade]) state.students[grade] = [];

    const name = (record.studentName || "").trim();
    const batch = (record.studentBatch || "").trim();
    if (!name) return null;

    let student = state.students[grade].find(s =>
        normName(s.name) === normName(name) &&
        (!batch || !s.batch || normName(s.batch) === normName(batch))
    );

    if (!student) {
        student = {
            id: grade + "-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
            name: name,
            grade: grade,
            batch: batch || "—",
            phone: "",
            score: null,
            gpa: null,
            quizHistory: []
        };
        state.students[grade].push(student);
    }
    return student;
}

/* Apply one external result record to state. Returns true if it was new. */
function applyExternalQuizResult(record) {
    if (!record) return false;
    const hasScore = typeof record.score === "number";
    const hasShortAnswers = typeof record.shortAnswerCount === "number" && record.shortAnswerCount > 0;
    // A result needs either a numeric score or at least one short-answer
    // response to be worth recording — otherwise there's nothing to show.
    if (!hasScore && !hasShortAnswers) return false;

    const student = findOrCreateStudentForResult(record);
    if (!student) return false;

    if (!student.quizHistory) student.quizHistory = [];
    const exists = student.quizHistory.some(qh =>
        qh.timestamp === record.timestamp && qh.quizTitle === record.quizTitle
    );
    if (exists) return false;

    student.quizHistory.push({
        timestamp: record.timestamp,
        quizTitle: record.quizTitle,
        quizDifficulty: record.quizDifficulty || "medium",
        date: new Date(record.timestamp).toLocaleDateString(),
        score: hasScore ? record.score : null,
        correctCount: record.correctCount,
        gradableCount: record.gradableCount,
        shortAnswerCount: record.shortAnswerCount || 0,
        totalQuestions: record.totalQuestions,
        status: !hasScore ? "Pending Review" : record.score >= 70 ? "Passed" : "Needs Review"
    });

    const scores = student.quizHistory.map(qh => qh.score).filter(s => typeof s === "number");
    if (scores.length) {
        student.score = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    }
    return true;
}

/* Pull every pending record out of the localStorage sync key (same-browser
   path) and apply them all. Safe to call often — already-applied records
   are skipped via the timestamp+title check above. */
function syncAllExternalQuizResults() {
    const gradeSyncKey = "edumetric_external_quiz_results";
    let appliedAny = false;
    try {
        const stored = localStorage.getItem(gradeSyncKey);
        if (!stored) return false;
        const results = JSON.parse(stored);
        if (!Array.isArray(results)) return false;
        results.forEach(record => {
            if (applyExternalQuizResult(record)) appliedAny = true;
        });
        if (appliedAny) saveState();
    } catch (e) {
        console.warn("Could not sync external quiz results:", e);
    }
    return appliedAny;
}

/* Listen for live postMessage submissions from a quiz.html window/tab the
   teacher launched and still has open (e.g. a preview link). */
window.addEventListener("message", function (e) {
    try {
        if (e.data && e.data.type === "quizSubmitted" && e.data.result) {
            const applied = applyExternalQuizResult(e.data.result);
            if (applied) {
                saveState();
                refreshAll();
            }
        }
    } catch (err) {
        console.warn("Could not process quiz submission message:", err);
    }
});

/* "Import Result Code" — paste a code a student copied from quiz.html
   after finishing it on a different device. */
function importResultCode() {
    const input = document.getElementById("resultCodeInput");
    if (!input) return;
    const raw = input.value.trim();
    if (!raw) { alert("Paste a result code first."); return; }
    try {
        const json = decodeURIComponent(escape(atob(raw)));
        const record = JSON.parse(json);
        const applied = applyExternalQuizResult(record);
        if (applied) {
            saveState();
            refreshAll();
            input.value = "";
            alert(`✓ Imported result for ${record.studentName} (${record.score}%) into Student Progress.`);
        } else {
            alert("This result was already imported, or the code is missing required fields (name/grade/score).");
        }
    } catch (e) {
        alert("That doesn't look like a valid result code. Make sure you copied the entire code.");
    }
}

/* Populate quiz history table for selected student */
function populateQuizHistory(studentId, studentGrade) {
    const student = state.students[studentGrade].find(s => s.id === studentId);
    if (!student || !student.quizHistory) {
        document.getElementById("studentQuizHistory").innerHTML = 
            `<tr><td colspan="4" style="text-align: center; color: var(--on-surface-variant);">No quizzes completed yet</td></tr>`;
        return;
    }
    
    // Sort by date, most recent first
    const sorted = (student.quizHistory || []).sort((a, b) => 
        new Date(b.timestamp || b.date) - new Date(a.timestamp || a.date)
    );
    
    const html = sorted.map(qh => `
        <tr>
            <td>${escapeHtml(qh.quizTitle || "Quiz")}</td>
            <td>${qh.date || new Date(qh.timestamp).toLocaleDateString()}</td>
            <td><strong style="color: ${qh.score >= 70 ? 'var(--success)' : 'var(--error)'}">${qh.score}%</strong></td>
            <td>
                <span style="padding: 4px 8px; border-radius: 4px; font-size: 12px; background: ${qh.score >= 70 ? 'rgba(0,200,83,0.2)' : 'rgba(255,180,171,0.2)'};">
                    ${qh.status || (qh.score >= 70 ? 'Passed' : 'Needs Review')}
                </span>
            </td>
        </tr>
    `).join("");
    
    document.getElementById("studentQuizHistory").innerHTML = html;
}

function buildInsight(student) {
    if (typeof student.score !== "number") {
        return `${student.name} has not been assessed yet. Generate a quiz or study materials below to get started.`;
    }
    if (student.score >= 85) return `${student.name} is performing exceptionally well (${student.score}%). Consider advanced enrichment materials.`;
    if (student.score >= 70) return `${student.name} is making steady progress (${student.score}%). Targeted practice problems can push them further.`;
    return `${student.name} needs additional support (${student.score}%). A study guide and guided practice are recommended.`;
}

/* ====================== QUIZ — CREATE ========================= */
/* ============= CREATE QUIZ — difficulty, textbook, notes ============= */

function setQuizDifficulty(level) {
    currentQuizDifficulty = level;
    const meter = document.getElementById("difficultyMeter");
    if (meter) {
        meter.dataset.value = level;
        meter.querySelectorAll(".diff-btn").forEach(btn => {
            btn.classList.toggle("active", btn.dataset.level === level);
        });
    }
}

function difficultyLabel(level) {
    return { easy: "🟢 Easy", medium: "🟡 Medium", hard: "🔴 Hard" }[level] || "🟡 Medium";
}

const MAX_TEXTBOOK_CHARS = 50000; // keep saved-quiz payloads (and share links) reasonable

/* Handle a .txt or .pdf upload for the Create Quiz "Textbook / Source
   Material" field. Extracted text is attached to the quiz as reference
   material — it is NOT sent anywhere or used to auto-generate questions,
   since this is a static site with no backend/AI service. Questions still
   come from the curated ELA bank. */
function handleTextbookUpload(evt) {
    const file = evt.target.files && evt.target.files[0];
    const statusEl = document.getElementById("textbookStatus");
    if (!file) return;

    const isPdf = /\.pdf$/i.test(file.name) || file.type === "application/pdf";
    const isTxt = /\.txt$/i.test(file.name) || file.type === "text/plain";

    if (!isPdf && !isTxt) {
        alert("Please upload a .txt or .pdf file.");
        evt.target.value = "";
        return;
    }

    statusEl.textContent = "Reading " + file.name + "...";

    if (isTxt) {
        const reader = new FileReader();
        reader.onload = () => applyTextbookText(file.name, String(reader.result || ""));
        reader.onerror = () => {
            alert("Could not read that .txt file. Please try again.");
            statusEl.textContent = "Accepts .txt or .pdf. Attached as reference material for this quiz — shown to students on the quiz link and printed on the PDF so they know what to study from.";
        };
        reader.readAsText(file);
        return;
    }

    // PDF path — extract text client-side with pdf.js.
    if (typeof pdfjsLib === "undefined") {
        alert("PDF reading isn't available right now (the PDF library didn't load — check your internet connection). Try a .txt file instead.");
        evt.target.value = "";
        statusEl.textContent = "Accepts .txt or .pdf. Attached as reference material for this quiz — shown to students on the quiz link and printed on the PDF so they know what to study from.";
        return;
    }
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

    const reader = new FileReader();
    reader.onload = async () => {
        try {
            const typedArray = new Uint8Array(reader.result);
            const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
            let fullText = "";
            const pageLimit = Math.min(pdf.numPages, 60); // keep extraction snappy for huge textbooks
            for (let i = 1; i <= pageLimit; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                fullText += content.items.map(it => it.str).join(" ") + "\n\n";
                statusEl.textContent = `Reading ${file.name}... (page ${i} of ${pageLimit}${pdf.numPages > pageLimit ? "+" : ""})`;
            }
            if (pdf.numPages > pageLimit) {
                fullText += `\n[Note: only the first ${pageLimit} of ${pdf.numPages} pages were read.]`;
            }
            applyTextbookText(file.name, fullText);
        } catch (e) {
            console.error("PDF extraction failed:", e);
            alert("Could not read that PDF. It may be a scanned/image-only PDF (no selectable text), password-protected, or corrupted. Try a .txt file instead.");
            evt.target.value = "";
            statusEl.textContent = "Accepts .txt or .pdf. Attached as reference material for this quiz — shown to students on the quiz link and printed on the PDF so they know what to study from.";
        }
    };
    reader.onerror = () => {
        alert("Could not read that PDF file. Please try again.");
        statusEl.textContent = "Accepts .txt or .pdf. Attached as reference material for this quiz — shown to students on the quiz link and printed on the PDF so they know what to study from.";
    };
    reader.readAsArrayBuffer(file);
}

function applyTextbookText(fileName, rawText) {
    let text = (rawText || "").replace(/\s+/g, " ").trim();
    let truncated = false;
    if (text.length > MAX_TEXTBOOK_CHARS) {
        text = text.slice(0, MAX_TEXTBOOK_CHARS);
        truncated = true;
    }
    if (!text) {
        alert("That file didn't contain any readable text (it may be a scanned image). Try a .txt file or a different PDF.");
        document.getElementById("textbookUpload").value = "";
        document.getElementById("textbookStatus").textContent = "Accepts .txt or .pdf. Attached as reference material for this quiz — shown to students on the quiz link and printed on the PDF so they know what to study from.";
        return;
    }
    currentTextbook = { fileName, text };
    document.getElementById("textbookStatus").textContent = "Accepts .txt or .pdf. Attached as reference material for this quiz — shown to students on the quiz link and printed on the PDF so they know what to study from.";
    document.getElementById("textbookFileName").textContent = "📄 " + fileName;
    document.getElementById("textbookCharCount").textContent =
        text.length.toLocaleString() + " characters extracted" + (truncated ? " (truncated to keep the quiz link a reasonable size)" : "");
    document.getElementById("textbookPreview").style.display = "block";
}

function removeTextbook() {
    currentTextbook = null;
    document.getElementById("textbookUpload").value = "";
    document.getElementById("textbookPreview").style.display = "none";
}

function populateQuizTopics() {
    fillTopicSelect(document.getElementById("quizTopic"), document.getElementById("quizGrade").value);
}

function generateQuestions() {
    const title = document.getElementById("quizTitle").value.trim();
    const grade = document.getElementById("quizGrade").value;
    const topic = document.getElementById("quizTopic").value;
    const numQ = Math.max(1, Math.min(parseInt(document.getElementById("numQuestions").value, 10) || 5, 100));
    const wantMcq = document.getElementById("mcqCheck").checked;
    const wantFill = document.getElementById("fillCheck").checked;
    const wantShort = document.getElementById("shortAnswerCheck").checked;

    if (!title) { alert("Please enter a quiz title!"); return; }
    if (!grade) { alert("Please select a grade level."); return; }
    if (!topic) { alert("Please select an ELA topic."); return; }
    if (!wantMcq && !wantFill && !wantShort) { alert("Select at least one question type."); return; }

    const questions = getQuestionsFor(grade, topic, numQ);
    if (!questions.length) { alert("No questions available for that selection."); return; }

    // Build the cycle of requested types in a stable, readable order so a
    // mixed-type quiz alternates evenly rather than clustering by chance.
    const typeCycle = [];
    if (wantMcq) typeCycle.push("mcq");
    if (wantFill) typeCycle.push("fill");
    if (wantShort) typeCycle.push("short");

    let html = "";
    questions.forEach((item, i) => {
        const qType = typeCycle[i % typeCycle.length];
        const correctText = item.options[item.answer];

        if (qType === "fill") {
            html += `
                <div class="question-editor" data-type="fill">
                    <h5>Question ${i + 1} — Fill in the Blank</h5>
                    <textarea class="q-text" rows="2">${escapeHtml(item.q)}</textarea>
                    <label style="font-size:12px;color:var(--on-surface-variant);display:block;margin-top:6px;">Correct Answer:</label>
                    <input type="text" class="q-fill-answer answer-correct" value="${escapeHtml(correctText)}">
                    <button class="btn-small" onclick="this.parentElement.remove()" style="margin-top:8px;">Delete</button>
                </div>`;
        } else if (qType === "short") {
            html += `
                <div class="question-editor" data-type="short">
                    <h5>Question ${i + 1} — Short Answer</h5>
                    <textarea class="q-text" rows="2">${escapeHtml(item.q)}</textarea>
                    <label style="font-size:12px;color:var(--on-surface-variant);display:block;margin-top:6px;">Sample / Model Answer (for grading reference — not auto-graded):</label>
                    <textarea class="q-short-answer answer-correct" rows="2">${escapeHtml(correctText)}</textarea>
                    <button class="btn-small" onclick="this.parentElement.remove()" style="margin-top:8px;">Delete</button>
                </div>`;
        } else {
            const opts = item.options.map((o, oi) =>
                `<input type="text" class="q-opt" data-opt="${oi}" value="${escapeHtml(o)}" style="margin-bottom:6px;">`
            ).join("");
            html += `
                <div class="question-editor" data-type="mcq">
                    <h5>Question ${i + 1} — Multiple Choice</h5>
                    <textarea class="q-text" rows="2">${escapeHtml(item.q)}</textarea>
                    <label style="font-size:12px;color:var(--on-surface-variant);display:block;margin-top:6px;">Answer Choices:</label>
                    ${opts}
                    <label style="font-size:12px;color:var(--on-surface-variant);display:block;">Correct Answer (A/B/C/D):</label>
                    <input type="text" class="q-correct answer-correct" maxlength="1" value="${letter(item.answer)}">
                    <button class="btn-small" onclick="this.parentElement.remove()" style="margin-top:8px;">Delete</button>
                </div>`;
        }
    });

    document.getElementById("questionsContainer").innerHTML = html;
    document.getElementById("questionsSection").style.display = "block";
    document.getElementById("questionsSection").dataset.grade = grade;
    document.getElementById("questionsSection").dataset.topic = topic;
    document.getElementById("questionsSection").scrollIntoView({ behavior: "smooth" });
}

function collectQuizFromEditor(title, grade, topic) {
    const questions = [];
    document.querySelectorAll("#questionsContainer .question-editor").forEach(ed => {
        const type = ed.dataset.type;
        const q = ed.querySelector(".q-text").value.trim();
        if (!q) return;
        if (type === "fill") {
            questions.push({ type: "fill", q, answer: ed.querySelector(".q-fill-answer").value.trim() });
        } else if (type === "short") {
            questions.push({ type: "short", q, answer: ed.querySelector(".q-short-answer").value.trim() });
        } else {
            const options = Array.from(ed.querySelectorAll(".q-opt")).map(i => i.value.trim()).filter(Boolean);
            const corr = (ed.querySelector(".q-correct").value.trim().toUpperCase() || "A");
            const answerIndex = Math.max(0, ["A", "B", "C", "D", "E", "F"].indexOf(corr));
            questions.push({ type: "mcq", q, options, answer: answerIndex });
        }
    });
    const notes = (document.getElementById("quizNotes").value || "").trim();
    return {
        id: "quiz-" + Date.now(),
        title,
        grade,
        topic,
        questions,
        difficulty: currentQuizDifficulty,
        notes: notes,
        textbook: currentTextbook ? { fileName: currentTextbook.fileName, text: currentTextbook.text } : null
    };
}

function saveQuiz() {
    const title = document.getElementById("quizTitle").value.trim() || "Untitled Quiz";
    const grade = document.getElementById("questionsSection").dataset.grade || "";
    const topic = document.getElementById("questionsSection").dataset.topic || "";
    const quiz = collectQuizFromEditor(title, grade, topic);
    if (!quiz.questions.length) { alert("Add at least one question before saving."); return; }

    state.savedQuizzes.push(quiz);
    quizzesCreated = state.savedQuizzes.length;
    saveState();
    updateDashboard();
    updateSavedQuizzesList();

    alert("✓ Quiz saved with answers successfully!");
    document.getElementById("questionsSection").style.display = "none";
    document.getElementById("quizTitle").value = "";
    document.getElementById("questionsContainer").innerHTML = "";
    document.getElementById("quizNotes").value = "";
    removeTextbook();
    setQuizDifficulty("medium");
}

function updateSavedQuizzesList() {
    const el = document.getElementById("savedQuizzesList");
    if (!state.savedQuizzes.length) {
        el.innerHTML = `<div class="empty-state" style="padding:20px;">No saved quizzes yet. Create one in the <strong>Create Quiz</strong> tab.</div>`;
        return;
    }
    el.innerHTML = state.savedQuizzes.map(q => `
        <div class="quiz-pick-item" style="cursor:default;">
            <div>
                <h4>${escapeHtml(q.title)} <span class="difficulty-badge ${q.difficulty || 'medium'}">${difficultyLabel(q.difficulty || 'medium')}</span></h4>
                <p>${q.grade ? gradeLabel(q.grade) + " • " : ""}${escapeHtml(q.topic === "__ALL__" ? "All Topics" : q.topic)} • ${q.questions.length} questions${q.textbook ? ' • 📄 ' + escapeHtml(q.textbook.fileName) : ''}</p>
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <button class="btn-small" onclick="hostQuiz('${q.id}')">🔗 Host Link</button>
                <button class="btn-small" onclick="printSpecificQuiz('${q.id}')">🖨 PDF</button>
                <button class="btn-small" onclick="deleteQuiz('${q.id}')">🗑 Delete</button>
            </div>
        </div>`).join("");
}

function deleteQuiz(id) {
    if (!confirm("Delete this quiz?")) return;
    state.savedQuizzes = state.savedQuizzes.filter(q => q.id !== id);
    quizzesCreated = state.savedQuizzes.length;
    saveState();
    updateSavedQuizzesList();
    updateDashboard();
}

/* ============= QUIZ — HOST (external link) & PRINT ============= */
/* Both flows first prompt the teacher to pick a quiz. */
function launchPlatform() {
    pickQuiz(
        "Select a Quiz to Host",
        "Choose which quiz you want to generate a shareable external link for.",
        hostQuiz
    );
}
function printQuiz() {
    pickQuiz(
        "Select a Quiz to Print",
        "Choose which quiz you want to export as a high-quality printable PDF.",
        printSpecificQuiz
    );
}

function pickQuiz(title, subtitle, callback) {
    if (!state.savedQuizzes.length) {
        alert("You have no saved quizzes yet. Create and save a quiz first.");
        return;
    }
    document.getElementById("quizPickerTitle").textContent = title;
    document.getElementById("quizPickerSubtitle").textContent = subtitle;
    const list = document.getElementById("quizPickerList");
    list.innerHTML = state.savedQuizzes.map(q => `
        <div class="quiz-pick-item" onclick="__quizPicked('${q.id}')">
            <div>
                <h4>${escapeHtml(q.title)} <span class="difficulty-badge ${q.difficulty || 'medium'}">${difficultyLabel(q.difficulty || 'medium')}</span></h4>
                <p>${q.grade ? gradeLabel(q.grade) + " • " : ""}${escapeHtml(q.topic === "__ALL__" ? "All Topics" : q.topic)} • ${q.questions.length} questions</p>
            </div>
            <span class="material-symbols-outlined">chevron_right</span>
        </div>`).join("");
    window.__quizPicked = function (id) {
        closeModal("quizPickerModal");
        callback(id);
    };
    document.getElementById("quizPickerModal").classList.add("active");
}

function getQuiz(id) { return state.savedQuizzes.find(q => q.id === id); }

const SHARE_LINK_TEXTBOOK_EXCERPT_CHARS = 2000; // keep the share-link URL a reasonable, messageable size

/* Build a self-contained, shareable URL to the student quiz player. */
function hostQuiz(id) {
    const quiz = getQuiz(id);
    if (!quiz) return;
    const payload = {
        title: quiz.title,
        grade: quiz.grade,
        topic: quiz.topic,
        questions: quiz.questions,
        difficulty: quiz.difficulty || "medium",
        notes: quiz.notes || ""
    };
    let textbookTrimmed = false;
    if (quiz.textbook && quiz.textbook.text) {
        let excerpt = quiz.textbook.text;
        if (excerpt.length > SHARE_LINK_TEXTBOOK_EXCERPT_CHARS) {
            excerpt = excerpt.slice(0, SHARE_LINK_TEXTBOOK_EXCERPT_CHARS);
            textbookTrimmed = true;
        }
        payload.textbook = { fileName: quiz.textbook.fileName, excerpt: excerpt, trimmed: textbookTrimmed };
    }
    // URL-safe base64 of the JSON payload.
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    // Build the base URL more robustly using URL API
    const currentUrl = new URL(location.href);
    const base = currentUrl.origin + currentUrl.pathname.replace(/index\.html$/, "").replace(/\/$/, "") + "/";
    pendingShareUrl = base + "quiz.html#data=" + encoded;

    if (pendingShareUrl.length > 60000) {
        alert("This quiz link is very large (" + quiz.questions.length + " questions) and may not work in every browser or messaging app. Consider splitting it into smaller quizzes if students have trouble opening the link.");
    }

    document.getElementById("shareQuizName").textContent = `Quiz: ${quiz.title} (${quiz.questions.length} questions, ${difficultyLabel(quiz.difficulty || 'medium')})`;
    document.getElementById("shareLinkInput").value = pendingShareUrl;
    document.getElementById("copySuccess").classList.remove("show");
    document.getElementById("shareLinkModal").classList.add("active");
}

function copyShareLink() {
    const input = document.getElementById("shareLinkInput");
    input.select();
    input.setSelectionRange(0, 99999);
    const done = () => document.getElementById("copySuccess").classList.add("show");
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(input.value).then(done).catch(() => { document.execCommand("copy"); done(); });
    } else {
        document.execCommand("copy");
        done();
    }
}

function openShareLink() {
    if (pendingShareUrl) window.open(pendingShareUrl, "_blank");
}

/* High-quality printable PDF (opens print dialog → Save as PDF). */
function printSpecificQuiz(id) {
    const quiz = getQuiz(id);
    if (!quiz) return;
    const win = window.open("", "_blank");
    if (!win) { alert("Please allow pop-ups to print/download the quiz as a PDF."); return; }

    const difficulty = quiz.difficulty || "medium";
    const diffColors = { easy: "#0a8a3c", medium: "#a87a00", hard: "#c0392b" };

    const questionsHtml = quiz.questions.map((q, i) => {
        if (q.type === "fill") {
            return `<div class="q">
                <p class="qt"><b>${i + 1}.</b> ${escapeHtml(q.q.replace(/_{2,}/, "______________"))}</p>
                <p class="line">Answer: ____________________________</p>
            </div>`;
        }
        if (q.type === "short") {
            return `<div class="q">
                <p class="qt"><b>${i + 1}.</b> ${escapeHtml(q.q)}</p>
                <div class="short-lines">
                    <p class="line">____________________________________________</p>
                    <p class="line">____________________________________________</p>
                    <p class="line">____________________________________________</p>
                </div>
            </div>`;
        }
        const opts = (q.options || []).map((o, oi) =>
            `<li><span class="opt">${letter(oi)}.</span> ${escapeHtml(o)}</li>`).join("");
        return `<div class="q">
            <p class="qt"><b>${i + 1}.</b> ${escapeHtml(q.q)}</p>
            <ol class="opts" type="A">${opts}</ol>
        </div>`;
    }).join("");

    const answerKey = quiz.questions.map((q, i) => {
        let ans;
        if (q.type === "fill") ans = q.answer;
        else if (q.type === "short") ans = "(Sample answer) " + q.answer;
        else ans = `${letter(q.answer)}. ${q.options[q.answer] || ""}`;
        return `<li><b>${i + 1}.</b> ${escapeHtml(ans)}</li>`;
    }).join("");

    const referenceHtml = (quiz.notes || quiz.textbook) ? `
        <div class="reference">
            <h2>📚 Study Reference</h2>
            ${quiz.textbook ? `<p class="ref-source"><b>Source material:</b> ${escapeHtml(quiz.textbook.fileName)}</p>` : ""}
            ${quiz.notes ? `<p class="ref-notes"><b>Section focus / notes:</b> ${escapeHtml(quiz.notes)}</p>` : ""}
        </div>` : "";

    win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8">
        <title>${escapeHtml(quiz.title)}</title>
        <style>
            @page { margin: 2cm; }
            body { font-family: Georgia, 'Times New Roman', serif; color: #111; line-height: 1.5; max-width: 800px; margin: 0 auto; padding: 24px; }
            h1 { font-size: 22px; margin: 0 0 4px; display: inline-block; }
            .diff-pill { display: inline-block; margin-left: 10px; padding: 3px 10px; border-radius: 14px; font-size: 11px; font-weight: bold; color: #fff; vertical-align: middle; background: ${diffColors[difficulty] || diffColors.medium}; }
            .meta { color: #555; font-size: 13px; margin-bottom: 8px; }
            .info { display: flex; justify-content: space-between; border-bottom: 2px solid #222; padding-bottom: 10px; margin-bottom: 18px; font-size: 13px; }
            .reference { background: #f4f4f0; border: 1px solid #ccc; border-radius: 6px; padding: 12px 16px; margin-bottom: 20px; font-size: 12.5px; page-break-inside: avoid; }
            .reference h2 { font-size: 14px; margin: 0 0 8px; }
            .reference p { margin: 4px 0; }
            .ref-source { color: #333; }
            .q { margin-bottom: 16px; page-break-inside: avoid; }
            .qt { margin: 0 0 6px; font-size: 15px; }
            .opts { margin: 4px 0 0 8px; }
            .opts li { margin: 3px 0; list-style: none; }
            .opt { font-weight: bold; margin-right: 6px; }
            .line { color: #333; margin: 6px 0 0; }
            .short-lines .line { margin: 10px 0 0; }
            .key { margin-top: 28px; border-top: 2px dashed #888; padding-top: 14px; page-break-before: always; }
            .key h2 { font-size: 16px; }
            .key ol, .key ul { columns: 2; list-style: none; padding: 0; font-size: 13px; }
            .footer { margin-top: 30px; font-size: 11px; color: #888; text-align: center; }
            .noprint { text-align: center; margin-top: 20px; }
            .noprint button { padding: 10px 20px; font-size: 14px; cursor: pointer; border-radius: 6px; border: 1px solid #888; background: #fff; }
            .noprint button:hover { background: #eee; }
            @media print { .noprint { display: none; } }
        </style></head><body>
        <h1>${escapeHtml(quiz.title)}</h1><span class="diff-pill">${difficultyLabel(difficulty).replace(/^[^ ]+ /, "")}</span>
        <div class="meta">English / Language Arts${quiz.grade ? " — " + gradeLabel(quiz.grade) : ""}${quiz.topic && quiz.topic !== "__ALL__" ? " — " + escapeHtml(quiz.topic) : ""}</div>
        <div class="info"><span>Name: ____________________</span><span>Date: ____________</span><span>Score: ______ / ${quiz.questions.length}</span></div>
        ${referenceHtml}
        ${questionsHtml}
        <div class="key"><h2>Answer Key</h2><ul>${answerKey}</ul></div>
        <div class="footer">Generated by EduMetric • Teacher Dashboard</div>
        <div class="noprint">
            <button onclick="window.print()">🖨 Print / Save as PDF</button>
        </div>
        </body></html>`);
    win.document.close();

    // Wait for the new window/tab to finish laying out before invoking print,
    // so the "Save as PDF" dialog opens against fully-rendered content
    // (avoids blank/partial pages on slower devices) — smooth & seamless.
    const triggerPrint = () => { try { win.focus(); win.print(); } catch (e) { /* pop-up blocked mid-flow; user can still click the on-page button */ } };
    if (win.document.readyState === "complete") {
        setTimeout(triggerPrint, 250);
    } else {
        win.addEventListener("load", () => setTimeout(triggerPrint, 150));
        setTimeout(triggerPrint, 800); // fallback in case 'load' doesn't fire
    }
}

/* ===================== SEND RESULTS ========================== */
function loadGradeStudents() {
    const grade = document.getElementById("gradeSelect").value;
    const el = document.getElementById("gradeStudentsList");
    if (!grade) { el.innerHTML = ""; return; }
    const list = state.students[grade] || [];
    if (!list.length) {
        el.innerHTML = `<div class="empty-state" style="padding:16px;">No students in ${gradeLabel(grade)} yet.</div>`;
        return;
    }
    el.innerHTML = list.map(s => `
        <div class="student-item" style="cursor:default;">
            <div class="student-info">
                <h4>${escapeHtml(s.name)}</h4>
                <p>Batch ${escapeHtml(s.batch)} • 📱 ${escapeHtml(s.phone)} • ${typeof s.score === "number" ? s.score + "%" : "No score"}</p>
            </div>
        </div>`).join("");
}

function sendSMS() {
    const grade = document.getElementById("gradeSelect").value;
    if (!grade) { alert("Select a grade first!"); return; }
    if (!(state.students[grade] || []).length) { alert("No students in this grade to notify."); return; }
    const msg = document.getElementById("smsSuccess");
    msg.classList.add("show");
    setTimeout(() => msg.classList.remove("show"), 3000);
}

/* ==================== STUDENT A — QUIZ ======================= */
function populateStudentQuizTopics() {
    fillTopicSelect(document.getElementById("studentQuizTopic"), document.getElementById("studentQuizGrade").value);
}

function createStudentQuiz() {
    const grade = document.getElementById("studentQuizGrade").value;
    const topic = document.getElementById("studentQuizTopic").value;
    const numQ = parseInt(document.getElementById("studentNumQuestions").value, 10) || 5;
    if (!grade || !topic) { alert("Select a grade and topic first."); return; }

    const questions = getQuestionsFor(grade, topic, numQ).map(item => ({
        type: "mcq", q: item.q, options: item.options, answer: item.answer
    }));
    if (!questions.length) { alert("No questions available."); return; }

    const studentName = selectedStudentId
        ? (state.students[selectedStudentGrade].find(s => s.id === selectedStudentId) || {}).name
        : "Student";
    const title = `${gradeLabel(grade)} ${topic === "__ALL__" ? "ELA" : topic} Quiz — ${studentName}`;
    state.savedQuizzes.push({ id: "quiz-" + Date.now(), title, grade, topic, questions });
    quizzesCreated = state.savedQuizzes.length;
    saveState();
    updateDashboard();
    updateSavedQuizzesList();
    alert(`✓ Quiz created and saved!\n\n"${title}"\n\nFind it under Quiz → Taking The Quiz to host or print.`);
}

/* ============== STUDENT A — MATERIAL GENERATOR =============== */
function populateMaterialTopics() {
    fillTopicSelect(document.getElementById("materialTopic"), document.getElementById("materialGrade").value, { includeMixed: false });
}

function generateMaterial() {
    const grade = document.getElementById("materialGrade").value;
    const topic = document.getElementById("materialTopic").value;
    const type = document.getElementById("materialType").value;
    if (!grade || !topic) { alert("Select a grade and topic for the material."); return; }

    const items = (ELA_QUIZ_BANK[grade].topics[topic] || []).slice();
    if (!items.length) { alert("No content available for that topic."); return; }

    const studentName = selectedStudentId
        ? (state.students[selectedStudentGrade].find(s => s.id === selectedStudentId) || {}).name
        : null;

    const built = buildMaterial(type, grade, topic, items, studentName);
    lastMaterial = built;

    document.getElementById("materialTitle").textContent = built.title;
    document.getElementById("materialContent").innerHTML = built.html;
    document.getElementById("generatedMaterial").style.display = "block";
    document.getElementById("generatedMaterial").scrollIntoView({ behavior: "smooth" });
}

/* Turn a Q/A item into a clean declarative fact. */
function toFact(item) {
    const ans = item.options[item.answer];
    if (/_{2,}/.test(item.q)) return item.q.replace(/_{2,}/, ans);
    return item.q.replace(/\?$/, "") + " — " + ans;
}

function buildMaterial(type, grade, topic, items, studentName) {
    const header = `${type}: ${topic}`;
    const sub = `${gradeLabel(grade)} • English / Language Arts${studentName ? " • Prepared for " + studentName : ""}`;
    let html = "", text = `${header}\n${sub}\n${"=".repeat(header.length)}\n\n`;

    if (type === "Flashcards") {
        html += `<p>${escapeHtml(sub)}</p><p>Review each card: read the front, recall the answer, then check the back.</p>`;
        items.forEach((it, i) => {
            const ans = it.options[it.answer];
            html += `<div class="flashcard"><div class="front">Card ${i + 1}: ${escapeHtml(it.q)}</div><div class="back">↳ ${escapeHtml(ans)}</div></div>`;
            text += `Card ${i + 1}\n  Front: ${it.q}\n  Back:  ${ans}\n\n`;
        });
    } else if (type === "Practice Problems") {
        html += `<p>${escapeHtml(sub)}</p><ol>`;
        items.forEach(it => {
            html += `<li style="margin-bottom:10px;">${escapeHtml(it.q)}<ul style="list-style:none;padding-left:8px;margin-top:4px;">` +
                it.options.map((o, oi) => `<li>${letter(oi)}. ${escapeHtml(o)}</li>`).join("") + `</ul></li>`;
        });
        html += `</ol><h6>Answer Key</h6><ol>` +
            items.map(it => `<li>${letter(it.answer)}. ${escapeHtml(it.options[it.answer])}</li>`).join("") + `</ol>`;
        text += "PRACTICE PROBLEMS\n";
        items.forEach((it, i) => {
            text += `${i + 1}. ${it.q}\n` + it.options.map((o, oi) => `   ${letter(oi)}. ${o}`).join("\n") + "\n\n";
        });
        text += "ANSWER KEY\n" + items.map((it, i) => `${i + 1}. ${letter(it.answer)}. ${it.options[it.answer]}`).join("\n") + "\n";
    } else if (type === "Summary Notes") {
        html += `<p>${escapeHtml(sub)}</p><h6>Key Points</h6><ul>`;
        items.forEach(it => { html += `<li>${escapeHtml(toFact(it))}</li>`; });
        html += `</ul>`;
        text += "KEY POINTS\n" + items.map(it => "• " + toFact(it)).join("\n") + "\n";
    } else { // Study Guide
        html += `<p>${escapeHtml(sub)}</p>`;
        html += `<h6>Overview</h6><p>This study guide covers the core concepts of <strong>${escapeHtml(topic)}</strong> for ${escapeHtml(gradeLabel(grade))}. Read each concept, then test yourself with the review questions.</p>`;
        html += `<h6>Key Concepts</h6><ul>`;
        items.forEach(it => { html += `<li>${escapeHtml(toFact(it))}</li>`; });
        html += `</ul><h6>Key Terms</h6><ul>`;
        items.forEach(it => { html += `<li><strong>${escapeHtml(it.options[it.answer])}</strong></li>`; });
        html += `</ul><h6>Review Questions</h6><ol>`;
        items.forEach(it => { html += `<li>${escapeHtml(it.q)} <em>(Answer: ${escapeHtml(it.options[it.answer])})</em></li>`; });
        html += `</ol>`;

        text += "OVERVIEW\nThis study guide covers " + topic + " for " + gradeLabel(grade) + ".\n\n";
        text += "KEY CONCEPTS\n" + items.map(it => "• " + toFact(it)).join("\n") + "\n\n";
        text += "KEY TERMS\n" + items.map(it => "• " + it.options[it.answer]).join("\n") + "\n\n";
        text += "REVIEW QUESTIONS\n" + items.map((it, i) => `${i + 1}. ${it.q}\n   Answer: ${it.options[it.answer]}`).join("\n") + "\n";
    }

    return { title: header, subtitle: sub, html, text };
}

function materialFilename(ext) {
    const base = (lastMaterial ? lastMaterial.title : "material").replace(/[^a-z0-9]+/gi, "_").toLowerCase();
    return base + "." + ext;
}

function downloadMaterial(format) {
    if (!lastMaterial) { alert("Generate a material first."); return; }
    if (format === "txt") {
        downloadBlob(materialFilename("txt"), lastMaterial.text, "text/plain;charset=utf-8");
    } else {
        const doc = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${escapeHtml(lastMaterial.title)}</title>
            <style>
                body{font-family:Georgia,'Times New Roman',serif;max-width:760px;margin:0 auto;padding:32px;color:#111;line-height:1.6;}
                h1{font-size:22px;color:#3a3aa0;margin-bottom:2px;}
                .sub{color:#666;font-size:13px;margin-bottom:18px;}
                h6{font-size:15px;color:#b4651a;margin:20px 0 6px;text-transform:uppercase;letter-spacing:.04em;}
                ul,ol{padding-left:22px;} li{margin-bottom:6px;}
                .flashcard{border:1px solid #ccd;border-radius:8px;padding:12px 14px;margin-bottom:10px;}
                .flashcard .front{font-weight:bold;} .flashcard .back{color:#1a7a3a;margin-top:4px;}
                .footer{margin-top:32px;font-size:11px;color:#999;text-align:center;border-top:1px solid #eee;padding-top:10px;}
            </style></head><body>
            <h1>${escapeHtml(lastMaterial.title)}</h1>
            <div class="sub">${escapeHtml(lastMaterial.subtitle)}</div>
            <div>${lastMaterial.html}</div>
            <div class="footer">Generated by EduMetric • Teacher Dashboard</div>
            </body></html>`;
        downloadBlob(materialFilename("html"), doc, "text/html;charset=utf-8");
    }
}

function printMaterial() {
    if (!lastMaterial) { alert("Generate a material first."); return; }
    const win = window.open("", "_blank");
    if (!win) { alert("Please allow pop-ups to print."); return; }
    win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${escapeHtml(lastMaterial.title)}</title>
        <style>
            @page{margin:2cm;}
            body{font-family:Georgia,serif;max-width:760px;margin:0 auto;padding:24px;color:#111;line-height:1.6;}
            h1{font-size:22px;color:#3a3aa0;} .sub{color:#666;font-size:13px;margin-bottom:18px;}
            h6{font-size:15px;color:#b4651a;margin:18px 0 6px;text-transform:uppercase;}
            ul,ol{padding-left:22px;} li{margin-bottom:6px;}
            .flashcard{border:1px solid #ccd;border-radius:8px;padding:12px;margin-bottom:10px;}
            .flashcard .front{font-weight:bold;} .flashcard .back{color:#1a7a3a;margin-top:4px;}
        </style></head><body>
        <h1>${escapeHtml(lastMaterial.title)}</h1><div class="sub">${escapeHtml(lastMaterial.subtitle)}</div>
        <div>${lastMaterial.html}</div></body></html>`);
    win.document.close();
    setTimeout(() => { try { win.focus(); win.print(); } catch (e) {} }, 400);
}

/* ========================= CHAT ============================== */
function appendChat(containerId, text, who) {
    const div = document.getElementById(containerId);
    const msg = document.createElement("div");
    msg.className = "chat-message " + who;
    msg.innerHTML = `<div class="chat-bubble">${escapeHtml(text)}</div>`;
    div.appendChild(msg);
    div.scrollTop = div.scrollHeight;
}

function sendStudentChat() {
    const input = document.getElementById("studentChatInput");
    const msg = input.value.trim();
    if (!msg) return;
    appendChat("studentChat", msg, "user");
    input.value = "";

    // Show typing indicator
    const chatBox = document.getElementById("studentChat");
    const typing = document.createElement("div");
    typing.className = "chat-message ai";
    typing.id = "studentAiTyping";
    typing.innerHTML = `<div class="chat-bubble" style="opacity:0.6;font-style:italic;">AI is thinking…</div>`;
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Build context about selected student
    let studentContext = "";
    if (selectedStudentId && selectedStudentGrade) {
        const s = (state.students[selectedStudentGrade] || []).find(x => x.id === selectedStudentId);
        if (s) {
            studentContext = `The teacher is currently viewing the profile for student: ${s.name}, Grade ${s.grade}, Score: ${typeof s.score === "number" ? s.score + "%" : "not yet scored"}, GPA: ${s.gpa || "N/A"}, Batch: ${s.batch || "N/A"}.`;
        }
    }

    const systemPrompt = `You are the AI Teaching Assistant inside EduMetric, helping a teacher generate targeted study materials for students. ${studentContext}
Your job is to help the teacher create or brainstorm study guides, flashcards, practice problems, essay prompts, summary notes, or any ELA (English Language Arts) learning materials.
Be specific and immediately useful. If they ask for a study guide or practice questions, provide actual content — don't just describe it. Keep responses focused and classroom-ready.`;

    fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "x-api-key": "sk-ant-", // Note: API key will be provided by user
            "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
            model: "claude-sonnet-4-6",
            max_tokens: 400,
            system: systemPrompt,
            messages: [{ role: "user", content: msg }]
        })
    }).then(r => r.json()).then(data => {
        const t = document.getElementById("studentAiTyping");
        if (t) t.remove();
        const text = (data.content || []).map(b => b.text || "").join("").trim();
        appendChat("studentChat", text || "I couldn't generate a response. Please try again.", "ai");
    }).catch(() => {
        const t = document.getElementById("studentAiTyping");
        if (t) t.remove();
        appendChat("studentChat", "Sorry, I couldn't reach the AI right now. You can also generate materials directly in the Materials tab — pick a grade, topic, and material type there.", "ai");
    });
}


function sendDashboardChat() {
    const input = document.getElementById("dashboardChatInput");
    const msg = input.value.trim();
    if (!msg) return;
    appendChat("dashboardChat", msg, "user");
    input.value = "";

    // Show typing indicator
    const chatBox = document.getElementById("dashboardChat");
    const typing = document.createElement("div");
    typing.className = "chat-message ai";
    typing.id = "aiTyping";
    typing.innerHTML = `<div class="chat-bubble" style="opacity:0.6;font-style:italic;">AI is thinking…</div>`;
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;

    generateContextualInsight(msg).then(response => {
        const t = document.getElementById("aiTyping");
        if (t) t.remove();
        appendChat("dashboardChat", response, "ai");
    }).catch(() => {
        const t = document.getElementById("aiTyping");
        if (t) t.remove();
        appendChat("dashboardChat", "Sorry, I couldn't reach the AI right now. Please try again.", "ai");
    });
}

/* Build a rich classroom data snapshot to pass to the AI */
function buildClassroomContext() {
    const students = allStudents();
    const totalStudents = students.length;
    const studentsWithScores = students.filter(s => typeof s.score === "number");
    const avgScore = studentsWithScores.length > 0
        ? Math.round(studentsWithScores.reduce((sum, s) => sum + s.score, 0) / studentsWithScores.length)
        : null;
    const struggling = studentsWithScores.filter(s => s.score < 70).map(s => `${s.name} (${s.score}%)`);
    const topPerformers = studentsWithScores.filter(s => s.score >= 85).map(s => `${s.name} (${s.score}%)`);
    const gradeBreakdown = GRADE_ORDER
        .map(g => ({ grade: gradeLabel(g), count: (state.students[g] || []).length }))
        .filter(x => x.count > 0)
        .map(x => `${x.grade}: ${x.count} student${x.count > 1 ? "s" : ""}`)
        .join(", ");
    const totalQuizzes = state.savedQuizzes.length;
    const quizTitles = state.savedQuizzes.map(q => `"${q.title}" (${gradeLabel(q.grade)}, ${q.topic})`).join("; ");
    const financeTotal = state.financeData.reduce((sum, f) => sum + (f.amount || 0), 0);
    const pendingFinance = state.financeData.filter(f => f.status !== "Paid").reduce((sum, f) => sum + (f.amount || 0), 0);
    const paidCount = state.financeData.filter(f => f.status === "Paid").length;
    const unpaidCount = state.financeData.filter(f => f.status !== "Paid").length;

    const studentRoster = studentsWithScores.length > 0
        ? studentsWithScores.map(s => `${s.name} — Grade ${s.grade}, Score: ${s.score}%, GPA: ${s.gpa || "N/A"}`).join("\n")
        : students.map(s => `${s.name} — Grade ${s.grade}`).join("\n") || "None";

    return `You are the AI Teaching Assistant built into EduMetric, a teacher dashboard used by a real classroom teacher.

REAL CLASSROOM DATA (as of right now):
- Total students: ${totalStudents}
- Students with scores: ${studentsWithScores.length}
- Class average score: ${avgScore !== null ? avgScore + "%" : "No scores yet"}
- Struggling students (below 70%): ${struggling.length > 0 ? struggling.join(", ") : "None"}
- Top performers (85%+): ${topPerformers.length > 0 ? topPerformers.join(", ") : "None"}
- Grade breakdown: ${gradeBreakdown || "No students yet"}
- Student roster:\n${studentRoster}
- Total quizzes created: ${totalQuizzes}
- Quiz list: ${quizTitles || "None created yet"}
- Finance — Total recorded: ₹${financeTotal.toLocaleString("en-IN")}, Pending: ₹${pendingFinance.toLocaleString("en-IN")}, Paid entries: ${paidCount}, Unpaid entries: ${unpaidCount}

INSTRUCTIONS:
- Answer ONLY based on the real data above. Never invent students, scores, or quizzes.
- Be specific: name actual students, quote actual scores, reference actual quizzes.
- If data is missing (e.g., no scores yet), say so honestly and suggest what the teacher should do next.
- Keep responses concise (2–5 sentences), warm, and teacher-friendly.
- Do NOT use markdown headers or bullet lists — write in plain conversational sentences.
- You are talking directly to the teacher who owns this data.`;
}

/* Generate AI insights using the Anthropic API */
async function generateContextualInsight(userQuery) {
    const systemPrompt = buildClassroomContext();

    try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "x-api-key": "sk-ant-", // Note: API key will be provided by user
                "anthropic-version": "2023-06-01"
            },
            body: JSON.stringify({
                model: "claude-sonnet-4-6",
                max_tokens: 300,
                system: systemPrompt,
                messages: [{ role: "user", content: userQuery }]
            })
        });
        if (!response.ok) throw new Error("API error " + response.status);
        const data = await response.json();
        const text = (data.content || []).map(b => b.text || "").join("").trim();
        return text || "I couldn't generate a response right now. Please try again.";
    } catch (err) {
        console.warn("AI API error:", err);
        // Graceful local fallback
        return generateLocalFallback(userQuery);
    }
}

/* Local fallback if API is unavailable — uses real data, no crashes */
function generateLocalFallback(userQuery) {
    const query = userQuery.toLowerCase();
    const students = allStudents();                        // ← renamed to avoid collision
    const totalStudents = students.length;
    const studentsWithScores = students.filter(s => typeof s.score === "number");
    const avgScore = studentsWithScores.length > 0
        ? Math.round(studentsWithScores.reduce((sum, s) => sum + s.score, 0) / studentsWithScores.length)
        : null;
    const struggling = studentsWithScores.filter(s => s.score < 70);
    const topPerformers = studentsWithScores.filter(s => s.score >= 85);
    const totalQuizzes = state.savedQuizzes.length;
    const financeTotal = state.financeData.reduce((sum, f) => sum + (f.amount || 0), 0);
    const pendingFinance = state.financeData.filter(f => f.status !== "Paid").reduce((sum, f) => sum + (f.amount || 0), 0);

    if (query.includes("student") || query.includes("performance") || query.includes("score") || query.includes("average")) {
        if (totalStudents === 0) return "You don't have any students yet. Add them from the Students tab, then assign quiz scores to start tracking.";
        if (avgScore !== null) {
            let msg = `Your class average is ${avgScore}% across ${studentsWithScores.length} student${studentsWithScores.length > 1 ? "s" : ""}. `;
            msg += avgScore >= 80 ? "That's strong performance — consider pushing with harder material." : avgScore >= 70 ? "Solid progress. Keep reinforcing core ELA concepts." : "There's room to grow. Focus on targeted review for lower scorers.";
            return msg;
        }
        return `You have ${totalStudents} student${totalStudents > 1 ? "s" : ""} but no quiz scores yet. Assign scores in the Grades tab or via Platform Launch.`;
    }

    if (query.includes("struggling") || query.includes("low") || query.includes("below") || query.includes("fail")) {
        if (struggling.length === 0) return studentsWithScores.length > 0 ? "Great news — all scored students are at 70% or above!" : "No scores yet to identify struggling students.";
        return `${struggling.length} student${struggling.length > 1 ? "s" : ""} scored below 70%: ${struggling.map(s => `${s.name} (${s.score}%)`).join(", ")}. Use the Student A → Materials tab to generate targeted practice for them.`;
    }

    if (query.includes("top") || query.includes("best") || query.includes("excel") || query.includes("high")) {
        if (topPerformers.length === 0) return studentsWithScores.length > 0 ? `Highest scorer so far: ${studentsWithScores.sort((a,b)=>b.score-a.score)[0].name} at ${studentsWithScores[0].score}%.` : "No scores yet to identify top performers.";
        return `Top performers (85%+): ${topPerformers.map(s => `${s.name} (${s.score}%)`).join(", ")}. Consider enrichment activities or peer-teaching roles for them.`;
    }

    if (query.includes("quiz") || query.includes("test") || query.includes("create")) {
        if (totalQuizzes === 0) return "No quizzes created yet. Head to Quiz → Create Quiz, pick a grade and ELA topic, and generate questions.";
        const titles = state.savedQuizzes.map(q => q.title).join(", ");
        return `You have ${totalQuizzes} saved quiz${totalQuizzes > 1 ? "zes" : ""}: ${titles}. Use Platform Launch in the Quiz tab to share them with students.`;
    }

    if (query.includes("finance") || query.includes("payment") || query.includes("money") || query.includes("fee")) {
        if (state.financeData.length === 0) return "No finance entries yet. Log in to the Finance tab to start tracking tuition payments.";
        return `Total recorded: ₹${financeTotal.toLocaleString("en-IN")}. ${pendingFinance > 0 ? `₹${pendingFinance.toLocaleString("en-IN")} still pending — consider sending reminders.` : "All payments collected!"}`;
    }

    if (query.includes("grade") || query.includes("class") || query.includes("how many")) {
        if (totalStudents === 0) return "No students added yet.";
        const breakdown = GRADE_ORDER.map(g => ({ g, c: (state.students[g] || []).length })).filter(x => x.c > 0).map(x => `${gradeLabel(x.g)}: ${x.c}`).join(", ");
        return `You have ${totalStudents} student${totalStudents > 1 ? "s" : ""} across ${breakdown || "no grades"}.`;
    }

    // Generic helpful default
    if (totalStudents === 0) return "Start by adding students in the Students tab, then create quizzes and record scores to unlock full AI insights.";
    return `You have ${totalStudents} student${totalStudents > 1 ? "s" : ""}${avgScore !== null ? ` with a class average of ${avgScore}%` : " — add scores to see performance data"}. Ask me about performance, struggling students, top performers, quizzes, or finances!`;
}



/* ======================= GRADES MANAGEMENT ===================== */
function populateGradesQuizSelect() {
    const quizzes = state.savedQuizzes;
    let html = `<option value="">-- All Quizzes --</option>`;
    quizzes.forEach(q => { html += `<option value="${escapeHtml(q.id)}">${escapeHtml(q.title)}</option>`; });
    document.getElementById("gradesQuizSelect").innerHTML = html;
}

function populateProgressQuizFilter() {
    const quizzes = state.savedQuizzes;
    let html = `<option value="">-- All Quizzes --</option>`;
    quizzes.forEach(q => { html += `<option value="${escapeHtml(q.id)}">${escapeHtml(q.title)}</option>`; });
    document.getElementById("progressQuizFilter").innerHTML = html;
}

function loadGradesForGrade() {
    const grade = document.getElementById("gradesGradeSelect").value;
    const quizFilter = document.getElementById("gradesQuizSelect").value;
    const container = document.getElementById("gradesStudentsContainer");
    const emptyEl = document.getElementById("gradesEmpty");
    
    if (!grade) {
        container.innerHTML = "";
        emptyEl.style.display = "block";
        return;
    }
    
    const students = state.students[grade] || [];
    if (!students.length) {
        container.innerHTML = "";
        emptyEl.style.display = "block";
        emptyEl.textContent = `No students in ${gradeLabel(grade)} yet.`;
        return;
    }
    
    emptyEl.style.display = "none";
    let html = `<div class="glass-panel"><h5 style="margin-bottom: 16px;">Update Scores for ${gradeLabel(grade)}</h5><table style="width:100%;border-collapse:collapse;">
        <tr style="border-bottom:1px solid rgba(255,255,255,0.1);">
            <th style="text-align:left;padding:12px;font-weight:600;">Student Name</th>
            <th style="text-align:left;padding:12px;font-weight:600;">What Quiz</th>
            <th style="text-align:left;padding:12px;font-weight:600;">Score (%)</th>
            <th style="text-align:left;padding:12px;font-weight:600;">GPA</th>
            <th style="text-align:center;padding:12px;font-weight:600;">Action</th>
        </tr>`;
    
    students.forEach((s, idx) => {
        html += `<tr style="border-bottom:1px solid rgba(255,255,255,0.1);">
            <td style="padding:12px;"><strong>${escapeHtml(s.name)}</strong></td>
            <td style="padding:12px;"><select class="grade-quiz" data-grade="${grade}" data-idx="${idx}" style="width:150px;padding:8px;border:1px solid rgba(255,255,255,0.1);border-radius:4px;background:var(--surface-bright);color:var(--on-surface);">
                <option value="">-- Select Quiz --</option>
                ${state.savedQuizzes.map(q => `<option value="${escapeHtml(q.id)}">${escapeHtml(q.title)}</option>`).join('')}
            </select></td>
            <td style="padding:12px;"><input type="number" class="grade-score" data-grade="${grade}" data-idx="${idx}" value="${typeof s.score === 'number' ? s.score : ''}" min="0" max="100" placeholder="0-100" style="width:80px;padding:8px;border:1px solid rgba(255,255,255,0.1);border-radius:4px;background:var(--surface-bright);color:var(--on-surface);"></td>
            <td style="padding:12px;"><input type="number" class="grade-gpa" data-grade="${grade}" data-idx="${idx}" value="${s.gpa || ''}" min="0" max="4" step="0.1" placeholder="0.0-4.0" style="width:80px;padding:8px;border:1px solid rgba(255,255,255,0.1);border-radius:4px;background:var(--surface-bright);color:var(--on-surface);"></td>
            <td style="padding:12px;text-align:center;"><button class="btn-small" onclick="saveStudentGrade('${grade}', ${idx})">Save</button></td>
        </tr>`;
    });
    
    html += `</table></div>`;
    
    // Add Save All Grades button
    const grade_val = grade;
    html += `<div style="margin-top:16px;display:flex;gap:12px;">
        <button class="btn-primary" onclick="saveAllGradesToProgress('${grade_val}')">💾 Save All Grades to Student Progress</button>
    </div>`;
    
    container.innerHTML = html;
}

function saveStudentGrade(grade, idx) {
    const scoreInput = document.querySelector(`.grade-score[data-grade="${grade}"][data-idx="${idx}"]`);
    const gpaInput = document.querySelector(`.grade-gpa[data-grade="${grade}"][data-idx="${idx}"]`);
    
    if (!scoreInput || !gpaInput) return;
    
    const scoreVal = scoreInput.value.trim();
    const gpaVal = gpaInput.value.trim();
    
    const student = state.students[grade][idx];
    if (!student) return;
    
    student.score = scoreVal === "" ? null : Math.max(0, Math.min(100, parseInt(scoreVal, 10)));
    student.gpa = gpaVal === "" ? null : Math.max(0, Math.min(4, parseFloat(gpaVal))).toFixed(1);
    
    saveState();
    updateDashboard();
    updateProgressTable();
    if (selectedStudentId === student.id) selectStudent(student.id, grade, true);
    
    alert("✓ Grade saved successfully!");
}

/* Save all grades from the Grades table to Student Progress */
function saveAllGradesToProgress(grade) {
    const students = state.students[grade] || [];
    if (!students.length) {
        alert("No students to save grades for.");
        return;
    }
    
    // Collect all grades from the table inputs
    students.forEach((student, idx) => {
        const scoreInput = document.querySelector(`.grade-score[data-grade="${grade}"][data-idx="${idx}"]`);
        const gpaInput = document.querySelector(`.grade-gpa[data-grade="${grade}"][data-idx="${idx}"]`);
        
        if (scoreInput && gpaInput) {
            const scoreVal = scoreInput.value.trim();
            const gpaVal = gpaInput.value.trim();
            
            // Update student scores
            if (scoreVal !== "") {
                student.score = Math.max(0, Math.min(100, parseInt(scoreVal, 10)));
            }
            if (gpaVal !== "") {
                student.gpa = Math.max(0, Math.min(4, parseFloat(gpaVal))).toFixed(1);
            }
        }
    });
    
    // Save state and update all displays
    saveState();
    updateDashboard();
    updateProgressTable();
    
    // Refresh if student is currently selected
    if (selectedStudentId && selectedStudentGrade === grade) {
        selectStudent(selectedStudentId, grade, true);
    }
    
    alert(`✓ All grades for ${gradeLabel(grade)} saved to Student Progress!`);
}

/* ========================= FINANCE ========================== */
function unlockFinance() {
    const username = document.getElementById("financeUsername").value;
    const password = document.getElementById("financePassword").value;
    const errEl = document.getElementById("financeError");

    if (username === FINANCE_USER && password === FINANCE_PASS) {
        financeUnlocked = true;
        errEl.classList.remove("show");
        document.getElementById("financeLoginScreen").style.display = "none";
        document.getElementById("financeContent").style.display = "block";
        document.getElementById("financeUsername").value = "";
        document.getElementById("financePassword").value = "";
        updateFinanceList();
        updateFinanceStats();
    } else {
        // Never reveal the credentials — generic message only.
        errEl.classList.add("show");
        document.getElementById("financePassword").value = "";
    }
}

function openAddFinanceModal() {
    populateFinanceStudents();
    if (!document.getElementById("financeDate").value) {
        document.getElementById("financeDate").value = new Date().toISOString().slice(0, 10);
    }
    document.getElementById("addFinanceModal").classList.add("active");
}

function populateFinanceStudents() {
    const names = allStudents().map(s => s.name);
    let html = `<option value="">-- Select Student --</option>`;
    names.forEach(n => { html += `<option value="${escapeHtml(n)}">${escapeHtml(n)}</option>`; });
    if (!names.length) html += `<option value="" disabled>(Add students first)</option>`;
    document.getElementById("financeStudentName").innerHTML = html;
}

function addFinanceEntry() {
    const name = document.getElementById("financeStudentName").value;
    const amount = document.getElementById("financeAmount").value;
    const date = document.getElementById("financeDate").value;
    const status = document.getElementById("financeStatus").value;

    if (!name || !amount || !date) { alert("Please fill all fields!"); return; }

    state.financeData.push({ name, amount: parseInt(amount, 10), status, date });
    saveState();
    updateFinanceList();
    updateFinanceStats();
    closeModal("addFinanceModal");

    document.getElementById("financeAmount").value = "";
    document.getElementById("financeStatus").value = "Paid";
    alert("✓ Payment added successfully!");
}

function updateFinanceList() {
    const el = document.getElementById("financeList");
    if (!state.financeData.length) {
        el.innerHTML = "";
        document.getElementById("financeEmpty").style.display = "block";
        return;
    }
    document.getElementById("financeEmpty").style.display = "none";
    el.innerHTML = state.financeData.map((f, idx) => {
        const color = f.status === "Paid" ? "var(--success)" : f.status === "Overdue" ? "var(--error)" : "var(--tertiary)";
        return `<div class="finance-card">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;">
                <div>
                    <h4>${escapeHtml(f.name)}</h4>
                    <p>Date: ${escapeHtml(f.date)}</p>
                    <div class="finance-amount" style="color:${color};">₹${Number(f.amount).toLocaleString("en-IN")}</div>
                    <p style="font-size:12px;font-weight:600;color:${color};margin-top:8px;">${escapeHtml(f.status)}</p>
                </div>
                <button class="btn-small" onclick="deleteFinanceEntry(${idx})" style="background:rgba(255,180,171,0.1);border-color:var(--error);color:var(--error);height:fit-content;">🗑 Delete</button>
            </div>
        </div>`;
    }).join("");
}

function updateFinanceStats() {
    const collected = state.financeData.filter(f => f.status === "Paid").reduce((s, f) => s + f.amount, 0);
    const pending = state.financeData.filter(f => f.status !== "Paid").reduce((s, f) => s + f.amount, 0);
    const pendingPeople = new Set(state.financeData.filter(f => f.status !== "Paid").map(f => f.name)).size;
    const total = collected + pending;
    const rate = total > 0 ? Math.round((collected / total) * 100) + "%" : "—";

    document.getElementById("totalCollected").textContent = "₹" + collected.toLocaleString("en-IN");
    document.getElementById("pendingFees").textContent = "₹" + pending.toLocaleString("en-IN");
    document.getElementById("pendingCount").textContent = `From ${pendingPeople} student${pendingPeople === 1 ? "" : "s"}`;
    document.getElementById("collectionRate").textContent = rate;
}

function deleteFinanceEntry(index) {
    if (!confirm("Are you sure you want to delete this payment entry?")) return;
    state.financeData.splice(index, 1);
    saveState();
    updateFinanceList();
    updateFinanceStats();
    alert("✓ Payment entry deleted successfully!");
}

function logoutFinance() {
    financeUnlocked = false;
    document.getElementById("financeLoginScreen").style.display = "block";
    document.getElementById("financeContent").style.display = "none";
    document.getElementById("financePassword").value = "";
    document.getElementById("financeUsername").value = "";
    closeModal("addFinanceModal");
    alert("✓ You have been logged out of Finance Tracker. You can log back in with your credentials.");
}

/* ====================== REFRESH / INIT ======================= */
function refreshAll() {
    syncAllExternalQuizResults();
    updateDashboard();
    updateStudentsList();
    updateProgressTable();
    updateSavedQuizzesList();
    updateFinanceList();
    updateFinanceStats();
    populateFinanceStudents();
    populateGradesQuizSelect();
    populateProgressQuizFilter();
}

async function init() {
    try {
        // Initialize IndexedDB for cross-browser data sync
        await initIndexedDB();
    } catch (e) {
        console.warn("IndexedDB initialization failed, will use localStorage only", e);
    }
    
    await loadState();
    setupStudentsListDelegation();

    // Populate every grade dropdown.
    fillGradeSelect(document.getElementById("quizGrade"), "-- Select Grade --");
    fillGradeSelect(document.getElementById("gradeSelect"), "-- Choose Grade --");
    fillGradeSelect(document.getElementById("gradesGradeSelect"), "-- Choose Grade --");
    fillGradeSelect(document.getElementById("newStudentGrade"), "-- Select Grade --");
    fillGradeSelect(document.getElementById("editStudentGrade"), "-- Select Grade --");
    fillGradeSelect(document.getElementById("studentQuizGrade"), "-- Select Grade --");
    fillGradeSelect(document.getElementById("materialGrade"), "-- Select Grade --");

    refreshAll();
}

// Close modal when clicking the dark backdrop.
window.onclick = function (e) {
    if (e.target.classList && e.target.classList.contains("modal")) {
        e.target.classList.remove("active");
    }
};

document.addEventListener("DOMContentLoaded", init);
