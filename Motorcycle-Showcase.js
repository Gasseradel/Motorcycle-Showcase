
/* =========================
   Motorcycle Data
========================= */

const motorcycles = [
  {
    name: "GP 501 L",
    brand: "Sharmax",
    subtitle: "400cc 45HP Supersport Motorcycle – Twin Cylinder, Liquid-Cooled, Race-Ready.",
    price: 21790,
    image: "bike1.png",
    fuel: "Petrol",
    year: "2024-2025",
    acceleration: "2.7s",
    category: "Sports Bike / Supersport",
    engine: "400cc, 4-stroke, liquid-cooled, 2-cylinder, 45 HP, 11.6:1 compression, EFI",
    displacement: "400 cc cc",
    helmet: "Carbon racing helmet",
    helmetPrice: 350.5,
    addonPrice: 140.5,
    addonDescription: "Choose the details that match your personality and make every ride yours."
  },
  {
    name: "Dyna Super Glide Custom FXDC",
    brand: "Harley",
    subtitle: "Cruiser - Twin Cam 103 Classic",
    price: 13549,
    image: "bike2.png",
    fuel: "Petrol",
    year: "2014",
    acceleration: "3.0s",
    category: "Cruiser",
    engine: "Twin Cam 103™ V-Twin 45°",
    displacement: "1689 cc / 103 cu in",
    helmet: "Performance helmet",
    helmetPrice: 299.5,
    addonPrice: 120.5,
    addonDescription: "Add performance-inspired accessories designed for your next adventure."
  },
  {
    name: "Panigale V4",
    brand: "Ducati",
    subtitle: "Super Bike - Desmosedici Stradale",
    price: 32000,
    image: "bike3.png",
    fuel: "Petrol",
    year: "2024",
    acceleration: "3.0s",
    category: "Sport / Super bike",
    engine: "Desmosedici Stradale 90° V4, 4-stroke, liquid-cooled",
    displacement: "1103 cc",
    helmet: "Urban riding helmet",
    helmetPrice: 275.5,
    addonPrice: 95.5,
    addonDescription: "Give your ride a personal touch with carefully selected extras."
  },
  {
    name: "Ninja H2 Carbon ABS",
    brand: "Kawasaki",
    subtitle: "Supercharged Hypersport - Candy Flat Blazed Green",
    price: 35600, 
    image: "bike4.png",
    fuel: "Petrol",
    year: "2024",
    acceleration: "2.5s",
    category: "Super Sport / Hypersport",
    engine: "Supercharged 998cc In-Line Four, DOHC, 16-valve, liquid-cooled",
    displacement: "998cc",
    helmet: "Adventure helmet",
    helmetPrice: 385.5,
    addonPrice: 160.5,
    addonDescription: "Get ready for longer journeys with accessories made for exploration."
  }
];

/* =========================
   Elements
========================= */

const elements = {
  title: document.querySelector("#bikeTitle"),
  subtitle: document.querySelector("#bikeSubtitle"),
  price: document.querySelector("#bikePrice"),
  mainBike: document.querySelector("#mainBike"),
  bikeAnimation: document.querySelector("#bikeAnimation"),
  previousBike: document.querySelector("#previousBike"),
  nextBike: document.querySelector("#nextBike"),
  arrowPrevious: document.querySelector("#arrowPrevious"),
  arrowNext: document.querySelector("#arrowNext"),
  counter: document.querySelector("#sliderCounter"),

  fuel: document.querySelector("#specFuel"),
  year: document.querySelector("#specYear"),
  acceleration: document.querySelector("#specAcceleration"),
  category: document.querySelector("#specCategory"),
  engine: document.querySelector("#specEngine"),
  displacement: document.querySelector("#specDisplacement"),

  helmetName: document.querySelector("#helmetName"),
  helmetPrice: document.querySelector("#helmetPrice"),
  helmetImage: document.querySelector("#helmetImage"),
  addonPrice: document.querySelector("#addonPrice"),
  addonDescription: document.querySelector("#addonDescription"),
  addonImage: document.querySelector("#addonImage"),

  buyHelmet: document.querySelector("#buyHelmet"),
  favoriteBtn: document.querySelector("#favoriteBtn"),
  savedBtn: document.querySelector("#savedBtn"),
  bagBtn: document.querySelector("#bagBtn"),
  navBag: document.querySelector("#navBag"),
  profileBtn: document.querySelector("#profileBtn"),

  mobileMenu: document.querySelector("#mobileMenu"),
  mobileNav: document.querySelector("#mobileNav"),
  toast: document.querySelector("#toast")
};

/* =========================
   Slider State
========================= */

let currentIndex = 0;
let isAnimating = false;
let toastTimeout;
let renderTimeout;
let animationTimeout;
let contentAnimationTimeout;

const favorites = new Set();
const bag = [];

/* =========================
   Helpers
========================= */

function formatPrice(price) {
  return "$" + Number(price).toLocaleString("en-US", {
    maximumFractionDigits: 1
  });
}

