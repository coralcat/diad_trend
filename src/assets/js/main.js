/** @format */

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");

  // 휴대기기 높이값 변경
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  // 메뉴
  const hamburgMenu = document.querySelector(".hamburg-menu");
  const aside = document.querySelector(".aside");
  hamburgMenu.addEventListener("click", event => {
    event.currentTarget.classList.toggle("is-active")
      ? event.currentTarget.classList.remove("is-active")
      : event.currentTarget.classList.add("is-active");
    aside.classList.toggle("is-active") ? aside.classList.remove("is-active") : aside.classList.add("is-active");
  });

  if (aside) {
    hamburgMenu.addEventListener("click", event => {
      event.currentTarget.classList.toggle("is-active");
      aside.classList.toggle("is-active");
    });
  } else {
    hamburgMenu.style.display = "none";
  }

  const asideHandler = document.querySelector(".aside-handler");
  const handleAside = () => {
    if (window.matchMedia("screen and (max-width: 640px)").matches) {
      aside.classList.remove("is-active");
      hamburgMenu.classList.remove("is-active");
    } else {
      aside.classList.contains("icons-only") ? aside.classList.remove("icons-only") : aside.classList.add("icons-only");
    }
  };
  asideHandler.addEventListener("click", handleAside);

  /* =====================================================
    브라우저 리사이징 감지
  ===================================================== */
  const ro = new ResizeObserver(entries => {
    window.requestAnimationFrame(() => {
      if (!Array.isArray(entries) || !entries.length) {
        return;
      }
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);

      if (aside) {
        window.matchMedia("screen and (max-width: 1280px)").matches && aside.classList.add("icons-only");
        window.matchMedia("screen and (max-width: 640px)").matches && aside.classList.remove("icons-only");
        window.matchMedia("screen and (min-width: 1281px)").matches && aside.classList.remove("icons-only");
      }
    });
  });
  ro.observe(container);
});

/* =====================================================
    container 내부 요소들 클래스명 변화 감지 (scroll to top 제외)
  ===================================================== */
