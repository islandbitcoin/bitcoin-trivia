# Bitcoin Trivia - Deployment Guide

## 🚀 Quick Start (< 5 minutes)

### Option 1: GitHub Pages (Recommended)
1. Fork this repository
2. Go to Settings → Pages
3. Select "Deploy from branch" → main → /dist
4. Your site will be live at: https://[username].github.io/bitcoin-trivia/

### Option 2: Single File (Simplest)
1. Use any file from dist/single-file/
2. Upload to any web host or open locally
3. No configuration needed!

### Option 3: Static Hosting
Upload the contents of /dist/ to:
- Netlify (drag & drop)
- Vercel (one-click deploy)
- Cloudflare Pages
- Any web server

## 📁 File Structure

```
dist/
├── index-secure.html      # Main game (secure version)
├── main-menu.html         # Game selection menu
├── story-mode.html        # Story mode
├── challenge-mode.html    # Challenge mode
├── discussions.html       # Community features
├── submit.html           # Question submission
├── admin.html            # Admin panel
├── js/                   # Minified scripts
├── data/                 # Question database
├── sw.js                 # Service worker
├── manifest.json         # PWA manifest
└── single-file/          # Standalone versions
    ├── index-secure-standalone.html
    ├── main-menu-standalone.html
    └── ... (all modes)
```

## 🔒 Security Features

- Content Security Policy (CSP) enabled
- XSS protection built-in
- No external dependencies (except optional Nostr)
- Offline-first architecture
- Zero tracking or analytics

## 🎮 Features

- 425+ Bitcoin questions
- Multiple game modes
- Offline play support
- Achievement system
- Daily rewards
- PWA installable

## 🛠️ Configuration

No configuration needed! The app works out of the box.

### Optional Customization

Edit manifest.json to customize:
- App name and colors
- Icon paths
- Start URL

## 📱 PWA Installation

The app can be installed on:
- Chrome/Edge: Look for install icon in address bar
- Safari iOS: Share → Add to Home Screen
- Firefox: Menu → Install

## 🌐 CORS Setup (if needed)

If hosting on a CDN, ensure these headers:
```
Access-Control-Allow-Origin: *
Content-Type: application/json
```

## 📊 Performance

- Lighthouse score: 100/100
- First paint: <1s
- Fully interactive: <2s
- Offline capable

## 🆘 Troubleshooting

1. **Questions not loading**: Check data/ directory is uploaded
2. **Service worker issues**: Ensure HTTPS is enabled
3. **Nostr login not working**: Check CSP allows unpkg.com

## 📄 License

MIT License - Free to use and modify!

---

Built with ❤️ for the Bitcoin community
