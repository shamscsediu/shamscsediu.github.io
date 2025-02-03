$(document).ready(function () {
  function openLightbox(element) {
    const $lightbox = $("#lightbox");
    const $sideMenu = $(".side-menu");
    const $carousel = $(".lightbox__carousel");

    const projectCard = element.closest(".project-card");
    if (!projectCard) return;

    let images;
    try {
        images = JSON.parse(projectCard.getAttribute("data-images"));
    } catch (error) {
        console.error("Failed to parse images:", error);
        return;
    }

    // 1. Destroy Slick *before* clearing the HTML
    if ($carousel.hasClass("slick-initialized")) {
        $carousel.slick("unslick"); // Use "unslick" for complete removal
        $carousel.empty();       // Clear HTML *after* unslick
    } else {
        $carousel.empty();       // Clear HTML if Slick wasn't initialized
    }



    const buildImagePath = (filename) => `./assets/images/${filename}`;

    const fragment = document.createDocumentFragment();
    images.forEach((image) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <img data-lazy="${buildImagePath(image)}" alt="Project Screenshot" role="img">
        `;
        fragment.appendChild(div);
    });

    $carousel.append(fragment);

    // 2. Initialize Slick *after* completely clearing and rebuilding the HTML

    $carousel.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        lazyLoad: "ondemand",
        accessibility: true,
        aria: true,
    });

    $(".slick-dots").attr("aria-label", "Carousel navigation");

    $sideMenu.hide();
    $lightbox.fadeIn().css("display", "flex");

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
