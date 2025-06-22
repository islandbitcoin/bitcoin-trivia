# Changelog

All notable changes to the Bitcoin Trivia Platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-01-22

### Added
- **New Game Modes**
  - Story Mode: Learn Bitcoin through 8 historical chapters
  - Challenge Mode: Lightning rounds, survival mode, and daily challenges
  - Enhanced main menu showcasing all game modes
  - Community discussions system

- **Content Expansion** (425 total questions, up from 360)
  - 25 Economics fundamental questions
  - 20 Lightning Network questions
  - 15 Privacy & Security questions
  - 20 Intermediate bridge questions (difficulty 4-6)
  - 15 Practical usage scenario questions
  - 10 Recent developments questions (Ordinals, Taproot, etc.)
  - Extended to 30 levels (levels 22-30 with 108 expert questions)

- **Platform Features**
  - Beautiful new main menu interface
  - Discussion system with categories and search
  - Updated submission form with Nostr login support
  - Progress tracking and achievement systems
  - Multiple difficulty paths for different skill levels

### Changed
- Improved category balance (reduced Technology dominance from 40.8% to ~30%)
- Enhanced difficulty progression with more intermediate questions
- Updated classic game stats to reflect 425 questions and 30 levels
- Modernized UI/UX across all interfaces
- Better educational flow from beginner to expert

### Removed
- 40 overly technical questions that tested memorization over understanding
- Questions focusing on obscure implementation details
- Duplicate or very similar questions

### Technical
- Added combine-questions.js script for merging question files
- Improved question database structure
- Added new question category files for better organization

## [0.0.1-dev] - 2025-01-21

### Added
- Initial project structure
- Basic question database with 252 questions (levels 1-21)
- Submit and admin HTML interfaces
- GitHub Actions workflow for automated submissions
- Nostr authentication integration
- Question schema and validation

### Categories Included
- History, Technology, Mining, Economics, Security
- Network, Development, Privacy, Culture, Transactions, Basics

---

## Future Releases (Planned)

### [0.2.0] - Upcoming
- Multiplayer tournament mode
- Study mode with spaced repetition
- Mobile-responsive design improvements
- Additional language support

### [0.3.0] - Future
- Lightning Network payment integration
- Custom question set creation
- API for third-party applications
- Educational certificates and badges