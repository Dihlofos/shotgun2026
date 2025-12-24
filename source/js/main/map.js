(function () {
  const pins = document.querySelectorAll(".js-pin");
  const vw = window.innerWidth;

  pins.forEach((pin) => {
    if (!isTouchDevice() || vw > 1023) {
      pin.addEventListener("mouseover", () => {
        toggleOpen(pin);
      });

      pin.addEventListener("mouseout", () => {
        pin.classList.toggle("open");
      });
    } else {
      pin.addEventListener("click", () => {
        toggleOpen(pin);
        clearAllExcept(pin);
      });
    }
  });

  function isTouchDevice() {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  function toggleOpen(pin) {
    pin.classList.toggle("open");

    if (pin.dataset.pin === "4" && vw < 768) {
      const pin6 = document.querySelector('[data-pin="6"]');
      if (pin6.classList.contains("open")) {
        pin6.classList.remove("open");
      }
    }
  }

  function clearAllExcept(onePin) {
    pins.forEach((pin) => {
      if (onePin.dataset.pin === pin.dataset.pin) {
        return;
      }
      pin.classList.remove("open");
    });
  }
})();
