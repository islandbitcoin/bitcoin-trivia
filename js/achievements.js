/**
 * Achievement and Engagement System for Bitcoin Trivia
 * Tracks progress, unlocks rewards, and encourages daily play
 */

const Achievements = {
    // Achievement definitions
    definitions: {
        // Streak achievements
        firstStreak: { id: 'firstStreak', name: 'First Steps', description: 'Get a 5-question streak', icon: '🔥', points: 50 },
        weekStreak: { id: 'weekStreak', name: 'Week Warrior', description: 'Play 7 days in a row', icon: '📅', points: 100 },
        monthStreak: { id: 'monthStreak', name: 'Monthly Master', description: 'Play 30 days in a row', icon: '🗓️', points: 500 },
        
        // Accuracy achievements
        perfectLevel: { id: 'perfectLevel', name: 'Perfectionist', description: 'Complete a level with 100% accuracy', icon: '💯', points: 75 },
        speedDemon: { id: 'speedDemon', name: 'Speed Demon', description: 'Answer 10 questions correctly in under 5 minutes', icon: '⚡', points: 100 },
        
        // Progress achievements
        firstLevel: { id: 'firstLevel', name: 'Bitcoin Beginner', description: 'Complete your first level', icon: '🎯', points: 25 },
        tenLevels: { id: 'tenLevels', name: 'Making Progress', description: 'Complete 10 levels', icon: '📈', points: 150 },
        allLevels: { id: 'allLevels', name: 'Bitcoin Expert', description: 'Complete all 30 levels', icon: '🏆', points: 1000 },
        
        // Category mastery
        historyMaster: { id: 'historyMaster', name: 'History Buff', description: 'Answer 50 History questions correctly', icon: '📚', points: 200 },
        techMaster: { id: 'techMaster', name: 'Tech Wizard', description: 'Answer 50 Technology questions correctly', icon: '💻', points: 200 },
        economicsMaster: { id: 'economicsMaster', name: 'Economic Genius', description: 'Answer 50 Economics questions correctly', icon: '💰', points: 200 },
        
        // Special achievements
        nightOwl: { id: 'nightOwl', name: 'Night Owl', description: 'Play after midnight', icon: '🦉', points: 50 },
        earlyBird: { id: 'earlyBird', name: 'Early Bird', description: 'Play before 6 AM', icon: '🐦', points: 50 },
        weekendWarrior: { id: 'weekendWarrior', name: 'Weekend Warrior', description: 'Play on Saturday and Sunday', icon: '🎮', points: 75 },
        
        // Difficulty achievements
        hardMode: { id: 'hardMode', name: 'Fearless', description: 'Answer 10 difficulty 9-10 questions correctly', icon: '💪', points: 300 },
        lightningExpert: { id: 'lightningExpert', name: 'Lightning Expert', description: 'Master all Lightning Network questions', icon: '⚡', points: 250 },
        privacyPro: { id: 'privacyPro', name: 'Privacy Pro', description: 'Master all Privacy questions', icon: '🔒', points: 250 }
    },
    
    // Daily rewards system
    dailyRewards: [
        { day: 1, points: 10, bonus: 'Double XP for first game' },
        { day: 2, points: 20, bonus: 'Skip one question' },
        { day: 3, points: 30, bonus: '50/50 hint available' },
        { day: 4, points: 40, bonus: 'Bonus category choice' },
        { day: 5, points: 50, bonus: 'Extra life' },
        { day: 6, points: 60, bonus: 'Time freeze power-up' },
        { day: 7, points: 100, bonus: 'Weekly champion badge' }
    ],
    
    // Initialize achievement system
    init: function() {
        this.loadAchievements();
        this.checkDailyLogin();
        this.setupEventListeners();
    },
    
    // Load saved achievements
    loadAchievements: function() {
        const saved = localStorage.getItem('achievements');
        this.unlocked = saved ? JSON.parse(saved) : {};
        
        const stats = localStorage.getItem('gameStats');
        this.stats = stats ? JSON.parse(stats) : {
            totalQuestions: 0,
            correctAnswers: 0,
            categoryStats: {},
            streakRecord: 0,
            totalPoints: 0,
            lastPlayed: null,
            daysPlayed: 0,
            consecutiveDays: 0
        };
    },
    
    // Save achievements and stats
    save: function() {
        localStorage.setItem('achievements', JSON.stringify(this.unlocked));
        localStorage.setItem('gameStats', JSON.stringify(this.stats));
    },
    
    // Check and award achievements
    check: function(event, data) {
        switch(event) {
            case 'questionAnswered':
                this.checkQuestionAchievements(data);
                break;
            case 'levelComplete':
                this.checkLevelAchievements(data);
                break;
            case 'streak':
                this.checkStreakAchievements(data);
                break;
            case 'daily':
                this.checkDailyAchievements();
                break;
        }
    },
    
    // Check question-related achievements
    checkQuestionAchievements: function(data) {
        this.stats.totalQuestions++;
        
        if (data.correct) {
            this.stats.correctAnswers++;
            
            // Update category stats
            const category = data.question.category;
            if (!this.stats.categoryStats[category]) {
                this.stats.categoryStats[category] = { correct: 0, total: 0 };
            }
            this.stats.categoryStats[category].correct++;
            
            // Check category mastery
            if (this.stats.categoryStats[category].correct === 50) {
                const categoryAchievements = {
                    'History': 'historyMaster',
                    'Technology': 'techMaster',
                    'Economics': 'economicsMaster'
                };
                
                if (categoryAchievements[category]) {
                    this.unlock(categoryAchievements[category]);
                }
            }
            
            // Check difficulty achievements
            if (data.question.difficulty >= 9) {
                if (!this.stats.hardQuestions) this.stats.hardQuestions = 0;
                this.stats.hardQuestions++;
                
                if (this.stats.hardQuestions === 10) {
                    this.unlock('hardMode');
                }
            }
        }
        
        this.stats.categoryStats[data.question.category].total++;
        this.save();
    },
    
    // Check level-related achievements
    checkLevelAchievements: function(data) {
        if (!this.unlocked.firstLevel) {
            this.unlock('firstLevel');
        }
        
        if (data.accuracy === 100) {
            this.unlock('perfectLevel');
        }
        
        const levelsCompleted = data.level;
        if (levelsCompleted === 10) {
            this.unlock('tenLevels');
        } else if (levelsCompleted === 30) {
            this.unlock('allLevels');
        }
    },
    
    // Check streak achievements
    checkStreakAchievements: function(data) {
        if (data.streak === 5) {
            this.unlock('firstStreak');
        }
        
        if (data.streak > this.stats.streakRecord) {
            this.stats.streakRecord = data.streak;
        }
        
        this.save();
    },
    
    // Check daily login and play achievements
    checkDailyLogin: function() {
        const today = new Date().toDateString();
        const lastPlayed = this.stats.lastPlayed;
        
        if (lastPlayed !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastPlayed === yesterday.toDateString()) {
                this.stats.consecutiveDays++;
            } else {
                this.stats.consecutiveDays = 1;
            }
            
            this.stats.lastPlayed = today;
            this.stats.daysPlayed++;
            
            // Award daily login bonus
            this.awardDailyBonus();
            
            // Check time-based achievements
            const hour = new Date().getHours();
            if (hour >= 0 && hour < 6) {
                this.unlock('earlyBird');
            } else if (hour >= 22 || hour < 2) {
                this.unlock('nightOwl');
            }
            
            // Check day-based achievements
            const day = new Date().getDay();
            if (day === 0 || day === 6) {
                if (!this.stats.weekendDays) this.stats.weekendDays = 0;
                this.stats.weekendDays++;
                
                if (this.stats.weekendDays >= 2) {
                    this.unlock('weekendWarrior');
                }
            }
            
            // Check consecutive days achievements
            if (this.stats.consecutiveDays === 7) {
                this.unlock('weekStreak');
            } else if (this.stats.consecutiveDays === 30) {
                this.unlock('monthStreak');
            }
            
            this.save();
        }
    },
    
    // Award daily login bonus
    awardDailyBonus: function() {
        const dayIndex = (this.stats.consecutiveDays - 1) % 7;
        const reward = this.dailyRewards[dayIndex];
        
        this.stats.totalPoints += reward.points;
        
        // Show daily reward notification
        this.showNotification(
            `Day ${this.stats.consecutiveDays} Bonus!`,
            `+${reward.points} points\n${reward.bonus}`,
            '🎁'
        );
        
        // Store today's bonus for use
        localStorage.setItem('dailyBonus', JSON.stringify({
            date: new Date().toDateString(),
            bonus: reward.bonus
        }));
    },
    
    // Unlock an achievement
    unlock: function(achievementId) {
        if (this.unlocked[achievementId]) return;
        
        const achievement = this.definitions[achievementId];
        if (!achievement) return;
        
        this.unlocked[achievementId] = {
            unlockedAt: new Date().toISOString(),
            points: achievement.points
        };
        
        this.stats.totalPoints += achievement.points;
        
        // Show achievement notification
        this.showNotification(
            'Achievement Unlocked!',
            `${achievement.icon} ${achievement.name}\n${achievement.description}`,
            '🏆'
        );
        
        // Play achievement sound
        this.playSound('achievement');
        
        this.save();
    },
    
    // Show notification
    showNotification: function(title, message, icon = '🎉') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'achievement-popup';
        notification.innerHTML = `
            <div class="achievement-icon">${icon}</div>
            <div class="achievement-content">
                <div class="achievement-title">${title}</div>
                <div class="achievement-message">${message}</div>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },
    
    // Play achievement sound
    playSound: function(type) {
        // Use Web Audio API for better performance
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        if (type === 'achievement') {
            // Achievement unlock sound
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        }
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    },
    
    // Get achievement progress
    getProgress: function() {
        const total = Object.keys(this.definitions).length;
        const unlocked = Object.keys(this.unlocked).length;
        
        return {
            total,
            unlocked,
            percentage: Math.round((unlocked / total) * 100),
            points: this.stats.totalPoints,
            nextAchievements: this.getNextAchievements()
        };
    },
    
    // Get next achievable achievements
    getNextAchievements: function() {
        const next = [];
        
        for (const [id, achievement] of Object.entries(this.definitions)) {
            if (!this.unlocked[id]) {
                // Calculate progress towards achievement
                let progress = 0;
                
                if (id === 'firstStreak') {
                    progress = Math.min(100, (this.stats.currentStreak || 0) / 5 * 100);
                } else if (id === 'perfectLevel') {
                    progress = this.stats.lastLevelAccuracy || 0;
                }
                
                next.push({
                    ...achievement,
                    progress
                });
            }
        }
        
        return next.sort((a, b) => b.progress - a.progress).slice(0, 3);
    },
    
    // Setup event listeners
    setupEventListeners: function() {
        // Listen for custom achievement events
        document.addEventListener('gameEvent', (e) => {
            this.check(e.detail.type, e.detail.data);
        });
    }
};

// CSS for achievement notifications
const achievementStyles = `
<style>
.achievement-popup {
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #f7931a, #ffb347);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    gap: 1rem;
    transform: translateX(400px);
    transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    z-index: 10000;
    max-width: 350px;
}

.achievement-popup.show {
    transform: translateX(0);
}

.achievement-icon {
    font-size: 2rem;
}

.achievement-content {
    flex: 1;
}

.achievement-title {
    font-weight: bold;
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
}

.achievement-message {
    font-size: 0.9rem;
    opacity: 0.9;
    white-space: pre-line;
}

/* Streak fire animation */
@keyframes fire {
    0% { transform: scale(1) rotate(-5deg); }
    50% { transform: scale(1.1) rotate(5deg); }
    100% { transform: scale(1) rotate(-5deg); }
}

.streak-fire {
    display: inline-block;
    animation: fire 1s ease-in-out infinite;
}
</style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', achievementStyles);

// Initialize achievements system
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Achievements.init());
} else {
    Achievements.init();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Achievements;
}