/*
 * EduMetric — English / Language Arts Quiz Bank (Grades K–10)
 * --------------------------------------------------------------
 * A curated, standards-aligned bank of English Language Arts (ELA)
 * questions covering every grade from Kindergarten through Grade 10.
 *
 * Structure:
 *   ELA_QUIZ_BANK[gradeKey] = {
 *     label: "Human readable grade name",
 *     topics: {
 *       "Topic Name": [
 *         { q: "question text", options: ["A","B","C","D"], answer: <index of correct option> },
 *         ...
 *       ]
 *     }
 *   }
 *
 * Every question is multiple choice. The `answer` field is the 0-based
 * index of the correct option. Fill-in-the-blank quizzes reuse the same
 * data: the correct option's text becomes the expected answer.
 */

const ELA_QUIZ_BANK = {
  /* =========================== KINDERGARTEN =========================== */
  "K": {
    label: "Kindergarten",
    topics: {
      "Letter Recognition": [
        { q: "Which letter comes right after 'C' in the alphabet?", options: ["B", "D", "E", "F"], answer: 1 },
        { q: "Which letter comes right before 'G'?", options: ["F", "H", "E", "D"], answer: 0 },
        { q: "How many letters are in the English alphabet?", options: ["24", "25", "26", "27"], answer: 2 },
        { q: "Which of these letters is a vowel?", options: ["B", "A", "T", "R"], answer: 1 },
        { q: "Which of these is an UPPERCASE (capital) letter?", options: ["a", "b", "D", "e"], answer: 2 }
      ],
      "Beginning Sounds": [
        { q: "Which word begins with the /b/ sound?", options: ["Cat", "Ball", "Dog", "Sun"], answer: 1 },
        { q: "What sound does the word 'Sun' begin with?", options: ["/s/", "/t/", "/m/", "/p/"], answer: 0 },
        { q: "Which word starts with the same sound as 'Moon'?", options: ["Star", "Mouse", "Tree", "Apple"], answer: 1 },
        { q: "Which word begins with the /t/ sound?", options: ["Top", "Fish", "Bird", "Lion"], answer: 0 },
        { q: "What is the first sound in the word 'Dog'?", options: ["/g/", "/o/", "/d/", "/b/"], answer: 2 }
      ],
      "Rhyming Words": [
        { q: "Which word rhymes with 'cat'?", options: ["Dog", "Hat", "Sun", "Cup"], answer: 1 },
        { q: "Which word rhymes with 'bee'?", options: ["Tree", "Car", "Book", "Hand"], answer: 0 },
        { q: "Which word rhymes with 'log'?", options: ["Lamp", "Frog", "Milk", "Ring"], answer: 1 },
        { q: "Which word rhymes with 'star'?", options: ["Sit", "Moon", "Car", "Top"], answer: 2 },
        { q: "Which two words rhyme?", options: ["Cake / Lake", "Cake / Milk", "Cake / Door", "Cake / Fish"], answer: 0 }
      ],
      "Sight Words": [
        { q: "Which spelling is the sight word 'the'?", options: ["teh", "the", "hte", "eht"], answer: 1 },
        { q: "Complete the sentence: 'I ___ happy.'", options: ["am", "the", "and", "to"], answer: 0 },
        { q: "Which word is a color word?", options: ["run", "red", "the", "and"], answer: 1 },
        { q: "Which sight word completes: '___ you like it?'", options: ["Do", "Cat", "Sun", "Hat"], answer: 0 },
        { q: "Which spelling is the sight word 'and'?", options: ["nad", "and", "dna", "ndA"], answer: 1 }
      ],
      "Uppercase & Lowercase": [
        { q: "What is the lowercase form of 'B'?", options: ["b", "d", "p", "q"], answer: 0 },
        { q: "What is the uppercase form of 'm'?", options: ["N", "W", "M", "E"], answer: 2 },
        { q: "A sentence should always begin with which kind of letter?", options: ["lowercase", "uppercase", "a number", "a symbol"], answer: 1 },
        { q: "Which pair shows the SAME letter (uppercase and lowercase)?", options: ["A a", "A b", "B a", "C d"], answer: 0 },
        { q: "A person's name, like 'Sam', should start with a ___ letter.", options: ["lowercase", "uppercase", "small", "silent"], answer: 1 }
      ]
    }
  },

  /* =============================== GRADE 1 =============================== */
  "1": {
    label: "Grade 1",
    topics: {
      "Short Vowel Sounds": [
        { q: "Which word has a short 'a' sound?", options: ["Cake", "Cat", "Car", "Cape"], answer: 1 },
        { q: "Which word has a short 'i' sound?", options: ["Bike", "Sit", "Kite", "Pie"], answer: 1 },
        { q: "Which word has a short 'o' sound?", options: ["Hot", "Boat", "Go", "Toe"], answer: 0 },
        { q: "Which word has a short 'e' sound?", options: ["Bee", "Bed", "See", "Tea"], answer: 1 },
        { q: "Which word has a short 'u' sound?", options: ["Cute", "Cube", "Cup", "Mule"], answer: 2 }
      ],
      "Long Vowel Sounds": [
        { q: "Which word has a long 'a' sound?", options: ["Cat", "Cake", "Cap", "Can"], answer: 1 },
        { q: "Which word has a long 'e' sound?", options: ["Bed", "Pen", "Tree", "Hen"], answer: 2 },
        { q: "Which word has a long 'i' sound?", options: ["Sit", "Pin", "Bike", "Big"], answer: 2 },
        { q: "Which word has a long 'o' sound?", options: ["Hot", "Dog", "Boat", "Pot"], answer: 2 },
        { q: "The silent 'e' at the end of 'cake' makes the vowel sound ___.", options: ["short", "long", "silent", "loud"], answer: 1 }
      ],
      "Sight Words & Sentences": [
        { q: "Which word completes the sentence: 'She ___ to school.'", options: ["go", "goes", "going", "gone"], answer: 1 },
        { q: "Which one is a complete sentence?", options: ["The dog.", "Runs fast.", "The dog runs fast.", "Fast dog"], answer: 2 },
        { q: "What word is the opposite of 'up'?", options: ["down", "top", "high", "over"], answer: 0 },
        { q: "Which sight word fits: 'We ___ playing.'", options: ["is", "am", "are", "be"], answer: 2 },
        { q: "Which word names a place to live?", options: ["house", "mouse", "horse", "hose"], answer: 0 }
      ],
      "Capitalization & Punctuation": [
        { q: "Which word should ALWAYS be capitalized?", options: ["dog", "happy", "Monday", "run"], answer: 2 },
        { q: "What punctuation ends a telling sentence (a statement)?", options: ["?", ".", "!", ","], answer: 1 },
        { q: "What punctuation ends a question?", options: [".", "!", "?", ";"], answer: 2 },
        { q: "Which sentence is written correctly?", options: ["i like dogs.", "I like dogs.", "i like dogs", "I Like dogs"], answer: 1 },
        { q: "The word 'I' should always be ___.", options: ["lowercase", "capitalized", "silent", "plural"], answer: 1 }
      ],
      "Nouns": [
        { q: "A noun is a word that names a ___.", options: ["person, place, or thing", "action", "color only", "number only"], answer: 0 },
        { q: "Which word is a noun?", options: ["run", "jump", "dog", "happy"], answer: 2 },
        { q: "Which word names a place?", options: ["school", "sing", "blue", "fast"], answer: 0 },
        { q: "Which word names a person?", options: ["table", "teacher", "apple", "chair"], answer: 1 },
        { q: "Which word names a thing?", options: ["swim", "ball", "quickly", "she"], answer: 1 }
      ]
    }
  },

  /* =============================== GRADE 2 =============================== */
  "2": {
    label: "Grade 2",
    topics: {
      "Nouns & Verbs": [
        { q: "Which word is a verb (an action word)?", options: ["cat", "jump", "blue", "happy"], answer: 1 },
        { q: "Which word is a noun?", options: ["sing", "quickly", "flower", "run"], answer: 2 },
        { q: "In 'The bird flies,' which word is the verb?", options: ["The", "bird", "flies", "none"], answer: 2 },
        { q: "A verb shows ___.", options: ["a name", "an action", "a color", "a place"], answer: 1 },
        { q: "Which sentence has an action verb?", options: ["He is tall.", "She runs fast.", "The sky is blue.", "It is cold."], answer: 1 }
      ],
      "Plural Nouns": [
        { q: "What is the plural of 'cat'?", options: ["cat", "cats", "cates", "cati"], answer: 1 },
        { q: "What is the plural of 'box'?", options: ["boxs", "boxes", "box", "boxxes"], answer: 1 },
        { q: "What is the plural of 'baby'?", options: ["babys", "babyes", "babies", "baby"], answer: 2 },
        { q: "What is the plural of 'child'?", options: ["childs", "childes", "children", "childrens"], answer: 2 },
        { q: "Most nouns are made plural by adding ___.", options: ["-ed", "-s", "-ing", "-ly"], answer: 1 }
      ],
      "Contractions": [
        { q: "What is the contraction for 'do not'?", options: ["dont", "do'nt", "don't", "donot"], answer: 2 },
        { q: "What is the contraction for 'I am'?", options: ["Im", "I'm", "Iam", "I'am"], answer: 1 },
        { q: "'Can't' is the contraction for ___.", options: ["can not", "can it", "could not", "can to"], answer: 0 },
        { q: "Which two words make the contraction 'it's'?", options: ["it is", "it was", "it had", "it will"], answer: 0 },
        { q: "A contraction uses an ___ to replace the missing letters.", options: ["apostrophe", "comma", "period", "hyphen"], answer: 0 }
      ],
      "Synonyms & Antonyms": [
        { q: "A synonym for 'happy' is ___.", options: ["sad", "glad", "angry", "tired"], answer: 1 },
        { q: "An antonym for 'big' is ___.", options: ["large", "huge", "small", "tall"], answer: 2 },
        { q: "Which word means the SAME as 'fast'?", options: ["slow", "quick", "late", "stop"], answer: 1 },
        { q: "Which word is the OPPOSITE of 'hot'?", options: ["warm", "cold", "boiling", "heat"], answer: 1 },
        { q: "A synonym is a word with a ___ meaning.", options: ["opposite", "similar", "funny", "long"], answer: 1 }
      ],
      "Sentence Types": [
        { q: "A sentence that tells something and ends with a period is a ___.", options: ["question", "statement", "command", "exclamation"], answer: 1 },
        { q: "A sentence that asks something is a ___.", options: ["statement", "question", "exclamation", "command"], answer: 1 },
        { q: "Which one is a question?", options: ["I like pizza.", "Do you like pizza?", "Pizza is good!", "Eat pizza."], answer: 1 },
        { q: "An exclamation shows strong feeling and ends with ___.", options: [".", "?", "!", ","], answer: 2 },
        { q: "'Close the door.' is what kind of sentence?", options: ["statement", "question", "command", "exclamation"], answer: 2 }
      ]
    }
  },

  /* =============================== GRADE 3 =============================== */
  "3": {
    label: "Grade 3",
    topics: {
      "Parts of Speech": [
        { q: "An adjective is a word that describes a ___.", options: ["verb", "noun", "adverb", "sentence"], answer: 1 },
        { q: "In 'the red ball,' which word is the adjective?", options: ["the", "red", "ball", "none"], answer: 1 },
        { q: "An adverb most often describes a ___.", options: ["noun", "verb", "pronoun", "article"], answer: 1 },
        { q: "Which word is the adverb in 'She ran quickly'?", options: ["She", "ran", "quickly", "none"], answer: 2 },
        { q: "Which word is a pronoun?", options: ["dog", "she", "run", "happy"], answer: 1 }
      ],
      "Prefixes & Suffixes": [
        { q: "The prefix 'un-' means ___.", options: ["again", "not", "before", "after"], answer: 1 },
        { q: "What does the word 'rewrite' mean?", options: ["write badly", "write again", "not write", "write before"], answer: 1 },
        { q: "The suffix '-ful' means ___.", options: ["without", "full of", "not", "again"], answer: 1 },
        { q: "The word 'helpful' means ___.", options: ["without help", "full of help", "not helpful", "help again"], answer: 1 },
        { q: "The prefix 'pre-' means ___.", options: ["after", "before", "not", "again"], answer: 1 }
      ],
      "Subject–Verb Agreement": [
        { q: "Choose the correct verb: 'The dog ___ loudly.'", options: ["bark", "barks", "barking", "barked"], answer: 1 },
        { q: "Choose the correct verb: 'They ___ to school.'", options: ["walks", "walk", "walking", "walkes"], answer: 1 },
        { q: "Choose the correct verb: 'She ___ a book.'", options: ["read", "reads", "reading", "readed"], answer: 1 },
        { q: "Choose the correct verb: 'The boys ___ soccer.'", options: ["plays", "play", "playing", "playes"], answer: 1 },
        { q: "A singular subject in the present tense usually takes a verb ending in ___.", options: ["-s", "-ed", "-ing", "-ly"], answer: 0 }
      ],
      "Main Idea & Details": [
        { q: "The main idea of a story is ___.", options: ["a small detail", "what it is mostly about", "the title only", "the last word"], answer: 1 },
        { q: "Supporting details in a paragraph ___ the main idea.", options: ["hide", "support", "ignore", "replace"], answer: 1 },
        { q: "Where is the main idea often found in a paragraph?", options: ["it is never stated", "in a topic sentence", "only in the title", "only in the last word"], answer: 1 },
        { q: "A supporting detail gives ___ about the main idea.", options: ["more information", "nothing", "the opposite", "a new topic"], answer: 0 },
        { q: "If a paragraph is about 'how to plant a seed,' the main idea is ___.", options: ["the color of dirt", "planting a seed", "a rainy day", "a dog"], answer: 1 }
      ],
      "Context Clues": [
        { q: "Context clues are hints in the ___ that help you understand a word.", options: ["dictionary", "sentence", "title", "picture only"], answer: 1 },
        { q: "In 'The arid desert had no water,' the word 'arid' means ___.", options: ["wet", "dry", "cold", "green"], answer: 1 },
        { q: "In 'She was elated, jumping with joy,' the word 'elated' means ___.", options: ["sad", "very happy", "tired", "angry"], answer: 1 },
        { q: "Using context clues helps you find a word's ___.", options: ["spelling", "meaning", "syllables", "rhyme"], answer: 1 },
        { q: "In 'the huge, gigantic whale,' the word 'gigantic' means ___.", options: ["tiny", "very big", "fast", "blue"], answer: 1 }
      ]
    }
  },

  /* =============================== GRADE 4 =============================== */
  "4": {
    label: "Grade 4",
    topics: {
      "Figurative Language": [
        { q: "A simile compares two things using ___.", options: ["is or was", "like or as", "not", "and"], answer: 1 },
        { q: "'Her smile was as bright as the sun' is an example of a ___.", options: ["metaphor", "simile", "pun", "fact"], answer: 1 },
        { q: "A metaphor compares two things ___ using 'like' or 'as'.", options: ["with", "without", "never near", "always with"], answer: 1 },
        { q: "'The classroom was a zoo' is an example of a ___.", options: ["simile", "metaphor", "question", "rhyme"], answer: 1 },
        { q: "Figurative language uses words in a ___ way, not their exact meaning.", options: ["literal", "non-literal", "wrong", "boring"], answer: 1 }
      ],
      "Prepositions": [
        { q: "A preposition often tells about ___.", options: ["an action", "location or time", "a name", "a feeling"], answer: 1 },
        { q: "Which word is a preposition?", options: ["under", "run", "happy", "quickly"], answer: 0 },
        { q: "In 'The cat is on the table,' the preposition is ___.", options: ["cat", "is", "on", "table"], answer: 2 },
        { q: "Which of these words is a preposition?", options: ["jump", "between", "blue", "dog"], answer: 1 },
        { q: "Choose a preposition: 'The book is ___ the shelf.'", options: ["happy", "on", "run", "the"], answer: 1 }
      ],
      "Homophones": [
        { q: "Choose the correct word: 'I have ___ apples.'", options: ["to", "too", "two", "tu"], answer: 2 },
        { q: "Choose the correct word: 'They left ___ books at home.'", options: ["their", "there", "they're", "thier"], answer: 0 },
        { q: "Homophones are words that ___.", options: ["sound the same but have different meanings", "are spelled the same", "always rhyme", "mean the same thing"], answer: 0 },
        { q: "Which sentence is correct?", options: ["The dog wagged it's tail.", "The dog wagged its tail.", "The dog wagged its' tail.", "The dog wagged it tail."], answer: 1 },
        { q: "Choose the correct word: 'We will go ___ the park.'", options: ["too", "two", "to", "tow"], answer: 2 }
      ],
      "Theme": [
        { q: "The theme of a story is its ___.", options: ["setting", "central message or lesson", "first sentence", "number of pages"], answer: 1 },
        { q: "'Honesty is the best policy' could be a story's ___.", options: ["setting", "theme", "character", "title"], answer: 1 },
        { q: "The theme is usually ___.", options: ["printed as the title", "something the reader figures out", "the page number", "the author's name"], answer: 1 },
        { q: "Which of these is a common theme in literature?", options: ["Friendship", "Chapter 1", "Page 5", "The End"], answer: 0 },
        { q: "To find the theme, think about what the ___ learn.", options: ["pages", "characters", "commas", "letters"], answer: 1 }
      ],
      "Types of Sentences": [
        { q: "A declarative sentence ___.", options: ["asks a question", "makes a statement", "gives a command", "shows strong emotion"], answer: 1 },
        { q: "An interrogative sentence ___.", options: ["asks a question", "tells a fact", "gives a command", "exclaims"], answer: 0 },
        { q: "An imperative sentence ___.", options: ["asks a question", "gives a command", "states a fact", "exclaims"], answer: 1 },
        { q: "An exclamatory sentence shows ___.", options: ["a question", "strong feeling", "a command", "a plain fact"], answer: 1 },
        { q: "'What time is it?' is which type of sentence?", options: ["declarative", "interrogative", "imperative", "exclamatory"], answer: 1 }
      ]
    }
  },

  /* =============================== GRADE 5 =============================== */
  "5": {
    label: "Grade 5",
    topics: {
      "Verb Tenses": [
        { q: "'She walked to school' is in the ___ tense.", options: ["present", "past", "future", "none"], answer: 1 },
        { q: "'I will eat lunch' is in the ___ tense.", options: ["past", "present", "future", "none"], answer: 2 },
        { q: "Which sentence is in the present tense?", options: ["He ran.", "He runs.", "He will run.", "He had run."], answer: 1 },
        { q: "The past tense of 'go' is ___.", options: ["goed", "gone", "went", "going"], answer: 2 },
        { q: "The future tense usually uses the helping word ___.", options: ["will", "did", "was", "has"], answer: 0 }
      ],
      "Conjunctions": [
        { q: "A conjunction is a word that ___ words or groups of words.", options: ["separates", "joins", "hides", "ends"], answer: 1 },
        { q: "Which word is a coordinating conjunction?", options: ["but", "dog", "quickly", "under"], answer: 0 },
        { q: "Choose the best conjunction: 'I wanted to play, ___ it was raining.'", options: ["and", "but", "or", "so"], answer: 1 },
        { q: "The words 'and, but, or' are called ___ conjunctions.", options: ["subordinating", "coordinating", "correlative", "proper"], answer: 1 },
        { q: "Choose the best conjunction: 'You can have tea ___ coffee.'", options: ["but", "or", "so", "yet"], answer: 1 }
      ],
      "Greek & Latin Roots": [
        { q: "The root 'tele' means ___.", options: ["write", "far / distant", "water", "life"], answer: 1 },
        { q: "The root 'port' means ___.", options: ["carry", "see", "hear", "light"], answer: 0 },
        { q: "The root 'bio' (as in biology) means ___.", options: ["earth", "life", "sound", "small"], answer: 1 },
        { q: "The root 'aud' (as in audible) means ___.", options: ["see", "hear", "write", "run"], answer: 1 },
        { q: "Knowing word roots helps you figure out a word's ___.", options: ["rhyme", "meaning", "spelling only", "syllables"], answer: 1 }
      ],
      "Point of View": [
        { q: "A story told using 'I' and 'me' is in the ___ point of view.", options: ["first person", "second person", "third person", "no"], answer: 0 },
        { q: "A story told using 'he,' 'she,' and 'they' is in the ___ point of view.", options: ["first person", "second person", "third person", "no"], answer: 2 },
        { q: "A first-person narrator uses the pronoun ___.", options: ["I", "you", "he", "it"], answer: 0 },
        { q: "'You should try harder' uses the ___ point of view.", options: ["first person", "second person", "third person", "no"], answer: 1 },
        { q: "Point of view is the ___ from which a story is told.", options: ["setting", "perspective", "ending", "length"], answer: 1 }
      ],
      "Summarizing": [
        { q: "A summary should include the ___ ideas.", options: ["most important", "least important", "funniest", "longest"], answer: 0 },
        { q: "A good summary is ___.", options: ["longer than the original", "brief and in your own words", "copied exactly", "only the title"], answer: 1 },
        { q: "A summary should leave out ___.", options: ["the main idea", "minor details", "key events", "the topic"], answer: 1 },
        { q: "When you summarize, you retell the text ___.", options: ["word for word", "in your own words", "backwards", "with new characters"], answer: 1 },
        { q: "What is the best reason to summarize a text?", options: ["to make it longer", "to show you understand the key points", "to add your opinions", "to change the ending"], answer: 1 }
      ]
    }
  },

  /* =============================== GRADE 6 =============================== */
  "6": {
    label: "Grade 6",
    topics: {
      "Pronouns & Antecedents": [
        { q: "A pronoun takes the place of a ___.", options: ["verb", "noun", "adjective", "adverb"], answer: 1 },
        { q: "In 'Maria lost her book,' the pronoun is ___.", options: ["Maria", "lost", "her", "book"], answer: 2 },
        { q: "The antecedent is the ___ that a pronoun refers to.", options: ["noun", "verb", "adverb", "preposition"], answer: 0 },
        { q: "Choose the correct pronoun: 'The students finished ___ homework.'", options: ["his", "her", "their", "its"], answer: 2 },
        { q: "Which word is a pronoun?", options: ["they", "happy", "quickly", "table"], answer: 0 }
      ],
      "Clauses & Phrases": [
        { q: "An independent clause can ___.", options: ["stand alone as a sentence", "never be a sentence", "only ask questions", "only be one word"], answer: 0 },
        { q: "A dependent (subordinate) clause ___.", options: ["stands alone", "cannot stand alone", "is a full sentence", "has no verb"], answer: 1 },
        { q: "A phrase is a group of words that ___ a subject and a verb.", options: ["has both", "lacks", "always has", "never needs"], answer: 1 },
        { q: "'Because it was raining' is a ___ clause.", options: ["independent", "dependent", "complete sentence", "phrase"], answer: 1 },
        { q: "Every clause contains a ___.", options: ["subject and a verb", "noun only", "verb only", "preposition"], answer: 0 }
      ],
      "Figurative Language": [
        { q: "Personification gives ___ qualities to non-human things.", options: ["animal", "human", "robot", "plant"], answer: 1 },
        { q: "'The wind whispered through the trees' is an example of ___.", options: ["simile", "personification", "metaphor", "hyperbole"], answer: 1 },
        { q: "Hyperbole is an extreme ___.", options: ["comparison", "exaggeration", "question", "fact"], answer: 1 },
        { q: "'I've told you a million times' is an example of ___.", options: ["simile", "hyperbole", "personification", "pun"], answer: 1 },
        { q: "'The stars danced in the sky' is an example of ___.", options: ["hyperbole", "personification", "simile", "alliteration"], answer: 1 }
      ],
      "Author's Purpose": [
        { q: "An author who writes to make you laugh is writing to ___.", options: ["inform", "persuade", "entertain", "instruct"], answer: 2 },
        { q: "The three main author's purposes are to persuade, inform, and ___.", options: ["confuse", "entertain", "hide", "ignore"], answer: 1 },
        { q: "A news article is mostly written to ___.", options: ["entertain", "inform", "persuade", "scare"], answer: 1 },
        { q: "An advertisement is usually written to ___.", options: ["inform only", "persuade", "entertain only", "summarize"], answer: 1 },
        { q: "The memory aid 'PIE' stands for Persuade, Inform, and ___.", options: ["Explain", "Entertain", "Edit", "Enjoy"], answer: 1 }
      ],
      "Text Structure": [
        { q: "A text that lists events in order of time uses ___ structure.", options: ["cause and effect", "chronological / sequence", "compare and contrast", "problem and solution"], answer: 1 },
        { q: "A text that explains why something happens and its results uses ___.", options: ["cause and effect", "sequence", "description", "compare"], answer: 0 },
        { q: "A text that shows how two things are alike and different uses ___.", options: ["sequence", "compare and contrast", "cause and effect", "problem-solution"], answer: 1 },
        { q: "Signal words like 'first, next, finally' show ___ structure.", options: ["compare", "sequence", "cause", "description"], answer: 1 },
        { q: "A text that presents an issue and how to fix it uses ___ structure.", options: ["problem and solution", "description", "sequence", "compare"], answer: 0 }
      ]
    }
  },

  /* =============================== GRADE 7 =============================== */
  "7": {
    label: "Grade 7",
    topics: {
      "Active & Passive Voice": [
        { q: "In active voice, the subject ___ the action.", options: ["receives", "performs", "ignores", "hides"], answer: 1 },
        { q: "'The ball was thrown by Sam' is in ___ voice.", options: ["active", "passive", "future", "past only"], answer: 1 },
        { q: "'Sam threw the ball' is in ___ voice.", options: ["active", "passive", "neutral", "none"], answer: 0 },
        { q: "In passive voice, the subject ___ the action.", options: ["does", "receives", "avoids", "repeats"], answer: 1 },
        { q: "Which sentence is in the active voice?", options: ["The cake was eaten.", "The dog chased the cat.", "The song was sung.", "The book was read."], answer: 1 }
      ],
      "Phrases & Clauses": [
        { q: "A complex sentence has one independent clause and at least one ___ clause.", options: ["independent", "dependent", "main", "compound"], answer: 1 },
        { q: "A compound sentence joins two ___ clauses.", options: ["dependent", "independent", "noun", "verb"], answer: 1 },
        { q: "A subordinating conjunction (like 'although') begins a ___ clause.", options: ["independent", "dependent", "compound", "main"], answer: 1 },
        { q: "'After the game ended' is a ___.", options: ["complete sentence", "dependent clause", "independent clause", "single word"], answer: 1 },
        { q: "A prepositional phrase begins with a ___.", options: ["verb", "preposition", "noun", "pronoun"], answer: 1 }
      ],
      "Figurative Language": [
        { q: "An idiom is an expression whose meaning is ___ its literal words.", options: ["the same as", "different from", "louder than", "shorter than"], answer: 1 },
        { q: "'It's raining cats and dogs' is an example of an ___.", options: ["idiom", "simile", "metaphor", "fact"], answer: 0 },
        { q: "Alliteration is the repetition of the same ___ sound.", options: ["ending", "beginning", "vowel only", "last"], answer: 1 },
        { q: "'Peter Piper picked a peck' is an example of ___.", options: ["idiom", "alliteration", "hyperbole", "simile"], answer: 1 },
        { q: "The idiom 'break a leg' means ___.", options: ["get hurt", "good luck", "run fast", "sit down"], answer: 1 }
      ],
      "Theme & Central Idea": [
        { q: "The central idea of a nonfiction text is its ___ point.", options: ["smallest", "most important", "last", "funniest"], answer: 1 },
        { q: "Theme is the underlying ___ of a literary work.", options: ["message", "title", "author", "length"], answer: 0 },
        { q: "The central idea is supported by ___.", options: ["details and evidence", "the title only", "page numbers", "the cover"], answer: 0 },
        { q: "To determine theme, analyze the characters' actions and the ___.", options: ["font", "conflict", "page count", "author's name"], answer: 1 },
        { q: "A theme is usually expressed as a ___.", options: ["single-word title", "universal statement about life", "page number", "character's name"], answer: 1 }
      ],
      "Citing Textual Evidence": [
        { q: "Textual evidence is information taken directly from the ___.", options: ["reader's opinion", "text", "title page", "dictionary"], answer: 1 },
        { q: "When you cite evidence, you ___ the text to support your answer.", options: ["ignore", "quote or reference", "rewrite", "hide"], answer: 1 },
        { q: "The phrase 'According to the text...' is used to ___ evidence.", options: ["introduce", "hide", "end", "question"], answer: 0 },
        { q: "Good textual evidence is ___ to the question being asked.", options: ["unrelated", "relevant", "random", "opposite"], answer: 1 },
        { q: "Citing evidence makes your answer more ___.", options: ["confusing", "convincing and supported", "boring", "shorter"], answer: 1 }
      ]
    }
  },

  /* =============================== GRADE 8 =============================== */
  "8": {
    label: "Grade 8",
    topics: {
      "Verbals (Gerunds, Participles, Infinitives)": [
        { q: "A gerund is a verb form ending in '-ing' that acts as a ___.", options: ["verb", "noun", "adjective", "adverb"], answer: 1 },
        { q: "In 'Swimming is fun,' the word 'Swimming' is a ___.", options: ["verb", "gerund", "participle", "infinitive"], answer: 1 },
        { q: "An infinitive is the word 'to' plus a ___.", options: ["noun", "verb", "adjective", "adverb"], answer: 1 },
        { q: "A participle is a verb form used as an ___.", options: ["adverb", "adjective", "noun", "conjunction"], answer: 1 },
        { q: "In 'the running water,' the word 'running' is a ___.", options: ["gerund", "participle", "infinitive", "noun"], answer: 1 }
      ],
      "Sentence Structure": [
        { q: "A simple sentence has ___ independent clause(s).", options: ["one", "two", "three", "zero"], answer: 0 },
        { q: "A compound sentence can join two independent clauses with a comma + conjunction or a ___.", options: ["comma only", "semicolon", "period", "nothing"], answer: 1 },
        { q: "A complex sentence has one independent clause and one or more ___ clauses.", options: ["independent", "dependent", "compound", "simple"], answer: 1 },
        { q: "A compound-complex sentence has at least two independent clauses and ___ dependent clause(s).", options: ["zero", "one or more", "only one", "no"], answer: 1 },
        { q: "'I ran home, and I ate dinner' is a ___ sentence.", options: ["simple", "compound", "complex", "fragment"], answer: 1 }
      ],
      "Mood & Tone": [
        { q: "Tone is the ___ attitude toward the subject.", options: ["reader's", "author's", "character's only", "editor's"], answer: 1 },
        { q: "Mood is the ___ that a text creates in the reader.", options: ["feeling or atmosphere", "plot", "setting only", "length"], answer: 0 },
        { q: "Word choice (diction) helps create ___.", options: ["page numbers", "tone and mood", "margins", "fonts"], answer: 1 },
        { q: "A spooky, dark setting most likely creates a ___ mood.", options: ["cheerful", "tense or eerie", "funny", "calm"], answer: 1 },
        { q: "If an author uses sarcastic words, the tone is ___.", options: ["serious", "mocking or sarcastic", "sad", "formal"], answer: 1 }
      ],
      "Sound Devices": [
        { q: "Onomatopoeia refers to words that ___.", options: ["rhyme", "imitate sounds", "exaggerate", "compare"], answer: 1 },
        { q: "'Buzz,' 'hiss,' and 'boom' are examples of ___.", options: ["similes", "onomatopoeia", "idioms", "metaphors"], answer: 1 },
        { q: "The repetition of vowel sounds within words is called ___.", options: ["alliteration", "assonance", "consonance", "rhyme"], answer: 1 },
        { q: "The repetition of consonant sounds within or at the end of words is ___.", options: ["assonance", "consonance", "simile", "idiom"], answer: 1 },
        { q: "Rhythm and rhyme are most commonly found in ___.", options: ["poetry", "essays", "reports", "contracts"], answer: 0 }
      ],
      "Analyzing Arguments": [
        { q: "A claim is a ___ that the writer wants to prove.", options: ["question", "statement or position", "story", "summary"], answer: 1 },
        { q: "Evidence is used to ___ a claim.", options: ["weaken", "support", "hide", "ignore"], answer: 1 },
        { q: "A counterargument is an opposing ___.", options: ["claim or viewpoint", "title", "setting", "summary"], answer: 0 },
        { q: "Reasoning explains how the evidence ___ the claim.", options: ["contradicts", "supports or connects to", "hides", "ends"], answer: 1 },
        { q: "A strong argument uses credible ___.", options: ["opinions only", "evidence", "guesses", "rumors"], answer: 1 }
      ]
    }
  },

  /* =============================== GRADE 9 =============================== */
  "9": {
    label: "Grade 9",
    topics: {
      "Literary Devices": [
        { q: "Foreshadowing is a hint about ___ events.", options: ["past", "future", "current", "deleted"], answer: 1 },
        { q: "A symbol is something that represents a larger ___.", options: ["word", "idea", "page", "font"], answer: 1 },
        { q: "Imagery is descriptive language that appeals to the reader's ___.", options: ["wallet", "five senses", "memory only", "grammar"], answer: 1 },
        { q: "A flashback interrupts the story to show a ___ event.", options: ["future", "past", "present", "fake"], answer: 1 },
        { q: "An allusion is a reference to a well-known person, place, event, or ___.", options: ["work of literature", "grammar rule", "page", "font"], answer: 0 }
      ],
      "Types of Irony": [
        { q: "Verbal irony is when a speaker says the ___ of what they mean.", options: ["same", "opposite", "truth", "nothing"], answer: 1 },
        { q: "Situational irony is when the opposite of what is ___ happens.", options: ["expected", "written", "spoken", "read"], answer: 0 },
        { q: "Dramatic irony is when the ___ knows something the characters do not.", options: ["author", "audience", "editor", "narrator"], answer: 1 },
        { q: "Saying 'What a beautiful day!' during a thunderstorm is ___ irony.", options: ["dramatic", "verbal", "situational", "cosmic"], answer: 1 },
        { q: "In a horror film, the audience knowing a villain is hiding (but the character doesn't) is ___ irony.", options: ["verbal", "situational", "dramatic", "none"], answer: 2 }
      ],
      "Rhetorical Appeals": [
        { q: "Ethos is an appeal to ___.", options: ["emotion", "credibility or ethics", "logic", "humor"], answer: 1 },
        { q: "Pathos is an appeal to ___.", options: ["emotion", "logic", "authority", "time"], answer: 0 },
        { q: "Logos is an appeal to ___.", options: ["emotion", "logic or reason", "ethics", "fear"], answer: 1 },
        { q: "A speaker who cites facts and statistics is using ___.", options: ["ethos", "pathos", "logos", "none"], answer: 2 },
        { q: "A charity ad that shows sad images to make you feel something uses ___.", options: ["logos", "ethos", "pathos", "syntax"], answer: 2 }
      ],
      "Grammar & Parallel Structure": [
        { q: "Parallel structure means using the same ___ pattern for related ideas.", options: ["color", "grammatical", "length", "font"], answer: 1 },
        { q: "Which sentence uses correct parallel structure?", options: ["She likes reading, writing, and to swim.", "She likes reading, writing, and swimming.", "She likes to read, writing, and swims.", "She likes read, write, and swimming."], answer: 1 },
        { q: "A run-on sentence ___.", options: ["is too short", "joins clauses incorrectly", "has no verb", "is a question"], answer: 1 },
        { q: "A comma splice joins two independent clauses with only a ___.", options: ["period", "comma", "semicolon", "conjunction"], answer: 1 },
        { q: "A sentence fragment is missing a subject or a ___.", options: ["comma", "complete verb or thought", "title", "adjective"], answer: 1 }
      ],
      "Elements of Drama": [
        { q: "A soliloquy is a speech a character gives ___.", options: ["to other characters", "alone, revealing inner thoughts", "to the king", "while singing"], answer: 1 },
        { q: "Dialogue is the ___ between characters.", options: ["conversation", "setting", "stage", "costume"], answer: 0 },
        { q: "An aside is a remark made to the ___, unheard by other characters.", options: ["author", "audience", "director", "narrator"], answer: 1 },
        { q: "The playwright is the person who ___ the play.", options: ["acts in", "writes", "directs", "watches"], answer: 1 },
        { q: "Stage directions tell the actors how to ___.", options: ["pay", "move and speak", "write", "read"], answer: 1 }
      ]
    }
  },

  /* =============================== GRADE 10 =============================== */
  "10": {
    label: "Grade 10",
    topics: {
      "Rhetorical Devices": [
        { q: "A rhetorical question is asked for ___ rather than an answer.", options: ["effect", "homework", "grammar", "rhyme"], answer: 0 },
        { q: "Repetition is used to ___ an idea.", options: ["hide", "emphasize", "shorten", "delete"], answer: 1 },
        { q: "Antithesis places two ___ ideas together for contrast.", options: ["similar", "opposite", "equal", "random"], answer: 1 },
        { q: "Parallelism repeats a ___ structure for effect.", options: ["random", "grammatical", "rhyming", "color"], answer: 1 },
        { q: "An analogy explains something by ___ it to something familiar.", options: ["comparing", "hiding", "deleting", "ignoring"], answer: 0 }
      ],
      "Tone & Diction": [
        { q: "Diction refers to a writer's ___ choice.", options: ["word", "color", "page", "font"], answer: 0 },
        { q: "Formal diction would most likely appear in a ___.", options: ["text to a friend", "research paper", "comic strip", "casual joke"], answer: 1 },
        { q: "Connotation is the ___ meaning of a word.", options: ["dictionary", "implied or emotional", "opposite", "plural"], answer: 1 },
        { q: "Denotation is the ___ meaning of a word.", options: ["emotional", "literal or dictionary", "hidden", "opposite"], answer: 1 },
        { q: "The words 'thrifty' and 'cheap' share a denotation but differ in ___.", options: ["spelling", "connotation", "syllables", "length"], answer: 1 }
      ],
      "Allusion": [
        { q: "An allusion is a reference to a famous person, event, or ___.", options: ["work of literature", "grammar rule", "page number", "font"], answer: 0 },
        { q: "Calling someone a 'Romeo' is an allusion to a work by ___.", options: ["Dickens", "Shakespeare", "Poe", "Frost"], answer: 1 },
        { q: "Allusions rely on the reader's ___ knowledge.", options: ["prior or background", "future", "grammar", "math"], answer: 0 },
        { q: "A biblical or mythological reference is a type of ___.", options: ["allusion", "simile", "idiom", "pun"], answer: 0 },
        { q: "The purpose of an allusion is to add ___ meaning quickly.", options: ["deeper", "less", "no", "random"], answer: 0 }
      ],
      "Syntax": [
        { q: "Syntax refers to the ___ of words in a sentence.", options: ["spelling", "arrangement or order", "meaning", "sound"], answer: 1 },
        { q: "A short, simple sentence can create a feeling of ___.", options: ["urgency or emphasis", "constant confusion", "boredom", "rhyme"], answer: 0 },
        { q: "Long, complex sentences can create a ___ effect.", options: ["flowing or detailed", "choppy", "silent", "rhyming"], answer: 0 },
        { q: "Inverted syntax changes the normal ___ order.", options: ["word", "page", "chapter", "font"], answer: 0 },
        { q: "Writers vary syntax to control ___ and emphasis.", options: ["pace or rhythm", "spelling", "margins", "page count"], answer: 0 }
      ],
      "Literary Analysis": [
        { q: "A protagonist is the ___ character.", options: ["main", "evil", "minor", "background"], answer: 0 },
        { q: "An antagonist ___ the protagonist.", options: ["helps", "opposes", "ignores", "copies"], answer: 1 },
        { q: "The climax is the ___ point of a story.", options: ["beginning", "turning or highest", "ending only", "title"], answer: 1 },
        { q: "A dynamic character ___ over the course of a story.", options: ["changes", "stays the same", "disappears", "narrates"], answer: 0 },
        { q: "The resolution is the part of a story where conflicts are ___.", options: ["introduced", "resolved", "ignored", "created"], answer: 1 }
      ]
    }
  }
};

// Ordered list of grade keys for iteration / dropdowns.
const GRADE_ORDER = ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

// Expose for non-module browser usage.
if (typeof window !== "undefined") {
  window.ELA_QUIZ_BANK = ELA_QUIZ_BANK;
  window.GRADE_ORDER = GRADE_ORDER;
}
// Expose for Node-based validation/tests.
if (typeof module !== "undefined" && module.exports) {
  module.exports = { ELA_QUIZ_BANK, GRADE_ORDER };
}
