(() => {
    const list = document.getElementById("news-list");
    const pagination = document.getElementById("news-pagination");
    const heading = document.getElementById("news-heading");
    const previous = document.getElementById("news-previous");
    const next = document.getElementById("news-next");
    const status = document.getElementById("news-page-status");

    if (!list || !pagination || !heading || !previous || !next || !status) return;

    // Keep entries in HTML so all news remains readable without JavaScript.
    const items = Array.from(list.children);
    const pageSize = Math.max(1, parseInt(list.dataset.pageSize, 10) || 20);
    const pageCount = Math.ceil(items.length / pageSize);
    let currentPage = 1;

    if (pageCount <= 1) return;

    function showPage(page, scrollToNews = false) {
        currentPage = Math.max(1, Math.min(page, pageCount));
        const start = (currentPage - 1) * pageSize;

        items.forEach((item, index) => {
            item.hidden = index < start || index >= start + pageSize;
        });

        previous.disabled = currentPage === 1;
        next.disabled = currentPage === pageCount;
        status.textContent = `Page ${currentPage} of ${pageCount}`;

        if (scrollToNews && heading.getBoundingClientRect().top < 0) {
            heading.scrollIntoView({ block: "start" });
        }
    }

    previous.addEventListener("click", () => showPage(currentPage - 1, true));
    next.addEventListener("click", () => showPage(currentPage + 1, true));

    showPage(1);
    pagination.hidden = false;
})();
