const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const navToggle = document.getElementById("nav-toggle");
const siteNav = document.getElementById("site-nav");
const toast = document.getElementById("toast");
const typedEl = document.getElementById("typed");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("brewcode-theme", theme);
}

const savedTheme = localStorage.getItem("brewcode-theme") || "dark";
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  applyTheme(next);
});

(async () => {
  const sources = ["/api/version", "https://registry.npmjs.org/brewcode-cli/latest"];
  for (const url of sources) {
    try {
      const response = await fetch(url);
      if (!response.ok) continue;
      const { version } = await response.json();
      if (!version) continue;
      document.querySelectorAll("[data-version]").forEach((el) => {
        el.textContent = el.dataset.version.replace("%v", version);
      });
      return;
    } catch {
      // try next source
    }
  }
})();

function setNavOpen(open) {
  siteNav.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
}

navToggle.addEventListener("click", () => {
  setNavOpen(!siteNav.classList.contains("is-open"));
});

siteNav.addEventListener("click", (event) => {
  if (event.target.tagName === "A") setNavOpen(false);
});

let toastTimer;
document.querySelectorAll("[data-copy]").forEach((chip) => {
  chip.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(chip.dataset.copy);
      toast.classList.add("is-on");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove("is-on"), 1600);
    } catch {
      // clipboard unavailable
    }
  });
});

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });

    panels.forEach((panel) => {
      const active = panel.dataset.panel === tab.dataset.tab;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });
  });
});

const demoLines = [
  "brewcode",
  "/provider hicap",
  "fix the failing tests in src/parser",
  "/provider codex",
  "refactor auth.ts and show me the diff",
  "/provider ollama",
  "/review",
];

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion) {
  typedEl.textContent = demoLines[0];
} else {
  let lineIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const line = demoLines[lineIndex];

    if (!deleting) {
      charIndex += 1;
      typedEl.textContent = line.slice(0, charIndex);
      if (charIndex === line.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
      setTimeout(tick, 55 + Math.random() * 60);
      return;
    }

    charIndex -= 1;
    typedEl.textContent = line.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      lineIndex = (lineIndex + 1) % demoLines.length;
      setTimeout(tick, 500);
      return;
    }
    setTimeout(tick, 22);
  }

  setTimeout(tick, 600);
}
