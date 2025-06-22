# Bitcoin Trivia Game Platform

A comprehensive Bitcoin education platform featuring multiple game modes, 425+ questions, and community features. Learn Bitcoin through engaging gameplay, from basic concepts to expert-level knowledge.

## 🎮 What's New in v0.1.0

- **425 Total Questions** with improved educational balance
- **Story Mode**: Learn Bitcoin through 8 historical chapters
- **Challenge Mode**: Lightning rounds, survival mode, and daily challenges  
- **Enhanced Content**: Lightning Network, Privacy, Recent Developments
- **Community Features**: Discussion system and improved submission process
- **Better Difficulty Progression**: Smoother learning curve from beginner to expert

## 🚀 Quick Start

### Play the Game
Visit `main-menu.html` to explore all game modes:
- **Classic Mode**: Traditional trivia with 30 levels
- **Story Mode**: Historical journey through Bitcoin's development
- **Challenge Mode**: Competitive gameplay with leaderboards
- **Community**: Join discussions and submit questions

### Game Structure

- **30 Levels**: Expanded from 21 to 30 levels
- **425 Questions**: Carefully balanced across categories
- **Difficulty Scale**: 1-10 (better progression)
- **12 Categories**: Including new Lightning Network and Practical Usage

## 📁 Project Structure

```
bitcoin-trivia/
├── main-menu.html             # New enhanced main menu
├── index.html                 # Classic game mode
├── story-mode.html            # Story-based learning
├── challenge-mode.html        # Competitive challenges
├── discussions.html           # Community discussions
├── submit.html                # Submit questions (with Nostr login)
├── admin.html                 # Review submissions
├── data/
│   ├── questions.json         # Combined database (425 questions)
│   ├── all-questions.json     # Alternative combined format
│   ├── questions-levels-*.json     # Level-specific files
│   ├── questions-economics-fundamentals.json
│   ├── questions-lightning-network.json
│   ├── questions-privacy-security.json
│   └── schema.json            # Question schema
├── scripts/
│   └── combine-questions.js   # Merge question files
└── .github/
    └── workflows/
        └── process-submission.yml
```

## 📊 Content Overview

### Question Distribution by Category
- **Technology**: ~30% (reduced from 40.8%)
- **Economics**: ~12% (increased from 3.6%)
- **History**: ~11%
- **Lightning Network**: ~5% (new)
- **Development**: ~10%
- **Security**: ~8%
- **Privacy**: ~6% (increased from 1.4%)
- **Mining**: ~6%
- **Practical Usage**: ~4% (new)
- **Network**: ~5%
- **Other**: ~3%

### Difficulty Distribution
- **Beginner (1-3)**: Better coverage for newcomers
- **Intermediate (4-6)**: Significantly expanded bridge content
- **Advanced (7-8)**: Challenging but educational
- **Expert (9-10)**: Deep protocol knowledge

## 🎯 Game Modes

### Classic Mode
Traditional level-based progression through all 425 questions.

### Story Mode
8 chapters covering Bitcoin's history:
1. The Cypherpunk Origins (1970s-2008)
2. The Genesis Block (2008-2009)
3. Early Adopters (2009-2011)
4. Growing Pains (2011-2013)
5. Mainstream Attention (2013-2017)
6. Institutional Adoption (2017-2021)
7. Technical Evolution (2021-2023)
8. The Future Unfolds (2024+)

### Challenge Mode
- **Lightning Round**: 20 questions in 5 minutes
- **Survival Mode**: How long can you last?
- **Expert Gauntlet**: 10 difficulty 9-10 questions
- **Daily Challenges**: New themed challenges every day

## 🔧 Setup Instructions

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/islandbitcoin/bitcoin-trivia.git
   cd bitcoin-trivia
   ```

2. Serve the HTML files:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Or using Node.js
   npx http-server
   ```

3. Access the game:
   - Main Menu: `http://localhost:8000/main-menu.html`
   - Classic Game: `http://localhost:8000/index.html`

### Combining Question Files

After editing individual question files:
```bash
node scripts/combine-questions.js
```

This merges all question files into `questions.json` and `all-questions.json`.

## 🤝 Contributing

### Submit Questions
1. Visit `submit.html`
2. Optionally login with Nostr for attribution
3. Fill out the question form
4. Submit for community review

### Review Questions
1. Visit `admin.html`
2. Filter and review pending submissions
3. Approve or reject with feedback

### Question Guidelines
- **Accuracy**: Must be factually correct and verifiable
- **Educational**: Include helpful explanations
- **Balanced**: Avoid overly technical memorization
- **Relevant**: Focus on practical Bitcoin knowledge

## 📝 API Usage

For integration into other projects:

```javascript
// Fetch all questions
fetch('https://raw.githubusercontent.com/islandbitcoin/bitcoin-trivia/main/data/all-questions.json')
  .then(response => response.json())
  .then(data => {
    console.log(`Total questions: ${data.total_questions}`);
    const questions = data.questions;
  });

// Filter by category
const lightningQuestions = questions.filter(q => q.category === 'Lightning Network');

// Filter by difficulty range
const intermediateQuestions = questions.filter(q => q.difficulty >= 4 && q.difficulty <= 6);
```

## 🔐 Security & Privacy

- **No tracking**: No analytics or user tracking
- **Local storage**: Progress saved locally only
- **Open source**: Fully auditable code
- **Nostr integration**: Optional, privacy-preserving identity

## 📈 Roadmap

### Coming Soon
- Multiplayer tournaments
- Study mode with spaced repetition
- Mobile app versions
- More language translations
- Integration with Lightning payments

### Future Features
- AI-powered difficulty adjustment
- Custom question sets
- Team challenges
- Educational certificates
- API for third-party apps

## 🙏 Acknowledgments

- Bitcoin community for knowledge and feedback
- All contributors who submitted questions
- Nostr protocol for decentralized identity
- Open source projects that inspired this platform

## 📄 License

MIT License - See LICENSE file for details

---

**Educational Purpose**: This platform is designed for Bitcoin education. Always verify information independently and never share private keys or seed phrases.

**Contribute**: Help improve Bitcoin education by submitting questions, reporting errors, or contributing code!