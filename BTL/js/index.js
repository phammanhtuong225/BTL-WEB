let btnUser = document.getElementById("btn-user");
let vUser = document.getElementById("v-user");
let setting = document.getElementById("setting");
let setting_button = document.getElementById("setting-button");
let items = document.querySelectorAll(".slider .item");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let active = 0;

document.addEventListener("DOMContentLoaded", function () {
  let menuItems = document.querySelectorAll(".menu li");

  // Lặp qua từng phần tử li và thêm trình lắng nghe sự kiện click
  menuItems.forEach((li) => {
      li.addEventListener("click", function () {
          // Lấy giá trị thuộc tính href của thẻ a tương ứng
          const href = li.querySelector("a").getAttribute("href");
          // Điều hướng đến vị trí mới
          window.location.href = href;
      });
  });
    var goToTopButton = document.getElementById('go-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            goToTopButton.style.display = 'block';
        } else {
            goToTopButton.style.display = 'none';
        }
    });

    goToTopButton.addEventListener('click', function() {
        scrollToTop(400); // Cuộn lên đầu trang trong 500ms
    });

    function scrollToTop(duration) {
        var start = window.scrollY;
        var startTime = performance.now();

        function animateScroll(timestamp) {
            var currentTime = timestamp - startTime;
            var progress = Math.min(currentTime / duration, 1);

            window.scrollTo(0, start * (1 - progress));

            if (currentTime < duration) {
                requestAnimationFrame(animateScroll);
            }
        }

        requestAnimationFrame(animateScroll);
    }
});

function loadAdvertises() {
    fetch("assests/data/advertise.json").then(res => res.json()).then(data => {
        let advertisesList = document.getElementById("advertises");
        let advertisesHtml = "";
        for (let advertise of data) {
          advertisesHtml += `
            <li>
              <div>
                <div>
                  <a href="${advertise.link}" target="_blank">
                    <img id="ads-img" src="${advertise.image}" alt="">
                    <i class="fa-solid fa-play"></i>
                  </a>    
                </div>
                <a>${advertise.name}</a>
              </div>
            </li>
          `;
        }
        advertisesList.innerHTML = advertisesHtml;
      })
  }

function loadFeatureds() {
  fetch("assests/data/featureds.json").then(res => res.json()).then(data => {
      let featuredsList = document.getElementById("featured");
      let featuredsHtml = "";
      for (let featured of data) {
        featuredsHtml += `
        <li>
        <div class="featured" data-song="${featured.name}">
            <div>
                <a>
                    <img src="${featured.image}" alt="">
                    <i class="fa-solid fa-play"></i>
                </a>    
            </div>
            <a>${featured.name}</a>
        </div>
    </li>
        `;
      }
      featuredsList.innerHTML = featuredsHtml;
      const featuredItems = document.querySelectorAll(".featured");
      featuredItems.forEach((item) => {
        item.addEventListener("click", () => {
          const songName = item.getAttribute("data-song");
          const songIndex = app.songs.findIndex((song) => song.name === songName);

          if (songIndex !== -1) {
            app.currentIndex = songIndex;
            app.loadCurrentSong();
            app.render();
            audio.play();
            app.scrollToActiveSong();
          }
        });
      });
    })
}

function loadArtists() {
  fetch("assests/data/artists.json").then(res => res.json()).then(data => {
      let artistsList = document.getElementById("artists");
      let artistsHtml = "";
      for (let artist of data) {
        artistsHtml += `
          <li>
            <div class="artists">
              <div>
                <a>
                  <img src="${artist.image}" alt="">
                  <i class="fa-solid fa-play"></i>
                </a>    
              </div>
              <a id="artist-music">${artist.artist}</a>
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
  btnE.onclick = function() {
      if (userClicked) {
          e.style.display = "none";
          userClicked = false;
      } else {
          e.style.display = "block";
          userClicked = true;
      }
  };
  // Xử lý sự kiện mouseup khi người dùng kết thúc click
  document.addEventListener("mouseup", function() {
      userClicking = false;
  });
  // Sự kiện mousedown khi người dùng bắt đầu click
  btnUser.addEventListener("mousedown", function() {
      userClicking = true;
  });
  document.addEventListener("click", function(event) {
      if (event.target === vUser || event.target === btnUser || event.target === setting || event.target === setting_button)
          return;
      else {
          vUser.style.display = "none";
          setting.style.display = "none";
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
  loadFeatureds();
  loadArtists();
  loadCategorys();
  loadAdvertises();
  /* Click user */
  clickFull(btnUser, vUser);
  clickFull(setting_button, setting);
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
// Change - color
let btn = document.getElementsByClassName(".btn")
document.getElementById("change-color").addEventListener("click", function(event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết
    const body = document.body;
    body.classList.toggle('light-mode');
    // Lưu trạng thái chế độ nền tối vào localStorage
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('darkModeEnabled', 'true');
    } else {
        localStorage.removeItem('darkModeEnabled');
    }
});

// Kiểm tra trạng thái chế độ nền tối đã được lưu trong localStorage
document.addEventListener('DOMContentLoaded', function() {
    const darkModeEnabled = localStorage.getItem('darkModeEnabled');
    if (darkModeEnabled === 'true') {
        document.body.classList.add('light-mode');
    }
});
let intro = document.getElementById("introduce")
let modal_intro = document.querySelector(".js-modal-intro")

function showLogIntro() {
    modal_intro.classList.add('open')
}

function hideLogIntro() {
    modal_intro.classList.remove('open')
}
let exit_intro = document.querySelector(".exit6")
intro.addEventListener('click', function(event) {
    event.preventDefault();
    showLogIntro();
});
exit_intro.addEventListener('click', function(event) {
    event.preventDefault();
    hideLogIntro();
});
// Phan hoi cua nguoi nghe
let send = document.getElementById("send")
let exit_send = document.querySelector(".exit10")
let modal_send = document.querySelector(".js-modal-send")
send.addEventListener('click', function(event) {
    event.preventDefault();
    showLogSend();
});

function showLogSend() {
    modal_send.classList.add('open')
}

function hideLogSend() {
    modal_send.classList.remove('open')
}
exit_send.addEventListener('click', function(event) {
    event.preventDefault();
    hideLogSend();
});
