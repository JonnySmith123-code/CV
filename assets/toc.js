(function () {
    function slug(text) {
        return text.trim().toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "");
    }

    function setupReadingProgress() {
        const bar = document.querySelector(".reading-progress-bar");
        if (!bar) return;
        let ticking = false;
        const update = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
            bar.style.width = pct + "%";
            ticking = false;
        };
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(update);
                ticking = true;
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        update();
    }

    function setupExternalLinks() {
        const article = document.querySelector(".post");
        if (!article) return;
        article.querySelectorAll('a[href^="http://"], a[href^="https://"]').forEach((a) => {
            try {
                if (new URL(a.href).origin !== window.location.origin) {
                    a.setAttribute("target", "_blank");
                    a.setAttribute("rel", "noopener noreferrer");
                }
            } catch (e) {
                a.setAttribute("target", "_blank");
                a.setAttribute("rel", "noopener noreferrer");
            }
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        setupReadingProgress();
        setupExternalLinks();

        const article = document.querySelector(".post");
        const toc = document.querySelector(".post-toc");
        if (!article || !toc) return;

        const headings = article.querySelectorAll("h2");
        if (headings.length < 2) {
            toc.remove();
            return;
        }

        const list = document.createElement("ul");
        const linkMap = new Map();
        headings.forEach((h, i) => {
            const id = h.id || slug(h.textContent) || `section-${i + 1}`;
            h.id = id;
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = `#${id}`;
            a.textContent = h.textContent;
            li.appendChild(a);
            list.appendChild(li);
            linkMap.set(id, a);
        });
        toc.appendChild(list);

        const setActive = (id) => {
            linkMap.forEach((a, key) => {
                a.classList.toggle("active", key === id);
            });
        };

        const observer = new IntersectionObserver((entries) => {
            const visible = entries
                .filter((e) => e.isIntersecting)
                .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);
            if (visible.length > 0) {
                setActive(visible[0].target.id);
            }
        }, { rootMargin: "-15% 0px -70% 0px", threshold: 0 });

        headings.forEach((h) => observer.observe(h));
        setActive(headings[0].id);
    });
})();
