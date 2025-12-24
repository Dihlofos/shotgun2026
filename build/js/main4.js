"use strict";
(function () {
  let upButton = document.querySelector(".up");

  if (upButton) {
    window.onscroll = function () {
      if (window.pageYOffset > 260) {
        upButton.classList.add("up--shown");
      } else {
        upButton.classList.remove("up--shown");
      }
    };
  }
})();

"use strict";
(function () {
  const key = "shotgun-cookie-modal-shown";
  let modal = document.querySelector(".js-cookie");

  if (!modal) {
    return;
  }

  let closeButton = modal.querySelector(".js-cookie-close");

  if (!window.localStorage.getItem(key)) {
    modal.classList.remove("hidden");
  }

  closeButton.addEventListener("click", () => {
    modal.classList.add("hidden");
    window.localStorage.setItem(key, true);
  });
})();

"use strict";
(function () {
  let links = document.querySelectorAll(".detail-links__link");
  if (!links.length) return;

  links.forEach(async (link) => {
    if (link.href.includes("https://disk.yandex.ru")) {
      link.classList.remove("disabled");
      return;
    }

    const response = await fetch(link.href, {
      method: "GET",
    });

    if (response.url !== "https://shotgun.sport.moscow/404.html") {
      link.classList.remove("disabled");
    }
  });
})();

"use strict";
(function () {
  const dropdowns = document.querySelectorAll(".js-dropdown");

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(".js-dropdown-trigger");

    trigger.addEventListener("click", () => {
      dropdown.classList.toggle("open");
    });
  });
})();

"use strict";
(function () {
  const togglers = document.querySelectorAll(".js-faq-toggler");
  if (!togglers.length) return;

  togglers.forEach((toggler) => {
    toggler.addEventListener("click", (event) => {
      const target = event.currentTarget;
      if (!target) return;
      const content = target.querySelector(".js-content");
      if (!content) return;
      target.classList.toggle("active");
      content.classList.toggle("active");
    });
  });
})();

$(document).ready(function () {
  window.sendForm = false;

  $(".open-popup").magnificPopup({
    type: "inline",
    preloader: false,
    focus: "#name-form",

    // When elemened is focused, some mobile browsers in some cases zoom in
    // It looks not nice, so we disable it:
    callbacks: {
      beforeOpen: function () {
        if ($(window).width() < 700) {
          this.st.focus = false;
        } else {
          this.st.focus = "#name-form";
        }
        $("input[name='type-sport']").val(
          $(this.st.el[0]).attr("data-type-sport")
        );
        $("input[name='step']").val($(this.st.el[0]).attr("data-step"));
      },
    },
  });

  $.mask.definitions["D"] = "[0-3]";
  $.mask.definitions["M"] = "[0-1]";
  $("input[name='phone']").mask("+7(999) 999-9999");
  $("input[name='birthday']").mask("D9.M9.9999");
  new AirDatepicker("#birthday", {
    onSelect: ({ date, formattedDate, datepicker }) => {
      setTimeout(function () {
        $("input[name='birthday']").val(formattedDate);
      }, 200);
    },
  });

  $("#form-popup").submit(function () {
    if ($(".form-step-2").hasClass("show") && window.sendForm == false) {
      window.sendForm = true;
      $.ajax({
        url: "/send-form.php",
        data: $("#form-popup").serialize(),
        processData: false,
        contentType: false,
        type: "GET",
        success: function (data) {
          $("#form-popup > div").html(JSON.parse(data).MESSAGE);
        },
      });
    } else {
      $(".form-step-2").addClass("show");
      $(".form-step-1").removeClass("show");
      $('input[type="checkbox"]').attr("required", "");
      $(".form-popup__title span").text("2/2");
    }
    return false;
  });

  $(".js-back").click(function () {
    $(".form-step-1").addClass("show");
    $(".form-step-2").removeClass("show");
    $('input[type="checkbox"]').attr("required", false);
    $(".form-popup__title span").text("1/2");
  });

  const formOpenParam = window.location.search.split("?")?.[1];

  if (formOpenParam && formOpenParam === "registerForm") {
    $(".open-popup").magnificPopup("open");
  }

  // if ($("#attention-popup").length) {
  //   $.magnificPopup.open({
  //     items: {
  //       src: "#attention-popup",
  //       type: "inline",
  //     },
  //   });
  // }
});

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

"use strict";
(function () {
  const nav = document.querySelector('.js-nav');
  const toggler = document.querySelector('.js-nav-toggler');
  const closeButtons = document.querySelectorAll('.js-nav-close');
  const links = nav.querySelectorAll('.js-scroll');

  toggler.addEventListener('click', () => {
    nav.classList.toggle('is-active');
  })

  closeButtons.forEach((item)=> {

    item.addEventListener('click', () => {
      console.log('here?');
      closeNav();
    })
  })

  links.forEach((link) => {
    link.addEventListener('click', () => {
      closeNav();
    })
  })


  function closeNav() {
    nav.classList.remove('is-active');
  }


})();

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

"use strict";
(function () {
  const tabsContainer = document.querySelector(".js-tabs");

  if (!tabsContainer) {
    return;
  }

  const triggers = tabsContainer.querySelectorAll(".js-tab-trigger");
  const tabs = tabsContainer.querySelectorAll(".js-tab");

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      const tab = trigger.dataset.tab;
      clearTriggersClass();
      trigger.classList.add("active");

      toggle(tab);

      function toggle(tabName) {
        tabs.forEach((tab) => {
          const tabIName = tab.dataset.tab;
          if (tabIName === tabName) {
            tab.classList.add("active");
          } else {
            tab.classList.remove("active");
          }
        });
      }
    });
  });

  function clearTriggersClass() {
    triggers.forEach((trigger) => {
      trigger.classList.remove("active");
    });
  }
})();
