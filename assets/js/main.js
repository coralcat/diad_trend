document.addEventListener("DOMContentLoaded", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  const main = document.querySelector("main");
  const content = document.querySelector(".content");
  const wrapper = document.querySelector(".content > .wrapper");
  const scrollToTop = document.createElement("div");
  scrollToTop.classList.add("scroll-to-top");
  wrapper.appendChild(scrollToTop);

  let lastScrollTop = 0;

  wrapper.addEventListener("scroll", () => {
    let currentScrollTop = wrapper.scrollTop;

    if (currentScrollTop > 50) {
      if (currentScrollTop > lastScrollTop) {
        //Scroll down
        scrollToTop.classList.remove("is-active");
      } else {
        //Scroll up
        scrollToTop.classList.add("is-active");
      }

      lastScrollTop = currentScrollTop;
    } else {
      scrollToTop.classList.remove("is-active");
    }
  });

  if (matchMedia("screen and (max-width: 640px)").matches) {
    content.addEventListener("scroll", () => {
      let currentScrollTop = content.scrollTop;

      if (currentScrollTop > 50) {
        if (currentScrollTop > lastScrollTop) {
          //Scroll down
          scrollToTop.classList.remove("is-active");
        } else {
          //Scroll up
          scrollToTop.classList.add("is-active");
        }

        lastScrollTop = currentScrollTop;
      } else {
        scrollToTop.classList.remove("is-active");
      }
    });
  }

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

  const tooltips = document.querySelectorAll(".tooltip");
  if (matchMedia("screen and (max-width: 640px)").matches) {
    tooltips.forEach(tooltip => {
      tooltip.addEventListener("click", event => {
        tooltip.classList.toggle("is-active");
        const content = tooltip.querySelector(".tooltip-content");
        content.style.top = `${event.clientY}px`;
      });
    });
  }

  const easyTooltips = document.querySelectorAll("[data-tooltip]");
  if (easyTooltips[0]) {
    easyTooltips.forEach(tooltip => {
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
  const inputs = document.querySelectorAll(".input input");
  inputs.forEach(input => {
    input.addEventListener("keyup", event => {
      const {target} = event;
      const container = target.closest(".input");
      const clear = container.querySelector(".x");
      clear.classList.add("is-active");

      clear.addEventListener("click", () => {
        clear.classList.remove("is-active");
        input.value = "";
      });
    });
  });

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

  const showTabContent = event => {
    event.stopPropagation();
    const tabName = event.target.dataset.tab;
    console.log(tabName); 
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
    const select = document.getElementsByName("selectRecieveInformation");
    const detail1 = select[0].closest(".select").querySelector(".details");
    const detail2 = select[1].closest(".select").querySelector(".details");

    select.forEach(button => {
      button.addEventListener("click", event => {
        if (event.target === select[0]) {
          detail1.classList.add("is-active");
          detail2.classList.remove("is-active");
        } else {
          detail1.classList.remove("is-active");
          detail2.classList.add("is-active");

          const toggles = detail2.querySelectorAll(".toggle-switch");
          const inputDisabled = event => {
            const row = event.target.closest(".row");
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

  main.appendChild(confirmModal);
  main.appendChild(alertModal);

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
    const {target} = event;
    const modalData = target.dataset.modal;
    const targetModal = document.getElementById(modalData);
    if (targetModal) {
      targetModal.classList.add("is-active");
      targetModal.querySelector("[data-modal]").addEventListener("click", () => {
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
      const listItem = document.querySelector(".list-item");
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
  };

  const closeButtons = document.querySelectorAll(".modal .close");
  if (closeButtons) {
    closeButtons.forEach(close => {
      close.addEventListener("click", closeModal);
    });
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

    // 키워드 효과
    // const keyword = advancedSearch.querySelector("textarea");
    // keyword.addEventListener("keyup", event => {
    //   const {target, code} = event;
    //   if (code === "Comma") {
    //     const keywords = target.value.split(",");
    //     const wrapper = document.createElement("div");
    //     wrapper.classList.add("keyword");
    //     keywords.forEach(keyword => {
    //       wrapper.appendChild(keyword);
    //     });
    //   }
    // });
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
          const {target} = event;
          subSelectors.forEach(sub => {
            const initialize = () => sub.classList.remove("is-active");
            const checkSelect = () => {
              if (target.classList.contains("select-word") && sub.classList.contains("selector-word")) {
                sub.classList.add("is-active");
              }
              if (
                (target.classList.contains("select-category") && sub.classList.contains("selector-category")) ||
                sub.classList.contains("selector-word")
              ) {
                sub.classList.add("is-active");
              }

              if (
                target.classList.contains("select-number") &&
                (sub.classList.contains("selector-device") || sub.classList.contains("selector-number"))
              ) {
                sub.classList.add("is-active");
                subSelectors[0].classList.remove("is-active");

                const devices = document.querySelectorAll(".selector-device [class*='select']");
                if (target.closest(".select-monthly-search")) {
                  devices.forEach(device => {
                    device.style.display = "flex";
                  });
                }
                if (target.closest(".select-monthly-search2")) {
                  devices.forEach(device => {
                    if (device.classList.contains("select-google")) {
                      device.style.display = "flex";
                      device.querySelector("input").checked = true;
                    } else {
                      device.style.display = "none";
                    }
                  });
                }
                if (target.closest(".select-monthly-click")) {
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
       Filters: 키워드 트렌드 목록 필터링
  ===================================================== */

  /* =====================================================
       Filters: 키워드 트렌드 > 연관 키워드 필터링
  ===================================================== */

  const searchButtons = document.querySelectorAll(".content-keyword-trend-details .search button");

  searchButtons.forEach(button => {
    button.addEventListener("click", event => {
      const {target} = event;
      const content = target.closest(".tab-content");
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
            event.target.parentElement.remove();
          });
        });
      };

      validateFilters();
    });
  });

  // 메뉴
  const hamburgMenu = document.querySelector(".hamburg-menu");
  const aside = document.querySelector("aside");
  hamburgMenu.addEventListener("click", () => {
    hamburgMenu.classList.toggle("is-active");
    aside.classList.toggle("is-active");
  });
  
  const slideHandler = document.querySelector(".slide-handler svg");
  slideHandler.addEventListener("click", () => {
    if(aside.classList.contains("is-active")) {
      aside.classList.remove("is-active");
      aside.classList.add("icons-only")
    } else {
      aside.classList.remove("icons-only");       
      aside.classList.add("is-active")
    }
    slideHandler.classList.toggle("is-active");
  })

  const menus = document.querySelectorAll("aside nav menu");
  menus.forEach(menu => {
    menu.addEventListener("click", (event) => {
      // menu.closest("div").classList.remove("is-active");
      // console.log(menu.closest("div").classList);
      // if(event.target.closest("div").classList.contains("is-active")){
      //   console.log("actived")
      //   event.target.closest("div").classList.remove("is-active");
      // } else {
      //   console.log("non actived")
      //   event.target.closest("div").classList.add("is-active");
      // }
      event.target.closest("div").classList.toggle("is-active");
    })
  })

  /* =====================================================
       Dropdown
  ===================================================== */
  const dropdown = document.querySelector(".dropdown");
  if (dropdown) {
    dropdown.addEventListener("click", event => {
      const lists = dropdown.querySelectorAll("li");
      lists.forEach(list => {
        list.classList.remove("is-active");
      });
      event.target.closest("li").classList.toggle("is-active");
    });
  }

  // 키워드 콘텐츠에서 키워드 bold 처리
  const sectionArticle = document.querySelector(".content-keyword-trend-details .section-article");
  if (sectionArticle) {
    const articleLists = sectionArticle.querySelectorAll(".list-article");
    // 원두 대신 [키워드]
    const willChangeKeyword = "<strong>원두</strong>";

    articleLists.forEach(list => {
      const titles = list.querySelectorAll(".article-title");
      const contents = list.querySelectorAll(".article-content");

      titles.forEach(title => {
        // 원두 대신 [키워드]
        title.innerHTML = title.innerHTML.replace(/원두/g, willChangeKeyword);
      });
      contents.forEach(content => {
        // 원두 대신 [키워드]
        content.innerHTML = content.innerHTML.replace(/원두/g, willChangeKeyword);
      });
    });
  }

  // 키워드 트랜드 - 연관 키워드 목록
  const relatedKeywordContent = document.querySelector(".content-related-keyword");
  if (relatedKeywordContent) {
    const checkNaver = document.getElementById("checkNaverList");
    const checkGoogle = document.getElementById("checkGoogleList");
    const list = relatedKeywordContent.querySelector(".list");
    list.classList.add("all");

    const initialize = () => {
      list.classList.remove("all", "naver", "google");
    };

    const changeFilters = event => {
      initialize();
      if (event.target.id === "checkNaverList") {
        if (event.target.checked === true) {
          if (checkGoogle.checked === true) {
            list.classList.add("all");
          } else {
            list.classList.add("naver");
          }
        } else if (checkGoogle.checked === true) {
          list.classList.add("google");
        } else {
          list.classList.add("all");
        }
      }

      if (event.target.id === "checkGoogleList") {
        if (event.target.checked === true) {
          if (checkNaver.checked === true) {
            list.classList.add("all");
          } else {
            list.classList.add("google");
          }
        } else if (checkNaver.checked === true) {
          list.classList.add("naver");
        } else {
          list.classList.add("all");
        }
      }
    };

    const checkboxes = relatedKeywordContent.querySelectorAll(".filters .checkboxes input");
    checkboxes.forEach(check => {
      check.addEventListener("click", changeFilters);
    });
  }
});
