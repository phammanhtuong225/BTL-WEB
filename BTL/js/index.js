let btnUser = document.getElementById("btn-user");
let vUser = document.getElementById("v-user");
let items = document.querySelectorAll(".slider .item");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let active = 0;
let playButtons;
let audios;
let currentSongIndex = 0;

let searchInput = document.getElementById("search-input");

document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".menu li");

  // Lặp qua từng phần tử li và thêm trình lắng nghe sự kiện click
  menuItems.forEach((li) => {
      li.addEventListener("click", function () {
          // Lấy giá trị thuộc tính href của thẻ a tương ứng
          const href = li.querySelector("a").getAttribute("href");
          // Điều hướng đến vị trí mới
          window.location.href = href;
      });
  });
});

function loadSongs() {
  return fetch("assests/data/songs.json")
    .then((res) => res.json())
    .then((data) => {
      let songsList = document.getElementById("song");
      let songsHtml = "";
      for (let song of data) {
        songsHtml += `
          <li>
            <div>
              <button class="btn-new clickmusic"><i class="fa-solid fa-play"></i></button>
              <h4>${song.name}</h4>
            </div>
            <div><h4>${song.singer}</h4></div>
            <div><h5>${song.time}</h5></div>
            <audio src="${song.music}"></audio>
          </li>
        `;
      }
      songsList.innerHTML = songsHtml;
    });
}

function setupEventListeners() {
  playButtons = document.querySelectorAll(".clickmusic");
  audios = document.querySelectorAll("audio");

  // Cài đặt sự kiện click cho các nút play
  playButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      playSong(index);
    });
  });

  // Sự kiện click cho nút "Phát tất cả"
  const playAllButton = document.querySelector(".btn-all");
  playAllButton.addEventListener("click", () => {
    playAllSongs();
  });
}

function playSong(index) {
  if (audios[index].paused) {
    audios[currentSongIndex].pause();
    audios[index].play();
    playButtons[currentSongIndex].innerHTML = '<i class="fa-solid fa-play"></i>';
    playButtons[index].innerHTML = '<i class="fa-solid fa-music"></i>';
    // Thêm lớp 'playing' cho bài hát đang phát
    playButtons[currentSongIndex].closest("li").classList.remove("playing");
    playButtons[index].closest("li").classList.add("playing");
    currentSongIndex = index;
  } else {
    audios[index].pause();
    playButtons[index].innerHTML = '<i class="fa-solid fa-play"></i>';
  }
}

function playAllSongs() {
  // Phát bài hát đầu tiên
  playSong(0);

  // Gắn sự kiện "ended" cho bài hát đầu tiên
  audios[currentSongIndex].addEventListener("ended", playNextSong);
}

function playNextSong() {
  let nextSongIndex = currentSongIndex + 1;
  if (nextSongIndex < audios.length) {
    playSong(nextSongIndex);
  } else {
    // Nếu đây là bài hát cuối cùng, đặt lại chỉ số bài hát hiện tại và đổi biểu tượng về nút play
    currentSongIndex = 0;
    playButtons[currentSongIndex].innerHTML = '<i class="fa-solid fa-play"></i>';
  }
}

function loadFeatureds() {
  fetch("assests/data/featureds.json").then(res => res.json()).then(data => {
      let featuredsList = document.getElementById("featured");
      let featuredsHtml = "";
      for (let featured of data) {
        featuredsHtml += `
          <li>
            <div>
              <div>
                <a href="">
                  <img src="${featured.image}" alt="">
                  <i class="fa-solid fa-play"></i>
                </a>    
              </div>
              <a href="">${featured.name}</a>
            </div>
          </li>
        `;
      }
      featuredsList.innerHTML = featuredsHtml;
    })
}

function loadArtists() {
  fetch("assests/data/artists.json").then(res => res.json()).then(data => {
      let artistsList = document.getElementById("artists");
      let artistsHtml = "";
      for (let artist of data) {
        artistsHtml += `
          <li>
            <div>
              <div>
                <a href="">
                  <img src="${artist.image}" alt="">
                  <i class="fa-solid fa-play"></i>
                </a>    
              </div>
              <a href="">${artist.name}</a>
            </div>
          </li>
        `;
      }
      artistsList.innerHTML = artistsHtml;
    })
}

