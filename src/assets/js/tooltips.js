document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const tooltipIcons = document.querySelectorAll("[data-tooltip]");
  const tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");
  container.appendChild(tooltip);

  const tooltipContents = {
    /* 자동입찰 */
    // 입찰설정
    startingBid: `입찰상태가 ON인 상태입니다.`,
  };

  const showTooltip = event => {
    const tooltipData = event.target.dataset.tooltip;
    for (const property in tooltipContents) {
      tooltipData === `${property}` && (tooltip.innerText = `${tooltipContents[property]}`);
    }
    tooltip.classList.add("is-active");
    tooltip.style.top = `${event.clientY + 10}px`;

    if (window.innerWidth - event.clientX < tooltip.offsetWidth) {
      tooltip.style.left = `${event.clientX - tooltip.offsetWidth + 60}px`;
      console.log(tooltip.offsetWidth);
      tooltip.style.setProperty("--tooltip-position", `${tooltip.offsetWidth - 60}px`);
    } else {
      tooltip.style.left = `${event.clientX - 30}px`;
      tooltip.style.setProperty("--tooltip-position", `30px`)
    }
  };

  tooltipIcons.forEach(icon => {
    icon.addEventListener("mouseenter", showTooltip);
    icon.addEventListener("mouseout", () => {
      tooltip.classList.remove("is-active");
    });
  });

  if (matchMedia("screen and (max-width: 640px)").matches) {
  }
});
