document.addEventListener("DOMContentLoaded", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  const main = document.querySelector("main");

  /* =====================================================
       Tooltip
  ===================================================== */
  // const tooltips = document.querySelectorAll(".tooltip-icon");
  // if (tooltips) {
  //   tooltips.forEach((tooltip) => {
  //     tooltip.addEventListener("click", (event) => {
  //       const content = event.target.nextElementSibling;
  //       content.classList.toggle("is-active");
  //     });
  //   });
  // }

  /* =====================================================
       Target Smooth Scroll
  ===================================================== */
  // 상품 최저가 리포트: 일별 최저가 차트 클릭시
  const anchors = document.querySelectorAll("a[href^='#']");
  if (anchors[0]) {
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", (event) => {
        event.preventDefault();
        anchor.getAttribute("href").scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  }

  /* =====================================================
       Input Search Clear Button
  ===================================================== */
  // 인풋창에 "x"표시 있을시 clear value
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

  // 알림 서비스 설정 전체해제 (다른 데에서도 재사용 가능)
  const dataToggles = document.querySelectorAll("[data-toggle]");
  const controllers = document.querySelectorAll(".toggle-controller");
  controllers.forEach((controller) => {
    controller.addEventListener("click", (event) => {
      const toggleName = event.target.dataset.toggle;
      const toggles = document.getElementsByName(toggleName);

      if (!controller.classList.contains("is-active")) {
        dataToggles.forEach((toggle) => {
          event.target.dataset.toggle === toggle.dataset.toggle && (toggle.classList = controller.classList);
        });
      }
    });
    dataToggles.forEach((toggle) => {
      if (!toggle.classList.contains(".controller")) {
        toggle.addEventListener("click", () => {
          toggle.classList.contains("is-active") && controller.classList.add("is-active");
        });
      }
    });
  });

  // 알림 매체 설정 disabled 처리
  const changeAlarmInformation = document.querySelector(".content-settings .change-information");
  if (changeAlarmInformation) {
    const toggles = changeAlarmInformation.querySelectorAll(".toggle");
    toggles.forEach((toggle) => {
      const inputDisabled = () => {
        const inputs = toggle.parentElement.querySelector(".inputs");
        !toggle.classList.contains("is-active")
          ? (inputs.style.visibility = "hidden")
          : (inputs.style.visibility = "visible");
      };
      inputDisabled();
      toggle.addEventListener("click", inputDisabled);
    });

    const select = document.getElementsByName("selectRecieveInformation");
    const detail1 = select[0].closest(".select").querySelector(".details");
    const detail2 = select[1].closest(".select").querySelector(".details");

    select.forEach((button) => {
      button.addEventListener("click", (event) => {
        if (event.target === select[0]) {
          detail1.style.opacity = "1";
          detail2.style.opacity = "0";
        } else {
          detail1.style.opacity = "0";
          detail2.style.opacity = "1";
        }
      });

      if (select[0].checked) {
        detail1.style.opacity = "1";
        detail2.style.opacity = "0";
      } else {
        detail1.style.opacity = "0";
        detail2.style.opacity = "1";
      }
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

          const controller = checkbox.classList.contains("check-all");
          if (!controller.checked) {
            controller.checked = all.checked;
          }
        });
      };
      all.addEventListener("click", handleCheckAll);
    });
  }

  /* =====================================================
       Modal
  ===================================================== */
  const modals = document.querySelectorAll(".modal");
  const alertModal = document.querySelector(".modal-alert");
  const confirmModal = document.querySelector(".modal-confirm");

  if (modals[0]) {
    const alertModalContent = alertModal.querySelector(".modal-content");
    const confirmModalContent = confirmModal.querySelector(".modal-content");

    // Modal Messages
    const modalMessage = {
      advancedSearch: "검색할 조건이 없습니다.",
      apply: "적용이 완료되었습니다.",
      deleteItem: "소재 삭제가 완료되었습니다",
      ungroup: "그룹해제가 완료되었습니다.",
      createKeyword: "키워드 등록이 완료되었습니다.",
      createGroup: "그룹 등록이 완료되었습니다.",
      searchGroup: "적용이 완료되었습니다.",
      createItemApply: "상품 등록이 완료되었습니다.",
      deleteKeyword:
        "키워드를 삭제하시면 관련 데이터가 모두 삭제됩니다. 재등록시에도 삭제된 데이터는 복구되지 않습니다. 삭제를 진행하시겠습니까?",
      deleteKeywordApply: "키워드 삭제가 완료되었습니다.",
      deleteItem:
        "소재 삭제 시 해당 소재의 모든 데이터가 삭제됩니다. 재등록시에도 삭제된 데이터는 복구되지 않습니다. 삭제를 진행하시겠습니까?",
      deleteGroup: "그룹 삭제 시 그룹에 속한 키워드는 그룹이 해제됩니다. 그룹 삭제를 진행하시겠습니까?",
      deleteGroupApply: "그룹 삭제가 완료되었습니다.",
      selectGroup:
        "이미 그룹이 지정된 키워드가 있습니다. 그룹을 지정하실 경우 기존 그룹이 새로 지정된 그룹으로 대체됩니다. 그룹지정을 진행하시겠습니까?",
      selectGroupApply: "그룹지정이 완료되었습니다.",
    };

    const initialize = () => {
      modals.forEach((modal) => {
        modal.classList.remove("is-active");
        modal.removeAttribute("onclick");
      });

      alertModal.classList.remove("modal-apply");
    };

    const openModal = (event) => {
      event.preventDefault();
      const modalData = event.target.dataset.modal;
      const targetModal = document.getElementById(modalData);
      if (targetModal) {
        targetModal.classList.add("is-active");

        const inputs = targetModal.querySelectorAll("input");
        if (inputs[0]) {
          targetModal.querySelector("[data-modal]").addEventListener("click", () => {
            inputs.forEach((input) => {
              setTimeout(() => {
                input.value = "";
              }, 500);
            });
          });
        }
      }

      const openConfirmModal = () => {
        confirmModal.classList.add("is-active");
        const submit = confirmModal.querySelector(".btn-submit");
        for (const property in modalMessage) {
          modalData === `${property}` && (confirmModalContent.innerHTML = `${modalMessage[property]}`);
        }

        const openAlertModal = (event) => {
          const modalData = event.target.dataset.modal;
          alertModal.classList.add("is-active");
          for (const property in modalMessage) {
            modalData === `${property}` && (alertModalContent.innerText = `${modalMessage[property]}`);
          }
        };

        submit.setAttribute("data-modal", `${modalData}Apply`);
        confirmModal.classList.add("is-active");
        submit.addEventListener("click", openAlertModal);
      };

      const openAlertModal = () => {
        alertModal.classList.add("is-active");
        for (const property in modalMessage) {
          modalData === `${property}` && (alertModalContent.innerText = `${modalMessage[property]}`);
        }
      };

      // 적용, 완료
      if (modalData === "apply") {
        alertModal.classList.add("modal-apply");
        openAlertModal();
      }

      // 상품 순위 조회: 상품등록팝업 - 조회
      if (modalData === "searchItem") {
        const inputs = event.target.closest(".dialog");
        const input = inputs.querySelector("input");
        if (input.value === "") {
          const customModal = document.getElementById(modalData);
          customModal && customModal.classList.remove("is-active");
          alertModalContent.innerText = "상품 URL을 입력해주세요.";
          alertModal.classList.add("is-active");
        } else {
          document.querySelector(".search-item").classList.add("is-active");
        }
      }

      // 조회 목록화면에 상품 선택시 누르는 버튼들
      if (event.target.closest(".filters")) {
        const listItem = document.querySelector(".list-item");
        const checkboxes = listItem.querySelectorAll("input[type='checkbox']:checked");
        if (checkboxes.length === 0) {
          const customModal = document.getElementById(modalData);
          customModal && customModal.classList.remove("is-active");
          alertModal.classList.add("is-active");
          alertModalContent.innerText = "소재를 선택해주세요.";
        } else {
          modalData === "deleteItem" && openConfirmModal();
          modalData === "ungroup" && openAlertModal();
        }
      }

      // 키워드등록/편집: 키워드추가
      if (modalData === "createKeyword") {
        const inputs = event.target.parentElement;
        const input = inputs.querySelector("input");
        if (input.value === "") {
          alertModal.classList.add("is-active");
          alertModalContent.innerText = "키워드를 입력해주세요.";
        } else {
          openAlertModal();
        }
      }

      // 키워드등록/편집: 선택삭제
      if (modalData === "deleteKeyword") {
        const list = document.querySelector(".modal-keyword .list");
        const checkboxes = list.querySelectorAll("input[type='checkbox']:checked");
        if (checkboxes.length === 0) {
          alertModal.classList.add("is-active");
          alertModalContent.innerText = "키워드를 선택해주세요.";
        } else {
          openConfirmModal();
        }
      }

      // 상품 순위 조회: 그룹편집팝업 - 그룹추가
      if (modalData === "createGroup") {
        if (event.target.previousElementSibling.value === "") {
          alertModal.classList.add("is-active");
          alertModalContent.innerText = "그룹명을 입력해주세요.";
        } else {
          openAlertModal();
        }
      }

      // 상품 순위 조회: 그룹편집팝업 - 선택삭제
      if (modalData === "deleteGroup") {
        const list = document.querySelector(".modal-edit-group .list");
        const checkboxes = list.querySelectorAll("input[type='checkbox']:checked");
        if (checkboxes.length === 0) {
          alertModal.classList.add("is-active");
          alertModalContent.innerText = "그룹을 선택해주세요.";
        } else {
          openConfirmModal();
        }
      }

      // 최저가 알림: 상품등록팝업 - 다음단계
      if (modalData === "createItemStep2") {
        const inputs = event.target.closest(".dialog");
        const input = inputs.querySelector("input");
        if (input.value === "") {
          alertModal.classList.add("is-active");
          alertModalContent.innerText = "상품명을 입력해주세요.";
        } else {
          document.querySelector(".create-item-step2").classList.add("is-active");
        }
      }

      // 최저가 알림: 상품등록팝업 - 조회
      if (modalData === "createItemStep3") {
        const inputs = event.target.closest(".dialog");
        const input = inputs.querySelector("input");
        if (input.value === "") {
          alertModal.classList.add("is-active");
          alertModalContent.innerText = "상품 URL을 입력해주세요.";
        } else {
          document.querySelector(".create-item-step3").classList.add("is-active");
        }
      }

      // 최저가 알림: 상품등록팝업 - 확인
      if (modalData === "createItemApply") {
        alertModal.classList.add("modal-apply");
        openAlertModal();
      }
    };

    // Basic Modal
    const modalButtons = document.querySelectorAll("[data-modal]");
    modalButtons.forEach((button) => {
      button.addEventListener("click", openModal);

      // 알림설정
      if (button.nodeName === "OPTION") {
        button.parentElement.addEventListener("change", () => {
          if (button.selected) {
            alertModal.classList.add("is-active");
            alertModalContent.innerText = "알림설정이 완료되었습니다.";
          }
        });
      }
    });

    // Close Modal
    const closeModal = (event) => {
      const modal = event.target.closest(".modal");
      modal.classList.remove("is-active");
      modal.classList.contains("modal-apply");

      if (alertModal) {
        alertModal.classList.remove("is-active");
        alertModalContent.innerText = "";
      }
      if (confirmModal) {
        confirmModal.classList.remove("is-active");
        confirmModalContent.innerHTML = "";
      }

      modal.classList.contains("modal-apply") && initialize();
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
    const inputs = advancedSearch.querySelectorAll("input[type='text'], input[type='number'], textarea");
    const checkboxes = advancedSearch.querySelectorAll("input[type='checkbox']");
    const selections = advancedSearch.querySelectorAll(".select input:first-of-type");

    //초기화
    const initialize = () => {
      inputs.forEach((input) => {
        input.value = "";
      });

      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });

      selections.forEach((select) => {
        select.checked = true;
      });
    };

    button.addEventListener("click", () => {
      initialize();
      advancedSearch.classList.toggle("is-active");
    });

    // 초기화
    const clear = advancedSearch.querySelector(".clear");
    clear.addEventListener("click", initialize);

    // 등록일 사용여부
    const itemCreated = advancedSearch.querySelector(".item-created");
    const calendar = itemCreated.querySelector(".calendar");
    const options = itemCreated.querySelectorAll(".select input");

    options.forEach((option) => {
      const choose = (event) => {
        event.target.dataset.select === "yes"
          ? calendar.classList.add("is-active")
          : calendar.classList.remove("is-active");
      };
      option.addEventListener("click", choose);
    });
  }

  /* =====================================================
       Section Keyword History: List Scroll: css로 해결
  ===================================================== */
  // const listScroll = document.querySelector(".list.scroll");

  // if (listScroll) {
  //   var scrollVertical01 = document.querySelector(".scroll-vertical-01");
  //   var scrollVertical02 = document.querySelector(".scroll-vertical-02");
  //   var scrollHorizontal01 = document.querySelector(".scroll-horizontal-01");
  //   var scrollHorizontal02 = document.querySelector(".scroll-horizontal-02");

  //   if (scrollVertical01) {
  //     const handleScrollVertical = () => {
  //       scrollVertical01.scrollTop = scrollVertical02.scrollTop;
  //     };
  //     scrollVertical02.addEventListener("scroll", handleScrollVertical);
  //   }

  //   if (scrollHorizontal01) {
  //     const handleScrollHorizontal = () => {
  //       scrollHorizontal01.scrollLeft = scrollHorizontal02.scrollLeft;
  //     };

  //     scrollHorizontal02.addEventListener("scroll", handleScrollHorizontal);
  //   }
  // }
});