const scrollToTop = document.createElement("div");
scrollToTop.classList.add("scroll-to-top");
const containerMutated = () => {
  const container = document.querySelector(".container");
  const main = document.querySelector("main");

  // 마이너스 금액
  const prices = document.querySelectorAll(".section-money .price");
  prices.forEach(price => {
    if(price.textContent.includes("-")) {
      price.style.color = "orangered"
    }
  })

  // 스크롤 맨 위로
  if (main) {
    let lastScrollTop = 0;
    main.appendChild(scrollToTop);

    const handleScrollToTop = () => {
      let currentScrollTop = main.scrollTop;
      if (currentScrollTop > 50) {
        currentScrollTop > lastScrollTop
          ? scrollToTop.classList.remove("is-active")
          : scrollToTop.classList.add("is-active");
        lastScrollTop = currentScrollTop;
      } else {
        scrollToTop.classList.remove("is-active");
      }
    };
    main.addEventListener("scroll", handleScrollToTop);

    scrollToTop.addEventListener("click", () => {
      main.scrollTo({top: 0, behavior: "smooth"});
    });
  }

  /* =====================================================
    Checkbox
  ===================================================== */
  // 체크박스 모두 체크
  const checkAll = document.querySelectorAll(".check-all");
  checkAll.forEach(all => {
    const handleCheckAll = event => {
      const inputName = event.currentTarget.getAttribute("name");
      const checkboxes = document.getElementsByName(inputName);
      checkboxes.forEach(checkbox => {
        checkbox.checked = all.checked;
      });
    };
    all.addEventListener("click", handleCheckAll);
  });

/*   // 목록 체크박스 효과
  const listCheckboxes = document.querySelectorAll(".list .checkbox input[type='checkbox']:not(.modal input)");
  listCheckboxes.forEach(check => {
    const handleListCheckboxes = event => {
      event.currentTarget.checked
        ? event.currentTarget.closest(".row").classList.add("checked")
        : event.currentTarget.closest(".row").classList.remove("checked");
      if (check.classList.contains("check-all")) {
        const rows = event.currentTarget.closest(".list").querySelectorAll(".row:not(.title)");
        rows.forEach(row => {
          event.currentTarget.checked ? row.classList.add("checked") : row.classList.remove("checked");
        });
      }
    };
    check.addEventListener("change", handleListCheckboxes);
  });
 */

  /* =====================================================
    Tab Menu
  ===================================================== */
  const tabs = document.querySelectorAll(".tabs li");
  const showTabContent = event => {
    event.stopPropagation();
    const tabName = event.currentTarget.dataset.tab;
    const tabs = document.querySelectorAll(`[data-tab='${tabName}']`);
    const tabContents = document.querySelectorAll(`.tab-content[data-tab='${tabName}']`);
    let menuIndex = [...tabs].indexOf(event.currentTarget);

    tabs.forEach(tab => {
      [...tabs].indexOf(tab) === menuIndex ? tab.classList.add("is-active") : tab.classList.remove("is-active");
    });

    tabContents[0] &&
      tabContents.forEach(content => {
        [...tabContents].indexOf(content) === 0 && content.classList.add("is-active");
        [...tabContents].indexOf(content) === menuIndex
          ? content.classList.add("is-active")
          : content.classList.remove("is-active");
      });
  };

  tabs.forEach(tab => {
    // [...tabs][0].classList.add("is-active");
    // [...tabContents][0].classList.add("is-active");
    tab.addEventListener("click", showTabContent);
  });

  /* =====================================================
        Target Smooth Scroll
      ===================================================== */
  // 상품 최저가 리포트: 일별 최저가 차트 클릭시
  if (main && main.classList.contains("content-lowest-price-details")) {
    const anchors = document.querySelectorAll("a[href^='#']");
    anchors.forEach(anchor => {
      const smoothScrolling = event => {
        event.currentTarget.getAttribute("href").scrollIntoView({
          behavior: "smooth",
        });
      };
      anchor.addEventListener("click", smoothScrolling);
    });
  }

  // 메인 대시보드 스크롤 효과
  if (main && main.classList.contains("content-dashboard")) {
    if (window.matchMedia("screen and (min-width: 1280px)").matches) {
      const tabContents = document.querySelectorAll(".tab-content");

      tabContents.forEach(content => {
        const callback = entries => {
          entries.forEach(entry => {
            entry.intersectionRatio >= 0.75
              ? entry.target.classList.add("is-active")
              : entry.target.classList.remove("is-active");
          });
        };
        let options = {
          rootMargin: "0px",
          threshold: 0.75,
        };
        const observer = new IntersectionObserver(callback, options);
        const sections = [...content.querySelectorAll(".wrapper > *")];
        sections.forEach((section, index) => {
          section.style.setProperty("--delay", `${index * 150}ms`);
          observer.observe(content);
        });
      });

      const scrollDown = document.querySelector(".scroll-down");
      const handleTabContents = () => {
        if (tabContents[0].classList.contains("is-active")) {
          tabContents[0].classList.remove("is-active");
          tabContents[1].classList.add("is-active");
        } else if (tabContents[0].classList.contains("is-active")) {
          tabContents[0].classList.remove("is-active");
          tabContents[1].classList.add("is-active");
        }
      };

      const handleKeyboard = event => {
        if (tabContents[0].classList.contains("is-active") && event.key === "ArrowDown") {
          tabContents[0].classList.remove("is-active");
          tabContents[1].classList.add("is-active");
        } else if (tabContents[0].classList.contains("is-active") && event.key === "ArrowUp") {
          tabContents[0].classList.remove("is-active");
          tabContents[1].classList.add("is-active");
        }
      };

      document.addEventListener("keydown", handleKeyboard);
      scrollDown.addEventListener("click", handleTabContents);
    }
  }

  /* =====================================================
        Input Search Clear Button
      ===================================================== */
  // 인풋창에 "x"표시 있을시 clear value
  const inputs = document.querySelectorAll(".input input");
  inputs.forEach(input => {
    input.addEventListener("keyup", event => {
      const container = event.currentTarget.closest(".input");
      const clear = container.querySelector(".x");

      if(clear) {
        clear.classList.add("is-active");
  
        clear.addEventListener("click", () => {
          clear.classList.remove("is-active");
          input.value = "";
        });
      }
    });
  });

  /* =====================================================
        Layout: 키워드트렌드 리포트 - 쇼핑 유형선택
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

  // 알림 서비스 설정 전체해제 (다른 데에서도 재사용 가능)
  /*     const dataToggles = document.querySelectorAll("[data-toggle]");
  const controllers = document.querySelectorAll(".toggle-controller");
  controllers.forEach((controller) => {
    controller.addEventListener("click", (event) => {
      const toggleName = event.currentTarget.dataset.toggle;
      const toggles = document.getElementsByName(toggleName);

      if (!controller.classList.contains("is-active")) {
        dataToggles.forEach((toggle) => {
          event.currentTarget.dataset.toggle === toggle.dataset.toggle && (toggle.classList = controller.classList);
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
  }); */

  // 알림 매체 설정 disabled 처리
  const changeAlarmInformation = document.querySelector(".content-settings .change-information");
  if (changeAlarmInformation) {
    const select = document.getElementsByName("selectRecieveInformation");
    const detail1 = select[0].closest(".select").querySelector(".details");
    const detail2 = select[1].closest(".select").querySelector(".details");

    select.forEach(button => {
      button.addEventListener("click", event => {
        if (event.currentTarget === select[0]) {
          detail1.classList.add("is-active");
          detail2.classList.remove("is-active");
        } else {
          detail1.classList.remove("is-active");
          detail2.classList.add("is-active");

          const toggles = detail2.querySelectorAll(".toggle-switch");
          const inputDisabled = event => {
            const row = event.currentTarget.closest(".row");
            const checked = row.querySelector("input:checked");
            const inputs = row.querySelector(".inputs");
            checked ? inputs.classList.add("is-active") : inputs.classList.remove("is-active");
          };
          toggles.forEach(toggle => {
            toggle.addEventListener("click", inputDisabled);
          });
        }
      });

      if (select[0].checked) {
        detail1.classList.add("is-active");
        detail2.classList.remove("is-active");
      }
    });
  }

  // 키워드 트랜드 - 연관 키워드 목록
  const relatedKeywordSection = document.querySelector(".section-related-keyword");
  if (relatedKeywordSection) {
    const checkNaver = document.getElementById("checkNaverList");
    const checkGoogle = document.getElementById("checkGoogleList");
    const list = relatedKeywordSection.querySelector(".list");

    const initialize = () => {
      list.classList.remove("all", "naver", "google");
    };

    const changeFilters = event => {
      initialize();
      if (event.currentTarget.id === "checkNaverList") {
        if (event.currentTarget.checked === true) {
          checkGoogle.checked === true ? list.classList.add("all") : list.classList.add("naver");
        } else if (checkGoogle.checked === true) {
          list.classList.add("google");
        } else {
          list.classList.add("all");
        }
      } else if (event.currentTarget.id === "checkGoogleList") {
        if (event.currentTarget.checked === true) {
          checkNaver.checked === true ? list.classList.add("all") : list.classList.add("google");
        } else if (checkNaver.checked === true) {
          list.classList.add("naver");
        } else {
          list.classList.add("all");
        }
      }
    };

    const checkboxes = relatedKeywordSection.querySelectorAll(".filters .checkboxes input");
    checkboxes.forEach(check => {
      check.addEventListener("change", changeFilters);
    });
  }

  // 키워드 트렌드 리포트 - 키워드 콘텐츠 스크롤 올리기
  const pagination = document.querySelectorAll(".tab-content .pagination");
  if (pagination[0]) {
    pagination.forEach(pages => {
      const scrollingToTop = event => {
        const wrapper = event.currentTarget.closest(".tab-content");
        wrapper.querySelector(".list").scrollTop = 0;
      };
      pages.addEventListener("click", scrollingToTop);
    });
  }

  /* =====================================================
      Modal
    ===================================================== */
  const modals = document.querySelectorAll(".modal:not(.modal-advanced)");
  const alertModal = document.querySelector(".modal-alert");
  const confirmModal = document.querySelector(".modal-confirm");
  const alertModalContent = document.querySelector(".modal-alert .modal-content");
  const confirmModalContent = document.querySelector(".modal-confirm .modal-content");

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
    const modalData = event.currentTarget.dataset.modal;
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
    const currentModal = event.currentTarget.closest(".modal");
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
        validateMessage("상품 URL을 입력해 주세요.");
      } else {
        document.querySelector(".search-item").classList.add("is-active");
      }
    }

    // 조회 목록화면에 상품 선택시 누르는 버튼들
    if (event.currentTarget.closest(".filters")) {
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
        validateMessage("키워드를 입력해 주세요.");
      } else {
        openAlertModal();
      }
    }

    // 키워드 트렌드 조회
    if (modalData === "searchKeyword") {
      if (currentModal.querySelector("input").value === "") {
        validateMessage("키워드를 입력해 주세요.");
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
        validateMessage("그룹명을 입력해 주세요.");
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
        validateMessage("상품명을 입력해 주세요.");
      } else {
        document.querySelector(".create-item-step2").classList.add("is-active");
      }
    }

    // 최저가 알림: 상품등록팝업 - 조회
    if (modalData === "createItemStep3") {
      if (currentModal.querySelector("input").value === "") {
        validateMessage("상품 URL을 입력해 주세요.");
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
      const advancedSearch = event.currentTarget.closest(".advanced-search");
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
    const modal = event.currentTarget.closest(".modal");
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

    const modalInputs = modal.querySelectorAll("input");
    modalInputs[0] &&
      modalInputs.forEach(input => {
        if (input.type === "checkbox") {
          input.checked = false;
        } else if (input.type === "radio") {
          const divisions = modal.querySelectorAll(".inputs");
          divisions.forEach(div => {
            const input = div.querySelectorAll("input[type='radio']");
            // input[0].checked = true;
          });
        } else if (input.type === "number" || input.type === "text") {
          input.value = "";
        }
      });
  };

  const closeButtons = document.querySelectorAll(".modal .close");
  if (closeButtons[0]) {
    closeButtons.forEach(close => {
      close.addEventListener("click", closeModal);
    });
  }

  // 계정 동기화 전체 체크
  const syncModal = document.querySelector(".modal-sync");
  if (syncModal) {
    const checkAll = syncModal.querySelector("header .check-all");

    checkAll &&
      checkAll.addEventListener("click", event => {
        const checkboxes = event.currentTarget.closest(".modal-content").querySelectorAll("input[type='checkbox']");

        event.currentTarget.checked = !event.currentTarget.checked;
        checkboxes.forEach(checkbox => {
          checkbox.checked = !checkbox.checked;
        });
      });
  }

  // 목록화면 - 사용자 지정 보기
  const eye = document.querySelector(".ico-eye");
  if (eye) {
    setTimeout(() => {
      const sortableModals = document.querySelectorAll(".modal-sortable");
      if (sortableModals[0]) {
        sortableModals.forEach(modal => {
          const pinned = modal.querySelectorAll(".ico-pin.is-active");
          pinned.forEach(pin => pin.closest("li").classList.add("pinned"));


          // 이미 핀이 설정되어 있는 경우
          if([...pinned][0]) {
            pinned.forEach(pinned => {
              pinned.closest("li").querySelector("input").disabled = true
            })
          }

          // 핀을 클릭하면
          const handleCheckPinned = event => {
            const currentModal = event.currentTarget.closest(".modal-sortable");
            const lists = currentModal.querySelectorAll(".inputs li");
            const targetList = event.currentTarget.closest("li");
            const targetIndex = [...lists].indexOf(targetList);

            // 6번째 이상의 리스트에서는 핀해제 및 아이콘 숨김
            lists.forEach(list => {
              if ([...lists].indexOf(list) > 4) {
                list.classList.remove("pinned");
                list.querySelector(".ico-pin").classList.remove("is-active");
              }
            });

            // 내가 누른 핀이 활성화되는 경우
            if (event.currentTarget.classList.contains("is-active")) {
              // 해당 리스트 고정
              targetList.classList.add("pinned");

              // 해당 핀보다 이전 순번의 리스트들은 전부 고정 기능 활성화
              lists.forEach((list, index) => {
                if (index <= targetIndex) {
                  list.classList.add("pinned");
                  list.querySelector(".ico-pin").classList.add("is-active");
                  // 체크해제 금지
                  list.querySelector("input").checked = true;
                  list.querySelector("input").disabled = true;
                }
              });
            }

            // 내가 누른 핀이 비활성화되는 경우
            else {
              // 해당 리스트 고정 해제
              targetList.classList.remove("pinned");
              lists.forEach((list, index) => {
                // 해당 핀보다 이전 순번의 리스트들은 전부 고정 기능 비활성화
                if (index >= [...lists].indexOf(targetList)) {
                  list.classList.remove("pinned");
                  list.querySelector(".ico-pin").classList.remove("is-active");
                  list.querySelector("input").disabled = false;
                }
              });
            }
          };

          const pins = modal.querySelectorAll(".ico-pin");
          pins.forEach(pin => {
            pin.addEventListener("click", handleCheckPinned);
          });
          
        });
      }
    }, 100);
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
            const initialize = () => sub.classList.remove("is-active");
            const checkSelect = () => {
              if (event.currentTarget.classList.contains("select-word") && sub.classList.contains("selector-word")) {
                sub.classList.add("is-active");
              }
              if (
                (event.currentTarget.classList.contains("select-category") && sub.classList.contains("selector-category")) ||
                sub.classList.contains("selector-word")
              ) {
                sub.classList.add("is-active");
              }

              if (
                event.currentTarget.classList.contains("select-number") &&
                (sub.classList.contains("selector-device") || sub.classList.contains("selector-number"))
              ) {
                sub.classList.add("is-active");
                subSelectors[0].classList.remove("is-active");

                const devices = document.querySelectorAll(".selector-device [class*='select']");
                if (event.currentTarget.closest(".select-monthly-search")) {
                  devices.forEach(device => {
                    device.style.display = "flex";
                  });
                }
                if (event.currentTarget.closest(".select-monthly-search2")) {
                  devices.forEach(device => {
                    if (device.classList.contains("select-google")) {
                      device.style.display = "flex";
                      device.querySelector("input").checked = true;
                    } else {
                      device.style.display = "none";
                    }
                  });
                }
                if (event.currentTarget.closest(".select-monthly-click")) {
                  devices.forEach(device => {
                    if (
                      device.classList.contains("select-naver-pc") ||
                      device.classList.contains("select-naver-mobile")
                    ) {
                      device.style.display = "flex";
                      device.querySelector("input").checked = true;
                    } else {
                      device.style.display = "none";
                    }
                  });
                }
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
    Filters: 키워드 트렌드 > 연관 키워드 필터링
  ===================================================== */

  const searchButtons = document.querySelectorAll(".section-related-keyword .search button");

  searchButtons.forEach(button => {
    button.addEventListener("click", event => {
      const content = event.currentTarget.closest(".tab-content");
      const searchInput = content.querySelector(".search input");
      const clearInput = content.querySelector(".x");
      const selectedFilters = content.querySelector(".selected-filters");

      const validateFilters = () => {
        if (searchInput.value !== "") {
          addSelectedFilters();
          removeSelectedFilters();
          searchInput.value = "";
          clearInput.classList.remove("is-active");
        } else {
          alertModal.classList.add("is-active");
          alertModalContent.innerText = "검색어를 입력해 주세요.";
        }
      };

      const addSelectedFilters = () => {
        const selectors = content.querySelectorAll(".filters .selector");
        const selected = document.createElement("ul");
        const filter = document.createElement("li");
        filter.classList.add("ico-filter");

        selectors.forEach(selector => {
          if (selector.classList.contains("main") || selector.classList.contains("is-active")) {
            const span = document.createElement("span");
            const text = selector.querySelector("input:checked + label").innerText;

            span.innerText = `${text}`;
            return filter.append(span);
          }
        });
        filter.innerHTML += `<span>${searchInput.value}</span>`;
        filter.innerHTML += `<div class="x close"></div>`;

        selectedFilters.appendChild(selected);
        selected.appendChild(filter);
      };

      const removeSelectedFilters = () => {
        const closes = selectedFilters.querySelectorAll(".x");
        closes.forEach(close => {
          close.addEventListener("click", event => {
            event.currentTarget.parentElement.remove();
          });
        });
      };

      //validateFilters();
    });
  });

  const menus = document.querySelectorAll(".aside nav menu a");
  menus.forEach(menu => {
    menu.closest("div").querySelector("ul") && menu.closest("menu").classList.add("more");
    menu.addEventListener("click", event => {
      event.stopPropagation();
      if (!event.currentTarget.classList.contains("ico-link")) {
        event.currentTarget.closest("div").classList.toggle("is-active");
      }
    });
  });

  // 날짜 구하기
  const date1 = document.querySelector(".list .date.d-1");
  const date7 = document.querySelector(".list .date.d-7");
  const date14 = document.querySelector(".list .date.d-14");
  const date30 = document.querySelector(".list .date.d-30");

  const getDateAgo = days => {
    let dateCopy = new Date();
    dateCopy.setDate(dateCopy.getDate() - days);

    const year = dateCopy.getFullYear();
    const month = dateCopy.getMonth() + 1;
    const day = dateCopy.getDate();

    return `${year}-${month}-${day}`;
  };

  date1 && (date1.textContent = getDateAgo(1));
  date1 && (date7.textContent = getDateAgo(7));
  date1 && (date14.textContent = getDateAgo(14));
  date1 && (date30.textContent = getDateAgo(30));

  // 알람서비스 main 요소 변형
  const alarmTable = document.querySelector(".table-alarm-services");
  const alarmContent = document.querySelector(".content-alarm-services");

  if (alarmTable || alarmContent) {
    document.body.style.overflow = "auto";
    alarmTable && alarmTable.closest("main").classList.add("mutated");
    alarmContent && alarmContent.closest("main").classList.add("mutated");
  }

  /* =====================================================
    Advanced Search
  ===================================================== */
  const advancedSearch = document.querySelectorAll(".advanced-search");
  if (advancedSearch[0]) {
    advancedSearch.forEach(search => {
      const button = search.closest("section").querySelector(".btn-advanced-search");
      const inputs = search.querySelectorAll("input[type='text'], input[type='number'], textarea");
      const checkboxes = search.querySelectorAll("input[type='checkbox']");
      const selections = search.querySelectorAll(".select input:first-of-type");
      const selectboxes = search.querySelectorAll(".selectbox select");
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

        selectboxes.forEach(select => {
          select[0].selected = true;
          select.value = select[0].value;
        });
      };

      // 초기화
      const clear = search.querySelector(".clear");
      clear && clear.addEventListener("click", initialize);

      // 등록일 사용여부
      const itemCreated = search.querySelector(".item-created");
      const calendar = itemCreated && itemCreated.querySelector(".calendar");
      const options = itemCreated && itemCreated.querySelectorAll(".select input");

      options &&
        options.forEach(option => {
          const choose = event => {
            event.currentTarget.dataset.select === "yes"
              ? calendar.classList.add("is-active")
              : calendar.classList.remove("is-active");
          };
          option.addEventListener("click", choose);
        });

      button &&
        button.addEventListener("click", () => {
          initialize();
        });
    });
  }

  /* =====================================================
    Upload 
  ===================================================== */
  //selecting all required elements
  const uploadSection = document.querySelector(".section-upload");
  if (uploadSection) {
    const text = uploadSection.querySelector("header");
    const button = uploadSection.querySelector("button");
    const input = uploadSection.querySelector("input");
    let file;

    button.onclick = () => input.click();

    input.addEventListener("change", event => {
      file = event.currentTarget.files[0];
      uploadSection.classList.add("active");
      showFile();
    });

    uploadSection.addEventListener("dragover", event => {
      event.preventDefault();
      uploadSection.classList.add("active");
      text.textContent = "이 파일을 업로드합니다.";
    });

    uploadSection.addEventListener("dragleave", () => {
      uploadSection.classList.remove("active");
      text.textContent = "업로드 할 파일을 올려주세요.";
    });

    uploadSection.addEventListener("drop", event => {
      event.preventDefault();
      file = event.dataTransfer.files[0];
      showFile();
    });

    const showFile = () => {
      let fileType = file.type;
      let validExtensions = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      if (validExtensions.includes(fileType)) {
        text.textContent = file.name;

        let fileReader = new FileReader();
        fileReader.onload = () => {
          let fileURL = fileReader.result; //passing user file source in fileURL variable
          // UNCOMMENT THIS BELOW LINE. I GOT AN ERROR WHILE UPLOADING THIS POST SO I COMMENTED IT
          // let imgTag = `<img src="${fileURL}" alt="image">`; //creating an img tag and passing user selected file source inside src attribute
          // uploadSection.innerHTML = imgTag; //adding that created img tag inside dropArea container
        };
        fileReader.readAsDataURL(file);
      } else {
        uploadSection.classList.remove("active");
        text.textContent = "엑셀 파일만 업로드 가능합니다.";
      }
    };
  }

  /* =====================================================
  Swiper Sliders
  ===================================================== */
  setTimeout(() => {
    const progresses = document.querySelectorAll("progress");
    progresses.forEach((progress, index) => {
      let delay = 0;
      delay += `${index * 0.5}s`;
      progress.style.setProperty("--progressDelay", delay);
      progress.style.setProperty("--progressPercent", 0);
      // progress.value != null && (progress.value = progress.dataset.value);
      const max = progress.max;
      const current = progress.value;
      const currentWidth = window.getComputedStyle(progress, "::before").width;
      const percent = `calc(${parseInt((100 * current) / max)}% - ${currentWidth})`;
      progress.style.setProperty("--progressPercent", percent);

      if (parseInt((100 * current) / max) < 10) {
        progress.style.setProperty("--progressPercent", 0);
        progress.style.setProperty("--progressColor", "linear-gradient(135deg, orangered 40%, orangered)");
      } else if (parseInt((100 * current) / max) < 20) {
        progress.style.setProperty("--progressPercent", 0);
        progress.style.setProperty("--progressColor", "linear-gradient(135deg, orangered 40%, coral)");
      } else if (parseInt((100 * current) / max) < 30) {
        progress.style.setProperty("--progressPercent", 0);
        progress.style.setProperty("--progressColor", "linear-gradient(135deg, coral 40%, orange)");
      } else if (parseInt((100 * current) / max) > 80) {
        progress.style.setProperty("--progressColor", "linear-gradient(135deg, #5048d7 40%, darkturquoise)");
      } else if (parseInt((100 * current) / max) > 60) {
        progress.style.setProperty("--progressColor", "linear-gradient(135deg, #5048d7 40%, dodgerblue)");
      } else {
        progress.style.setProperty("--progressColor", "linear-gradient(135deg, #5048d7 40%, #5048d7)");
      }
    });
  }, 500);

  /* =====================================================
  Swiper Sliders
  ===================================================== */
  let horizontalSwiper = new Swiper(".swiper.horizontal", {
    spaceBetween: 15,
    speed: 1000,
    loop: true,
    hashNavigation: {
      watchState: true,
    },
    pagination: {
      el: ".swiper.horizontal .swiper-pagination",
      clickable: true,
      type: "fraction",
    },
  });

  setTimeout(() => {
    let verticalSwiper = new Swiper(".swiper.vertical", {
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 1000,
      hashNavigation: {
        watchState: true,
      },
      autoplay: {
        delay: 6000,
        disableOnInteraction: true,
      },
      direction: "vertical",
      loop: true,
    });
  }, 500);

  // 작은 화면에서 서브 페이지 슬라이더 활성화
  const breakpoint = window.matchMedia("(max-width: 640px)");
  let smallSwiper;

  const breakpointChecker = () => {
    if (breakpoint.matches === true) {
      return enableSwiper();
    } else if (breakpoint.matches === false) {
      smallSwiper !== undefined && smallSwiper.destroy(true, true);
      return;
    }
  };

  const enableSwiper = () => {
    smallSwiper = new Swiper(".swiper.small", {
      spaceBetween: 15,
      slidesPerView: 1,
      centeredSlides: true,
      speed: 1000,
      hashNavigation: {
        watchState: true,
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: true,
      },
      grabCursor: true,
      pagination: {
        el: ".swiper.small .swiper-pagination",
        clickable: true,
      },
    });
  };

  breakpoint.addListener(breakpointChecker);
  breakpointChecker();

  // // 모바일에서 입찰 정보 5개까지만 보이기
  // const bidRows = document.querySelectorAll(".content-bidding .list .row");
  // console.log(bidRows);

  // bidRows.forEach(row => {
  //   const lists = row.querySelectorAll("li");
  //   console.log(lists);
  //   if(lists.length > 5) {
  //     lists.forEach(list => {
  //       list.style.display = "none"
  //     })
  //   }
  // })

  // 목록 데이터 감지
  const lists = document.querySelectorAll(".list:not(.section-related-keyword .list)");
  lists[0] &&
    lists.forEach(list => {
      mutationObserver.observe(list, {
        childList: true,
        characterData: true,
      });
    });

  // 탭 이동 감지
  const tabContents = document.querySelectorAll(".tab-content");
  tabContents[0] &&
    tabContents.forEach(content => {
      mutationObserver.observe(content, {
        childList: true,
        characterData: true,
      });
    });

  // 팝업 감지
  const visibleModals = document.querySelectorAll(".modal");
  visibleModals[0] &&
    modals.forEach(modal => {
      mutationObserver.observe(modal, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true
      });
    });

  // 컨테이너 감지
  container &&
    mutationObserver.observe(container, {
      childList: true,
      attributes: true,
    });

  // 로더 감지
  const loader = document.querySelector(".spinner-loader");
  loader &&
    mutationObserver.observe(loader, {
      childList: true,
      subtree: true,
    });
};

const mutationObserver = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (
      mutation.target.className != "checkbox" &&
      mutation.target.className != "list pinned" &&
      mutation.previousSibling &&
      mutation.previousSibling.className != "row"
    ) {
      containerMutated();
    }
  });
});

mutationObserver.observe(document.children[0], {
  childList: true,
  attributes: true,
});
