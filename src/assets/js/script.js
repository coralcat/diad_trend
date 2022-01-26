document.addEventListener("DOMContentLoaded", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  const main = document.querySelector("main");

  /* =====================================================
       Input Search Close Button
  ===================================================== */
  const searchInputs = document.querySelectorAll("input[type='search'], input[type='url']");
  if (searchInputs) {
    searchInputs.forEach((input) => {
      const x = input.nextElementSibling;
      x.addEventListener("click", (event) => {
        const input = event.target.previousElementSibling;
        input.value = "";
      });
    });
  }

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
      controller.addEventListener("click", (event) => {
        dataToggles.forEach((toggle) => {
          if (event.target.dataset.toggle == toggle.dataset.toggle) {
            toggle.classList = controller.classList;
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
       Checkbox: Check All
  ===================================================== */
  const checkAll = document.querySelectorAll(".check-all");
  if (checkAll) {
    checkAll.forEach((all) => {
      const handleCheckAll = (event) => {
        const inputName = event.target.getAttribute("name");
        const checkboxes = document.getElementsByName(inputName);
        checkboxes.forEach((checkbox) => {
          checkbox.checked = all.checked;
        });
      };
      all.addEventListener("click", handleCheckAll);
    });
  }

  /* =====================================================
       Modal
  ===================================================== */
  const modals = document.querySelectorAll(".modal");

  if (modals[0]) {
    const alertModal = document.querySelector(".modal-alert");
    const confirmModal = document.querySelector(".modal-confirm");
    const confirmModalContent = confirmModal.querySelector(".modal-content");
    const alertModalContent = alertModal.querySelector(".modal-content");

    const initialize = () => {
      modals.forEach((modal) => {
        modal.classList.remove("is-active");
      });
    };

    // Modal initialize
    const openModal = (event) => {
      initialize();
      const modalName = event.target.dataset.modal;
      const targetModal = document.querySelector(`.${modalName}`);
      targetModal.classList.add("is-active");
    };

    // Basic Modal
    const modalButtons = document.querySelectorAll("[data-modal]");
    modalButtons.forEach((button) => {
      button.addEventListener("click", openModal);
    });

    // Confirm Modal
    const openConfirmModal = (event) => {
      const modalData = event.target.dataset.modalConfirm;
      const submit = confirmModal.querySelector(".btn-submit");

      submit.setAttribute("data-modal-alert", modalData);
      confirmModal.classList.add("is-active");
      submit.addEventListener("click", openAlertModal);
      if (modalData === "check-delete-keyword") {
        confirmModalContent.innerHTML =
          "<p>키워드 삭제 후 적용하시면 삭제된 키워드와 관련된 데이터가 있는 경우 모두 삭제됩니다. 재등록시에도 삭제된 데이터는 복구되지 않습니다. 삭제를 진행하시겠습니까?</p>";
      }
      if (modalData === "delete-keyword") {
        confirmModalContent.innerHTML =
          "<p>소재 삭제 시 해당 소재의 모든 데이터가 삭제됩니다. 재등록시에도 삭제된 데이터는 복구되지 않습니다. 삭제를 진행하시겠습니까?</p>";
      }
      if (modalData === "check-delete-group") {
        confirmModalContent.innerHTML =
          "<p>그룹 삭제 시 그룹에 속한 키워드는 그룹이 해제됩니다. 그룹 삭제를 진행하시겠습니까?</p>";
      }
      if (modalData === "select-group") {
        confirmModalContent.innerHTML =
          "<p>이미 그룹이 지정된 키워드가 있습니다. 그룹을 지정하실 경우 기존 그룹이 새로 지정된 그룹으로 대체됩니다. 그룹지정을 진행하시겠습니까?</p>";
      }
    };
    const modalConfirmButtons = document.querySelectorAll("[data-modal-confirm]");
    modalConfirmButtons.forEach((button) => {
      button.addEventListener("click", openConfirmModal);
    });

    // Alert Modal
    const openAlertModal = (event) => {
      alertModal.classList.add("is-active");
      const modalData = event.target.dataset.modalAlert;
      if (modalData === "ungroup") {
        alertModalContent.innerHTML = "<p>그룹해제가 완료되었습니다.</p>";
      }
      if (modalData === "create-keyword") {
        alertModalContent.innerHTML = "<p>키워드 등록이 완료되었습니다.</p>";
      }
      if (modalData === "create-group") {
        alertModalContent.innerHTML = "<p>그룹 등록이 완료되었습니다.</p>";
      }
      if (modalData === "search-group") {
        alertModalContent.innerHTML = "<p>적용이 완료되었습니다.</p>";
      }
      if (modalData === "delete-keyword") {
        alertModalContent.innerHTML = "<p>소재 삭제가 완료되었습니다</p>";
      }
      if (modalData === "check-delete-keyword") {
        alertModalContent.innerHTML = "<p>키워드 삭제가 완료되었습니다</p>";
      }
      if (modalData === "check-delete-group") {
        alertModalContent.innerHTML = "<p>그룹 삭제가 완료되었습니다.</p>";
      }
      if (modalData === "select-group") {
        alertModalContent.innerHTML = "<p>그룹지정이 완료되었습니다.</p>";
      }
    };
    const modalAlertButtons = document.querySelectorAll("[data-modal-alert]");
    modalAlertButtons.forEach((button) => {
      button.addEventListener("click", openAlertModal);
    });

    // Close Modal
    const closeModal = (event) => {
      const modal = event.target.closest(".modal");
      modal.classList.remove("is-active");

      if (alertModal) {
        alertModal.classList.remove("is-active");
        alertModalContent.innerHTML = "";
      }
      if (confirmModal) {
        confirmModal.classList.remove("is-active");
        confirmModalContent.innerHTML = "";
      }
    };

    const closeButtons = document.querySelectorAll(".close");
    if (closeButtons) {
      closeButtons.forEach((close) => {
        close.addEventListener("click", closeModal);
      });
    }
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
         Section Keyword History: More Information
    ===================================================== */
  const informationDetails = document.querySelector(".more-information-details");

  if (informationDetails) {
    const informations = document.querySelectorAll(".more-information");
    informations.forEach((notification) => {
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

  /* =====================================================
         p42: 상품 순위 조회 > 상품등록
    ===================================================== */
});
