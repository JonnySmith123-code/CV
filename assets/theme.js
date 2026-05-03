(function () {
    const STORAGE_KEY = "theme";
    const root = document.documentElement;

    function getPreferredTheme() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === "light" || stored === "dark") return stored;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    function applyTheme(theme) {
        if (theme === "dark") {
            root.setAttribute("data-theme", "dark");
        } else {
            root.removeAttribute("data-theme");
        }
    }

    applyTheme(getPreferredTheme());

    document.addEventListener("DOMContentLoaded", () => {
        const buttons = document.querySelectorAll(".theme-toggle");
        buttons.forEach((btn) => {
            btn.addEventListener("click", () => {
                const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
                const next = current === "dark" ? "light" : "dark";
                applyTheme(next);
                localStorage.setItem(STORAGE_KEY, next);
            });
        });
    });

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            applyTheme(e.matches ? "dark" : "light");
        }
    });
})();
