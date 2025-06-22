const fs = require('fs');
const path = require('path');

// Read questions from all files
const questions1to3 = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/questions-levels-1-3.json'), 'utf8'));
const questions4to7 = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/questions-levels-4-7.json'), 'utf8'));
const questions8to14 = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/questions-levels-8-14.json'), 'utf8'));
const questions15to21 = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/questions-levels-15-21.json'), 'utf8'));
const questions22to30 = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/questions-levels-22-30.json'), 'utf8'));
const questionsEconomics = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/questions-economics-fundamentals.json'), 'utf8'));
const questionsIntermediate = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/questions-intermediate-bridge.json'), 'utf8'));
const questionsPractical = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/questions-practical-usage.json'), 'utf8'));
const questionsLightning = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/questions-lightning-network.json'), 'utf8'));
const questionsPrivacy = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/questions-privacy-security.json'), 'utf8'));
const questionsRecent = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/questions-recent-developments.json'), 'utf8'));

// Combine all questions
const allQuestions = [
  ...questions1to3.questions,
  ...questions4to7.questions,
  ...questions8to14.questions,
  ...questions15to21.questions,
  ...questions22to30.questions,
  ...questionsEconomics.questions,
  ...questionsIntermediate.questions,
  ...questionsPractical.questions,
  ...questionsLightning.questions,
  ...questionsPrivacy.questions,
  ...questionsRecent.questions
];

// Create the combined data structure
const combinedData = {
  total_questions: allQuestions.length,
  levels_complete: 30,
  questions: allQuestions
};

// Write to all-questions.json
fs.writeFileSync(
  path.join(__dirname, '../data/all-questions.json'),
  JSON.stringify(combinedData, null, 2),
  'utf8'
);

// Also update the main questions.json file
const questionsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/questions.json'), 'utf8'));
questionsData.questions = allQuestions;
fs.writeFileSync(
  path.join(__dirname, '../data/questions.json'),
  JSON.stringify(questionsData, null, 2),
  'utf8'
);

// Calculate totals
const originalQuestions = questions1to3.questions.length + questions4to7.questions.length + questions8to14.questions.length + questions15to21.questions.length + questions22to30.questions.length;
const phaseOneAdded = questionsEconomics.questions.length + questionsIntermediate.questions.length + questionsPractical.questions.length;
const phaseTwoAdded = questionsLightning.questions.length + questionsPrivacy.questions.length + questionsRecent.questions.length;

console.log(`\n=== Bitcoin Trivia Database Updated ===`);
console.log(`Original levels 1-30: ${originalQuestions} questions (after removing 40 overly technical)`);
console.log(`\nPhase 1 Additions:`);
console.log(`  Economics: ${questionsEconomics.questions.length} questions`);
console.log(`  Intermediate: ${questionsIntermediate.questions.length} questions`);
console.log(`  Practical: ${questionsPractical.questions.length} questions`);
console.log(`\nPhase 2 Additions:`);
console.log(`  Lightning Network: ${questionsLightning.questions.length} questions`);
console.log(`  Privacy & Security: ${questionsPrivacy.questions.length} questions`);
console.log(`  Recent Developments: ${questionsRecent.questions.length} questions`);
console.log(`\nTotal questions: ${allQuestions.length}`);
console.log(`Net improvement: +${allQuestions.length - 360} questions (added ${phaseOneAdded + phaseTwoAdded}, removed 40)`);
console.log(`Quality improvement: Better category balance and educational progression`);
console.log(`======================================\n`);