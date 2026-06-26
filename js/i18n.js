/* ==========================================================================
   EduMetric — Internationalization (i18n)
   Supports three languages: English, Odia, and Hindi
   Real-time UI translation with locale-specific formatting
   ========================================================================== */

const TRANSLATIONS = {
    en: {
        // App Title & Branding
        appTitle: "EduMetric",
        appSubtitle: "Teacher Dashboard for Quiz & Finance Management",
        tagline: "A fresh workspace • All data stays in your browser",
        
        // Login
        getStarted: "Get Started",
        
        // Navigation
        dashboard: "Dashboard",
        quiz: "Quiz",
        students: "Students",
        studentA: "Student A",
        financeTracker: "Finance Tracker",
        newQuiz: "➕ New Quiz",
        administrator: "Administrator",
        teacher: "Teacher",
        
        // Header
        notifications: "Notifications",
        logout: "Logout",
        
        // Dashboard
        studentPerformance: "Student Performance Overview",
        englishLangArts: "English / Language Arts",
        gradesKto10: "Grades K–10",
        totalStudents: "Total Students",
        acrossAllGrades: "Across all grades",
        avgClassPerformance: "Avg Class Performance",
        passRate: "Pass Rate",
        quizzesCreated: "Quizzes Created",
        thisSession: "This session",
        gradeWisePerformance: "Grade-Wise Performance",
        gradeLevel: "Grade Level",
        averagePerformance: "Average Performance",
        latestTest: "Latest Test",
        noStudentsYet: "No students yet. Add students from the",
        tab: "tab to see grade-wise performance.",
        aiTeachingAssistant: "🤖 AI Teaching Assistant",
        aiPoweredInsights: "Get AI-powered insights for your classroom.",
        askAboutStudents: "Ask about your students...",
        send: "Send",
        
        // Quiz Page
        quizManagement: "Quiz Management",
        createQuiz: "Create Quiz",
        takingTheQuiz: "Taking The Quiz",
        selectGrade: "Select Grade",
        selectTopic: "Select Topic",
        difficulty: "Difficulty",
        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
        generateQuestions: "Generate Questions",
        savedQuizzes: "Saved Quizzes",
        noQuizzesYet: "No quizzes created yet.",
        quizHost: "Quiz Host",
        platformLaunch: "Platform Launch",
        exportPDF: "Export to PDF",
        shareLink: "Share Link",
        deleteQuiz: "Delete",
        
        // Students Page
        studentsManager: "Student Management",
        addNewStudent: "➕ Add New Student",
        noStudentsYetMsg: "No students added yet. Click",
        toGetStarted: "to get started.",
        studentName: "Student Name",
        gradeLevelLabel: "Grade Level",
        batchSection: "Batch/Section",
        guardianPhoneNumber: "Guardian Phone Number",
        latestQuizScore: "Latest Quiz Score %",
        optional: "optional",
        gpaLabel: "GPA",
        gpaRange: "optional, 0–4",
        addStudent: "✓ Add Student",
        cancel: "Cancel",
        editStudent: "Edit Student",
        saveChanges: "✓ Save Changes",
        deleteStudent: "Delete",
        
        // Finance
        financeTracker_: "Finance Tracker",
        financeLogin: "Login to Finance Tracker",
        username: "Username",
        password: "Password",
        loginFinance: "Login",
        financeContent: "Finance Content",
        totalCollected: "Total Collected",
        pendingFees: "Pending Fees",
        collectionRate: "Collection Rate",
        addPayment: "➕ Add Payment",
        studentNameLabel: "Student Name",
        amountRupees: "Amount (₹)",
        paymentDate: "Payment Date",
        paymentStatus: "Payment Status",
        paid: "Paid",
        pending: "Pending",
        overdue: "Overdue",
        studentWiseFeeStatus: "Student-Wise Fee Status",
        noPaymentsRecorded: "No payments recorded yet. Click",
        toStartTracking: "to start tracking fees.",
        logoutFinance: "Logout",
        addPaymentBtn: "✓ Add Payment",
        
        // Modals & Forms
        selectStudent: "-- Select Student --",
        selectGradeLabel: "-- Select Grade --",
        chooseGrade: "-- Choose Grade --",
        modal: "Modal",
        
        // Empty States & Messages
        emptyState: "Empty",
        noData: "No data available",
        
        // Buttons & Actions
        delete: "🗑 Delete",
        edit: "Edit",
        save: "Save",
        close: "Close",
        copy: "Copy",
        open: "Open",
        
        // Confirmation & Alerts
        areYouSure: "Are you sure you want to delete this?",
        confirmDelete: "Confirm Delete",
        yes: "Yes",
        no: "No",
        success: "✓ Success!",
        error: "❌ Error",
        
        // External Links
        externalLink: "External Link",
        shareQuizLink: "🔗 External Quiz Link",
        shareWithStudents: "Share this link with your students. They can take the quiz online and get an instant score.",
        linkCopiedToClipboard: "✓ Link copied to clipboard!",
        
        // Language Selector
        language: "Language",
        selectLanguage: "Select Language",
        english: "English",
        odia: "ଓଡ଼ିଆ",
        hindi: "हिन्दी",
        
        // AI Assistant Messages
        aiThinking: "AI is thinking…",
        aiUnavailable: "Sorry, I couldn't reach the AI right now. Please try again.",
        noStudentsAdded: "You don't have any students yet. Add them from the Students tab, then assign quiz scores to start tracking.",
        classAverage: "Your class average is",
        noScoresYet: "No quiz scores yet. Assign scores in the Grades tab or via Platform Launch.",
        strugglingStudents: "students scored below 70%",
        topPerformers: "Top performers (85%+)",
        noQuizzesCreated: "No quizzes created yet. Head to Quiz → Create Quiz, pick a grade and ELA topic, and generate questions.",
        financeNoEntries: "No finance entries yet. Log in to the Finance tab to start tracking tuition payments.",
        noStudentsInSystem: "No students added yet.",
    },
    od: {
        // App Title & Branding
        appTitle: "EduMetric",
        appSubtitle: "ଶିକ୍ଷକ ଡ୍ୟାସବୋର୍ଡ କୁଇଜ଼ ଏବଂ ଅର୍ଥ ପରିଚାଳନା ପାଇଁ",
        tagline: "ଏକ ନୂତନ କର୍ମସ୍ଥଳ • ସମସ୍ତ ତଥ୍ୟ ଆପଣଙ୍କ ବ୍ରାଉଜ଼ରେ ରହିଥାଏ",
        
        // Login
        getStarted: "ଆରମ୍ଭ କରନ୍ତୁ",
        
        // Navigation
        dashboard: "ଡ୍ୟାସବୋର୍ଡ",
        quiz: "କୁଇଜ଼",
        students: "ଶିକ୍ଷାର୍ଥୀ",
        studentA: "ଶିକ୍ଷାର୍ଥୀ A",
        financeTracker: "ଅର୍ଥ ଟ୍ରାକର",
        newQuiz: "➕ ନୂତନ କୁଇଜ଼",
        administrator: "ପରିଚାଳକ",
        teacher: "ଶିକ୍ଷକ",
        
        // Header
        notifications: "ବିଜ୍ଞପ୍ତି",
        logout: "ଲଗଆଉଟ",
        
        // Dashboard
        studentPerformance: "ଶିକ୍ଷାର୍ଥୀ ପ୍ରଦର୍ଶନ ସମୀକ୍ଷା",
        englishLangArts: "ଇଂରାଜୀ / ଭାଷା କଳା",
        gradesKto10: "ଗ୍ରେଡ୍ K–10",
        totalStudents: "ମୋଟ ଶିକ୍ଷାର୍ଥୀ",
        acrossAllGrades: "ସମସ୍ତ ଗ୍ରେଡ୍ ମଧ୍ୟରେ",
        avgClassPerformance: "ହାରାହାରି ଶ୍ରେଣୀ ପ୍ରଦର୍ଶନ",
        passRate: "ପାସ୍ ରେଟ୍",
        quizzesCreated: "ତିଆରି ହୋଇଥିବା କୁଇଜ଼",
        thisSession: "ଏହି ସେସନ୍",
        gradeWisePerformance: "ଗ୍ରେଡ୍-ନିରସନ ପ୍ରଦର୍ଶନ",
        gradeLevel: "ଗ୍ରେଡ୍ ସ୍ତର",
        averagePerformance: "ହାରାହାରି ପ୍ରଦର୍ଶନ",
        latestTest: "ଅଧୁନାତମ ପରୀକ୍ଷା",
        noStudentsYet: "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଶିକ୍ଷାର୍ଥୀ ନାହିଁ। ଶିକ୍ଷାର୍ଥୀ ଯୋଗ କରନ୍ତୁ",
        tab: "ଗ୍ରେଡ୍-ନିରସନ ପ୍ରଦର୍ଶନ ଦେଖିବାକୁ।",
        aiTeachingAssistant: "🤖 AI ଶିକ୍ଷାଣ ସହାୟକ",
        aiPoweredInsights: "ଆପଣଙ୍କ ଶ୍ରେଣୀ ପାଇଁ AI-ଚାଳିତ ଅନ୍ତର୍ଦୃଷ୍ଟି ପାଇଁ।",
        askAboutStudents: "ଆପଣଙ୍କ ଶିକ୍ଷାର୍ଥୀଙ୍କ ବିଷୟରେ ପଚାର୍...",
        send: "ପଠାନ୍ତୁ",
        
        // Quiz Page
        quizManagement: "କୁଇଜ଼ ପରିଚାଳନା",
        createQuiz: "କୁଇଜ଼ ତିଆରି କରନ୍ତୁ",
        takingTheQuiz: "କୁଇଜ଼ ନେଉଛନ୍ତି",
        selectGrade: "ଗ୍ରେଡ୍ ନିର୍ବାଚନ କରନ୍ତୁ",
        selectTopic: "ବିଷୟ ନିର୍ବାଚନ କରନ୍ତୁ",
        difficulty: "ସାରୀ",
        easy: "ସହଜ",
        medium: "ମଧ୍ୟମ",
        hard: "କଠିନ",
        generateQuestions: "ପ୍ରଶ୍ନ ସୃଷ୍ଟି କରନ୍ତୁ",
        savedQuizzes: "ସଂରକ୍ଷିତ କୁଇଜ଼",
        noQuizzesYet: "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି କୁଇଜ଼ ତିଆରି ହୋଇ ନାହିଁ।",
        quizHost: "କୁଇଜ଼ ହୋଷ୍ଟ",
        platformLaunch: "ପ୍ଲାଟଫର୍ମ ଲଞ୍ଚ",
        exportPDF: "PDF ରେ ରପ୍ତାନି",
        shareLink: "ଲିଙ୍କ୍ ଭାଗ କରନ୍ତୁ",
        deleteQuiz: "ଲଭ୍ତ ମୁଦାଁ",
        
        // Students Page
        studentsManager: "ଶିକ୍ଷାର୍ଥୀ ପରିଚାଳନା",
        addNewStudent: "➕ ନୂତନ ଶିକ୍ଷାର୍ଥୀ ଯୋଗ କରନ୍ତୁ",
        noStudentsYetMsg: "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଶିକ୍ଷାର୍ଥୀ ଯୋଗ ହୋଇ ନାହିଁ। କ୍ଲିକ୍ କରନ୍ତୁ",
        toGetStarted: "ଆରମ୍ଭ କରିବାକୁ।",
        studentName: "ଶିକ୍ଷାର୍ଥୀ ନାମ",
        gradeLevelLabel: "ଗ୍ରେଡ୍ ସ୍ତର",
        batchSection: "ବ୍ୟାଚ୍/ବିଭାଗ",
        guardianPhoneNumber: "ଅଭିଭାବକ ଫୋନ୍ ନମ୍ବର",
        latestQuizScore: "ଅଧୁନାତମ କୁଇଜ଼ ସ୍କୋର %",
        optional: "ଚୟନଧୀନ",
        gpaLabel: "GPA",
        gpaRange: "ଚୟନଧୀନ, 0–4",
        addStudent: "✓ ଶିକ୍ଷାର୍ଥୀ ଯୋଗ କରନ୍ତୁ",
        cancel: "ରଦ୍ଦ କରନ୍ତୁ",
        editStudent: "ଶିକ୍ଷାର୍ଥୀ ସଂପାଦନ କରନ୍ତୁ",
        saveChanges: "✓ ପରିବର୍ତ୍ତନ ସଂରକ୍ଷିତ କରନ୍ତୁ",
        deleteStudent: "ଲଭ୍ତ ମୁଦାଁ",
        
        // Finance
        financeTracker_: "ଅର୍ଥ ଟ୍ରାକର",
        financeLogin: "ଅର୍ଥ ଟ୍ରାକର ଲଗଇନ୍",
        username: "ଯୁଜରନାମ",
        password: "ପାସୱାର୍ଡ",
        loginFinance: "ଲଗଇନ୍",
        financeContent: "ଅର୍ଥ ସାମଗ୍ରୀ",
        totalCollected: "ମୋଟ ସଂଗ୍ରାହୀତ",
        pendingFees: "ଲନ୍ବିତ ଶୁଳ୍କ",
        collectionRate: "ସଂଗ୍ରହ ହାର",
        addPayment: "➕ ଦେୟ ଯୋଗ କରନ୍ତୁ",
        studentNameLabel: "ଶିକ୍ଷାର୍ଥୀ ନାମ",
        amountRupees: "ରାଶି (₹)",
        paymentDate: "ଦେୟ ତାରିଖ",
        paymentStatus: "ଦେୟ ସ୍ଥିତି",
        paid: "ଦେୟ ସମ୍ପନ୍ନ",
        pending: "ଲନ୍ବିତ",
        overdue: "ଅତିଆବଶ୍ୟକ",
        studentWiseFeeStatus: "ଶିକ୍ଷାର୍ଥୀ-ନିରସନ ଶୁଳ୍କ ସ୍ଥିତି",
        noPaymentsRecorded: "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଦେୟ ଧାରିତ ହୋଇ ନାହିଁ। କ୍ଲିକ୍ କରନ୍ତୁ",
        toStartTracking: "ଶୁଳ୍କ ଟ୍ରାକ ଆରମ୍ଭ କରିବାକୁ।",
        logoutFinance: "ଲଗଆଉଟ",
        addPaymentBtn: "✓ ଦେୟ ଯୋଗ କରନ୍ତୁ",
        
        // Modals & Forms
        selectStudent: "-- ଶିକ୍ଷାର୍ଥୀ ନିର୍ବାଚନ କରନ୍ତୁ --",
        selectGradeLabel: "-- ଗ୍ରେଡ୍ ନିର୍ବାଚନ କରନ୍ତୁ --",
        chooseGrade: "-- ଗ୍ରେଡ୍ ବ୍ରଣ୍ଡ କରନ୍ତୁ --",
        modal: "ମଡାଲ",
        
        // Empty States & Messages
        emptyState: "ଖାଲି",
        noData: "କୌଣସି ତଥ୍ୟ ନାହିଁ",
        
        // Buttons & Actions
        delete: "🗑 ଲଭ୍ତ ମୁଦାଁ",
        edit: "ସଂପାଦନ",
        save: "ସଂରକ୍ଷିତ",
        close: "ବନ୍ଦ",
        copy: "ନକଲ",
        open: "ଖୋଲନ୍ତୁ",
        
        // Confirmation & Alerts
        areYouSure: "ଆପଣ ନିଶ୍ଚିତ ଯେ ଏହା ଲଭ୍ତ ମୁଦାଁ କରିବେ?",
        confirmDelete: "ଲଭ୍ତ ଅପସାରିତ ଯାଞ୍ଚ କରନ୍ତୁ",
        yes: "ହଁ",
        no: "ନା",
        success: "✓ ସଫଳତା!",
        error: "❌ ତ୍ରୁଟି",
        
        // External Links
        externalLink: "ବାହିରର ଲିଙ୍କ",
        shareQuizLink: "🔗 ବାହିରର କୁଇଜ଼ ଲିଙ୍କ",
        shareWithStudents: "ଏହି ଲିଙ୍କ୍ ଆପଣଙ୍କ ଶିକ୍ଷାର୍ଥୀଙ୍କ ସହ ଭାଗ କରନ୍ତୁ। ସେମାନେ ଅନଲାଇନ୍ କୁଇଜ଼ ନେଇ ତାତକାଳୀନ ସ୍କୋର ପାଇ ପାରିବେନ୍ତି।",
        linkCopiedToClipboard: "✓ ଲିଙ୍କ୍ କ୍ଲିପବୋର୍ଡ୍ ମଧ୍ୟକୁ ନକଲ ହୋଇଛି!",
        
        // Language Selector
        language: "ଭାଷା",
        selectLanguage: "ଭାଷା ନିର୍ବାଚନ",
        english: "English",
        odia: "ଓଡ଼ିଆ",
        hindi: "हिन्दी",
        
        // AI Assistant Messages
        aiThinking: "AI ଚିନ୍ତାମାଗ୍ନ…",
        aiUnavailable: "ଦୁଃଖ ମିଛା, ମୁଁ ଅଧୁନା AI ପାଖରେ ପହୁଁଚି ପାରୁ ନାହିଁ। ଦୟା କରି ପୁନଃ ଚେଷ୍ଟା କରନ୍ତୁ।",
        noStudentsAdded: "ଆପଣଙ୍କ ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଶିକ୍ଷାର୍ଥୀ ନାହିଁ। ଶିକ୍ଷାର୍ଥୀ ଟ୍ୟାବରୁ ଯୋଗ କରନ୍ତୁ, ତାର ପରେ ଟ୍ରାକିଂ ଆରମ୍ଭ କରିବାକୁ କୁଇଜ଼ ସ୍କୋର ନିର୍ଦ୍ଧାରିତ କରନ୍ତୁ।",
        classAverage: "ଆପଣଙ୍କ ଶ୍ରେଣୀ ହାରାହାରି ହେଉ",
        noScoresYet: "ଏପର୍ଯ୍ୟନ୍ତ ନାହିଁ କୁଇଜ଼ ସ୍କୋର ନାହିଁ। ଗ୍ରେଡ୍ ଟ୍ୟାବରେ ସ୍କୋର ନିର୍ଦ୍ଧାରିତ କରନ୍ତୁ କିମ୍ବା ପ୍ଲାଟଫର୍ମ ଲଞ୍ଚ ମାଧ୍ୟମରେ।",
        strugglingStudents: "ଶିକ୍ଷାର୍ଥୀ 70% ତଳେ ସ୍କୋର",
        topPerformers: "ଉନ୍ନତ ପ୍ରଦର୍ଶକ (85%+)",
        noQuizzesCreated: "ଏପର୍ଯ୍ୟନ୍ତ ନାହିଁ କୁଇଜ଼ ତିଆରି। ସେ କୁଇଜ଼ → କୁଇଜ଼ ତିଆରି, ଗ୍ରେଡ୍ ଏବଂ ଭାଷା କଳା ବିଷୟ ବଚେ, ଓ ପ୍ରଶ୍ନ ସୃଷ୍ଟି କରନ୍ତୁ।",
        financeNoEntries: "ଏପର୍ଯ୍ୟନ୍ତ ନାହିଁ ଅର୍ଥ ଧାରଣ। ଶିକ୍ଷଣ ଦେୟ ଟ୍ରାକ ଆରମ୍ଭ କରିବାକୁ ଅର୍ଥ ଟ୍ୟାବରେ ଲଗଇନ୍ କରନ୍ତୁ।",
        noStudentsInSystem: "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଶିକ୍ଷାର୍ଥୀ ଯୋଗ ହୋଇ ନାହିଁ।",
    },
    hi: {
        // App Title & Branding
        appTitle: "EduMetric",
        appSubtitle: "शिक्षक डैशबोर्ड क्विज़ और वित्त प्रबंधन के लिए",
        tagline: "एक ताज़ा कार्यक्षेत्र • सभी डेटा आपके ब्राउज़र में रहता है",
        
        // Login
        getStarted: "शुरुआत करें",
        
        // Navigation
        dashboard: "डैशबोर्ड",
        quiz: "क्विज़",
        students: "छात्र",
        studentA: "छात्र A",
        financeTracker: "वित्त ट्रैकर",
        newQuiz: "➕ नई क्विज़",
        administrator: "व्यवस्थापक",
        teacher: "शिक्षक",
        
        // Header
        notifications: "सूचनाएं",
        logout: "लॉगआउट",
        
        // Dashboard
        studentPerformance: "छात्र प्रदर्शन अवलोकन",
        englishLangArts: "अंग्रेजी / भाषा कला",
        gradesKto10: "ग्रेड K–10",
        totalStudents: "कुल छात्र",
        acrossAllGrades: "सभी ग्रेड में",
        avgClassPerformance: "औसत कक्षा प्रदर्शन",
        passRate: "पास दर",
        quizzesCreated: "क्विज़ बनाई गई",
        thisSession: "इस सत्र में",
        gradeWisePerformance: "ग्रेड के अनुसार प्रदर्शन",
        gradeLevel: "ग्रेड स्तर",
        averagePerformance: "औसत प्रदर्शन",
        latestTest: "नवीनतम परीक्षा",
        noStudentsYet: "अभी कोई छात्र नहीं। छात्रों को जोड़ें",
        tab: "टैब से ग्रेड-वार प्रदर्शन देखने के लिए।",
        aiTeachingAssistant: "🤖 एआई शिक्षण सहायक",
        aiPoweredInsights: "अपनी कक्षा के लिए एआई-संचालित अंतर्दृष्टि प्राप्त करें।",
        askAboutStudents: "अपने छात्रों के बारे में पूछें...",
        send: "भेजें",
        
        // Quiz Page
        quizManagement: "क्विज़ प्रबंधन",
        createQuiz: "क्विज़ बनाएं",
        takingTheQuiz: "क्विज़ ले रहे हैं",
        selectGrade: "ग्रेड चुनें",
        selectTopic: "विषय चुनें",
        difficulty: "कठिनाई",
        easy: "आसान",
        medium: "मध्यम",
        hard: "कठिन",
        generateQuestions: "प्रश्न उत्पन्न करें",
        savedQuizzes: "सहेजी गई क्विज़",
        noQuizzesYet: "अभी कोई क्विज़ नहीं बनाई गई।",
        quizHost: "क्विज़ होस्ट",
        platformLaunch: "प्लेटफॉर्म लॉन्च",
        exportPDF: "PDF में निर्यात करें",
        shareLink: "लिंक साझा करें",
        deleteQuiz: "हटाएं",
        
        // Students Page
        studentsManager: "छात्र प्रबंधन",
        addNewStudent: "➕ नया छात्र जोड़ें",
        noStudentsYetMsg: "अभी कोई छात्र नहीं जोड़े गए। क्लिक करें",
        toGetStarted: "शुरुआत करने के लिए।",
        studentName: "छात्र का नाम",
        gradeLevelLabel: "ग्रेड स्तर",
        batchSection: "बैच/सेक्शन",
        guardianPhoneNumber: "अभिभावक का फोन नंबर",
        latestQuizScore: "नवीनतम क्विज़ स्कोर %",
        optional: "वैकल्पिक",
        gpaLabel: "जीपीए",
        gpaRange: "वैकल्पिक, 0–4",
        addStudent: "✓ छात्र जोड़ें",
        cancel: "रद्द करें",
        editStudent: "छात्र संपादित करें",
        saveChanges: "✓ परिवर्तन सहेजें",
        deleteStudent: "हटाएं",
        
        // Finance
        financeTracker_: "वित्त ट्रैकर",
        financeLogin: "वित्त ट्रैकर में लॉगिन करें",
        username: "उपयोगकर्ता नाम",
        password: "पासवर्ड",
        loginFinance: "लॉगिन",
        financeContent: "वित्त सामग्री",
        totalCollected: "कुल एकत्रित",
        pendingFees: "लंबित शुल्क",
        collectionRate: "संग्रह दर",
        addPayment: "➕ भुगतान जोड़ें",
        studentNameLabel: "छात्र का नाम",
        amountRupees: "राशि (₹)",
        paymentDate: "भुगतान की तारीख",
        paymentStatus: "भुगतान स्थिति",
        paid: "भुगतान किया गया",
        pending: "लंबित",
        overdue: "अतिदेय",
        studentWiseFeeStatus: "छात्र-वार शुल्क स्थिति",
        noPaymentsRecorded: "अभी कोई भुगतान दर्ज नहीं किया गया। क्लिक करें",
        toStartTracking: "शुल्क ट्रैक करना शुरू करने के लिए।",
        logoutFinance: "लॉगआउट",
        addPaymentBtn: "✓ भुगतान जोड़ें",
        
        // Modals & Forms
        selectStudent: "-- छात्र चुनें --",
        selectGradeLabel: "-- ग्रेड चुनें --",
        chooseGrade: "-- ग्रेड चुनें --",
        modal: "मोडल",
        
        // Empty States & Messages
        emptyState: "खाली",
        noData: "कोई डेटा उपलब्ध नहीं",
        
        // Buttons & Actions
        delete: "🗑 हटाएं",
        edit: "संपादित करें",
        save: "सहेजें",
        close: "बंद करें",
        copy: "कॉपी करें",
        open: "खोलें",
        
        // Confirmation & Alerts
        areYouSure: "क्या आप निश्चित हैं कि आप इसे हटाना चाहते हैं?",
        confirmDelete: "हटाने की पुष्टि करें",
        yes: "हां",
        no: "नहीं",
        success: "✓ सफलता!",
        error: "❌ त्रुटि",
        
        // External Links
        externalLink: "बाहरी लिंक",
        shareQuizLink: "🔗 बाहरी क्विज़ लिंक",
        shareWithStudents: "इस लिंक को अपने छात्रों के साथ साझा करें। वे ऑनलाइन क्विज़ ले सकते हैं और तुरंत स्कोर प्राप्त कर सकते हैं।",
        linkCopiedToClipboard: "✓ लिंक क्लिपबोर्ड में कॉपी किया गया!",
        
        // Language Selector
        language: "भाषा",
        selectLanguage: "भाषा चुनें",
        english: "English",
        odia: "ଓଡ଼ିଆ",
        hindi: "हिन्दी",
        
        // AI Assistant Messages
        aiThinking: "एआई सोच रहा है…",
        aiUnavailable: "खेद है, मैं अभी एआई तक नहीं पहुंच सका। कृपया पुनः प्रयास करें।",
        noStudentsAdded: "आपके पास अभी कोई छात्र नहीं है। उन्हें छात्र टैब से जोड़ें, फिर ट्रैकिंग शुरू करने के लिए क्विज़ स्कोर असाइन करें।",
        classAverage: "आपकी कक्षा का औसत है",
        noScoresYet: "अभी कोई क्विज़ स्कोर नहीं। ग्रेड टैब में स्कोर असाइन करें या प्लेटफॉर्म लॉन्च के माध्यम से।",
        strugglingStudents: "छात्रों का स्कोर 70% से कम है",
        topPerformers: "शीर्ष प्रदर्शक (85%+)",
        noQuizzesCreated: "अभी कोई क्विज़ नहीं बनाई गई। क्विज़ → क्विज़ बनाएं पर जाएं, ग्रेड और भाषा कला विषय चुनें, और प्रश्न उत्पन्न करें।",
        financeNoEntries: "अभी कोई वित्त प्रविष्टि नहीं। ट्यूशन भुगतान ट्रैक करना शुरू करने के लिए वित्त टैब में लॉगिन करें।",
        noStudentsInSystem: "अभी कोई छात्र नहीं जोड़े गए।",
    }
};

let currentLanguage = localStorage.getItem('edumetric_lang') || 'en';

function setLanguage(lang) {
    if (TRANSLATIONS[lang]) {
        currentLanguage = lang;
        localStorage.setItem('edumetric_lang', lang);
        updateUILanguage();
    }
}

function t(key) {
    return TRANSLATIONS[currentLanguage]?.[key] || TRANSLATIONS['en'][key] || key;
}

function updateUILanguage() {
    // Update all text nodes with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = t(key);
        } else {
            el.textContent = t(key);
        }
    });
    
    // Update all title attributes
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        el.title = t(el.getAttribute('data-i18n-title'));
    });
    
    // Update all aria-labels
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });
    
    // Update all href attributes for links (if they contain language-dependent text)
    updateExternalLinks();
}

function updateExternalLinks() {
    // Update any links that have language-dependent text
    document.querySelectorAll('[data-i18n-href]').forEach(el => {
        const hrefKey = el.getAttribute('data-i18n-href');
        // External links can be managed here if needed
    });
}

// Initialize language on page load
function initLanguage() {
    setLanguage(currentLanguage);
}
