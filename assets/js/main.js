/** @format */

document.addEventListener("DOMContentLoaded", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  const main = document.querySelector("main");
  const content = document.querySelector(".content")
  const wrapper = document.querySelector(".content > .wrapper");
  const scrollToTop = document.createElement("div");
  scrollToTop.classList.add("scroll-to-top");
  wrapper.appendChild(scrollToTop);

  wrapper.addEventListener("scroll", () => {
    console.log(wrapper.scrollTop)
    wrapper.scrollTop > 50 ? scrollToTop.classList.add("is-active") : scrollToTop.classList.remove("is-active");
  });

  content.addEventListener("scroll", () => {
    content.scrollTop > 50 ? scrollToTop.classList.add("is-active") : scrollToTop.classList.remove("is-active");
  });

  scrollToTop.addEventListener("click", () => {
    wrapper.scrollTo({top: 0, behavior: "smooth"});
    content.scrollTo({top: 0, behavior: "smooth"});
  });

  /* =====================================================
       Progress Bar
  ===================================================== */
  const progress = document.querySelectorAll("progress");
  if (progress[0]) {
    progress.forEach(bar => {
      const max = bar.getAttribute("max");
      const time = (1000 / max) * 5;
      const value = bar.value;

      const loading = () => {
        value += 1;
        const addValue = bar.value(value);
        bar.querySelector(".progress-value").innerHTML(`${value}%`);

        if (value === max) {
          clearInterval(animate);
        }

        const animate = () => {
          setInterval(() => {
            loading();
          }, time);
        };

        animate();
      };
    });
  }

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
  const tooltips = document.querySelectorAll("[data-tooltip]");
  if (tooltips[0]) {
    tooltips.forEach(tooltip => {
      tooltip.addEventListener("mouseover", event => {
        event.preventDefault();
        event.stopPropagation();
        event.target.parentElement.style.zIndex = "5";
      });
    });
  }

  /* =====================================================
       Target Smooth Scroll
  ===================================================== */
  // 상품 최저가 리포트: 일별 최저가 차트 클릭시
  const anchors = document.querySelectorAll("a[href^='#']");
  if (anchors[0]) {
    anchors.forEach(anchor => {
      anchor.addEventListener("click", () => {
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
    searchInputs.forEach(input => {
      const container = input.parentElement;
      const x = container.querySelector(".x");
      x &&
        x.addEventListener("click", () => {
          const input = container.querySelector("input");
          input.value = "";
        });
    });
  }

  /* =====================================================
       Layout: 키워드트렌드 리포트 상품목록 유형선택
  ===================================================== */
  const layout = document.querySelectorAll(".layout");
  layout.forEach(layout => {
    const listType = layout.querySelector(".type-list");
    const list = layout.closest("section").querySelector(".list");

    if (layout.classList.contains("layout-grid")) {
      const gridType = layout.querySelector(".type-grid");

      listType.addEventListener("click", () => {
        listType.classList.add("is-active");
        gridType.classList.remove("is-active");
        list.classList.add("type-list");
        list.classList.remove("type-grid");
      });

      gridType.addEventListener("click", () => {
        gridType.classList.add("is-active");
        listType.classList.remove("is-active");
        list.classList.add("type-grid");
        list.classList.remove("type-list");
      });
    }

    if (layout.classList.contains("layout-chart")) {
      const chartType = layout.querySelector(".type-chart");
      const chart = layout.closest("section").querySelector(".report");
      list.style.display = "none";

      listType.addEventListener("click", () => {
        listType.classList.add("is-active");
        chartType.classList.remove("is-active");
        list.style.display = "flex";
        chart.style.display = "none";
      });

      chartType.addEventListener("click", () => {
        chartType.classList.add("is-active");
        listType.classList.remove("is-active");
        chart.style.display = "flex";
        list.style.display = "none";
      });
    }
  });

  /* =====================================================
       Tab Menu
  ===================================================== */
  const tabs = document.querySelectorAll(".tabs li");
  const tabContents = document.querySelectorAll(".tab-content");

  if (tabs[0]) {
    const showTabContent = event => {
      event.stopPropagation();
      const tabName = event.target.dataset.tab;
      const tabs = document.querySelectorAll(`[data-tab='${tabName}']`);
      const tabContents = document.querySelectorAll(`.tab-content[data-tab='${tabName}']`);
      let menuIndex = [...tabs].indexOf(event.target);

      tabs.forEach(tab => {
        [...tabs].indexOf(tab) === menuIndex ? tab.classList.add("is-active") : tab.classList.remove("is-active");
      });

      tabContents.forEach(content => {
        [...tabContents].indexOf(content) === 0 && content.classList.add("is-active");
        [...tabContents].indexOf(content) === menuIndex
          ? content.classList.add("is-active")
          : content.classList.remove("is-active");
      });
    };
    tabs.forEach(tab => {
      [...tabs][0].classList.add("is-active");
      [...tabContents][0].classList.add("is-active");
      tab.addEventListener("click", showTabContent);
    });
  }

  /* =====================================================
       Toggle
  ===================================================== */
  const toggles = document.querySelectorAll(".toggle");
  if (toggles) {
    toggles.forEach(toggle => {
      toggle.addEventListener("click", event => {
        const button = event.target;
        button.classList.toggle("is-active");
      });
    });
  }

  // 알림 서비스 설정 전체해제 (다른 데에서도 재사용 가능)
  const dataToggles = document.querySelectorAll("[data-toggle]");
  const controllers = document.querySelectorAll(".toggle-controller");
  controllers.forEach(controller => {
    controller.addEventListener("click", event => {
      const toggleName = event.target.dataset.toggle;
      const toggles = document.getElementsByName(toggleName);

      if (!controller.classList.contains("is-active")) {
        dataToggles.forEach(toggle => {
          event.target.dataset.toggle === toggle.dataset.toggle && (toggle.classList = controller.classList);
        });
      }
    });
    dataToggles.forEach(toggle => {
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
    toggles.forEach(toggle => {
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

    select.forEach(button => {
      button.addEventListener("click", event => {
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
    checkAll.forEach(all => {
      const handleCheckAll = event => {
        const inputName = event.target.getAttribute("name");
        const checkboxes = document.getElementsByName(inputName);
        checkboxes.forEach(checkbox => {
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
      const modalData = event.target.dataset.modal;
      const targetModal = document.getElementById(modalData);
      if (targetModal) {
        targetModal.classList.add("is-active");

        const inputs = targetModal.querySelectorAll("input");
        if (inputs[0]) {
          targetModal.querySelector("[data-modal]").addEventListener("click", () => {
            inputs.forEach(input => {
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

        const openAlertModal = event => {
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

      // 키워드 트렌드 조회
      if (modalData === "searchKeyword") {
        const inputs = event.target.parentElement;
        const input = inputs.querySelector("input");
        if (input.value === "") {
          alertModal.classList.add("is-active");
          alertModalContent.innerText = "키워드를 입력해주세요.";
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
    };

    const closeButtons = document.querySelectorAll(".close");
    if (closeButtons) {
      closeButtons.forEach(close => {
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
      inputs.forEach(input => {
        input.value = "";
      });

      checkboxes.forEach(checkbox => {
        checkbox.checked = false;
      });

      selections.forEach(select => {
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

    options.forEach(option => {
      const choose = event => {
        event.target.dataset.select === "yes"
          ? calendar.classList.add("is-active")
          : calendar.classList.remove("is-active");
      };
      option.addEventListener("click", choose);
    });
  }

  /* =====================================================
       Filters: 키워드 트렌드 목록 검색에서
  ===================================================== */
  const selectors = document.querySelectorAll(".filters .selector.main");
  if (selectors[0]) {
    selectors.forEach(mainSelector => {
      const subSelectors = mainSelector.parentElement.querySelectorAll(".selector.sub");
      const selects = mainSelector.querySelectorAll("input");
      selects[0].checked = true;
      subSelectors[0].classList.add("is-active");

      selects.forEach(selected => {
        selected.addEventListener("click", event => {
          subSelectors.forEach(sub => {
            const initialize = () => {
              sub.classList.remove("is-active");
            };
            const checkSelect = () => {
              if (selected.classList.contains("select-word") && sub.classList.contains("selector-word")) {
                sub.classList.add("is-active");
              }

              if (
                selected.classList.contains("select-number") &&
                (sub.classList.contains("selector-device") || sub.classList.contains("selector-number"))
              ) {
                sub.classList.add("is-active");
              }
            };

            initialize();
            checkSelect();
            sub.addEventListener("change", () => {
              initialize();
              checkSelect();
            });
          });
        });
      });
    });
  }

  /* =====================================================
       Filters: 키워드 트렌드 목록 필터링
  ===================================================== */
  const selectedFilters = document.querySelectorAll(".selected-filters");
  if (selectedFilters[0]) {
    selectedFilters.forEach(filter => {
      const closes = filter.querySelectorAll(".x");
      closes.forEach(close => {
        close.addEventListener("click", event => {
          event.target.parentElement.remove();
        });
      });
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

  const historyRows = document.querySelectorAll(".section-keyword-history .list .row");

  if (historyRows[0]) {
    const dateTitle = document.querySelectorAll(".date");

    historyRows.forEach(row => {
      const lists = row.querySelectorAll("li");

      lists.forEach(list => {
        const index = lists.length
        const dateIndex = [...dateTitle][index];
        const date = document.createElement("div");
        date.classList.add("date-title");
        date.innerText = dateIndex.textContent;
        list.prepend(date);

        dateIndex === [...lists].indexOf(1) && list.prepend(date)
      });
    });
  }

  const hamburgMenu = document.querySelector(".hamburg-menu");
  hamburgMenu.addEventListener("click", () => {
    const aside = document.querySelector("aside");
    hamburgMenu.classList.toggle("is-active")
    aside.classList.toggle("is-active");
  });
});
