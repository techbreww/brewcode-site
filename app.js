// brewcode site — theme, hero typing demo, copy chips, install tabs, mobile nav

// ---------- theme ----------
const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("brewcode-theme", theme);
}

const savedTheme =
  localStorage.getItem("brewcode-theme") ||
  "dark";
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  applyTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light");
});

// ---------- live version ----------
// keeps the version badges in sync with the latest published brewcode-cli.
// primary source is our serverless proxy (edge-cached, same-origin, immune to
// third-party blockers); direct registry is the fallback for local dev where
// /api doesn't exist. hardcoded text in the HTML stays if both fail.
(async () => {
  const sources = ["/api/version", "https://registry.npmjs.org/brewcode-cli/latest"];
  for (const url of sources) {
    try {
      const r = await fetch(url);
      if (!r.ok) continue;
      const { version } = await r.json();
      if (version) {
        document.querySelectorAll("[data-version]").forEach((el) => {
          el.textContent = el.dataset.version.replace("%v", version);
        });
        return;
      }
    } catch {
      // try the next source
    }
  }
})();

// ---------- mobile nav ----------
const navToggle = document.getElementById("nav-toggle");
const siteNav = document.getElementById("site-nav");

navToggle.addEventListener("click", () => {
  const open = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});

siteNav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// ---------- copy-to-clipboard chips ----------
const toast = document.getElementById("toast");
let toastTimer;

document.querySelectorAll("[data-copy]").forEach((chip) => {
  chip.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(chip.dataset.copy);
      toast.classList.add("show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove("show"), 1600);
    } catch {
      // clipboard unavailable (e.g. non-secure context) — select nothing, stay quiet
    }
  });
});

// ---------- install tabs ----------
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      t.classList.toggle("active", t === tab);
      t.setAttribute("aria-selected", String(t === tab));
    });
    panels.forEach((p) =>
      p.classList.toggle("active", p.dataset.panel === tab.dataset.tab)
    );
  });
});

// ---------- hero typing demo ----------
const typedEl = document.getElementById("typed");
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
      charIndex++;
      typedEl.textContent = line.slice(0, charIndex);
      if (charIndex === line.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
      setTimeout(tick, 55 + Math.random() * 60);
    } else {
      charIndex--;
      typedEl.textContent = line.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        lineIndex = (lineIndex + 1) % demoLines.length;
        setTimeout(tick, 500);
        return;
      }
      setTimeout(tick, 22);
    }
  }

  setTimeout(tick, 600);
}
