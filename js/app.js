// Swiper

function windowLoad() {
  document.body.classList.add("loaded");

  if (document.querySelector(".main-slider")) {
    new Swiper(".main-slider", {
      speed: 2000,
      effect: "fade",
      autoplay: {
        delay: 3000,
      },
      pagination: {
        el: ".bullets__items",
        type: "bullets",
        clickable: true,
      },
    });
  }

  document.addEventListener("click", documentActions);

  function documentActions(event) {
    const targetElement = event.target;
    // Tabs
    if (targetElement.closest(".nav-popular__item")) {
      const tabNavigationItem = targetElement.closest(".nav-popular__item");
      if (!tabNavigationItem.classList.contains("active")) {
        const activeTabNavigationItem = document.querySelector(
          ".nav-popular__item.active"
        );
        activeTabNavigationItem.classList.remove("active");
        tabNavigationItem.classList.add("active");

        const tabItems = document.querySelectorAll(".popular__tab");
        const activeTabitem = document.querySelector(".popular__tab.active");
        activeTabitem.classList.remove("active");
        tabItems[getIndex(tabNavigationItem)].classList.add("active");
      }
    }
    // Up
    if (targetElement.closest(".footer__up")) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      event.preventDefault();
    }
  }
  function getIndex(element) {
    return Array.from(element.parentNode.children).indexOf(element);
  }

  // Watcher
  const items = document.querySelectorAll("[data-item]");
  const options = {
    threshold: 0.2,
  };

  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);

  items.forEach((item) => {
    observer.observe(item);
  });
}

window.addEventListener("load", windowLoad);
