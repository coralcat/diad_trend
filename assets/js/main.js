document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");

  // 휴대기기 높이값 변경
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  // 메뉴
  const hamburgMenu = document.querySelector(".hamburg-menu");
  const aside = document.querySelector(".aside");
  hamburgMenu.addEventListener("click", (event) => {
    event.currentTarget.classList.toggle("is-active")
      ? event.currentTarget.classList.remove("is-active")
      : event.currentTarget.classList.add("is-active");
    aside.classList.toggle("is-active") ? aside.classList.remove("is-active") : aside.classList.add("is-active");
  });

  if (aside) {
    hamburgMenu.addEventListener("click", (event) => {
      event.currentTarget.classList.toggle("is-active");
      aside.classList.toggle("is-active");
    });
  } else {
    hamburgMenu.style.display = "none";
  }

  const asideHandler = document.querySelector(".aside-handler");
  const handleAside = () => {
    if (matchMedia("screen and (max-width: 640px)").matches) {
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
  const ro = new ResizeObserver((entries) => {
    window.requestAnimationFrame(() => {
      if (!Array.isArray(entries) || !entries.length) {
        return;
      }
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);

      if (aside) {
        matchMedia("screen and (max-width: 1280px)").matches && aside.classList.add("icons-only");
        matchMedia("screen and (max-width: 640px)").matches && aside.classList.remove("icons-only");
        matchMedia("screen and (min-width: 1281px)").matches && aside.classList.remove("icons-only");
      }
    });
  });
  ro.observe(container);

  /* =====================================================
    container 내부 요소들 클래스명 변화 감지 (scroll to top 제외)
  ===================================================== */
  const scrollToTop = document.createElement("div");
  scrollToTop.classList.add("scroll-to-top");

  const containerMutated = () => {
    const main = document.querySelector("main");

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
        main.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    /* =====================================================
      Checkbox
    ===================================================== */
    // 체크박스 애니메이션 효과
    document.querySelectorAll(".checkbox").forEach((checkbox) => {
      if (!checkbox.querySelector("svg")) {
        checkbox.insertAdjacentHTML(
          "beforeend",
          `<svg width="15px" height="10px">
              <polyline points="1,5 6,9 14,1"></polyline>
            </svg>`
        );
      }
    });

    // 체크박스 모두 체크
    const checkAll = document.querySelectorAll(".check-all");
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

    // 목록 체크박스 효과
    const listCheckboxes = document.querySelectorAll(".list input[type='checkbox']");
    listCheckboxes.forEach((check) => {
      const handleListCheckboxes = (event) => {
        if (check.classList.contains("check-all")) {
          const rows = event.target.closest(".list").querySelectorAll(".row:not(.title)");
          rows.forEach((row) => {
            event.target.checked ? row.classList.add("checked") : row.classList.remove("checked");
          });
        } else {
          event.target.checked
            ? event.target.closest(".row").classList.add("checked")
            : event.target.closest(".row").classList.remove("checked");
        }
      };
      check.addEventListener("change", handleListCheckboxes);
    });

    /* =====================================================
      Toggle
    ===================================================== */
    const toggles = document.querySelectorAll("[data-toggle]");
    const handleToggle = (event) => {
      event.stopPropagation();
      const toggleName = event.target.dataset.toggle;
      const toggles = document.querySelectorAll(`[data-toggle='${toggleName}']`);
      toggles.forEach((toggle) => {
        toggle.classList.toggle("is-active");
      });
    };
    toggles.forEach((toggle) => {
      toggle.addEventListener("click", handleToggle);
    });

    /* =====================================================
      Accordion
    ===================================================== */
    const accordion = document.querySelector(".accordion");
    const handleAccordion = (event) => {
      event.target.closest("li").classList.contains("is-active")
        ? event.target.closest("li").classList.remove("is-active")
        : event.target.closest("li").classList.add("is-active");
    };
    accordion && accordion.addEventListener("click", handleAccordion);

    /* =====================================================
      Tab Menu
    ===================================================== */
    const tabs = document.querySelectorAll(".tabs li");
    const showTabContent = (event) => {
      event.stopPropagation();
      const tabName = event.target.dataset.tab;
      const tabs = document.querySelectorAll(`[data-tab='${tabName}']`);
      const tabContents = document.querySelectorAll(`.tab-content[data-tab='${tabName}']`);
      let menuIndex = [...tabs].indexOf(event.target);

      tabs.forEach((tab) => {
        [...tabs].indexOf(tab) === menuIndex ? tab.classList.add("is-active") : tab.classList.remove("is-active");
      });

      tabContents[0] &&
        tabContents.forEach((content) => {
          [...tabContents].indexOf(content) === 0 && content.classList.add("is-active");
          [...tabContents].indexOf(content) === menuIndex
            ? content.classList.add("is-active")
            : content.classList.remove("is-active");
        });
    };

    tabs.forEach((tab) => {
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
      anchors.forEach((anchor) => {
        const smoothScrolling = (event) => {
          event.target.getAttribute("href").scrollIntoView({
            behavior: "smooth",
          });
        };
        anchor.addEventListener("click", smoothScrolling);
      });
    }

    // 메인 대시보드 스크롤 효과
    if (main && main.classList.contains("content-dashboard")) {
      if (matchMedia("screen and (min-width: 1280px)").matches) {
        const contents = [...document.querySelectorAll(".tab-content")];

        let options = {
          rootMargin: "0px",
          threshold: 0.75,
        };

        const callback = (entries) => {
          entries.forEach((entry) => {
            entry.intersectionRatio >= 0.75
              ? entry.target.classList.add("is-active")
              : entry.target.classList.remove("is-active");
          });
        };
        const observer = new IntersectionObserver(callback, options);

        contents.forEach((content) => {
          const sections = [...content.children];
          sections.forEach((section, index) => {
            section.style.setProperty("--delay", `${index * 150}ms`);
          });
          observer.observe(content);
        });

        const scrollDown = document.querySelector(".scroll-down");
        const handleTabContents = () => {
          if (contents[0].classList.contains("is-active")) {
            contents[0].classList.remove("is-active");
            contents[1].classList.add("is-active");
          } else if (contents[0].classList.contains("is-active")) {
            contents[0].classList.remove("is-active");
            contents[1].classList.add("is-active");
          }
        };
        scrollDown.addEventListener("click", handleTabContents);
      }
    }

    /* =====================================================
          Input Search Clear Button
        ===================================================== */
    // 인풋창에 "x"표시 있을시 clear value
    const inputs = document.querySelectorAll(".input input");
    inputs.forEach((input) => {
      input.addEventListener("keyup", (event) => {
        const container = event.target.closest(".input");
        const clear = container.querySelector(".x");
        clear.classList.add("is-active");

        clear.addEventListener("click", () => {
          clear.classList.remove("is-active");
          input.value = "";
        });
      });
    });

    /* =====================================================
          Layout: 키워드트렌드 리포트 - 쇼핑 유형선택
        ===================================================== */
    const layout = document.querySelectorAll(".layout");
    layout.forEach((layout) => {
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
    }); */

    // 알림 매체 설정 disabled 처리
    const changeAlarmInformation = document.querySelector(".content-settings .change-information");
    if (changeAlarmInformation) {
      const select = document.getElementsByName("selectRecieveInformation");
      const detail1 = select[0].closest(".select").querySelector(".details");
      const detail2 = select[1].closest(".select").querySelector(".details");

      select.forEach((button) => {
        button.addEventListener("click", (event) => {
          if (event.target === select[0]) {
            detail1.classList.add("is-active");
            detail2.classList.remove("is-active");
          } else {
            detail1.classList.remove("is-active");
            detail2.classList.add("is-active");

            const toggles = detail2.querySelectorAll(".toggle-switch");
            const inputDisabled = (event) => {
              const row = event.target.closest(".row");
              const checked = row.querySelector("input:checked");
              const inputs = row.querySelector(".inputs");
              checked ? inputs.classList.add("is-active") : inputs.classList.remove("is-active");
            };
            toggles.forEach((toggle) => {
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

      const changeFilters = (event) => {
        initialize();
        if (event.target.id === "checkNaverList") {
          if (event.target.checked === true) {
            checkGoogle.checked === true ? list.classList.add("all") : list.classList.add("naver");
          } else if (checkGoogle.checked === true) {
            list.classList.add("google");
          } else {
            list.classList.add("all");
          }
        } else if (event.target.id === "checkGoogleList") {
          if (event.target.checked === true) {
            checkNaver.checked === true ? list.classList.add("all") : list.classList.add("google");
          } else if (checkNaver.checked === true) {
            list.classList.add("naver");
          } else {
            list.classList.add("all");
          }
        }
      };

      const checkboxes = relatedKeywordSection.querySelectorAll(".filters .checkboxes input");
      checkboxes.forEach((check) => {
        check.addEventListener("change", changeFilters);
      });
    }

    // 키워드 트렌드 리포트 - 키워드 콘텐츠 스크롤 올리기
    const pagination = document.querySelectorAll(".tab-content .pagination");
    if (pagination[0]) {
      pagination.forEach((pages) => {
        const scrollingToTop = (event) => {
          const wrapper = event.target.closest(".tab-content");
          wrapper.querySelector(".list").scrollTop = 0;
        };
        pages.addEventListener("click", scrollingToTop);
      });
    }

    /* =====================================================
        Modal
      ===================================================== */
    const modals = document.querySelectorAll(".modal");

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
      const currentModal = event.target.closest(".modal");
      const validateMessage = (message) => {
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
      if (event.target.closest(".filters")) {
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
          checkboxes.forEach((checked) => {
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
        const advancedSearch = event.target.closest(".advanced-search");
        if (advancedSearch.querySelector("textarea").value === "") {
          validateMessage("검색할 조건이 없습니다.");
        } else {
        }
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

      const modalInputs = modal.querySelectorAll("input");
      modalInputs[0] &&
        modalInputs.forEach((input) => {
          if (input.type === "checkbox") {
            input.checked = false;
          } else if (input.type === "radio") {
            const divisions = modal.querySelectorAll(".inputs");
            divisions.forEach((div) => {
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
      closeButtons.forEach((close) => {
        close.addEventListener("click", closeModal);
      });
    }

    // 계정 동기화 전체 체크
    const syncModal = document.querySelector(".modal-sync");
    if (syncModal) {
      const checkAll = syncModal.querySelector("header .check-all");

      checkAll &&
        checkAll.addEventListener("click", (event) => {
          const checkboxes = event.target.closest(".modal-content").querySelectorAll("input[type='checkbox']");

          event.target.checked = !event.target.checked;
          checkboxes.forEach((checkbox) => {
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
          sortableModals.forEach((modal) => {
            const pinned = modal.querySelectorAll(".ico-pin.is-active");
            pinned.forEach((pin) => pin.closest("li").classList.add("pinned"));

            // 핀을 클릭하면
            const handleCheckPinned = (event) => {
              const currentModal = event.target.closest(".modal-sortable");
              const lists = currentModal.querySelectorAll(".inputs li");
              const targetList = event.target.closest("li");
              const targetIndex = [...lists].indexOf(targetList);

              // 6번째 이상의 리스트에서는 핀해제 및 아이콘 숨김
              lists.forEach((list) => {
                if ([...lists].indexOf(list) > 4) {
                  list.classList.remove("pinned");
                  list.querySelector(".ico-pin").classList.remove("is-active");
                }
              });

              // 내가 누른 핀이 활성화되는 경우
              if (event.target.classList.contains("is-active")) {
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
            pins.forEach((pin) => {
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
      selectors.forEach((mainSelector) => {
        const subSelectors = mainSelector.parentElement.querySelectorAll(".selector.sub");
        const selects = mainSelector.querySelectorAll("input");
        selects[0].checked = true;
        subSelectors[0].classList.add("is-active");

        selects.forEach((selected) => {
          selected.addEventListener("click", (event) => {
            subSelectors.forEach((sub) => {
              const initialize = () => sub.classList.remove("is-active");
              const checkSelect = () => {
                if (event.target.classList.contains("select-word") && sub.classList.contains("selector-word")) {
                  sub.classList.add("is-active");
                }
                if (
                  (event.target.classList.contains("select-category") && sub.classList.contains("selector-category")) ||
                  sub.classList.contains("selector-word")
                ) {
                  sub.classList.add("is-active");
                }

                if (
                  event.target.classList.contains("select-number") &&
                  (sub.classList.contains("selector-device") || sub.classList.contains("selector-number"))
                ) {
                  sub.classList.add("is-active");
                  subSelectors[0].classList.remove("is-active");

                  const devices = document.querySelectorAll(".selector-device [class*='select']");
                  if (event.target.closest(".select-monthly-search")) {
                    devices.forEach((device) => {
                      device.style.display = "flex";
                    });
                  }
                  if (event.target.closest(".select-monthly-search2")) {
                    devices.forEach((device) => {
                      if (device.classList.contains("select-google")) {
                        device.style.display = "flex";
                        device.querySelector("input").checked = true;
                      } else {
                        device.style.display = "none";
                      }
                    });
                  }
                  if (event.target.closest(".select-monthly-click")) {
                    devices.forEach((device) => {
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

    const searchButtons = document.querySelectorAll(".content-keyword-trend-details .search button");

    searchButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const content = event.target.closest(".tab-content");
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
            alertModalContent.innerText = "검색어를 입력해주세요.";
          }
        };

        const addSelectedFilters = () => {
          const selectors = content.querySelectorAll(".filters .selector");
          const selected = document.createElement("ul");
          const filter = document.createElement("li");
          filter.classList.add("ico-filter");

          selectors.forEach((selector) => {
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
          closes.forEach((close) => {
            close.addEventListener("click", (event) => {
              event.target.parentElement.remove();
            });
          });
        };

        validateFilters();
      });
    });

    const menus = document.querySelectorAll(".aside nav menu a");
    menus.forEach((menu) => {
      menu.closest("div").querySelector("ul") && menu.closest("menu").classList.add("more");
      menu.addEventListener("click", (event) => {
        event.stopPropagation();
        if (!event.target.classList.contains("ico-link")) {
          event.target.closest("div").classList.toggle("is-active");
        }
      });
    });

    // 날짜 구하기
    const date1 = document.querySelector(".list .date.d-1");
    const date7 = document.querySelector(".list .date.d-7");
    const date14 = document.querySelector(".list .date.d-14");
    const date30 = document.querySelector(".list .date.d-30");

    const getDateAgo = (days) => {
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
      advancedSearch.forEach((search) => {
        const button = search.closest("section").querySelector(".btn-advanced-search");
        const inputs = search.querySelectorAll("input[type='text'], input[type='number'], textarea");
        const checkboxes = search.querySelectorAll("input[type='checkbox']");
        const selections = search.querySelectorAll(".select input:first-of-type");

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

        // 초기화
        const clear = search.querySelector(".clear");
        clear && clear.addEventListener("click", initialize);

        // 등록일 사용여부
        const itemCreated = search.querySelector(".item-created");
        const calendar = itemCreated && itemCreated.querySelector(".calendar");
        const options = itemCreated && itemCreated.querySelectorAll(".select input");

        options &&
          options.forEach((option) => {
            const choose = (event) => {
              event.target.dataset.select === "yes"
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

      input.addEventListener("change", (event) => {
        file = event.target.files[0];
        uploadSection.classList.add("active");
        showFile();
      });

      uploadSection.addEventListener("dragover", (event) => {
        event.preventDefault();
        uploadSection.classList.add("active");
        text.textContent = "이 파일을 업로드합니다.";
      });

      uploadSection.addEventListener("dragleave", () => {
        uploadSection.classList.remove("active");
        text.textContent = "업로드 할 파일을 올려주세요.";
      });

      uploadSection.addEventListener("drop", (event) => {
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

    const progresses = document.querySelectorAll("progress");

    progresses.forEach((progress, index) => {
      let delay = 0;
      delay += `${index * 0.5}s`;
      progress.style.setProperty("--progressDelay", delay);
      progress.style.setProperty("--progressPercent", 0);

      setTimeout(() => {
        progress.value = progress.dataset.value;
        const max = progress.max;
        const current = progress.dataset.value;
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
          progress.style.setProperty("--progressColor", "linear-gradient(135deg, coral 40%, orange)");
        } else if (parseInt((100 * current) / max) > 80) {
          progress.style.setProperty("--progressColor", "linear-gradient(135deg, #5048d7 40%, darkturquoise)");
        } else if (parseInt((100 * current) / max) > 60) {
          progress.style.setProperty("--progressColor", "linear-gradient(135deg, #5048d7 40%, dodgerblue)");
        } else {
          progress.style.setProperty("--progressColor", "linear-gradient(135deg, #5048d7 40%, #5048d7)");
        }
      }, 500);
    });

    // 목록 데이터 감지
/*     const lists = document.querySelectorAll(".list");
    lists.forEach((list) => {
      mutationObserver.observe(list, {
        childList: true,
        characterData: true,
      });
    }); */

    // 탭 이동 감지
    const tabContents = document.querySelectorAll(".tab-content");
    tabContents.forEach((content) => {
      mutationObserver.observe(content, {
        childList: true,
        characterData: true,
      });
    });

    // 팝업 감지
    modals.forEach((modal) => {
      mutationObserver.observe(modal, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    });
  };

  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      containerMutated();
    });
  });

  mutationObserver.observe(container, {
    childList: true,
    characterData: true,
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const modals = document.querySelectorAll(".modal");

  const alertModal = document.createElement("div");
  alertModal.classList.add("modal", "modal-alert");
  alertModal.innerHTML = `
      <div class="dialog">
        <div class="modal-content"></div>
        <footer class="buttons">
          <button class="close" type="button">확인</button>
        </footer>
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
        <footer class="buttons">
          <button class="btn-cancel close" type="button">아니오</button>
          <button type="button">예</button>
        </footer>
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
            input[0] && (input[0].checked = true);
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

const tooltipContents = {
  serviceExpiration: `서비스 이용기간이 만료되었습니다. 만료 후 7일 이내로 서비스를 연장하지 않으면 데이터가 삭제됩니다. 삭제된 데이터는 복구되지 않으니, 서비스 이용 시 유의하시기 바랍니다.`,
  // 상세검색 - 키워드
  advancedSearchKeyword: `
    <dl>
      <dd>복수검색은 줄 바꿈(엔터키)으로 구분합니다.</dd>
      <dd>예시:</dd>
      <dd>키워드</dd>
      <dd>상품</dd>
    </dl>
    `,
  // 상세검색 - MID
  advancedSearchMID: `
    <dl>
      <dd>복수검색은 줄 바꿈(엔터키)으로 구분합니다.</dd>
      <dd>12345678900</dd>
      <dd>12345678901</dd>
    </dl>
    `,

  // 상세검색 - 변동폭
  fluctuationRange: `
    <dl>
      <dd>최저가 변동폭을 검색합니다.</dd>
      <dd>특정 값을 검색할 경우 이상·이하 입력 칸에 같은 값을 입력해주세요.</dd>
    </dl>
    `,

  // 상세검색 - 순위
  rank: `
    <dl>
      <dd>순위 범위를 전체순위(1~401위)로 입력해주세요.</dd>
      <dd>400위 밖을 검색할 경우 ‘이상’ 입력 칸에 401을 입력해주세요.</dd>
      <dd>특정 값을 순위로 검색할 경우 위아래 입력 칸에 같은 값을 입력해주세요.</dd>
    </dl>
    `,

  /* 네이버 순위 추적 */
  // 현재 순위
  currentRank: `
    현재순위 아래 변동폭은 전 갱신타임 순위 대비 현재 순위의 변동을 기준으로 합니다.
    `,
  // 전일 순위
  yesterdayRank: `
    전일순위 아래 변동폭은 전일 순위 대비 현재 순위의 변동을 기준으로 합니다.
    `,
  // 전주 순위
  lastWeekRank: `
    전주순위 아래 변동폭은 전주 순위 대비 현재 순위의 변동을 기준으로 합니다.
    `,
  // 2주전 순위
  twoWeeksAgoRank: `
    2주전 순위 아래 변동폭은 2주전 순위 대비 현재 순위의 변동을 기준으로 합니다.
    `,
  // 전월 순위
  lastMonthRank: `
    전월순위 아래 변동폭은 전월 순위 대비 현재 순위의 변동을 기준으로 합니다.
    `,
  // 최근 30일 변동
  last30Days: `
    <dl class="tooltip-content">
      <dd>최근 30일 동안의 최저가 변동(상승, 하락) 여부를 알 수 있습니다.</dd>
      <dd>최근 30일 동안 최저가 변동이 1회라도 있으면 변동입니다.</dd>
      <dd>최근 30일은 당일 포함 30일입니다.</dd>
    </dl>
    `,
  // 최근 30일 변동 횟수
  last30DaysTimes: `
    <dl class="tooltip-content">
      <dd>최근 30일 동안의 최저가 상승과 하락 횟수를 알 수 있습니다.</dd>
      <dd>최근 30일은 당일 포함 30일입니다.</dd>
    </dl>
    `,
  // 최근 30일 최대 상승 금액
  last30DaysHighestPrice: `
    <dl class="tooltip-content">
      <dd>최근 30일 동안의 최저가가 상승한 건 중 금액이 가장 큰 값을 알 수 있습니다.</dd>
      <dd>금액 아래에는 최대 상승 금액으로 변동한 갱신 타임이 표시됩니다.</dd>
      <dd>최대 상승 금액이 동일한 갱신 타임이 있는 경우 최근 일시가 표시됩니다.</dd>
      <dd>최근 30일은 당일 포함 30일입니다.</dd>
    </dl>
    `,
  // 최근 30일 최대 하락 금액
  last30DaysLowestPrice: `
    <dl class="tooltip-content">
      <dd>최근 30일 동안의 최저가가 하락한 건 중 금액이 가장 큰 값을 알 수 있습니다.</dd>
      <dd>금액 아래에는 최대 하락 금액으로 변동한 갱신 타임이 표시됩니다.</dd>
      <dd>최대 하락 금액이 동일한 갱신 타임이 있는 경우 최근 일시가 표시됩니다.</dd>
      <dd>최근 30일은 당일 포함 30일입니다.</dd>
    </dl>
    `,
  // 상품 순위 추적
  trackingProductRank: `
    <dl>
      <dd>네이버 쇼핑에서 특정 키워드에 노출되는 상품의 순위 정보를 확인할 수 있습니다.</dd>
      <dd>상품마다 키워드별 순위 변동 차트 및 이력을 제공하여 순위 변동을 한눈에 확인할 수 있습니다.</dd>
      <dd>순위 변동 시 알림을 제공합니다. (유료 부가서비스)</dd>
      <dd>순위 갱신은 00:00, 03:00, 06:00, 09:00, 12:00, 15:00, 18:00, 21:00 3시간 단위로 진행됩니다.</dd>
    </dl>
    `,
  // 목록 - 갱신실패 400위 밖
  rankingFailed400: `
    <dl>
      <dd>순위가 400위 밖인 경우 상품 정보가 갱신되지 않을 수 있습니다.</dd>
      <dd>'400위 밖'이 갱신타임 연속으로 2일 이상 지속될 경우 키워드 소재 갱신이 자동 중단됩니다. 갱신중단 시에는 갱신을 재개하거나 소재 삭제 후 재등록하실 수 있습니다.</dd>
    </dl>
    `,

  // 목록 갱신실패
  failedToLoad: `
    <dl class="tooltip-content">
      <dd>일시적으로 상품을 찾을 수 없는 경우 '갱신실패'로 상품 정보가 갱신 되지 않을 수 있습니다.</dd>
      <dd>
        <div>'갱신실패'가 갱신타임 연속으로 2일 이상 지속될 경우 갱신이 자동으로 중단됩니다.</div>
        <div>(API 호출 오류로 인한 갱신실패 제외)</div>
      </dd>
      <dd>갱신중단 시 갱신을 재개하거나 소재 삭제 후 재등록 하실 수 있습니다.</dd>
    </dl>
    `,
  failedToLoad2: `일부 갱신 타임 가격 정보가 갱신에 실패하였습니다. 일부 데이터 갱신에 실패하는 경우 일별 최저가 관련 데이터를 제공하지 않습니다.`,
  failedToLoad3: `
    <dl>
      <dd>상품 정보가 갱신되지 않았습니다.</dd>
      <dd>상품정보 갱신실패는 상품을 찾을 수 없거나 API호출 오류, 갱신 중단 시 발생할 수 있습니다.</dd>
    </dl>
    `,
  failedToLoad400: `상품에 등록된 모든 키워드가 400위 밖으로 상품 정보가 갱신되지 않았습니다.`,

  // 목록 - 갱신실패 API
  naverAPIError: `네이버 검색 API 호출 오류로 갱신에 실패하였습니다.`,

  // 키워드별 순위 차트
  keywordHistory: `
    <dl>
      <dd>키워드별 순위를 한눈에 확인할 수 있는 차트입니다.</dd>
      <dd>기간과 간격을 설정하여 원하는 데이터를 얻을 수 있습니다.</dd>
      <dd>등록일부터 데이터가 갱신됨으로 등록 후 초반에는 기간 설정에 제한이 있을 수 있습니다.</dd>
    </dl>
    `,

  // 키워드별 순위 이력
  keywordHistory: `
    <dl>
      <dd>키워드별 순위를 한눈에 확인할 수 있는 차트입니다.</dd>
      <dd>기간과 간격을 설정하여 원하는 데이터를 얻을 수 있습니다.</dd>
      <dd>등록일부터 데이터가 갱신됨으로 등록 후 초반에는 기간 설정에 제한이 있을 수 있습니다.</dd>
    </dl>
    `,

  // 판매가 차트
  priceChart: `
    <dl>
      <dd>판매가 변동을 한눈에 확인할 수 있습니다.</dd>
      <dd>기간과 간격을 설정하여 원하는 데이터를 얻을 수 있습니다.</dd>
      <dd>등록일부터 데이터가 갱신됨으로 등록 후 초반에는 기간 설정에 제한이 있을 수 있습니다.</dd>
    </dl>
    `,

  // 순위 변동 주간 Top
  weeklyChangedRanking: `
    <dl>
      <dd>주간 동안 순위 변동 폭이 큰 키워드 순위를 알려드립니다.</dd>
      <dd>매주 월요일 00:00 갱신 데이터를 기준으로 합니다.</dd>
      <dd>최근 3개월의 데이터만 노출됩니다.</dd>
      <dd>갱신실패 데이터는 포함되지 않습니다.</dd>
    </dl>
    `,

  /* 네이버 최저가 추적 */
  // 최저가 차트
  lowestPriceChart: `
    <dl>
      <dd>상품의 최저가 변동을 한눈에 확인할 수 있는 차트입니다.</dd>
      <dd>기간을 설정하여 원하는 데이터를 얻을 수 있습니다.</dd>
      <dd>등록일부터 데이터가 갱신됨으로 등록 후 초반에는 기간 설정에 제한이 있을 수 있습니다.</dd>
    </dl>
    `,

  // 일별 최저가
  dailyLowestPrice: `
    <dl>
      <dd>최저가의 일별 추이를 알 수 있습니다.</dd>
      <dd>기간을 설정하여 원하는 데이터를 얻을 수 있습니다.</dd>
      <dd>차트 클릭 시 해당 일의 최저가 차트를 보실 수 있습니다.</dd>
      <dd>등록일부터 데이터가 갱신됨으로 등록 후 초반에는 기간 설정에 제한이 있을 수 있습니다.</dd>
    </dl>
    `,

  // 최저가 추적
  trackingLowestPrice: `
    <dl>
      <dd>네이버 쇼핑 가격비교 상품의 최저가 정보를 확인할 수 있습니다.</dd>
      <dd>상품마다 최저가 변동 차트를 제공하여 최저가 변동을 한눈에 확인할 수 있습니다.</dd>
      <dd>최저가 변동 시 알림을 제공합니다. (유료 부가서비스)</dd>
      <dd>최저가 갱신은 00:00, 03:00, 06:00, 09:00, 12:00, 15:00, 18:00, 21:00 3시간 단위로 진행됩니다.</dd>
    </dl>
    `,

  /* 키워드 분석 */
  // 구글 월간 검색수
  googleMonthlySearchRelated: `
    지난 12개월 동안의 Google 기준 월간 검색량 추이를 차트로 볼 수 있습니다.
    `,
  //키워드 트렌드
  keywordTrend: `검색, 상품, 콘텐츠, 연관 키워드 등 클릭 한번으로 흩어진 정보를 모아 키워드의 트렌드를 한눈에 확인할 수 있습니다.`,
  // 월간 검색량
  monthlySearchChart: `
    <dl>
      <dd>
        월간 평균 검색량은 지난 12개월 동안 Google을 기준으로, 조회한 키워드와 유사 검색어를 검색한 평균 횟수입니다.
      </dd>
      <dd>
        이 정보를 이용해 해당 키워드가 연중 시기별로 얼마나 자주 검색되는지 알아볼 수 있습니다.
      </dd>
    </dl>
    `,

  // 쇼핑 카테고리 트렌드 차트
  shoppingCategoryTrendChart: `
    <dl>
      <dd>Top 40 카테고리 분석 상위 3개 카테고리의 검색 클릭 추이를 알 수 있는 쇼핑 트렌드 차트입니다.</dd>
      <dd>기간은 2017년 8월부터 조회 가능합니다.</dd>
      <dd>트렌드는 조회하신 기간 중 검색 횟수가 가장 높은 시점을 100으로 둔 상대적 값으로 표현됩니다.</dd>
    </dl>
    `,

  // 유튜브 일일 조회수 초과
  exceedDailyViews: `
    <dl>
      <dd>유튜브 제공 데이터는 일일 할당량 제한으로 불가피하게 조회수에 제한이 있습니다.</dd>
      <dd>빠른 시일 내 조회수 제한을 없애 원활하게 서비스를 이용하실 수 있도록 하겠습니다.</dd>
    </dl>
    `,

  // 키워드 검색 차트
  keywordSearchChart: `
    <dl>
      <dd>지난 12개월간의 네이버 검색 트렌드와 구글 검색량의 월간 추이를 한눈에 확인할 수 있는 차트입니다.</dd>
      <dd>네이버 검색 트렌드는 지난 12개월 동안 검색 횟수가 가장 높은 달을 100으로 둔 상대적 값으로 표현됩니다.</dd>
    </dl>
    `,

  // 키워드 콘텐츠
  keywordContent: `
    <dl>
      <dd>블로그(네이버, 다음), 카페(네이버, 다음), 뉴스(네이버), 동영상(유튜브) 총 6가지 매체의 콘텐츠를 제공합니다.</dd>
      <dd>네이버는 100건, 다음과 유튜브는 50건의 상위 노출 콘텐츠를 확인할 수 있습니다.</dd>
      <dd>네이버와 다음은 정확도 순, 유튜브는 조회수 순입니다.</dd>
    </dl>
    `,

  // Top 40
  top40: `
    <dl>
      <dd>네이버 쇼핑 키워드 검색 시 노출되는 상위 40개 상품의 카테고리 분석 결과를 제공합니다.</dd>
      <dd>광고 상품은 제외됩니다.</dd>
      <dd>필터를 통해 조건에 맞는 상품 조회가 가능합니다.</dd>
    </dl>
    `,

  // Top 40 카테고리 분석
  top40CategoryAnalysis: `
    <dl>
      <dd>네이버 쇼핑 키워드 검색 시 노출되는 상위 40개 상품의 카테고리 분석 결과를 제공합니다.</dd>
      <dd>광고 상품은 제외됩니다.</dd>
    </dl>
    `,

  // Top 40 상품명 분석
  top40ProductNameAnalysis: `
    <dl>
      <dd>
        네이버 쇼핑 키워드 검색 시 노출되는 상위 40개 상품의 상품명 분석 결과를 제공합니다.
      </dd>
      <dd>광고 상품은 제외됩니다.</dd>
      <dd>
        띄어쓰기를 기준으로 분석합니다.
        <dl>
          <dd>
            예시: 스타벅스 디카페인 커피원두
            → 스타벅스 / 디카페인 / 커피원두
          </dd>
        </dl>
      </dd>
    </dl>
    `,

  // Top 40 판매가 분석
  top40PriceAnalysis: `
    <dl>
      <dd>네이버 쇼핑 키워드 검색 시 노출되는 상위 40개 상품의 판매가 분석 결과를 제공합니다.</dd>
      <dd>광고 상품은 제외됩니다.</dd>
      <dd>일반상품은 판매가, 가격비교상품은 최저가를 기준으로 분석합니다.</dd>
      <dd>원하는 구간의 그래프를 더블 클릭하시면 해당 구간의 상품목록을 확인하실 수 있습니다.</dd>
    </dl>
    `,

  // Top 40 브랜드 분석
  top40BrandAnalysis: `
    <dl>
      <dd>
        네이버 쇼핑 키워드 검색 시 노출되는 상위 40개 상품의 브랜드 분석 결과를 제공합니다.
      </dd>
      <dd>
        광고 상품은 제외됩니다.
      </dd>
    </dl>
    `,

  naverAndGoogleSearched: `
    <dl>
      <dd>
        네이버와 구글 매체의 검색 데이터를 제공합니다.
      </dd>
      <dd>
        월간 데이터의 기준은 네이버는 최근 30일, 구글은 전월 또는 전전월의 데이터입니다.
      </dd>
    </dl>
    `,

  // 월간 검색수
  monthlySearch: `최근 한 달간 네이버를 이용한 사용자가 PC에서 해당 키워드를 검색한 횟수입니다.`,
  monthlySearchMobile: `최근 한 달간 네이버를 이용한 사용자가 모바일에서 해당 키워드를 검색한 횟수입니다.`,
  googleMonthlySearch: `최근 한 달간 구글을 이용한 사용자가 해당 키워드를 검색한 대략적인 횟수입니다.`,
  googleMonthlySearchMobile: `최근 한 달간 네이버를 이용한 사용자가 모바일에서 해당 키워드를 검색한 횟수입니다.`,
  googleAverageSearchVolume: `
    <dl>
      <dd>
        월간 평균 검색량은 지난 12개월 동안 Google을 기준으로, 조회한 키워드와 유사 검색어를 검색한 평균 횟수입니다.
      </dd>
      <dd>
        이 정보를 이용해 해당 키워드가 연중 시기별로 얼마나 자주 검색되는지 알아볼 수 있습니다.
      </dd>
    </dl>
    `,

  // 경쟁정도
  competition: `
    <dl>
      <dd>특정 키워드의 광고 게재 위치가 얼마나 경쟁이 치열한지를 보여 줍니다.</dd>
      <dd>
        경쟁 수준은 Google에서 검색되는 전체 키워드에 입찰하는 광고주 수에 따라 결정됩니다.
      </dd>
      <dd>데이터가 충분하지 않으면 대시(-)가 표시됩니다.</dd>
    </dl>
    `,

  // 네이버 & 구글 경쟁정도
  naverAndGoogleCompetition: `
    <dl class="tooltip-content">
      <dd>
        네이버에서 경쟁정도는 최근 한 달간 해당 키워드에 대한 경쟁정도를 PC통합검색영역 기준으로 구분한 지표입니다. 다수의 광고주가 추가한 광고일수록 경쟁정도가 높을 수 있습니다.
      </dd>
      <dd>
        구글에서 경쟁정도는 특정 키워드의 광고 게재 위치가 얼마나 경쟁이 치열한지를 보여 줍니다. 경쟁 수준은 Google에서 검색되는 전체 키워드에 입찰하는 광고주 수에 따라 결정됩니다. 데이터가 충분하지 않으면 대시(-)가 표시됩니다.
      </dd>
    </dl>
    `,

  // 경쟁률
  competitionRate: `콘텐츠의 경쟁률은 매체 중 월간 검색수 데이터가 있는 네이버만 제공합니다.`,

  // 상품경쟁률
  productCompetitionRate: `
    <dl class="tooltip-content">
      <dd>상품수 ÷ 월간 검색량 입니다.</dd>
      <dd>숫자가 클수록 경쟁이 심하고, 작을수록 경쟁이 덜합니다.</dd>
    </dl>
    `,

  // 네이버 블로그 경쟁률
  naverBlogCompetitionRate: `
    <dl class="tooltip-content">
      <dd>네이버 블로그 발행량 ÷ 네이버 월간 검색수입니다.</dd>
      <dd>숫자가 클수록 경쟁이 심하고, 작을수록 경쟁이 덜합니다.</dd>
    </dl>
    `,

  // 네이버 카페 경쟁률
  naverCafeCompetitionRate: `
    <dl class="tooltip-content">
      <dd>네이버 카페 발행량 ÷ 네이버 월간 검색수입니다.</dd>
      <dd>숫자가 클수록 경쟁이 심하고, 작을수록 경쟁이 덜합니다.</dd>
    </dl>
    `,

  // 네이버 카페 경쟁률
  naverNewsCompetitionRate: `
    <dl class="tooltip-content">
      <dd>네이버 뉴스 발행량 ÷ 네이버 월간 검색수입니다.</dd>
      <dd>숫자가 클수록 경쟁이 심하고, 작을수록 경쟁이 덜합니다.</dd>
    </dl>
    `,

  // 쇼핑
  naverShopping: `네이버 쇼핑 키워드 검색 시 노출되는 상품 데이터를 제공합니다.`,

  // 페이지 상단 입찰가
  topOfPageBid: `
    <dl class="tooltip-content">
      <dd>
        페이지 상단 입찰가(하위)는 광고주가 키워드에 대해 지불했던 페이지 상단 입찰가 중에서 낮은 범위(20 백분위수)에 해당하는 입찰가를 나타냅니다. 키워드의 평균 CPC는 다를 수 있습니다.
      </dd>
      <dd>
        페이지 상단 입찰가(상위)는 광고주가 키워드에 대해 지불했던 페이지 상단 입찰가 중에서 높은 범위(80 백분위수)에 해당하는 입찰가를 나타냅니다. 키워드의 평균 CPC는 다를 수 있습니다.
      </dd>
    </dl>
    `,
  topOfPageBid20: `
    <dl>
      <dd>
        광고주가 키워드에 대해 지불했던 페이지 상단 입찰가 중에서 낮은 범위(20 백분위수)에 해당하는 입찰가를 나타냅니다.
      </dd>
      <dd>키워드의 평균 CPC는 다를 수 있습니다.</dd>
    </dl>
    `,
  topOfPageBid80: `
    <dl>
      <dd>
        광고주가 키워드에 대해 지불했던 페이지 상단 입찰가 중에서 높은 범위(80 백분위수)에 해당하는 입찰가를 나타냅니다.
      </dd>
      <dd>키워드의 평균 CPC는 다를 수 있습니다.</dd>
    </dl>
    `,

  contents: `블로그(네이버, 다음), 카페(네이버, 다음), 뉴스(네이버), 동영상(유튜브) 총 6가지 매체의 콘텐츠 데이터를 제공합니다.`,

  // 연관 키워드
  relatedKeyword: `
    <dl class="tooltip-content">
      <dd>검색한 키워드와 연관도가 높은 키워드 목록을 제공합니다.</dd>
      <dd>연관 키워드는 네이버와 구글 매체의 데이터를 제공합니다.</dd>
      <dd>연관도 순서(NO)는 매체가 네이버인 경우 우선 나열되고, 뒤에 이어 매체가 구글인 키워드 순으로 나열됩니다.</dd>
      <dd>매체가 중복되는 키워드는 네이버 연관도 순서 기준으로 구글 데이터가 추가되어 표시됩니다.</dd>
      <dd>네이버와 중복되지 않은 구글 키워드는 네이버 연관 키워드 아래 표시됩니다.</dd>
    </dl>
    `,

  naverMonthlySearch: `
    <dl class="tooltip-content">
      <dd>
        네이버 월간 검색수는 전일 포함 이전 30일 간 네이버를 이용한 사용자가 PC 및 모바일에서 해당 키워드를 검색한 횟수입니다.
      </dd>
      <dd>
        구글 월간 검색수는 지난 한달 간(전월 또는 전전월*) 구글을 이용한 사용자가 해당 키워드를 검색한 대략적인 횟수입니다.
      </dd>
      <dd>
        *키워드 검색 차트의 마지막 달
      </dd>
    </dl>
    `,

  // 3개월간 변동을
  fluctuation3months: `
    <dl class="tooltip-content">
      <dd>
        3개월 변동은 최근 달의 데이터를 그보다 2개월 전의 데이터와 비교하여 3개월 동안의 검색 동향 변화를 표시합니다.
      </dd>
      <dd>
        예를 들어 최근 달이 7월인 경우, 7월 데이터를 5월과 비교하여 3개월 동안의 검색량 변화를 표시합니다.
      </dd>
    </dl>
    `,

  // 6개월간 변동을
  fluctuation6months: `
    <dl class="tooltip-content">
      <dd>
        6개월 변동은 최근 달의 데이터를 그보다 5개월 전의 데이터와 비교하여 6개월 동안의 검색 동향 변화를 표시합니다.
      </dd>
      <dd>
        예를 들어 최근 달이 7월인 경우, 7월 데이터를 2월과 비교하여 6개월 동안의 검색량 변화를 표시합니다.
      </dd>
    </dl>
    `,

  // 월 평균 클릭수
  averageClicksPerMonth: `최근 한 달간 사용자가 네이버에서 해당 키워드를 검색했을 때, 통합검색 영역에 노출된 광고가 받은 평균 클릭수입니다.`,

  // 월 평균 클릭률
  averageClickThroughRate: `
    <dl class="tooltip-content">
      <dd>
        최근 한 달간 해당 키워드로 네이버 통합검색 영역에 노출된 광고가 받은 평균 클릭률을 의미합니다. 
      </dd>
      <dd>
        예: 광고노출수가 1,000회이고, 노출된 광고를 클릭한 횟수가 5회라면, 클릭률은 0.5%입니다.
      </dd>
    </dl>
    `,

  // 월 평균 노출 광고수
  averageAdsPerMonth: `
    <dl class="tooltip-content">
      <dd>
        최근 한 달간 사용자가 해당 키워드를 검색했을 때,  PC통합검색영역에 도출된 평균 광고 개수입니다.
      </dd>
      <dd>
        키워드의 경쟁정도를 가늠해볼 수 있습니다.
      </dd>
    </dl>
    `,

  /* 자동입찰 */
  // 입찰
  bidding: `
    <dl class="tooltip-content">
      <dt>입찰은 입찰 프로세스 진행 상황에 따라 대기, 성공, 실패가 있습니다.</dt>
      <dd>대기는 입찰이 한 번도 실행되지 않은 초기 상태입니다.</dd>
      <dd>성공은 희망 순위에 도달하였거나, 설정한 값을 기준으로 입찰 프로세스가 진행되어 정상적으로 종료된 상태입니다.</dd>
      <dd>실패는 입찰 프로세스가 진행되었으나, 여러 요인에 의해 정상적으로 종료되지 못한 상태입니다.</dd>
    </dl>
    `,
  // 입찰실행
  bidProceed: `입찰상태가 ON인 상태입니다.`,
  // 입찰대기
  bidWaiting: `입찰이 한 번도 실행되지 않은 초기 상태입니다.`,
  // 입찰진행
  biddingInProgress: `입찰이 진행되고 있는 상태로, 입찰가가 상승 중인 상태입니다.`,
  // 목표달성
  goalAchieved: `목표달성은 사용자가 설정한 목표에 도달한 상태입니다.`,
  // 최대입찰가도달
  maximumBid: `
    <dl>
      <dd>입찰가가 사용자가 설정한 최대 입찰가에 도달한 상태입니다.</dd>
      <dd>최대 입찰가에 도달하면 입찰 프로세스를 완료하지 않고 중단합니다.</dd>
    </dl>
    `,
  maximumBid2: `최종 입찰목표 금액이 입찰한도를 초과한 경우`,
  //입찰불가
  unableToBid: `
      입찰설정이 잘못되어 있거나 광고 캠페인, 그룹, 소재, 키워드 등이 OFF인 상태, 비즈머니 부족 등으로 입찰 프로세스를 정상적으로 종료하지 못한 상태입니다. 입찰불가 시 사용자는 실패 사유에 맞게 조치를 취할 수 있습니다.
    `,

  // 입찰실패
  bidFailed: `서버, 네트워크 등의 오류로 입찰 프로세스를 정상적으로 종료하지 못한 상태입니다. 입찰실패가 지속된다면 다이애드로 문의하세요.`,

  /* 자동입찰 - 구글 */
  // 입찰성공
  biddingSuccess: `최대 CPC가 최종 입찰목표 금액에 도달함`,

  // 입찰실패
  bidFailedGoogle: `최대 CPC가 최종 입찰목표 금액에 도달하지 못함`,

  // 하향입찰
  biddingDown: `
    <dl>
      <dd>목표달성 후 사용자가 하향입찰을 설정한 경우 하향입찰이 진행됩니다.</dd>
      <dd>입찰가가 하락 중인 상태입니다.</dd>
    </dl>
    `,

  // 최소입찰가미만
  minimumBid: `레귤러 설정에서 최소입찰가를 설정한 경우<br />
      산출 입찰가가 최소입찰가보다 작은 상태입니다.
    `,

  //입찰예정가
  bidPrice: `
    <dl>
      <dd>레귤러 설정 시 사용자가 선택한 기본입찰가와 최종 입찰(예정)가가 표시됩니다. 
      </dd>
      <dd>입찰예정가는 기본입찰가, 사용자 설정 옵션, 최소입찰가, 최대입찰가를 종합적으로 판단하여 최종적으로 입찰을 수행할 가격입니다.
      </dd>
      <dd>입찰예정가는 (부분)설정 완료 또는 입찰 시 업데이트 됩니다. 설정 완료 시 업데이트된 입찰예정가는 실제 입찰 시에는 호출되는 데이터에 따라 달라질 수 있습니다.
      </dd>
      <dd>사용자 설정 옵션으로 가감액을 입력했다면 최근 통합검색 평균 노출 순위가 있는 경우와 없는 경우로 나누어 산출된 입찰가 2가지가 표시됩니다</dd>
    </dl>
    `,

  // 입찰기본가
  baseBidPrice: `
    <dl>
      <dd>입찰가를 원하는 금액으로 빠르게 조정하기 위해 설정하는 금액입니다.</dd>
      <dd>필수 입력 항목이 아니므로, 미사용 시 입력하지 않으셔도 됩니다.</dd>
      <dd>순위 확인이 불가하고 현재 입찰가보다 클 때 적용됩니다.</dd>
      <dd>최대입찰가보다 클 수 없습니다.</dd>
    </dl>
    `,

  // 입찰설정
  bidSettings: `
    <dl>
      <dd>라이브 입찰은 사용자가 설정한 입찰주기마다 입찰이 진행됩니다.</dd>
      <dd>레귤러 입찰은 하루 3번 정해진 시간에 입찰이 진행되며, 원하는 순위에 도달하기 위해 입찰가를 조정하는 것이 아니라 입찰가를 원하는 입찰가로 변경합니다.</dd>
    </dl>
    `,

  // 입찰목표
  biddingTarget: `
    <dl>
      <dd>
        라이브 입찰(일반, 고급)은 희망순위 또는 타겟 URL을 입찰목표로 설정할 수 있습니다.
      </dd>
      <dd>
        희망순위는 설정한 순위를 목표로 입찰을 진행합니다. 입찰목표에는 사용자가 입력한 희망순위가 표시됩니다.
      </dd>
      <dd>
        타겟 URL은 타겟이 되는 URL를 지정하여 해당 URL 위치 바로 위나 아래를 목표로 입찰을 진행합니다. 입찰목표에는 사용자가 입력한 URL과 위/아래 선택값이 함께 표시됩니다.
      </dd>
    </dl>
    `,

  // 입찰목표(팝업)
  biddingTargetModal: `
    <dl>
      <dd>라이브 입찰(일반, 고급)은 희망순위 또는 타겟 URL을 입찰목표로 설정할 수 있습니다.</dd>
      <dd>희망순위는 설정한 순위를 목표로 입찰을 진행합니다.</dd>
      <dd>타겟 URL은 타겟이 되는 URL를 지정하여 해당 URL 위치 바로 위나 아래를 목표로 입찰을 진행합니다.</dd>
    </dl>
    `,

  // 현재순위
  biddingCurrentRank: `
    <dl>
      <dd>입찰설정이 라이브 입찰이면 입찰 시 현재순위가 업데이트 됩니다.</dd>
      <dd>입찰목표를 희망순위로 설정한 경우 현재순위가 표시됩니다.</dd>
      <dd>입찰목표를 타겟 URL로 설정한 경우 현재순위와 타겟 URL의 순위가 함께 표시됩니다.</dd>
    </dl>
    `,

  // 최저순위
  biddingLowestRank: `
    <dl>
      <dd>라이브 입찰에서 입찰목표로 타겟 URL을 설정한 경우 입력한 최저순위가 표시됩니다.</dd>
      <dd>최저순위에서 지정한 순위 아래로 내려간 경우 입찰가를 올려 최저순위로 끌어 올립니다.</dd>
    </dl>
    `,

  // 최저순위(팝업)
  lowestRankModal: `
    <dl>
      <dd>최저순위는 이 순위 아래로는 떨어지지 않았으면 하는 순위를 의미하고, 필수 입력 항목입니다.</dd>
      <dd>입찰 시 최저순위 아래로 내려간 경우 입찰가를 올려 최저순위로 순위를 끌어 올립니다.</dd>
      <dd>PC는 15위, 모바일은 5위 이내로 설정 가능합니다.</dd>
    </dl>
    `,

  // 가감액
  additionAndSubtraction: `
    <dl>
      <dd>입찰가감액은 입찰가 조정 단위로, 필수 입력 항목입니다. 미사용 시 0원을 입력하세요.</dd>
      <dd>가액은 입찰가 상승 시에 적용되면, (현재순위 - 희망(목표)순위) * 가액만큼 입찰가가 조정됩니다.</dd>
      <dd>감액은 입찰가 하락 시나 하향입찰 시 적용되며, 감액만큼만 입찰가가 조정됩니다.</dd>
    </dl>
    `,

  // 가감액
  additionAndSubtraction2: `
    <dl>
      <dd>입찰가감액은 입찰가 조정 단위로, 필수 입력 항목입니다. 미사용 시 0원을 입력하세요.</dd>
    </dl>
    `,
};

document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".spinner-loader");
  const container = document.querySelector(".container");
  const tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");
  container.appendChild(tooltip);

  const mutationObserver = new MutationObserver(mutations => {
    const tooltipIcons = document.querySelectorAll("[data-tooltip]");
    const showTooltip = event => {
      const tooltipData = event.target.dataset.tooltip;
      for (const property in tooltipContents) {
        tooltipData === `${property}` && (tooltip.innerHTML = `${tooltipContents[property]}`);
      }
      tooltip.classList.add("is-active");
      tooltip.style.top = `${event.clientY + 10}px`;

      if (window.innerWidth - event.clientX < tooltip.offsetWidth) {
        tooltip.style.left = `${event.clientX - tooltip.offsetWidth + 60}px`;
        tooltip.style.setProperty("--tooltip-position", `${tooltip.offsetWidth - 60}px`);
      } else {
        tooltip.style.left = `${event.clientX - 30}px`;
        tooltip.style.setProperty("--tooltip-position", `30px`);
      }
    };
    tooltipIcons.forEach(icon => {
      icon.addEventListener("mouseenter", showTooltip);
      icon.addEventListener("mouseout", () => {
        tooltip.classList.remove("is-active");
      });
    });
    const sections = document.querySelectorAll("main section");
    sections.forEach(section => {
      mutationObserver.observe(section, {
        childList: true,
      });
    });
  });

  mutationObserver.observe(container, {
    childList: true,
    subtree: true,
  });
});
