"use strict";

/**
 * PRELOAD
 *
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

/**
 * NAVBAR
 */

window.addEventListener("DOMContentLoaded", function () {
  // Lấy đường dẫn hiện tại của trang
  const currentPath = window.location.pathname;

  // Lấy tất cả các mục trong navbar
  const navbarItems = document.querySelectorAll(".navbar-item");

  // Duyệt qua tất cả các mục navbar và thay đổi class 'active'
  navbarItems.forEach(function (item) {
    // Lấy đường dẫn của mục trong navbar
    const itemLink = item.querySelector("a").getAttribute("href");

    // So sánh đường dẫn hiện tại với đường dẫn của mục
    if (currentPath.includes(itemLink)) {
      item.classList.add("active"); // Thêm class 'active' cho mục tương ứng
    } else {
      item.classList.remove("active"); // Loại bỏ class 'active' cho các mục khác
    }
  });
});

/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
};

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
};

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
};

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
};

addEventOnElements(
  [heroSliderNextBtn, heroSliderPrevBtn],
  "mouseover",
  function () {
    clearInterval(autoSlideInterval);
  }
);

addEventOnElements(
  [heroSliderNextBtn, heroSliderPrevBtn],
  "mouseout",
  autoSlide
);

window.addEventListener("load", autoSlide);

/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {
  x = (event.clientX / window.innerWidth) * 10 - 5;
  y = (event.clientY / window.innerHeight) * 10 - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - x * 2;
  y = y - y * 2;

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }
});
function openGuestPage() {
  document.getElementById("guestFrame").src = "guest.html";
}
document
  .getElementById("viewAllMenu")
  .addEventListener("click", function (event) {
    event.preventDefault();

    let extraMenu = document.getElementById("extra-menu");

    if (extraMenu.classList.contains("menu-hidden")) {
      extraMenu.classList.remove("menu-hidden");
      extraMenu.classList.add("menu-visible");
      this.innerHTML = '<span class="text text-1">Hide Menu</span>';
    } else {
      extraMenu.classList.remove("menu-visible");
      extraMenu.classList.add("menu-hidden");
      this.innerHTML = '<span class="text text-1">View All Menu</span>';
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  // Kiểm tra nếu có form đặt bàn trên trang
  const reservationForm = document.getElementById("reservation-form");
  if (reservationForm) {
    reservationForm.addEventListener("submit", function (event) {
      // Ngăn không cho trang tải lại
      event.preventDefault();

      // Lấy giá trị từ các trường input
      const name = document.querySelector('input[name="name"]').value;
      const phone = document.querySelector('input[name="phone"]').value;
      const person = document.querySelector('select[name="person"]').value;
      const reservationDate = document.querySelector(
        'input[name="reservation-date"]'
      ).value;
      const time = document.querySelector('select[name="time"]').value;
      const message = document.querySelector('textarea[name="message"]').value;

      // Ẩn form đặt bàn
      document.querySelector(".reservation-form").style.display = "none";

      // Tạo thông báo thành công và hiển thị thông tin đặt bàn
      let successMessage = document.createElement("div");
      successMessage.classList.add("success-message");
      successMessage.innerHTML = `
          <h3 class="text-center">Cảm ơn bạn đã đặt bàn, ${name}!</h3>
          <p class="text-center">Dưới đây là thông tin đặt bàn của bạn:</p>
          <ul>
            <li><strong>Họ và tên:</strong> ${name}</li>
            <li><strong>Số điện thoại:</strong> ${phone}</li>
            <li><strong>Số người:</strong> ${person}</li>
            <li><strong>Ngày đặt:</strong> ${reservationDate}</li>
            <li><strong>Giờ đặt:</strong> ${time}</li>
            <li><strong>Thông điệp:</strong> ${message}</li>
          </ul>
          <p class="text-center">Chúng tôi sẽ liên hệ với bạn sớm nhất.</p>
        `;

      document.querySelector(".reservation").appendChild(successMessage);
    });
  }
});
