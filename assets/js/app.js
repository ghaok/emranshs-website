window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* ======================================================
   ANIMATED COUNTER
====================================================== */

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;

      const target = +counter.dataset.target;

      const duration = 1800;

      const step = target / (duration / 16);

      let current = 0;

      const updateCounter = () => {
        current += step;

        if (current < target) {
          counter.textContent = formatNumber(Math.floor(current));

          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = formatNumber(target);
        }
      };

      updateCounter();

      observer.unobserve(counter);
    });
  },
  {
    threshold: 0.5,
  },
);

counters.forEach((counter) => {
  observer.observe(counter);
});

function formatNumber(number) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + " Juta+";
  }

  if (number >= 1000) {
    return (number / 1000).toFixed(1) + "K+";
  }

  return number;
}

/* ======================================================
   SCROLL PROGRESS
====================================================== */

const progressBar = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {
  if (!progressBar) return;

  const scrollTop = window.scrollY;

  const docHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progress = (scrollTop / docHeight) * 100;

  progressBar.style.width = progress + "%";
});

/* ======================================================
   BACK TO TOP
====================================================== */

const backToTop = document.getElementById("backToTop");

if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/* ======================================================
   PAGE LOADER
====================================================== */

window.addEventListener("load", () => {
  const loader = document.getElementById("pageLoader");

  setTimeout(() => {
    loader.classList.add("hide");
  }, 1200);
});

/* ======================================================
   ACTIVE NAVBAR LINK ON SCROLL
====================================================== */

const sections = document.querySelectorAll("section[id], footer[id]");
const navLinks = document.querySelectorAll(".navbar .nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    const height = section.offsetHeight;

    if (scrollY >= top) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});
