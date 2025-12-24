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