function loadCategorys() {
  fetch("assests/data/categorys.json").then(res => res.json()).then(data => {
      let categorysList = document.getElementById("categorys");
      let categorysHtml = "";
      for (let category of data) {
        categorysHtml += `
          <li>
            <div>
              <div>
                <a href="">
                  <img src="${category.image}" alt="">
                  <i class="fa-solid fa-play"></i>
                </a>    
              </div>
              <a href="">${category.name}</a>
            </div>
          </li>
        `;
      }
      categorysList.innerHTML = categorysHtml;
    })
}

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
    items[i].style.transform = `translateX(${120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)`;
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
  
  loadSongs().then(() => {
    setupEventListeners();
  });
  loadFeatureds();
  loadArtists();
  loadCategorys();
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


/* Form */
let register = document.querySelector('.js-register')
let modal = document.querySelector('.js-modal')
let modal1 = document.querySelector('.js-modal1')
let modal2 = document.querySelector('.js-modal2')
let modal3 = document.querySelector('.js-modal3')
let modal4 = document.querySelector('.js-modal4')
let modal5 = document.querySelector('.js-modal5')
let login = document.querySelector('.js-login')
let exit = document.querySelector('.exit')
let exit1 = document.querySelector('.exit1')
let exit2 = document.querySelector('.exit2')
let exit3 = document.querySelector('.exit3')
let exit4 = document.querySelector('.exit4')
let exit5 = document.querySelector('.exit5')

function showLog() {
    modal.classList.add('open')
}
register.addEventListener('click', function(event) {
    event.preventDefault();
    showLog();
});

function hideLog() {
    modal.classList.remove('open')
}
exit.addEventListener('click', function(event) {
    event.preventDefault();
    hideLog();
});

function showLog1() {
    modal1.classList.add('open')
}

function hideLog1() {
    modal1.classList.remove('open')
}
login.addEventListener('click', function(event) {
    event.preventDefault();
    showLog1();
});
exit1.addEventListener('click', function(event) {
    event.preventDefault();
    hideLog1();
});

function showLog2() {
    modal2.classList.add('open')
}

function hideLog2() {
    modal2.classList.remove('open')
}

function showLog3() {
    modal3.classList.add('open')
}

function hideLog3() {
    modal3.classList.remove('open')
}

function showLog4() {
    modal4.classList.add('open')
}

function hideLog4() {
    modal4.classList.remove('open')
}

function showLog5() {
    modal5.classList.add('open')
}

function hideLog5() {
    modal5.classList.remove('open')
}

function validate(e) {
    if (e.value === "") {
        return true;
    }
    return false;
}

function signup() {
    event.preventDefault();
    var email = document.getElementById("signup-email")
    var password = document.getElementById("signup-password")
    var Repassword = document.getElementById("Resignup-password")
    if (validate(email) === true || validate(password) === true) {
        alert("Chưa điền đầy đủ thông tin")
        return;
    }
    if (password.value !== Repassword.value) {
        showLog5();
        exit5.addEventListener('click', function(event) {
            event.preventDefault();
            hideLog5();
        });
        return;
    }
    var user = {
        email: email.value,
        password: password.value,
    }
    var json = JSON.stringify(user)
    localStorage.setItem(email, json)
    showLog4();
    exit4.addEventListener('click', function(event) {
        event.preventDefault();
        hideLog4();
    });
    hideLog();
    register.innerText = "Chào"
    login.innerText = email.value
    return;
}

function dangnhap() {
    event.preventDefault();
    var email = document.getElementById("login-email")
    var password = document.getElementById("login-password")
    if (validate(email) === true || validate(password) === true) {
        alert("Chưa điền đầy đủ thông tin")
        return;
    }
    var user1 = localStorage.getItem(email)
    var data = JSON.parse(user1)
    if (email.value === data.email && password.value === data.password) {
        showLog2();
        exit2.addEventListener('click', function(event) {
            event.preventDefault();
            hideLog2();
        });
        hideLog1();
        register.innerText = "Chào"
        login.innerText = email.value
        return;
    } else {
        showLog3();
        exit3.addEventListener('click', function(event) {
            event.preventDefault();
            hideLog3();
        });
        return;
    }
}





