# 👨‍💻 GitHub User Finder

A modern, dark-themed **GitHub User Finder** application that allows you to search for any GitHub user and view their complete profile, statistics, and latest repositories. Powered by the official GitHub API with a beautiful purple interface and smooth animations.

<p align="center">
  <a href="https://github-finder2002.netlify.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Demo-View%20Site-brightgreen?style=for-the-badge&logo=netlify" alt="Live Demo" />
  </a>
  <a href="https://github.com/razazaheer12/Github-Finder" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github" alt="GitHub Repo" />
  </a>
</p>

---

## 📸 Preview

<img width="947" height="437" alt="image" src="https://github.com/user-attachments/assets/b1529cbd-cb22-4c93-92d4-a5a3e7ed8902" />


> **Live URL:** [https://github-finder2002.netlify.app/](https://github-finder2002.netlify.app/)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔍 **User Search** | Search any GitHub username to view their complete profile. |
| 👤 **Profile Info** | Display avatar, name, bio, location, company, and join date. |
| 📊 **Statistics** | Show followers, following count, and public repository count. |
| 📂 **Latest Repos** | Display 6 most recently updated repositories with language, stars, forks, and update date. |
| 🌐 **External Links** | Direct links to GitHub profile, website/blog, and social handles. |
| 🎨 **Dark Theme** | Beautiful dark purple-themed interface with smooth animations. |
| 📱 **Fully Responsive** | Optimized for desktop, tablet, and mobile devices. |
| ⚡ **Real-time API** | Live data from official GitHub REST API. |
| 🚀 **Auto-search** | Pre-loaded with your username (`razazaheer12`) for instant demo. |

---

## 🛠️ Tech Stack

<p align="left">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Font%20Awesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white" alt="Font Awesome" />
  <img src="https://img.shields.io/badge/GitHub%20API-000000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub API" />
  <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" alt="Netlify" />
</p>

- **HTML5** — Semantic structure with accessibility
- **CSS3** — CSS Variables, Grid, Flexbox, smooth animations, dark theme
- **Vanilla JavaScript** — Async/Await, Fetch API, dynamic DOM rendering
- **GitHub REST API** — Real-time user and repository data
- **Font Awesome** — Icons for statistics and metadata
- **Netlify** — Zero-config hosting

---

## 🚀 Getting Started

### Prerequisites

- Modern web browser
- Internet connection (uses GitHub API)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/razazaheer12/Github-Finder.git
   ```

2. **Navigate to the project folder**

   ```bash
   cd Github-Finder
   ```

3. **Open in browser**

   ```bash
   # On Windows
   start index.html

   # On macOS
   open index.html

   # On Linux
   xdg-open index.html
   ```

---

## 📖 How to Use

1. **Search a User** — Enter any GitHub username and click **Search** or press **Enter**.
2. **View Profile** — See the user's avatar, name, bio, location, company, and join date.
3. **Check Stats** — View followers, following, and public repository count.
4. **Browse Repos** — Explore the 6 most recently updated repositories with language, stars, forks, and last updated date.
5. **Visit Links** — Click **View Profile**, website, or social links to visit external pages.

**💡 Pro Tip:** The app auto-loads your profile (`razazaheer12`) on first visit!

---

## 📁 Project Structure

```
Github-Finder/
│
├── index.html          # Main layout with profile, stats, and repos sections
├── style.css           # Dark theme, responsive grid, animations, hover effects
├── script.js           # API calls, data processing, dynamic UI updates
└── README.md           # Project documentation
```

### File Overview

| File | Purpose |
|------|---------|
| `index.html` | Semantic structure with search form, profile card, stats grid, repo section, and error states. |
| `style.css` | Beautiful dark theme with CSS variables (`--primary-color: #a78bfa`), responsive grid layout, hover animations, custom repo cards. |
| `script.js` | GitHub API integration using `fetch()`, dynamic DOM manipulation, date formatting, error handling, repo sorting by `pushed_at`. |

---

## 🎯 Key Functionalities

### GitHub User API Integration
```javascript
const response = await fetch(`https://api.github.com/users/${username}`);
const userData = await response.json();
```

### Latest Repositories (Sorted by `pushed`)
```javascript
const response = await fetch(
  `https://api.github.com/users/${username}/repos?per_page=6&sort=pushed&direction=desc`
);
const repos = await response.json();
```

### Dynamic Profile Display
```javascript
avatar.src = user.avatar_url;
nameElement.textContent = user.name || user.login;
followers.textContent = user.followers;
// ... conditional blog, company, twitter display
```

### Error Handling
```javascript
if (!response.ok) throw new Error("User not found");
```

---

## 🎨 Design Highlights

- 🌙 **Dark Theme** — Modern `#1a1a1a` background with purple accents (`#a78bfa`).
- 📊 **Stats Grid** — Beautiful 3-column layout with Font Awesome icons.
- 📱 **Responsive** — Mobile-first design with stacked layout on screens <600px.
- 🏗️ **Repo Cards** — Hover lift effect, language badges, star/fork counters.
- 🔄 **Loading States** — "Loading repositories..." placeholder during API calls.
- 🎯 **Smart Links** — Auto-fixes blog URLs without `https://`, hides irrelevant fields.

---

## 📱 Responsive Breakpoints

| Screen Size | Layout |
|-------------|--------|
| **Desktop (800px+)** | Full-width profile header, 2-column repo grid |
| **Tablet (600px+)** | Profile header side-by-side, 1-column repos |
| **Mobile (<600px)** | Stacked profile (avatar above info), single-column everything |

---

## 🔮 Future Enhancements

- [ ] Search users by organization or location
- [ ] Repository language filter and pagination
- [ ] User repository stars/forks ranking
- [ ] Multiple user search and comparison
- [ ] Rate limiting and caching
- [ ] PWA with offline support
- [ ] Theme toggle (light/dark)
- [ ] Export user data as PDF
- [ ] Trending repositories section

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file.

---

## 🙏 Acknowledgments

- **Raza Zaheer** — Original creator
- **[GitHub API](https://docs.github.com/en/rest)** — Amazing free REST API
- **[Netlify](https://www.netlify.com/)** — Lightning-fast hosting
- **[Font Awesome](https://fontawesome.com/)** — Beautiful icons

---

<p align="center">
  <b>⭐ Star this repo if you found it helpful! 🚀</b>
</p>

<p align="center">
  <a href="https://github-finder2002.netlify.app/">🌐 Live Demo</a> •
  <a href="https://github.com/razazaheer12/Github-Finder">💻 GitHub Repo</a>
</p>