function showToast(message) {
  if (!elements.toast) return;

  elements.toast.textContent = message;
  elements.toast.classList.add("show");

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    elements.toast.classList.remove("show");
  }, 2600);
}

function preloadImage(src) {
  return new Promise((resolve) => {
    const image = new Image();

    image.onload = () => resolve(src);
    image.onerror = () => resolve(src);
    image.src = src;
  });
}

/* =========================
   Content Animation Helpers
========================= */

function getChangingElements() {
  return [
    document.querySelector(".bike-heading"),
    document.querySelector(".bottom-panel")
  ].filter(Boolean);
}

function hideChangingContent(items) {
  items.forEach((element) => {
    element.classList.remove("content-entering");
    element.classList.add("content-changing");
  });
}

function showChangingContent(items) {
  items.forEach((element) => {
    element.classList.remove("content-changing");
    element.classList.remove("content-entering");

    void element.offsetWidth;

    element.classList.add("content-entering");
  });

  clearTimeout(contentAnimationTimeout);

  contentAnimationTimeout = setTimeout(() => {
    items.forEach((element) => {
      element.classList.remove("content-entering");
    });
  }, 750);
}

/* =========================
   Render Motorcycle
========================= */

function renderMotorcycle(index) {
  const bike = motorcycles[index];

  const previousIndex =
    (index - 1 + motorcycles.length) % motorcycles.length;

  const nextIndex =
    (index + 1) % motorcycles.length;

  // Main information
  if (elements.title) {
    elements.title.innerHTML =
      `${bike.name} <span>${bike.brand}</span>`;
  }

  if (elements.subtitle) {
    elements.subtitle.textContent = bike.subtitle;
  }

  if (elements.price) {
    elements.price.textContent = formatPrice(bike.price);
  }

  // Main motorcycle image
  if (elements.mainBike) {
    elements.mainBike.src = bike.image;
    elements.mainBike.alt = `${bike.name} ${bike.brand} motorcycle`;
  }

  // Side motorcycles
  if (elements.previousBike) {
    const image = elements.previousBike.querySelector("img");

    if (image) {
      image.src = motorcycles[previousIndex].image;
      image.alt = `${motorcycles[previousIndex].name} motorcycle`;
    }
  }

  if (elements.nextBike) {
    const image = elements.nextBike.querySelector("img");

    if (image) {
      image.src = motorcycles[nextIndex].image;
      image.alt = `${motorcycles[nextIndex].name} motorcycle`;
    }
  }

  // Specifications
  if (elements.fuel) elements.fuel.textContent = bike.fuel;
  if (elements.year) elements.year.textContent = bike.year;

  if (elements.acceleration) {
    elements.acceleration.textContent = bike.acceleration;
  }

  if (elements.category) {
    elements.category.textContent = bike.category;
  }

  if (elements.engine) {
    elements.engine.textContent = bike.engine;
  }

  if (elements.displacement) {
    elements.displacement.textContent = bike.displacement;
  }

  // Helmet details
  if (elements.helmetName) {
    elements.helmetName.textContent = bike.helmet;
  }

  if (elements.helmetPrice) {
    elements.helmetPrice.textContent = formatPrice(bike.helmetPrice);
  }



if (elements.helmetImage) {
  const helmetImages = {
    "bike1.png": "helmet1.png",
    "bike2.png": "helmet2.png",
    "bike3.png": "helmet3.png",
    "bike4.png": "helmet4.png"
  };

  elements.helmetImage.src = helmetImages[bike.image] || "helmet1.png";
  elements.helmetImage.alt = `${bike.helmet} helmet`;
}
  // Accessories details
  if (elements.addonPrice) {
    elements.addonPrice.textContent =
      "+" + formatPrice(bike.addonPrice);
  }

  if (elements.addonDescription) {
    elements.addonDescription.textContent = bike.addonDescription;
  }

  // الصورة في الناحية المقابلة: نفس الصورة الرئيسية
  if (elements.addonImage) {
    elements.addonImage.src = bike.image;
    elements.addonImage.alt = `${bike.name} motorcycle`;
  }

  // Slider counter
  if (elements.counter) {
    elements.counter.innerHTML = `
      ${String(index + 1).padStart(2, "0")}
      <i>/</i>
      ${String(motorcycles.length).padStart(2, "0")}
    `;
  }

  // Default color selection
  document.querySelectorAll(".color-dot").forEach((dot) => {
    dot.classList.toggle(
      "selected",
      dot.dataset.color === "red"
    );
  });

  updateFavoriteButton();
}

/* =========================
   Animated Slider
========================= */

