document.addEventListener("DOMContentLoaded", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  const container = document.querySelector(".container");
  const main = document.querySelector("main");
  const header = document.querySelector("header");

  /* =====================================================
       Section Keyword History: List Scroll
  ===================================================== */
  const sectionKeywordHistory = document.querySelector(".section-keyword-history");
  var scrollVertical01 = document.querySelector(".scroll-vertical-01");
  var scrollVertical02 = document.querySelector(".scroll-vertical-02");
  var scrollHorizontal01 = document.querySelector(".scroll-horizontal-01");
  var scrollHorizontal02 = document.querySelector(".scroll-horizontal-02");

  if (sectionKeywordHistory) {

    const handleScrollVertical01 = () => {
      scrollVertical02.scrollTop = scrollVertical01.scrollTop;
    }

    const handleScrollVertical02 = () => {
      scrollVertical01.scrollTop = scrollVertical02.scrollTop;
    }

    const handleScrollHorizontal01 = () => {
      scrollHorizontal02.scrollLeft = scrollHorizontal01.scrollLeft;
    }

    const handleScrollHorizontal02 = () => {
      scrollHorizontal01.scrollLeft = scrollHorizontal02.scrollLeft;
    }

    scrollVertical01.addEventListener("scroll", handleScrollVertical01);
    scrollVertical02.addEventListener("scroll", handleScrollVertical02);
    scrollHorizontal01.addEventListener("scroll", handleScrollHorizontal01);
    scrollHorizontal02.addEventListener("scroll", handleScrollHorizontal02);
  }
});
