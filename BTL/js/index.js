let items = document.querySelectorAll('.slider .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let active = 3;
function loadShow() {
    let stt = 0;
    items[active].style.transform = `none`;
    items[active].style.zIndex = 1;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;
    for (var i = active + 1; i < items.length; i++) {
        stt++;
        items[i].style.transform = `translateX(${120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
    stt = 0;
    for (var i = active - 1; i >= 0; i--) {
        stt++;
        items[i].style.transform = `translateX(${-120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
}
loadShow();
next.onclick = function() {
    active = active + 1 < items.length ? active + 1 : active;
    loadShow();
}
prev.onclick = function() {
    active = active - 1 >= 0 ? active - 1 : active;
    loadShow();
}

// Thời gian chờ giữa các lần chuyển slide tự động (đơn vị là mili giây)
const autoSlideInterval = 3000; // 5 giây

// Hàm tự động chuyển slide
function autoSlideShow() {
  active = (active + 1) % items.length;
  loadShow();
}

// Tự động chuyển slide sau mỗi khoảng thời gian autoSlideInterval
let autoSlideTimer = setInterval(autoSlideShow, autoSlideInterval);

// Tạm dừng chuyển slide tự động khi chuột di chuyển qua slider
slider.addEventListener('mouseover', () => {
  clearInterval(autoSlideTimer);
});

// Tiếp tục chuyển slide tự động khi chuột rời khỏi slider
slider.addEventListener('mouseout', () => {
  autoSlideTimer = setInterval(autoSlideShow, autoSlideInterval);
});
