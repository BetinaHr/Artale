document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("a[href]");

    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");

            if (
                !href ||
                href.startsWith("#") ||
                href.startsWith("http") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:") ||
                link.target === "_blank"
            ) {
                return;
            }

            event.preventDefault();

            document.body.classList.add("page-exit");

            setTimeout(() => {
                window.location.href = href;
            }, 280);
        });
    });
});