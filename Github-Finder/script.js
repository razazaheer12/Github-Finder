const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const profileContainer = document.getElementById("profile-container");
const errorContainer = document.getElementById("error-container");
const avatar = document.getElementById("avatar");
const nameElement = document.getElementById("name");
const usernameElement = document.getElementById("username");
const bioElement = document.getElementById("bio");
const locationElement = document.getElementById("location");
const joinedDateElement = document.getElementById("joined-date");
const profileLink = document.getElementById("profile-link");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const repos = document.getElementById("repos");
const companyElement = document.getElementById("company");
const blogElement = document.getElementById("blog");
const linkedinElement = document.getElementById("linkedin");
const linkedinContainer = document.getElementById("linkedin-container");
const companyContainer = document.getElementById("company-container");
const blogContainer = document.getElementById("blog-container");
const reposContainer = document.getElementById("repos-container");
const shareBtn = document.getElementById("share-btn");
const historyContainer = document.getElementById("history-container");
const historyTags = document.getElementById("history-tags");
const clearHistoryBtn = document.getElementById("clear-history");

// Event Listeners
searchBtn.addEventListener("click", () => searchUser());
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchUser();
});

clearHistoryBtn.addEventListener("click", clearSearchHistory);
shareBtn.addEventListener("click", copyProfileLink);

// Load search history on startup
let searchHistory = JSON.parse(localStorage.getItem("github_finder_history")) || [];
renderSearchHistory();

async function searchUser(usernameParam = null) {
  const username = usernameParam || searchInput.value.trim();

  if (!username) {
    alert("Please enter a GitHub username");
    return;
  }

  try {
    profileContainer.classList.add("hidden");
    errorContainer.classList.add("hidden");

    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) throw new Error("User not found");

    const userData = await response.json();
    
    displayUserData(userData);
    fetchRepositories(userData.login);
    saveSearchHistory(userData.login);
  } catch (error) {
    showError();
  }
}

async function fetchRepositories(username) {
  reposContainer.innerHTML = `
    <div class="loading-repos">
      <i class="fas fa-spinner fa-spin"></i> Loading repositories...
    </div>
  `;

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=6&sort=pushed&direction=desc`
    );
    const reposData = await response.json();
    displayRepos(reposData);
  } catch (error) {
    reposContainer.innerHTML = `<div class="no-repos">Failed to load repositories</div>`;
  }
}

function displayRepos(reposList) {
  if (reposList.length === 0) {
    reposContainer.innerHTML = '<div class="no-repos">No public repositories found</div>';
    return;
  }

  reposContainer.innerHTML = "";

  reposList.forEach((repo) => {
    const repoCard = document.createElement("div");
    repoCard.className = "repo-card";

    const updatedAt = formatDate(repo.pushed_at || repo.updated_at);

    repoCard.innerHTML = `
      <div>
        <a href="${repo.html_url}" target="_blank" class="repo-name">
          <i class="fas fa-code-branch"></i> ${repo.name}
        </a>
        <p class="repo-description">${repo.description || "No description provided for this repository."}</p>
      </div>
      <div class="repo-meta">
        ${
          repo.language
            ? `
          <div class="repo-meta-item">
            <i class="fas fa-circle" style="font-size: 8px;"></i> ${repo.language}
          </div>
        `
            : ""
        }
        <div class="repo-meta-item">
          <i class="fas fa-star"></i> ${repo.stargazers_count}
        </div>
        <div class="repo-meta-item">
          <i class="fas fa-code-fork"></i> ${repo.forks_count}
        </div>
        <div class="repo-meta-item">
          <i class="fas fa-history"></i> ${updatedAt}
        </div>
      </div>
    `;

    reposContainer.appendChild(repoCard);
  });
}

function displayUserData(user) {
  avatar.src = user.avatar_url;
  nameElement.textContent = user.name || user.login;
  usernameElement.textContent = `@${user.login}`;
  bioElement.textContent = user.bio || "This profile has no bio available.";

  locationElement.textContent = user.location || "Planet Earth";
  joinedDateElement.textContent = formatDate(user.created_at);

  profileLink.href = user.html_url;
  followers.textContent = user.followers;
  following.textContent = user.following;
  repos.textContent = user.public_repos;

  // Company
  if (user.company) {
    companyElement.textContent = user.company;
    companyContainer.style.display = "flex";
  } else {
    companyElement.textContent = "Independent / Freelance";
    companyContainer.style.display = "flex";
  }

  // Website / Blog
  if (user.blog && user.blog.trim() !== "") {
    const blogUrl = user.blog.startsWith("http") ? user.blog : `https://${user.blog}`;
    blogElement.textContent = user.blog;
    blogElement.href = blogUrl;
    blogContainer.style.display = "flex";
  } else {
    blogElement.textContent = "No website specified";
    blogElement.removeAttribute("href");
    blogContainer.style.display = "flex";
  }

  // Twitter / Social
  if (user.twitter_username) {
    linkedinElement.textContent = `@${user.twitter_username}`;
    linkedinElement.href = `https://twitter.com/${user.twitter_username}`;
    linkedinContainer.querySelector("i").className = "fab fa-twitter";
    linkedinContainer.style.display = "flex";
  } else {
    linkedinContainer.style.display = "none";
  }

  profileContainer.classList.remove("hidden");
  searchInput.value = "";
}

function showError() {
  errorContainer.classList.remove("hidden");
  profileContainer.classList.add("hidden");
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function copyProfileLink() {
  const profileUrl = profileLink.href;
  navigator.clipboard.writeText(profileUrl).then(() => {
    const originalHTML = shareBtn.innerHTML;
    shareBtn.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => {
      shareBtn.innerHTML = originalHTML;
    }, 2000);
  });
}

// Recent Search History Logic
function saveSearchHistory(username) {
  if (!searchHistory.includes(username)) {
    searchHistory.unshift(username);
    if (searchHistory.length > 5) searchHistory.pop(); // Keep only last 5
    localStorage.setItem("github_finder_history", JSON.stringify(searchHistory));
    renderSearchHistory();
  }
}

function renderSearchHistory() {
  if (searchHistory.length === 0) {
    historyContainer.classList.add("hidden");
    return;
  }

  historyContainer.classList.remove("hidden");
  historyTags.innerHTML = "";

  searchHistory.forEach((user) => {
    const tag = document.createElement("span");
    tag.className = "history-tag";
    tag.textContent = user;
    tag.addEventListener("click", () => searchUser(user));
    historyTags.appendChild(tag);
  });
}

function clearSearchHistory() {
  searchHistory = [];
  localStorage.removeItem("github_finder_history");
  historyContainer.classList.add("hidden");
}

// Initial default search
searchInput.value = "razazaheer12";
searchUser("razazaheer12");
