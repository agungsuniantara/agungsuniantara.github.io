$(document).ready(function () {
  // function
  function selectLocation(location) {
    $("#jobslocation").val(location);
    $(".btn-dropdown").removeClass("active");
  }
  function selectSpecialist(location) {
    $("#jobspecialist").val(location);
    $(".btn-dropdown").removeClass("active");
  }
  function selectCompany(location) {
    $("#jobscompany").val(location);
    $(".btn-dropdown").removeClass("active");
  }
  function filterJobs(category) {
    $(".box-data").hide();
    if (category === "all job") {
      $(".box-data").show();
    } else if (category === "marketing") {
      $('.box-data[data-specialist="' + category + '"]').show();
    } else if (category === "designer") {
      $('.box-data[data-specialist="' + category + '"]').show();
    } else if (category === "engineer") {
      $('.box-data[data-specialist="' + category + '"]').show();
    } else if (category === "consultant") {
      $('.box-data[data-specialist="' + category + '"]').show();
    } else if (category === "sales") {
      $('.box-data[data-specialist="' + category + '"]').show();
    }

    $("html, body").animate(
      {
        scrollTop: $("#job-list").offset().top,
      },
      300
    );
  }
  function animateOnScroll() {
    $(".fade").each(function () {
      var position = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > position - windowHeight + 200) {
        $(this).addClass("fade-in");
      } else {
        $(this).removeClass("fade-in");
      }
    });
  }

  // Event listener
  $(".items-specialist").click(function () {
    var specialist = $(this).text();
    selectSpecialist(specialist);
  });

  $(".items-company").click(function () {
    var specialist = $(this).text();
    selectCompany(specialist);
  });

  $(".items-location").click(function () {
    var specialist = $(this).text();
    selectLocation(specialist);
  });

  $(".btn-menu").click(function (e) {
    e.preventDefault();

    $(".btn-dropdown").toggleClass("active");
  });

  $(".btn-search").click(function () {
    var selectedSpecialist = $("#jobspecialist").val();
    var selectedCompany = $("#jobscompany").val();
    var selectedLocation = $("#jobslocation").val();

    $(".box-data").hide();

    $(".box-data").each(function () {
      var specialist = $(this).data("specialist");
      var company = $(this).data("company");
      var location = $(this).data("location");

      if (
        (selectedSpecialist === "" || selectedSpecialist === specialist) &&
        (selectedCompany === "" || selectedCompany === company) &&
        (selectedLocation === "" || selectedLocation === location)
      ) {
        $(this).show();
      }
    });

    $("html, body").animate(
      {
        scrollTop: $("#job-list").offset().top,
      },
      300
    );

    return false;
  });

  $(".box-category").click(function (e) {
    e.preventDefault();
    var category = $(this).find("h3").text().toLowerCase();
    filterJobs(category);
  });

  animateOnScroll();

  $(window).scroll(function () {
    animateOnScroll();
  });
});
