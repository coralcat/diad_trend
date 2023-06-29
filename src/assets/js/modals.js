document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const modals = document.querySelectorAll(".modal");

  const alertModal = document.createElement("div");
  alertModal.classList.add("modal", "modal-alert");
  alertModal.innerHTML = `
      <div class="dialog">
        <div class="modal-content"></div>
        <div class="buttons">
          <button class="btn-submit close" type="button">확인</button>
        </div>
      </div>
    `;

  const confirmModal = document.createElement("div");
  confirmModal.classList.add("modal", "modal-confirm");
  confirmModal.innerHTML = `
      <div class="dialog">
        <header class="modal-header">
          <div class="close"></div>
        </header>
        <div class="modal-content"></div>
        <div class="buttons">
          <button class="btn-cancel close" type="button">아니오</button>
          <button class="btn-submit" type="button">예</button>
        </div>
      </div>
    `;

  container.appendChild(confirmModal);
  container.appendChild(alertModal);

  const alertModalContent = alertModal.querySelector(".modal-content");
  const confirmModalContent = confirmModal.querySelector(".modal-content");

  // Modal Messages
  const modalMessage = {
    advancedSearch: "검색할 조건이 없습니다.",
    apply: "적용이 완료되었습니다.",
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
    deleteItemApply: "소재 삭제가 완료되었습니다",
    deleteGroup: "그룹 삭제 시 그룹에 속한 키워드는 그룹이 해제됩니다. 그룹 삭제를 진행하시겠습니까?",
    deleteGroupApply: "그룹 삭제가 완료되었습니다.",
    selectGroup:
      "이미 그룹이 지정된 키워드가 있습니다. 그룹을 지정하실 경우 기존 그룹이 새로 지정된 그룹으로 대체됩니다. 그룹지정을 진행하시겠습니까?",
    selectGroupApply: "그룹지정이 완료되었습니다.",
    deleteAccount: "계정을 삭제하시겠습니까?",
    deleteAccountApply: "계정을 삭제하였습니다.",
  };

  const initialize = () => {
    modals.forEach(modal => {
      modal.classList.remove("is-active");
      modal.removeAttribute("onclick");
    });

    alertModal.classList.remove("modal-apply");
  };

  const openModal = event => {
    event.preventDefault();
    const {target} = event;
    const modalData = target.dataset.modal;
    const targetModal = document.getElementById(modalData);
    if (targetModal) {
      targetModal.classList.add("is-active");
      const modalButton = targetModal.querySelector("[data-modal]");
      modalButton &&
        modalButton.addEventListener("click", () => {
          setTimeout(() => {
            targetModal.querySelector("input").value = "";
          }, 500);
        });
    }

    const openAlertModal = () => {
      alertModal.classList.add("is-active");
      for (const property in modalMessage) {
        modalData === `${property}` && (alertModalContent.innerText = `${modalMessage[property]}`);
      }
    };

    const openConfirmModal = () => {
      confirmModal.classList.add("is-active");
      const submit = confirmModal.querySelector(".btn-submit");
      for (const property in modalMessage) {
        modalData === `${property}` && (confirmModalContent.innerHTML = `${modalMessage[property]}`);
      }

      submit.setAttribute("data-modal", `${modalData}Apply`);
      confirmModal.classList.add("is-active");
      submit.addEventListener("click", openAlertModal);
    };

    // Modal in Modal
    const currentModal = target.closest(".modal");
    const validateMessage = message => {
      alertModalContent.innerText = message;
      alertModal.classList.add("is-active");
    };

    // 적용, 완료
    if (modalData === "apply") {
      alertModal.classList.add("modal-apply");
      openAlertModal();
    }

    // 상품 순위 추적: 상품등록팝업 - 조회
    if (modalData === "searchItem") {
      if (currentModal.querySelector("input").value === "") {
        validateMessage("상품 URL을 입력해주세요.");
      } else {
        document.querySelector(".search-item").classList.add("is-active");
      }
    }

    // 조회 목록화면에 상품 선택시 누르는 버튼들
    if (target.closest(".filters")) {
      const listItem = document.querySelector(".list");
      const checkboxes = listItem.querySelectorAll("input[type='checkbox']:checked");
      if (checkboxes.length === 0) {
        const customModal = document.getElementById(modalData);
        customModal && customModal.classList.remove("is-active");
        validateMessage("소재를 선택해주세요.");
      } else {
        modalData === "deleteItem" && openConfirmModal();
        modalData === "ungroup" && openAlertModal();
      }
    }

    // 키워드등록/편집: 키워드추가
    if (modalData === "createKeyword") {
      if (currentModal.querySelector("input").value === "") {
        validateMessage("키워드를 입력해주세요.");
      } else {
        openAlertModal();
      }
    }

    // 키워드 트렌드 조회
    if (modalData === "searchKeyword") {
      if (currentModal.querySelector("input").value === "") {
        validateMessage("키워드를 입력해주세요.");
      }
    }

    // 키워드등록/편집: 선택삭제
    if (modalData === "deleteKeyword") {
      const checkboxes = currentModal.querySelectorAll("input[type='checkbox']:checked");
      if (checkboxes.length === 0) {
        validateMessage("키워드를 선택해주세요.");
      } else {
        openConfirmModal();
      }
    }

    // 계정관리: 계정삭제
    if (modalData === "deleteAccount") {
      openConfirmModal();
    }

    // 상품 순위 추적: 그룹편집팝업 - 그룹추가
    if (modalData === "createGroup") {
      if (currentModal.querySelector("input").value === "") {
        validateMessage("그룹명을 입력해주세요.");
      } else {
        openAlertModal();
      }
    }

    // 상품 순위 추적: 그룹편집팝업 - 선택삭제
    if (modalData === "deleteGroup") {
      const checkboxes = currentModal.querySelectorAll("input[type='checkbox']:checked");
      if (checkboxes.length === 0) {
        validateMessage("그룹을 선택해주세요.");
      } else {
        checkboxes.forEach(checked => {
          const row = checked.closest(".row");
          row.remove();
        });
        openConfirmModal();
      }
    }

    // 최저가 알림: 상품등록팝업 - 다음단계
    if (modalData === "createItemStep2") {
      if (currentModal.querySelector("input").value === "") {
        validateMessage("상품명을 입력해주세요.");
      } else {
        document.querySelector(".create-item-step2").classList.add("is-active");
      }
    }

    // 최저가 알림: 상품등록팝업 - 조회
    if (modalData === "createItemStep3") {
      if (currentModal.querySelector("input").value === "") {
        validateMessage("상품 URL을 입력해주세요.");
      } else {
        document.querySelector(".create-item-step3").classList.add("is-active");
      }
    }

    // 최저가 알림: 상품등록팝업 - 확인
    if (modalData === "createItemApply") {
      alertModal.classList.add("modal-apply");
      openAlertModal();
    }

    if (modalData === "advancedSearch") {
      const advancedSearch = target.closest(".advanced-search");
      if (advancedSearch.querySelector("textarea").value === "") {
        validateMessage("검색할 조건이 없습니다.");
      } else {
      }
    }
  };

  // Basic Modal
  const modalButtons = document.querySelectorAll("[data-modal]");
  modalButtons.forEach(button => {
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
  const closeModal = event => {
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

    if (modal.classList.contains("modal-advanced")) {
      const modalInputs = modal.querySelectorAll("input");
      modalInputs.forEach(input => {
        if (input.type === "checkbox") {
          input.checked = false;
        } else if (input.type === "radio") {
          const divisions = modal.querySelectorAll(".inputs");
          divisions.forEach(div => {
            const input = div.querySelectorAll("input[type='radio']");
            input[0].checked = true;
          });
        } else if (input.type === "number" || input.type === "text") {
          input.value = "";
        }
      });
    }
  };

  const closeButtons = document.querySelectorAll(".modal .close");
  closeButtons &&
    closeButtons.forEach(close => {
      close.addEventListener("click", closeModal);
    });
});
