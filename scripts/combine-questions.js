const fs = require('fs');
const path = require('path');

// Read questions from all files
const questions1to3 = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/questions-levels-1-3.json'), 'utf8'));
const questions4to7 = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/questions-levels-4-7.json'), 'utf8'));
const questions8to14 = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/questions-levels-8-14.json'), 'utf8'));
const questions15to21 = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/questions-levels-15-21.json'), 'utf8'));

// Combine all questions
const allQuestions = [
  ...questions1to3.questions,
  ...questions4to7.questions,
  ...questions8to14.questions,
  ...questions15to21.questions
];

// Create the combined data structure
const combinedData = {
  total_questions: allQuestions.length,
  levels_complete: 21,
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

console.log(`Successfully combined ${allQuestions.length} questions from levels 1-21`);
console.log(`Questions per level: ${allQuestions.length / 21} (should be 12)`);