# 🌍 Tourism Explorer

> **AI-Powered Travel Companion** | Real-time Weather • Smart Attractions • Beautiful UI
---

## 📖 Overview

**Tourism Explorer** is a modern, full-featured travel companion application that revolutionizes how travelers discover new destinations. With stunning glassmorphic UI design, real-time weather integration, and intelligent location-based recommendations, this app provides everything needed before visiting any location.

Perfect for **travel enthusiasts**, **tour operators**, **travel bloggers**, and **adventure seekers** who want instant insights about any destination worldwide.

---
https://multi-agent-tourism.netlify.app/


## ✨ Features

### 🌐 Global Location Search
- Search any destination worldwide using OpenStreetMap
- Accurate geocoding with Nominatim API
- Instant location detection and validation
- Multi-language support ready

### 🌤️ Real-Time Weather Integration
- Live temperature and weather conditions
- Precipitation probability forecasts
- Powered by Open-Meteo API (no API key required)
- Auto timezone detection
- Beautifully displayed with intuitive icons

### 🏛️ Smart Attraction Discovery
- Find nearby museums, landmarks, and attractions
- Searches within 10km radius of selected location
- Uses Overpass API for comprehensive POI data
- Organized and numbered for easy reference
- Multiple category support (tourism, historic sites, etc.)

### 🎨 Premium User Experience
- **Glassmorphic Design**: Modern semi-transparent cards with blur effects
- **Neon Aesthetics**: Vibrant cyan, mint, and coral color schemes
- **Smooth Animations**: 60+ custom keyframe animations
- **Interactive Elements**: Hover effects, floating badges, pulsing glows
- **Dark Theme**: Reduces eye strain with beautiful dim background
- **3D Transforms**: Perspective and depth effects for immersion

### 📱 Fully Responsive
- Desktop-optimized layouts
- Tablet-friendly interface
- Mobile-first design approach
- Touch-friendly buttons and inputs
- Works on all modern browsers

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/tourism-explorer.git
cd tourism-explorer
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Open in browser**
Navigate to `http://localhost:3000`

---

## 💻 Usage

### Using the App

1. **Enter a Location**
   - Type any city, landmark, or region in the search box
   - Examples: "Paris", "Tokyo Tower", "Grand Canyon"

2. **Click "Start Adventure"**
   - App searches for the location
   - Retrieves weather data
   - Finds nearby attractions

3. **Explore Results**
   - View current weather and temperature
   - See precipitation probability
   - Discover top attractions to visit
   - Click numbered items for more details

### Example Searches
```
"I'm going to Barcelona"
"What's the weather in London?"
"Tell me about Sydney"
"Places to visit in Rome"
"Trip to Dubai"
```

---

## 🏗️ Project Structure

```
tourism-explorer/
├── public/
│   ├── index.html                 # Main HTML file
│   └── favicon.ico               # App icon
├── src/
│   ├── App.js                    # Main React component
│   ├── App.css                   # Premium styling
│   ├── index.js                  # React entry point
│   └── index.css                 # Global styles
├── package.json                  # Dependencies & scripts
├── netlify.toml                  # Netlify deployment config
├── .gitignore                    # Git ignore rules
├── README.md                     # This file
└── .env.example                  # Environment variables template
```

---

## 🛠️ Technology Stack

### Frontend
- **React 18.0+**: Modern UI library with hooks
- **CSS3**: Advanced animations and glassmorphism
- **Lucide React**: Beautiful SVG icon library

### APIs (Free & No Auth Required)
| API | Purpose | Provider |
|-----|---------|----------|
| Nominatim | Location geocoding | OpenStreetMap |
| Open-Meteo | Weather forecasts | Open-Meteo |
| Overpass | Tourist attractions | OSM Foundation |

### Deployment
- **Netlify**: Continuous deployment from GitHub
- **GitHub**: Version control and CI/CD

