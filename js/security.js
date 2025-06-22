/**
 * Security utilities for Bitcoin Trivia Platform
 * Provides XSS protection, input sanitization, and secure DOM manipulation
 */

const Security = {
    /**
     * Sanitize HTML strings to prevent XSS attacks
     * @param {string} str - The string to sanitize
     * @returns {string} - Sanitized string safe for insertion
     */
    sanitizeHTML: function(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    },

    /**
     * Create DOM elements safely without innerHTML
     * @param {string} tag - HTML tag name
     * @param {object} attributes - Element attributes
     * @param {string|Element|Array} content - Element content
     * @returns {Element} - Created element
     */
    createElement: function(tag, attributes = {}, content = '') {
        const element = document.createElement(tag);
        
        // Set attributes safely
        Object.keys(attributes).forEach(key => {
            if (key === 'className') {
                element.className = attributes[key];
            } else if (key === 'style' && typeof attributes[key] === 'object') {
                Object.assign(element.style, attributes[key]);
            } else if (key.startsWith('data-')) {
                element.setAttribute(key, attributes[key]);
            } else {
                element[key] = attributes[key];
            }
        });
        
        // Add content safely
        if (typeof content === 'string') {
            element.textContent = content;
        } else if (content instanceof Element) {
            element.appendChild(content);
        } else if (Array.isArray(content)) {
            content.forEach(child => {
                if (typeof child === 'string') {
                    element.appendChild(document.createTextNode(child));
                } else if (child instanceof Element) {
                    element.appendChild(child);
                }
            });
        }
        
        return element;
    },

    /**
     * Validate and sanitize user input
     * @param {string} input - User input to validate
     * @param {string} type - Type of validation (text, email, number, etc.)
     * @returns {object} - { isValid: boolean, sanitized: string, error: string }
     */
    validateInput: function(input, type = 'text') {
        const validators = {
            text: {
                pattern: /^[a-zA-Z0-9\s\-.,!?'"()]+$/,
                maxLength: 1000,
                error: 'Invalid characters in text'
            },
            email: {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                maxLength: 254,
                error: 'Invalid email format'
            },
            number: {
                pattern: /^\d+$/,
                maxLength: 10,
                error: 'Must be a valid number'
            },
            difficulty: {
                pattern: /^([1-9]|10)$/,
                maxLength: 2,
                error: 'Difficulty must be between 1 and 10'
            },
            category: {
                allowed: ['History', 'Technology', 'Mining', 'Economics', 'Security', 
                         'Network', 'Development', 'Privacy', 'Culture', 'Transactions', 
                         'Basics', 'Lightning Network', 'Practical Usage'],
                error: 'Invalid category'
            }
        };

        const validator = validators[type] || validators.text;
        let sanitized = String(input).trim();
        
        // Check length
        if (sanitized.length > validator.maxLength) {
            return {
                isValid: false,
                sanitized: sanitized.substring(0, validator.maxLength),
                error: `Maximum length is ${validator.maxLength} characters`
            };
        }
        
        // Check pattern or allowed values
        if (validator.pattern) {
            const isValid = validator.pattern.test(sanitized);
            return {
                isValid,
                sanitized: isValid ? sanitized : '',
                error: isValid ? '' : validator.error
            };
        } else if (validator.allowed) {
            const isValid = validator.allowed.includes(sanitized);
            return {
                isValid,
                sanitized: isValid ? sanitized : '',
                error: isValid ? '' : validator.error
            };
        }
        
        return {
            isValid: true,
            sanitized,
            error: ''
        };
    },

    /**
     * Escape special characters for safe display
     * @param {string} str - String to escape
     * @returns {string} - Escaped string
     */
    escapeHtml: function(str) {
        const escapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '/': '&#x2F;'
        };
        return String(str).replace(/[&<>"'/]/g, char => escapeMap[char]);
    },

    /**
     * Generate cryptographically secure random numbers
     * @param {number} min - Minimum value (inclusive)
     * @param {number} max - Maximum value (exclusive)
     * @returns {number} - Random number
     */
    secureRandom: function(min, max) {
        const range = max - min;
        const bytesNeeded = Math.ceil(Math.log2(range) / 8);
        const randomBytes = new Uint8Array(bytesNeeded);
        crypto.getRandomValues(randomBytes);
        
        let randomNumber = 0;
        for (let i = 0; i < bytesNeeded; i++) {
            randomNumber = (randomNumber << 8) | randomBytes[i];
        }
        
        return min + (randomNumber % range);
    },

    /**
     * Hash a string using SHA-256
     * @param {string} message - String to hash
     * @returns {Promise<string>} - Hex-encoded hash
     */
    hash: async function(message) {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    },

    /**
     * Check if CSP is properly configured
     * @returns {boolean} - True if CSP is active
     */
    checkCSP: function() {
        try {
            const testScript = document.createElement('script');
            testScript.innerHTML = 'console.log("CSP test")';
            document.head.appendChild(testScript);
            document.head.removeChild(testScript);
            return false; // If we get here, inline scripts are allowed (bad)
        } catch (e) {
            return true; // CSP blocked the inline script (good)
        }
    },

    /**
     * Initialize security features
     */
    init: function() {
        // Prevent right-click on production
        if (window.location.hostname !== 'localhost') {
            document.addEventListener('contextmenu', e => e.preventDefault());
        }
        
        // Warn about console usage
        console.log('%cSTOP!', 'color: red; font-size: 50px; font-weight: bold;');
        console.log('%cThis is a browser feature intended for developers. Do not paste any code here!', 
                   'color: red; font-size: 16px;');
        
        // Monitor for XSS attempts
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => {
                        if (node.tagName === 'SCRIPT' && !node.src.includes('security.js')) {
                            console.warn('Unauthorized script injection detected!');
                            node.remove();
                        }
                    });
                }
            });
        });
        
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }
};

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Security.init());
} else {
    Security.init();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Security;
}