$(function () {
  $(".product-image").on("mouseenter", function () {
    $(this).stop(true, true).animate({ opacity: 0.82 }, 180);
  }).on("mouseleave", function () {
    $(this).stop(true, true).animate({ opacity: 1 }, 180);
  });

  $(".add-to-cart").on("click", function () {
    $("#cart-count").stop(true, true).fadeOut(100).fadeIn(100);
  });

  $("form").on("submit", function () {
    var status = $(this).find(".form-status:not(.is-hidden)");
    status.hide().fadeIn(220);
  });

  $("a[href^='#']").on("click", function (event) {
    var target = $($(this).attr("href"));
    if (target.length === 0) {
      return;
    }
    event.preventDefault();
    $("html, body").animate({ scrollTop: target.offset().top - 20 }, 500);
  });

  var backToTop = $("<button>", {
    type: "button",
    class: "jquery-back-to-top btn btn-primary",
    text: "Back to top",
    "aria-label": "Back to top"
  }).appendTo("body").hide();

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 400) {
      backToTop.fadeIn(180);
    } else {
      backToTop.fadeOut(180);
    }
  });

  backToTop.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
  });
});
