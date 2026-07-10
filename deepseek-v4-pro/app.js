// brewcode site — theme, version fetch, copy chips, install tabs, mobile nav

// ---------- theme ----------
var root = document.documentElement;
var themeToggle = document.getElementById("theme-toggle");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("brewcode-theme", theme);
}

var savedTheme = localStorage.getItem("brewcode-theme") || "light";
applyTheme(savedTheme);

themeToggle.addEventListener("click", function () {
  var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  applyTheme(next);
});

// ---------- version ----------
(function () {
  var sources = ["/api/version", "https://registry.npmjs.org/brewcode-cli/latest"];
  var tryNext = 0;
  function attempt() {
    if (tryNext >= sources.length) return;
    var url = sources[tryNext++];
    fetch(url)
      .then(function (r) {
        if (!r.ok) { attempt(); return; }
        return r.json();
      })
      .then(function (data) {
        if (data && data.version) {
          var els = document.querySelectorAll("[data-version]");
          for (var i = 0; i < els.length; i++) {
            els[i].textContent = els[i].dataset.version.replace("%v", data.version);
          }
        } else {
          attempt();
        }
      })
      .catch(function () {
        attempt();
      });
  }
  attempt();
})();

// ---------- mobile nav ----------
var navToggle = document.getElementById("nav-toggle");
var siteNav = document.getElementById("site-nav");

navToggle.addEventListener("click", function () {
  var open = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});

siteNav.addEventListener("click", function (e) {
  if (e.target.tagName === "A") {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// ---------- copy chips ----------
var toast = document.getElementById("toast");
var toastTimer;

document.querySelectorAll("[data-copy]").forEach(function (chip) {
  chip.addEventListener("click", function () {
    try {
      navigator.clipboard.writeText(chip.dataset.copy).then(function () {
        toast.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () {
          toast.classList.remove("show");
        }, 1600);
      });
    } catch (e) {
      // clipboard unavailable, stay quiet
    }
  });
});

// ---------- install tabs ----------
document.querySelectorAll(".tab").forEach(function (tab) {
  tab.addEventListener("click", function () {
    var panelName = tab.dataset.tab;
    document.querySelectorAll(".tab").forEach(function (t) {
      t.classList.toggle("active", t === tab);
      t.setAttribute("aria-selected", String(t === tab));
    });
    document.querySelectorAll(".tab-panel").forEach(function (p) {
      p.classList.toggle("active", p.dataset.panel === panelName);
    });
  });
});
