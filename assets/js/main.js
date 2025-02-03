$(document).ready(function () {
  function openLightbox(element) {
    var images = JSON.parse(
      element.closest(".project-card").getAttribute("data-images")
    );
    var carousel = $(".lightbox__carousel");

    // Clear previous images
    carousel.html("");

    // Add new images dynamically using a document fragment
    var fragment = document.createDocumentFragment();
    images.forEach((image) => {
      var div = document.createElement("div");
      div.innerHTML = `<img data-lazy="./assets/images/${image}" alt="Project Screenshot">`;
      fragment.appendChild(div);
    });
    carousel.append(fragment);

    // Destroy previous Slick instance if it exists
    if (carousel.hasClass("slick-initialized")) {
      carousel.slick("unslick");
    }

    // Initialize Slick Carousel
    carousel.slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      lazyLoad: "ondemand", // Enable lazy loading
      accessibility: true, // Enable accessibility features
    });

    // Show lightbox
    $(".side-menu").hide();
    $("#lightbox").fadeIn().css("display", "flex");
  }

  function closeLightbox() {
    $("#lightbox").fadeOut().css("display", "none");
    $(".side-menu").show();
  }

  // Custom Previous Button
  $(".custom-prev").on("click", function () {
    $(".lightbox__carousel").slick("slickPrev");
  });

  // Custom Next Button
  $(".custom-next").on("click", function () {
    $(".lightbox__carousel").slick("slickNext");
  });

  // Close button event
  $(".lightbox__close").on("click", function () {
    closeLightbox();
    $(".side-menu").show();
  });

  // Click outside the image to close
  $("#lightbox").on("click", function (e) {
    if ($(e.target).is("#lightbox")) {
      closeLightbox();
      $(".side-menu").show();
    }
  });

  // Ensure functions are globally accessible
  window.openLightbox = openLightbox;
  window.closeLightbox = closeLightbox;

  // Initialize Particles.js with SEO considerations
  if (typeof particlesJS === "function") {
    const particleConfig = {
      particles: {
        number: {
          value: window.innerWidth < 768 ? 25 : 35,
          density: { enable: true, value_area: 800 },
        },
        color: {
          value: "#ffffff",
        },
        shape: { type: "circle" },
        opacity: {
          value: 0.8,
          random: false,
        },
        size: {
          value: 3,
          random: true,
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.3,
          width: 1,
        },
        move: {
          enable: true,
          speed: 6,
          direction: "none",
          out_mode: "out",
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "repulse",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
        },
      },
    };

    particlesJS("particles-js", particleConfig);
  }

  document.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const menuItems = document.querySelectorAll(".menu-item");

    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 50) {
        currentSection = section.getAttribute("id");
      }
    });

    menuItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href").slice(1) === currentSection) {
        item.classList.add("active");
      }
    });
  });

  // Mobile optimization
  function handleResize() {
    const canvas = document.querySelector("#particles-js canvas");
    if (canvas) {
      canvas.width = Math.min(window.innerWidth, 768);
      canvas.height = Math.min(window.innerHeight, 1024);
    }
  }

  window.addEventListener("resize", handleResize);
  handleResize();
});
