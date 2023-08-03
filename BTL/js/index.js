let btnUser = document.getElementById("btn-user");
let vUser = document.getElementById("v-user");
let items = document.querySelectorAll(".slider .item");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let active = 0;
/* Click and show */
function clickShow(e) {
  e.style.display = "block";
}
function clickEnd(e) {
  e.style.display = "none"
}
function clickFull(btnE, e) {
  let userClicked = false;
  let userClicking = false;
  btnE.onclick = function () {
    if (userClicked) {
      e.style.display = "none";
      userClicked = false;
    } else {
      e.style.display = "block";
      userClicked = true;
    }
  };
  // Xử lý sự kiện mouseup khi người dùng kết thúc click
  document.addEventListener("mouseup", function () {
    userClicking = false;
  });
  // Sự kiện mousedown khi người dùng bắt đầu click
  btnUser.addEventListener("mousedown", function () {
    userClicking = true;
  });
  document.addEventListener("click", function (event) {
    if (event.target === vUser || event.target === btnUser)
      return;
    else {
      vUser.style.display = "none";
      userClicked = false;
    }
  });
}
/* Slider */
function loadShow() {
  let stt = 0;
  items[active].style.transform = `none`;
  items[active].style.zIndex = 1;
  items[active].style.filter = "none";
  items[active].style.opacity = 1;
  for (var i = active + 1; i < items.length; i++) {
    stt++;
    items[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
    items[i].style.zIndex = -stt;
    items[i].style.filter = "blur(5px)";
    items[i].style.opacity = stt > 2 ? 0 : 0.6;
  }
  stt = 0;
  for (var i = active - 1; i >= 0; i--) {
    stt++;
    items[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
    items[i].style.zIndex = -stt;
    items[i].style.filter = "blur(5px)";
    items[i].style.opacity = stt > 2 ? 0 : 0.6;
  }
}


window.onload = function () {
  /* Click user */
  clickFull(btnUser, vUser);
  /* Slider animation */
  loadShow();
  next.onclick = function () {
    active = active + 1 < items.length ? active + 1 : active;
    loadShow();
  };
  prev.onclick = function () {
    active = active - 1 >= 0 ? active - 1 : active;
    loadShow();
  };
  //AutoSlide
  let autoSlideInterval = 5000;
  function autoSlideShow() {
    active = (active + 1) % items.length;
    loadShow();
  }
  let autoSlideTimer = setInterval(autoSlideShow, autoSlideInterval);
  // // Tạm dừng chuyển slide tự động khi chuột di chuyển qua slider
  // slider.addEventListener("mouseover", () => {
  //   clearInterval(autoSlideTimer);
  // });
  
  // // Tiếp tục chuyển slide tự động khi chuột rời khỏi slider
  // slider.addEventListener("mouseout", () => {
  //   autoSlideTimer = setInterval(autoSlideShow, autoSlideInterval);
  // });
  
};
