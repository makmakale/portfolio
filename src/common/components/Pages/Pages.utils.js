const getSearchPages = (pages, pageNumber, currentPage) => {
  let searchPages = [...pages].filter((_, index) => index % 2 === 0);

  if (pageNumber < currentPage) {
    searchPages = searchPages
      .filter((page) => {
        const pageId = Number(page.dataset.pageId);
        return pageId >= pageNumber && pageId <= currentPage;
      })
      .reverse();
  } else {
    searchPages = searchPages.filter((page) => {
      const pageId = Number(page.dataset.pageId);
      return pageId >= currentPage && pageId < pageNumber;
    });
  }

  return searchPages;
};

export function animatePages(pageNumber, currentPage) {
  const pages = document.querySelectorAll('#page');
  const searchPages = getSearchPages(pages, pageNumber, currentPage);

  searchPages.forEach((page, index) => {
    setTimeout(() => {
      const pageId = Number(page.dataset.pageId);
      if (pageNumber < currentPage) {
        // animate pages from current to earlier
        page.classList.remove('turn');
        pages[pageId].classList.remove('turn');
        setTimeout(() => {
          page.style.zIndex = pages.length - pageId + 1;
          pages[pageId].style.zIndex = pages.length - pageId;
        }, 500);
      } else {
        // animate pages from current to forward
        page.classList.add('turn');
        pages[pageId].classList.add('turn');
        setTimeout(() => {
          page.style.zIndex = pages.length + pageId - 1;
          pages[pageId].style.zIndex = pages.length + pageId;
        }, 500);
      }
    }, (index + 1) * 200 + 100);
  });
}