### Tools
- **npm**: Package management
- **Git**: Version control
- **Visual Studio Code**: Recommended editor

---

## 📦 Available Scripts

### Development
```bash
npm start
# Runs development server on http://localhost:3000
# Auto-reloads on code changes
```

### Production Build
```bash
npm run build
# Creates optimized production build in 'build' folder
# Minified and ready for deployment
```

### Testing
```bash
npm test
# Runs test suite in interactive watch mode
```

### Eject (Not Reversible)
```bash
npm run eject
# Exposes build configuration (use cautiously)
```

---

## 🎨 Design Features

### Color Palette
```css
Primary Blue:     #0f172a
Ocean Blue:       #0284c7
Neon Cyan:        #00d9ff
Coral:            #ff6b6b
Mint:             #00f5a0
Sand/Gold:        #ffd93d
```

### Animation Effects
- **Float**: Smooth up-down floating motion
- **Shimmer**: Text gradient animation
- **Spin**: Rotating icon effects
- **Pulse**: Blinking glow effects
- **Bounce**: Bouncing element motion
- **3D Transforms**: Perspective and rotation

### Responsive Breakpoints
```css
Mobile:   max-width: 480px
Tablet:   max-width: 768px
Desktop:  min-width: 1024px
```

---

## 🌐 API Documentation

### Nominatim (OpenStreetMap)
```javascript
// Search locations
GET https://nominatim.openstreetmap.org/search
  ?q=location_name
  &format=json
  &limit=1
```

### Open-Meteo Weather
```javascript
// Get weather data
GET https://api.open-meteo.com/v1/forecast
  ?latitude=LAT
  &longitude=LON
  &current=temperature_2m,precipitation_probability
  &timezone=auto
```

### Overpass API
```javascript
// Find attractions
POST https://overpass-api.de/api/interpreter
// Query OSM data within radius
```

---

## 🚀 Deployment

### Deploy on Netlify (Recommended)

1. **Push to GitHub**
```bash
git push origin main
```

2. **Connect to Netlify**
- Go to [netlify.com](https://netlify.com)
- Click "Import an existing project"
- Select your GitHub repository
- Netlify auto-configures build settings

3. **Automatic Deployment**
- Every push to main branch triggers deployment
- Live URL: `https://tourism-explorer-yourname.netlify.app`

### Deploy on Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow interactive prompts
4. Done! Get a live URL instantly

### Deploy on GitHub Pages

```bash
npm install --save-dev gh-pages
# Add to package.json:
# "homepage": "https://yourusername.github.io/tourism-explorer",
# "predeploy": "npm run build",
# "deploy": "gh-pages -d build"
npm run deploy
```

---

## 🐛 Troubleshooting

### App shows blank screen
```bash
# Clear browser cache
Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)

# Check console for errors
F12 → Console tab → Look for red errors

# Reinstall dependencies
rm -rf node_modules
npm install
npm start
```

### API calls failing
- Check internet connection
- Verify location name spelling
- Try with a major city name
- Check browser console for CORS errors
- API services might be temporarily down

### Build errors
```bash
# Update npm
npm install -g npm@latest

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Styling issues
- Hard refresh browser: `Ctrl+Shift+R` or `Cmd+Shift+R`
- Check if CSS file is loaded in DevTools
- Verify CSS class names match

---

## 📊 Performance

### Optimization Features
- ✅ Lazy loading for code splitting
- ✅ Minified CSS and JavaScript
- ✅ Optimized API calls with debouncing
- ✅ GPU-accelerated animations (CSS transforms)
- ✅ Cached static assets
- ✅ CDN delivery through Netlify

### Performance Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Lighthouse Score**: 90+

---




## 👨‍💻 Authors & Credits

**Main Developer**: Pavithra S 
**Email**: pavithrasreenath600@gmail.com 
**GitHub**: [@Pavithra329](https://github.com/Pavithra329)




