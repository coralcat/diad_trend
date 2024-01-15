const expandListColumns = () => {
  const columnIcon = document.querySelector("ico-column");
  columnIcon &&
    columnIcon.addEventListener("click", (event) => {
      const list = event.target.closest("section").querySelector(".list");
      list.classList.toggle("expand")
    })
}

// 상세검색 초기화
const handleAdvancedSearch = () => {
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
      const clear = search.querySelector(".ico-refresh");
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
};

// 체크한 목록 효과
const checkedRowEffects = () => {
  const listCheckboxes = document.querySelectorAll(".list:not(.list-form) .checkbox input[type='checkbox']");
  listCheckboxes.forEach(check => {
    const handleListCheckboxes = event => {
      if(event.target.closest(".row")) {
        event.target.checked
          ? event.target.closest(".row").classList.add("checked")
          : event.target.closest(".row").classList.remove("checked");
      }
      if (check.classList.contains("check-all")) {
        const rows = event.target.closest(".list").querySelectorAll(".row:not(.title)");
        rows.forEach(row => {
          event.target.checked ? row.classList.add("checked") : row.classList.remove("checked");
        });
      }
    };
    check.addEventListener("change", handleListCheckboxes);
  });
};

// 목록화면 - 사용자 지정 보기
const rearrangeColumns = () => {
  const eye = document.querySelector(".ico-eye");
  eye &&
    setTimeout(() => {
      const sortableModals = document.querySelectorAll(".modal-sortable");
      if (sortableModals[0]) {
        sortableModals.forEach(modal => {
          const pinned = modal.querySelectorAll(".ico-pin.is-active");
          pinned.forEach(pin => pin.closest("li").classList.add("pinned"));

          // 이미 핀이 설정되어 있는 경우
          if ([...pinned][0]) {
            pinned.forEach(pinned => {
              pinned.closest("li").querySelector("input").disabled = true;
            });
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
};

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

const mutationObserver = new MutationObserver(mutations => {
  const container = document.querySelector(".container");
  const main = document.querySelector("main");

  mutations.forEach(mutation => {
    if (
      mutation.target.className != "checkbox" &&
      mutation.previousSibling &&
      mutation.previousSibling.className != "row"
    ) {
      // 모바일에서 목록 컨텐츠 다섯개만 보이기
      if (window.matchMedia("screen and (max-width: 640px)").matches) {
        const lists = document.querySelectorAll("main .list:not(.modal .list)");

        if (lists[0]) {
          lists.forEach(list => {
            if (list.querySelector(".more")) {
              const rows = list.querySelectorAll(".row:not(.title)");
              rows.forEach(row => {
                const contents = row.querySelectorAll("li");
                row.style.setProperty("--zIndex", "80");
                contents.forEach((content, index) => {
                  if (index > 6) {
                    content.style.opacity = "0";
                  }
                });
              });
            }
          });

          const handleContents = event => {
            const row = event.currentTarget.closest(".row");
            const contents = row.querySelectorAll("li");

            contents.forEach((content, index) => {
              // 숨김처리한게 있을때 스타일 제거
              if (content.hasAttribute("style")) {
                event.currentTarget.classList.add("is-active");
                content.removeAttribute("style");
                row.style.setProperty("--zIndex", "-1");
              } else {
                event.currentTarget.classList.remove("is-active");
                if (index > 6) {
                  content.style.opacity = "0";
                  row.style.setProperty("--zIndex", "80");
                }
              }
            });
          };

          const moreButtons = document.querySelectorAll(".list .more");
          moreButtons[0] &&
            moreButtons.forEach(button => {
              button.addEventListener("click", handleContents);
            });
        }
      }

      // 마이너스 금액
      const prices = document.querySelectorAll(".section-money .price");
      prices.forEach(price => {
        if (price.textContent.includes("-") || price.textContent < 5000) {
          price.style.color = "#939699";
        }
      });

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

          if (clear) {
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
      const dataToggles = document.querySelectorAll("button[data-toggle]");
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
      });

      dataToggles.forEach((toggle) => {
        if (!toggle.classList.contains(".controller")) {
          toggle.addEventListener("click", (event) => {
            console.log(event.currentTarget)
            const toggleName = event.currentTarget.dataset.toggle;
            console.log(toggleName)
            const toggles = document.querySelectorAll(`[data-toggle='${toggleName}']`);
            console.log(toggles)
            toggles.forEach(toggle => {
              toggle.classList.toggle("is-active")
            })
          });
        }
      });

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
          Filters: 키워드 트렌드 목록 검색에서
        ===================================================== */
      const selectors = document.querySelectorAll(".filters .selector.main");
      if (selectors[0]) {
        selectors.forEach(mainSelector => {
          const subSelectors = mainSelector.parentElement.querySelectorAll(".selector.sub");
          const selects = mainSelector.querySelectorAll("input");
          // selects[0].checked = true;
          // subSelectors[0].classList.add("is-active");

          selects.forEach(selected => {
            selected.addEventListener("click", event => {
              subSelectors.forEach(sub => {
                const initialize = () => sub.classList.remove("is-active");
                const checkSelect = () => {
                  if (event.target.classList.contains("select-word") && sub.classList.contains("selector-word")) {
                    sub.classList.add("is-active");
                  }
                  if (
                    (event.target.classList.contains("select-category") &&
                      sub.classList.contains("selector-category")) ||
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
                      devices.forEach(device => {
                        device.style.display = "flex";
                      });
                    }
                    if (event.target.closest(".select-monthly-search2")) {
                      devices.forEach(device => {
                        if (device.classList.contains("select-google")) {
                          device.style.display = "flex";
                          device.querySelector("input").checked = true;
                        } else {
                          device.style.display = "none";
                        }
                      });
                    }
                    if (event.target.closest(".select-monthly-click")) {
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
      setTimeout(() => {
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
      }, 500);
      
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

      // 부분 설정 팝업에서 비활성화 관리
      const modalPartial = document.querySelectorAll(".modal.partial");
      if (modalPartial) {
        modalPartial.forEach(modal => {
          const checkboxes = modal.querySelectorAll(".row li:first-of-type .checkbox input");
          checkboxes.forEach(checkbox => {
            // 체크박스로 disabled 제어
            const handleChangeDisabled = event => {
              const row = event.target.closest(".row");
              const inputs = row.querySelectorAll("li:last-of-type input");

              const handleInputDisabled = status => {
                inputs.forEach(input => {
                  input.disabled = status;
                });
              };

              // 체크박스가 체크되어 있는 경우
              if (checkbox.checked) {
                const toggle = row.querySelector(".toggle-switch input");

                // 해당 row에 토글 스위치가 있는 경우
                if (toggle) {
                  // 토글 스위치를 제외하기 위해 inputs 재정의
                  const inputs = row.querySelectorAll("li:last-of-type input:not(.toggle-switch input)");
                  const handleInputDisabled2 = status => {
                    inputs.forEach(input => {
                      input.disabled = status;
                    });
                  };

                  toggle.checked ? handleInputDisabled2(false) : handleInputDisabled2(true);

                  // 토글로 뒤에 오는 input값들의 disabled를 제어할 수 있도록 handleChangeDisabled 재정의
                  const handleChangeDisabled2 = event => {
                    event.target.checked ? handleInputDisabled2(false) : handleInputDisabled2(true);
                  };
                  toggle.addEventListener("change", handleChangeDisabled2);
                }
              } else {
                handleInputDisabled(true);
              }
            };
            checkbox.addEventListener("change", handleChangeDisabled);
          });
        });
      }

      // 탭 이동 감지
      const tabContents = document.querySelectorAll(".tab-content");
      tabContents[0] &&
        tabContents.forEach(content => {
          mutationObserver.observe(content, {
            childList: true,
            characterData: true,
          });
        });

      // 컨테이너 감지
      mutationObserver.observe(container, {
        childList: true,
        attributes: true,
      });

      // 로더 감지
      const loader = document.querySelector(".spinner-loader");
      mutationObserver.observe(loader, {
        childList: true,
        subtree: true,
      });
    }

    // 헤더 감지했을 때 실행 이벤트
    if (mutation.target.tagName === "HEADER") {
      handleAdvancedSearch();
    }

    // 목록 데이터 감지했을 때 실행 이벤트
    if (mutation.target.classList.contains("list")) {
      handleAdvancedSearch();
      checkedRowEffects();
      expandListColumns();
      console.log("YA")
    }

    // 팝업 감지했을 때 실행 이벤트
    if (mutation.target.className === "modals") {
      rearrangeColumns();
      checkedRowEffects();
    }
  });

  // 헤더 감지
  const headers = document.querySelectorAll("section > header");
  headers[0] &&
    headers.forEach(header => {
      mutationObserver.observe(header, {
        childList: true,
      });
    });

  // 목록 데이터 감지
  const lists = document.querySelectorAll(".list:not(.section-related-keyword .list)");
  lists[0] &&
    lists.forEach(list => {
      mutationObserver.observe(list, {
        childList: true,
      });
    });

  // 팝업 감지
  mutationObserver.observe(document.querySelector(".modals"), {
    childList: true,
    attributes: true,
  });
});

mutationObserver.observe(document.children[0], {
  childList: true,
  attributes: true,
});
