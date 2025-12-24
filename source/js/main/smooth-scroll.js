"use strict";
(function () {
  window.scroll = new SmoothScroll(".js-scroll", {
    speed: 800,
    speedAsDuration: true,
    easing: "easeOutQuad",
  });

  const id = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
  if (id) {
    const targetElement = document.querySelector(`#${id}`);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  }
})();
