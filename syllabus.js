/**
 * CBSE Syllabus 2026-27 - Complete Grade/Subject/Topic Mapping
 * Maps Grades (K-12) → Subjects → Topics
 */

const CBSE_SYLLABUS = {
  "K": {
    label: "Kindergarten",
    subjects: {
      "Development": [
        "Language Development",
        "Numeracy & Mathematical Thinking",
        "Motor Skills Development",
        "Social-Emotional Learning",
        "Cognitive Development"
      ]
    }
  },

  "1": {
    label: "Grade 1",
    subjects: {
      "English": [
        "Alphabet Recognition",
        "Phonetic Awareness",
        "Sight Words",
        "Simple Words",
        "Oral Communication",
        "Story Time"
      ],
      "Mathematics": [
        "Numbers 1-50",
        "One-to-one Correspondence",
        "Addition Concept",
        "Subtraction Concept",
        "Shapes",
        "Measurement",
        "Calendar Concepts",
        "Time Basics"
      ],
      "Hindi": [
        "Devanagari Alphabet",
        "Consonant-Vowel Combinations",
        "Simple Words",
        "Basic Punctuation",
        "Oral Narration"
      ]
    }
  },

  "2": {
    label: "Grade 2",
    subjects: {
      "English": [
        "Reading Simple Stories",
        "CVC Words & Consonant Blends",
        "Sentence Formation",
        "Punctuation",
        "Nouns & Verbs",
        "Articles",
        "Phonics",
        "Creative Writing"
      ],
      "Mathematics": [
        "Numbers 1-100",
        "Addition & Subtraction",
        "Multiplication Concept",
        "Division Concept",
        "Time Reading",
        "Money Recognition",
        "Measurement",
        "Data Handling"
      ],
      "Hindi": [
        "Reading Stories & Poems",
        "Consonant Clusters",
        "Simple Sentences",
        "Vocabulary Building",
        "Parts of Speech",
        "Writing Skills"
      ]
    }
  },

  "3": {
    label: "Grade 3",
    subjects: {
      "English": [
        "Reading Comprehension",
        "Grammar - Parts of Speech",
        "Vocabulary",
        "Tenses",
        "Sentence Types",
        "Writing Paragraphs",
        "Creative Writing",
        "Punctuation"
      ],
      "Mathematics": [
        "Numbers 1-1000",
        "Place Value",
        "Three-Digit Addition",
        "Three-Digit Subtraction",
        "Multiplication Tables",
        "Division",
        "Fractions",
        "Geometry",
        "Measurement",
        "Time",
        "Money",
        "Data Handling"
      ],
      "Hindi": [
        "Reading Stories & Poems",
        "Grammar",
        "Vocabulary",
        "Writing",
        "Comprehension"
      ],
      "EVS": [
        "Self Awareness",
        "Family",
        "Community",
        "Environment",
        "Animals",
        "Plants",
        "Weather",
        "Natural Resources"
      ]
    }
  },

  "4": {
    label: "Grade 4",
    subjects: {
      "English": [
        "Reading Comprehension",
        "Grammar - All Parts of Speech",
        "Vocabulary",
        "Tenses",
        "Writing Paragraphs",
        "Story Writing",
        "Letter Writing",
        "Descriptions"
      ],
      "Mathematics": [
        "Numbers 1-10,000",
        "Place Value",
        "Four-Digit Operations",
        "Multiplication",
        "Division",
        "Factors & Multiples",
        "Fractions",
        "Geometry",
        "Measurement",
        "Time",
        "Money",
        "Data Handling",
        "Patterns"
      ],
      "Hindi": [
        "Literature",
        "Vocabulary",
        "Grammar",
        "Writing",
        "Communication"
      ],
      "EVS": [
        "Human Body",
        "Animals",
        "Plants",
        "Earth & Natural Resources",
        "Society & Culture"
      ]
    }
  },

  "5": {
    label: "Grade 5",
    subjects: {
      "English": [
        "Reading - Diverse Genres",
        "Vocabulary",
        "Complex Sentences",
        "All Tenses",
        "Active & Passive Voice",
        "Reported Speech",
        "Paragraph Writing",
        "Story Writing",
        "Essay Writing",
        "Literature Appreciation"
      ],
      "Mathematics": [
        "Numbers up to 1,00,000",
        "Large Number Operations",
        "Fractions",
        "Decimals",
        "Percentages",
        "Geometry",
        "Measurement",
        "Data Handling",
        "Algebraic Thinking"
      ],
      "Hindi": [
        "Literature",
        "Grammar",
        "Vocabulary",
        "Writing Skills",
        "Comprehension"
      ],
      "EVS": [
        "Living World",
        "Food Chains & Food Webs",
        "Ecosystems",
        "Human Systems",
        "Earth & Space",
        "Resources & Sustainability"
      ]
    }
  },

  "6": {
    label: "Grade 6",
    subjects: {
      "English": [
        "Prose & Poetry",
        "Grammar - 8 Parts of Speech",
        "All Tenses",
        "Active & Passive Voice",
        "Reported Speech",
        "Essays",
        "Letter Writing",
        "Reports & Summaries",
        "Creative Writing",
        "Comprehension"
      ],
      "Mathematics": [
        "Number System",
        "Whole Numbers",
        "Playing with Numbers",
        "Basic Geometry",
        "Integers",
        "Fractions",
        "Decimals",
        "Data Handling",
        "Mensuration",
        "Symmetry"
      ],
      "Hindi": [
        "Grammar",
        "Reading Material",
        "Writing Skills",
        "Literature"
      ],
      "Science": [
        "Life Processes & Organization",
        "Physical Environment",
        "Matter & Materials",
        "World of Living",
        "Reproduction"
      ],
      "Social Science": [
        "Ancient India History",
        "Earth & Solar System",
        "Climate & Vegetation",
        "Human Geography",
        "Constitution Basics",
        "Fundamental Rights"
      ],
      "Sanskrit": [
        "Devanagari Script",
        "Vocabulary",
        "Verbs & Nouns",
        "Simple Conversations"
      ]
    }
  },

  "7": {
    label: "Grade 7",
    subjects: {
      "English": [
        "Comprehension & Analysis",
        "Advanced Grammar",
        "Complex Sentences",
        "Modal Verbs",
        "Phrasal Verbs",
        "Formal & Informal Essays",
        "Reports & Scripts",
        "Poetry Composition",
        "Communication Skills"
      ],
      "Mathematics": [
        "Integers & Rational Numbers",
        "Algebraic Expressions",
        "Linear Equations",
        "Geometry - Triangles",
        "Perimeter & Area",
        "Data Handling",
        "Exponents & Powers"
      ],
      "Hindi": [
        "Grammar",
        "Literature",
        "Writing Skills",
        "Comprehension"
      ],
      "Science": [
        "Nutrition & Health",
        "Respiration & Excretion",
        "Transportation",
        "Motion & Forces",
        "Heat & Temperature",
        "Light",
        "Acids, Bases & Salts"
      ],
      "Social Science": [
        "Medieval India History",
        "Physiography",
        "Climate & Vegetation",
        "Union Government",
        "Constitutional Amendments"
      ]
    }
  },

  "8": {
    label: "Grade 8",
    subjects: {
      "English": [
        "Literature Study",
        "Advanced Grammar",
        "Conditional Sentences",
        "Gerunds & Infinitives",
        "Academic Essays",
        "Research Writing",
        "Poetry & Drama",
        "Debate & Argumentation",
        "Public Speaking"
      ],
      "Mathematics": [
        "Rational Numbers",
        "Linear Equations",
        "Quadrilaterals",
        "Practical Geometry",
        "Cubes & Cube Roots",
        "Exponents & Radicals",
        "Comparing Quantities",
        "Algebraic Expressions",
        "Mensuration",
        "Probability"
      ],
      "Hindi": [
        "Grammar",
        "Literature",
        "Writing Skills",
        "Comprehension"
      ],
      "Science": [
        "Matter & Properties",
        "Structure of Atom",
        "Cell Structure",
        "Reproduction",
        "Force & Pressure",
        "Friction",
        "Sound",
        "Chemical Reactions"
      ],
      "Social Science": [
        "Modern India History",
        "Continents & Oceans",
        "Climate Zones",
        "Urbanization",
        "Constitution Framework",
        "Justice System"
      ]
    }
  },

  "9": {
    label: "Grade 9",
    subjects: {
      "English": [
        "Prose & Poetry",
        "Grammar & Vocabulary",
        "Tenses & Voices",
        "Comprehension",
        "Letter Writing",
        "Dialogue Writing",
        "Story Writing",
        "Essay Writing",
        "Communication Skills"
      ],
      "Mathematics": [
        "Number Systems",
        "Polynomials",
        "Linear Equations",
        "Coordinate Geometry",
        "Triangles & Circles",
        "Trigonometry Introduction",
        "Statistics & Probability"
      ],
      "Hindi": [
        "Grammar",
        "Literature",
        "Writing Skills"
      ],
      "Science": [
        "Matter & Its Properties",
        "Atoms & Molecules",
        "Motion",
        "Force & Newton's Laws",
        "Gravitation",
        "Work & Energy",
        "Sound",
        "Life Processes",
        "Diversity in Organisms",
        "Natural Resources"
      ],
      "Social Science": [
        "Nationalism in Europe",
        "Indian Independence",
        "Industrial Revolution",
        "Physiography of India",
        "Climate & Weather",
        "Constitution & Democracy"
      ]
    }
  },

  "10": {
    label: "Grade 10",
    subjects: {
      "English": [
        "Reading & Comprehension",
        "Writing Skills",
        "Grammar",
        "Literature Study",
        "Letter Writing",
        "Creative Writing",
        "Essay Writing"
      ],
      "Mathematics": [
        "Real Numbers",
        "Polynomials",
        "Linear Equations",
        "Quadratic Equations",
        "Coordinate Geometry",
        "Triangles",
        "Circles",
        "Trigonometry",
        "Mensuration",
        "Statistics & Probability"
      ],
      "Hindi": [
        "Grammar",
        "Literature",
        "Writing Skills",
        "Comprehension"
      ],
      "Science": [
        "Chemical Reactions",
        "Acids, Bases & Salts",
        "Metals & Non-metals",
        "Carbon & Compounds",
        "Electricity",
        "Magnetism",
        "Light",
        "Life Processes",
        "Reproduction",
        "Heredity & Evolution",
        "Sustainability"
      ],
      "Social Science": [
        "Rise of Nationalism",
        "Indian National Movement",
        "Global World",
        "Industrialization",
        "India's Geography",
        "Climate",
        "Population",
        "Democracy & Politics",
        "Economics & Development"
      ]
    }
  },

  "11": {
    label: "Grade 11 (Science)",
    subjects: {
      "Physics": [
        "Mechanics",
        "Thermal Physics",
        "Oscillations & Waves",
        "Electrostatics",
        "Current Electricity"
      ],
      "Chemistry": [
        "Basic Concepts",
        "Atomic Structure",
        "Classification of Elements",
        "Chemical Bonding",
        "Thermodynamics",
        "Chemical Equilibrium",
        "Organic Chemistry"
      ],
      "Biology": [
        "Biological Diversity",
        "Structural Organization",
        "Cell Structure & Function",
        "Plant Physiology"
      ],
      "Mathematics": [
        "Sets & Functions",
        "Algebra",
        "Coordinate Geometry",
        "Calculus Basics",
        "Statistics & Probability"
      ]
    }
  },

  "12": {
    label: "Grade 12 (Science)",
    subjects: {
      "Physics": [
        "Electromagnetism",
        "Optics",
        "Modern Physics",
        "Dual Nature of Matter"
      ],
      "Chemistry": [
        "Solutions & Colloids",
        "Electrochemistry",
        "Chemical Kinetics",
        "Surface Chemistry",
        "General Principles",
        "Metals & Metallurgy",
        "Organic Chemistry",
        "Polymers & Biomolecules"
      ],
      "Biology": [
        "Reproduction",
        "Genetics",
        "Molecular Basis of Life",
        "Photosynthesis",
        "Respiration",
        "Coordination",
        "Disease & Immunity",
        "Biotechnology"
      ],
      "Mathematics": [
        "Relations & Functions",
        "Inverse Trigonometry",
        "Matrices & Determinants",
        "Calculus",
        "Vectors & 3D Geometry",
        "Probability"
      ]
    }
  }
};

// Ordered list of grade keys for iteration
const GRADE_ORDER = ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

// Helper function to get subjects for a grade
function getSubjectsForGrade(grade) {
  if (!CBSE_SYLLABUS[grade]) return [];
  return Object.keys(CBSE_SYLLABUS[grade].subjects);
}

// Helper function to get topics for a grade and subject
function getTopicsForGradeAndSubject(grade, subject) {
  if (!CBSE_SYLLABUS[grade] || !CBSE_SYLLABUS[grade].subjects[subject]) return [];
  return CBSE_SYLLABUS[grade].subjects[subject];
}

// Expose for non-module browser usage
if (typeof window !== "undefined") {
  window.CBSE_SYLLABUS = CBSE_SYLLABUS;
  window.GRADE_ORDER = GRADE_ORDER;
  window.getSubjectsForGrade = getSubjectsForGrade;
  window.getTopicsForGradeAndSubject = getTopicsForGradeAndSubject;
}

// Expose for Node-based validation/tests
if (typeof module !== "undefined" && module.exports) {
  module.exports = { CBSE_SYLLABUS, GRADE_ORDER, getSubjectsForGrade, getTopicsForGradeAndSubject };
}