async function changeMotorcycle(direction) {
  if (isAnimating) return;

  isAnimating = true;

  const nextIndex =
    (currentIndex + direction + motorcycles.length) %
    motorcycles.length;

  const nextBike = motorcycles[nextIndex];
  const changingElements = getChangingElements();

  clearTimeout(renderTimeout);
  clearTimeout(animationTimeout);
  clearTimeout(contentAnimationTimeout);

  // Load the next image before switching
  await preloadImage(nextBike.image);

  // Hide current content
  hideChangingContent(changingElements);

  if (elements.bikeAnimation) {
    elements.bikeAnimation.classList.add("changing");
  }

  // Update all information
  renderTimeout = setTimeout(() => {
    currentIndex = nextIndex;

    renderMotorcycle(currentIndex);

    showChangingContent(changingElements);
  }, 260);

  // Finish image transition
  animationTimeout = setTimeout(() => {
    if (elements.bikeAnimation) {
      elements.bikeAnimation.classList.remove("changing");
    }

    isAnimating = false;
  }, 430);
}

/* =========================
   Slider Controls
========================= */

if (elements.previousBike) {
  elements.previousBike.addEventListener("click", () => {
    changeMotorcycle(-1);
  });
}

if (elements.nextBike) {
  elements.nextBike.addEventListener("click", () => {
    changeMotorcycle(1);
  });
}

if (elements.arrowPrevious) {
  elements.arrowPrevious.addEventListener("click", () => {
    changeMotorcycle(-1);
  });
}

if (elements.arrowNext) {
  elements.arrowNext.addEventListener("click", () => {
    changeMotorcycle(1);
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    changeMotorcycle(-1);
  }

  if (event.key === "ArrowRight") {
    changeMotorcycle(1);
  }
});

/* =========================
   Color Selection
========================= */

document.querySelectorAll(".color-dot").forEach((dot) => {
  dot.addEventListener("click", () => {
    document.querySelectorAll(".color-dot").forEach((item) => {
      item.classList.remove("selected");
    });

    dot.classList.add("selected");

    const colorNames = {
      red: "Red",
      yellow: "Yellow",
      blue: "Blue",
      black: "Black"
    };

    showToast(
      `${colorNames[dot.dataset.color] || "Selected"} color selected.`
    );
  });
});

/* =========================
   Favorites
========================= */

function updateFavoriteButton() {
  if (!elements.favoriteBtn) return;

  const bike = motorcycles[currentIndex];
  const isFavorite = favorites.has(bike.name);

  elements.favoriteBtn.textContent = isFavorite ? "♥" : "♡";

  elements.favoriteBtn.setAttribute(
    "aria-pressed",
    String(isFavorite)
  );
}

if (elements.favoriteBtn) {
  elements.favoriteBtn.addEventListener("click", () => {
    const bike = motorcycles[currentIndex];

    if (favorites.has(bike.name)) {
      favorites.delete(bike.name);
      showToast(`${bike.name} removed from favorites.`);
    } else {
      favorites.add(bike.name);
      showToast(`${bike.name} added to favorites.`);
    }

    updateFavoriteButton();
  });
}

if (elements.savedBtn) {
  elements.savedBtn.addEventListener("click", () => {
    const saved = [...favorites];

    showToast(
      saved.length
        ? `Saved motorcycles: ${saved.join(", ")}`
        : "You have no saved motorcycles yet."
    );
  });
}

/* =========================
   Shopping Bag
========================= */

function showBag() {
  showToast(
    bag.length
      ? `Shopping bag: ${bag.join(", ")}`
      : "Your shopping bag is empty."
  );
}

if (elements.bagBtn) {
  elements.bagBtn.addEventListener("click", showBag);
}

if (elements.navBag) {
  elements.navBag.addEventListener("click", showBag);
}

if (elements.buyHelmet) {
  elements.buyHelmet.addEventListener("click", () => {
    const bike = motorcycles[currentIndex];

    bag.push(
      `${bike.helmet} (${formatPrice(bike.helmetPrice)})`
    );

    showToast(`${bike.helmet} added to your shopping bag.`);
  });
}

/* =========================
   Profile
========================= */

if (elements.profileBtn) {
  elements.profileBtn.addEventListener("click", () => {
    showToast("Customer accounts will be available soon.");
  });
}

/* =========================
   Mobile Navigation
========================= */

if (elements.mobileMenu && elements.mobileNav) {
  elements.mobileMenu.addEventListener("click", () => {
    const isOpen = elements.mobileNav.classList.toggle("open");

    elements.mobileMenu.classList.toggle("open", isOpen);

    elements.mobileMenu.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    elements.mobileMenu.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  elements.mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      elements.mobileNav.classList.remove("open");
      elements.mobileMenu.classList.remove("open");

      elements.mobileMenu.setAttribute(
        "aria-expanded",
        "false"
      );

      elements.mobileMenu.setAttribute(
        "aria-label",
        "Open navigation"
      );
    });
  });
}

/* =========================
   Main Navigation
========================= */

document.querySelectorAll(".nav-pill").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-pill").forEach((item) => {
      item.classList.remove("active");
    });

    link.classList.add("active");
  });
});

/* =========================
   Initial Render
========================= */

renderMotorcycle(currentIndex);
