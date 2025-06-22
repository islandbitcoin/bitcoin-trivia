# Bitcoin Trivia Game Database

A comprehensive Bitcoin trivia question database with community submission and admin approval system. This repository contains 252+ questions across 21 levels with varying difficulty from beginner to expert.

## 🎮 Game Structure

- **21 Levels**: Each level contains 12 questions
- **Difficulty Scale**: 1-10 (1 = beginner, 10 = expert/trick questions)
- **Categories**: History, Technology, Mining, Economics, Security, Network, Development, Privacy, Culture, Transactions, Basics

## 📁 Project Structure

```
bitcoin-trivia/
├── data/
│   ├── questions.json          # Main database with all questions
│   ├── questions-levels-1-3.json   # Questions for levels 1-3
│   └── schema.json            # Question data schema
├── submit.html                # Public submission form
├── admin.html                 # Admin approval interface
├── .github/
│   └── workflows/
│       └── process-submission.yml  # Automated submission processing
└── README.md                  # This file
```

## 🚀 Getting Started

### For Players/Web App Developers

The question database is available in JSON format in the `data/` directory. Each question follows this schema:

```json
{
  "id": "q001",
  "question": "Who is the pseudonymous creator of Bitcoin?",
  "options": {
    "a": "Vitalik Buterin",
    "b": "Satoshi Nakamoto",
    "c": "Nick Szabo",
    "d": "Hal Finney"
  },
  "correct_answer": "b",
  "difficulty": 1,
  "level": 1,
  "category": "History",
  "explanation": "Satoshi Nakamoto is the pseudonym used by the unknown person or group who created Bitcoin.",
  "created_at": "2025-01-22T00:00:00Z"
}
```

### For Contributors

1. **Submit a Question**: 
   - Open `submit.html` in your browser
   - Fill out the form with your trivia question
   - Submit for review

2. **Submission Requirements**:
   - Question must be factual and verifiable
   - Provide 4 multiple choice options
   - Include a clear explanation
   - Select appropriate difficulty (1-10)
   - Choose relevant category

### For Administrators

1. **Review Submissions**:
   - Open `admin.html` in your browser
   - Review pending submissions
   - Approve, edit, or reject questions
   - Assign questions to appropriate levels

2. **GitHub Workflow**:
   - Submissions create GitHub issues with `trivia-submission` label
   - Add `approved` label to approve a question
   - Add `rejected` label to reject a question
   - Workflow automatically updates the database

## 🔧 Setup Instructions

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bitcoin-trivia.git
   cd bitcoin-trivia
   ```

2. Serve the HTML files:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Or using Node.js
   npx http-server
   ```

3. Access the pages:
   - Submission form: `http://localhost:8000/submit.html`
   - Admin panel: `http://localhost:8000/admin.html`

### GitHub Pages Deployment

1. Enable GitHub Pages in repository settings
2. Set source to main branch, root directory
3. Access pages at:
   - `https://yourusername.github.io/bitcoin-trivia/submit.html`
   - `https://yourusername.github.io/bitcoin-trivia/admin.html`

## 📊 Question Distribution

### Current Status
- Levels 1-3: ✅ Complete (36 questions)
- Levels 4-7: 🚧 In Progress
- Levels 8-14: 📝 Planned
- Levels 15-21: 📝 Planned

### Difficulty Guidelines

| Difficulty | Description | Example Topics |
|------------|-------------|----------------|
| 1-3 | Basic concepts anyone interested in Bitcoin should know | What is Bitcoin, who created it, basic terminology |
| 4-7 | Intermediate knowledge requiring some study | Technical concepts, protocol details, ecosystem knowledge |
| 8-10 | Expert level requiring deep understanding | Advanced cryptography, protocol intricacies, historical minutiae |

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Submit Questions**: Use the submission form to contribute new questions
2. **Review Questions**: Help validate facts and explanations
3. **Report Issues**: Found an error? Open a GitHub issue
4. **Improve Code**: Submit PRs for the submission/admin interfaces

## 📝 API Usage

For web app integration, fetch questions directly:

```javascript
// Fetch all questions
fetch('https://raw.githubusercontent.com/yourusername/bitcoin-trivia/main/data/questions.json')
  .then(response => response.json())
  .then(data => {
    const questions = data.questions;
    // Use questions in your app
  });

// Get questions for a specific level
const level = 5;
const levelQuestions = questions.filter(q => q.level === level);

// Get questions by difficulty
const easyQuestions = questions.filter(q => q.difficulty <= 3);
```

## 🔐 Security Notes

- Never commit sensitive data or private keys
- The admin interface should be protected in production
- Consider implementing authentication for admin functions
- Validate all submissions before adding to the database

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Bitcoin community for the wealth of knowledge
- Contributors who submit quality trivia questions
- Satoshi Nakamoto for creating Bitcoin

---

**Note**: This is a community project. Always verify information independently when using for educational purposes.