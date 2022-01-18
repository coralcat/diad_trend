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
       Toggle
  ===================================================== */
  const toggles = document.querySelectorAll(".toggle");
  if (toggles) {
    toggles.forEach((toggle) => {
      toggle.addEventListener("click", (event) => {
        const button = event.target;
        button.classList.toggle("is-active");
      });
    });
  }

  // 알림 서비스 설정 전체해제
  const dataToggles = document.querySelectorAll("[data-toggle]");
  if (dataToggles) {
    const controllers = document.querySelectorAll(".toggle-controller");
    controllers.forEach((controller) => {
      controller.addEventListener("click", () => {
        dataToggles.forEach((toggle) => {
          if (controller.dataset.toggle == toggle.dataset.toggle) {
            // if (controller.classList.remove("is-active")) {
            //   console.log("removed");
            //   toggle.classList.remove("is-active");
            //   controller.classList.toggle("is-active");
            // }
          }
        });
      });
    });
  }

  /* =====================================================
       Tooltip
  ===================================================== */
  const tooltips = document.querySelectorAll(".ico-tooltip");
  if (tooltips) {
    tooltips.forEach((tooltip) => {
      tooltip.addEventListener("click", (event) => {
        const content = event.target.nextElementSibling;
        content.classList.toggle("is-active");
      });
    });
  }

  /* =====================================================
       Modal
  ===================================================== */
  const modals = document.querySelectorAll(".modal");
  if (modals) {
    const closeButtons = document.querySelectorAll(".close");
    if (closeButtons) {
      closeButtons.forEach((close) => {
        close.addEventListener("click", (event) => {
          const modal = event.target.closest(".modal");
          console.log(modal);
          modal.classList.remove("is-active");
        });
      });
    }

    modals.forEach((modal) => {
      const modalButtonSubmit = modal.querySelector(".btn-submit");
      if (modalButtonSubmit) {
        modalButtonSubmit.addEventListener("click", () => {
          const modalDone = document.querySelector(".modal-done");
        });
      }
    });
  }

  const confirmModals = document.querySelectorAll(".modal-confirm");
  if (confirmModals) {
    confirmModals.forEach((modal) => {
      const submit = modal.querySelector(".btn-submit");

      submit.addEventListener("click", (event) => {
        const modal = event.target.closest(".modal");
        const secondaryModal = modal.nextElementSibling;

        if(secondaryModal.classList.contains("modal-done")) {
          modal.classList.remove("is-active");
          secondaryModal.classList.add("is-active");
        }
      });
    });
  }

  /* =====================================================
       Advanced Search
  ===================================================== */
  const advancedSearch = document.querySelector(".advanced-search");
  if (advancedSearch) {
    const button = document.querySelector(".btn-advanced-search");

    button.addEventListener("click", () => {
      advancedSearch.classList.toggle("is-active");
    });
  }

  /* =====================================================
       Section Keyword History: List Scroll
  ===================================================== */
  const listScroll = document.querySelector(".list.scroll");

  if (listScroll) {
    var scrollVertical01 = document.querySelector(".scroll-vertical-01");
    var scrollVertical02 = document.querySelector(".scroll-vertical-02");
    var scrollHorizontal01 = document.querySelector(".scroll-horizontal-01");
    var scrollHorizontal02 = document.querySelector(".scroll-horizontal-02");

    if (scrollVertical01) {
      const handleScrollVertical = () => {
        scrollVertical01.scrollTop = scrollVertical02.scrollTop;
      };
      scrollVertical02.addEventListener("scroll", handleScrollVertical);
    }

    if (scrollHorizontal01) {
      const handleScrollHorizontal = () => {
        scrollHorizontal01.scrollLeft = scrollHorizontal02.scrollLeft;
      };

      scrollHorizontal02.addEventListener("scroll", handleScrollHorizontal);
    }
  }

  /* =====================================================
         Section Keyword History: Notification
    ===================================================== */
  const notificationDetails = document.querySelector(".notification-details");

  if (notificationDetails) {
    const notifications = document.querySelectorAll(".notification");
    notifications.forEach((notification) => {
      notification.addEventListener("click", (event) => {
        const details = event.target.nextElementSibling;
        details.classList.toggle("is-active");
      });
    });

    const closeButtons = document.querySelectorAll(".close");
    closeButtons.forEach((close) => {
      close.addEventListener("click", (event) => {
        const modal = event.target.closest("article");
        modal.classList.remove("is-active");
      });
    });
  }
});
