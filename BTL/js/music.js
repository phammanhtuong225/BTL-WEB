const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const player = $(".player");
const cd = $(".cd");
const heading = $(".title-song h3");
const headingName = $(".title-song h4");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");
const iconMax = $(".icon-max");
const iconMin = $(".icon-min");
const volumeControl = $(".volume-control");
const volumeSlider = $("#volume");
const musicImg = $(".music-image");
const startTime = $(".start-time");
const startEnd = $(".start-end");
const searchResultsContainer = $(".search-results");
const resultMusic = $("#result");
const searchButton = $("#searchButton");
const searchInput = $("#searchInput");
const currentURL = window.location.href;
const artistBtn = $(".artists");
const artistName = $("#artist-music");


const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: {},
  songs: [
    {
      name: "Vỡ tan",
      singer: "Trịnh Thăng Bình",
      path: "./assests/music/1.mp3",
      image: "./assests/img/Categorys/01-category.jpg",
      time: "04:19",
    },
    {
      name: "Ngày mai em đi mất",
      singer: "Khải Đăng x Đạt G",
      path: "./assests/music/2.mp3",
      image: "./assests/img/Categorys/02-category.jpg",
      time: "04:08",
    },
    {
      name: "Nơi ta sống",
      singer: "Long nón lá x Mikelodic",
      path: "./assests/music/3.mp3",
      image: "./assests/img/Categorys/03-category.jpg",
      time: "02:54",
    },
    {
      name: "Mùa hè tuyệt vời",
      singer: "Đức Phúc",
      path: "./assests/music/4.mp3",
      image: "./assests/img/Categorys/04-category.jpg",
      time: "03:32",
    },
    {
      name: "Cô đơn trên SOFA",
      singer: "Trung Quân cover",
      path: "./assests/music/5.mp3",
      image: "./assests/img/Categorys/05-category.jpg",
      time: "04:43",
    },
    {
      name: "Anh là ai?",
      singer: "Huỳnh Công Hiếu x DT",
      path: "./assests/music/6.mp3",
      image: "./assests/img/Categorys/06-category.jpg",
      time: "04:36",
    },
    {
      name: "À lôi",
      singer: "Double2T x Masew",
      path: "./assests/music/7.mp3",
      image:"./assests/img/Categorys/07-category.jpg",
      time: "03:12",
    },
    {
      name: "Faded",
      singer: "Alan Walker",
      path: "./assests/music/8.mp3",
      image: "./assests/img/Categorys/08-category.jpg",
      time: "03:33",
    },
    {
      name: "Cao ốc 20",
      singer: "Bray x Đạt G",
      path: "./assests/music/9.mp3",
      image: "./assests/img/Categorys/06-category.jpg",
      time: "04:14",
    },
    {
      name: "Making my way",
      singer: "Sơn Tùng",
      path: "./assests/music/10.mp3",
      image: "./assests/img/Categorys/06-category.jpg",
      time: "04:18",
    },
    {
      name: "Nắng ấm ngang qua",
      singer: "Sơn Tùng",
      path: "./assests/music/11.mp3",
      image: "./assests/img/Categorys/06-category.jpg",
      time: "03:15",
    },
    {
      name: "Thị mầu",
      singer: "Hòa Minzy x Masew",
      path: "./assests/music/12.mp3",
      image: "./assests/img/Categorys/06-category.jpg",
      time: "03:21",
    }
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
      <div class="song ${
        index === this.currentIndex ? "active" : ""
      }" data-index="${index}">
          <div class="thumb"
              style="background-image: url('${song.image}')">
          </div>
          <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
          </div>
          <div class="option">
              <i class="fas fa-ellipsis-h"></i>
          </div>
      </div>
  `;
    });
    playlist.innerHTML = htmls.join("");
  },
  renderRank: function () {
    const htmlsRank = this.songs.map((song, index) => {
      return `
      <div class="song ${
        index === this.currentIndex ? "active" : ""
      }" data-index="${index}">
          <div class="stt">${index + 1}</div>
          <div class="thumb"
              style="background-image: url('${song.image}')">
          </div>
          <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
          </div>
          <div class="option">
              <i class="fas fa-ellipsis-h"></i>
          </div>
      </div>
  `;
    });
    playlist.innerHTML = htmlsRank.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;
    iconMin.style.display = "none";
    // Xử lý khi click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    // Khi song được play
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
    };
    // Khi song bị pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
    };
    // Khi tiến độ bài hát thay đổi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
        const minutes = Math.floor(audio.currentTime / 60);
        const seconds = Math.floor(audio.currentTime % 60);
        startTime.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      }
    };
    // Xử lý khi tua song
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };
    // Khi next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      if (currentURL.includes("rank.html")) {
        _this.renderRank();
      } else {
        _this.render();
      }
      _this.scrollToActiveSong();
    };
    // Khi prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      if (currentURL.includes("rank.html")) {
        _this.renderRank();
      } else {
        _this.render();
      }
      _this.scrollToActiveSong();
    };
    // Xử lý bật / tắt random song
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };
    // Xử lý lặp lại một song
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };
    // Xử lý next song khi audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };
    // Lắng nghe hành vi click vào playlist
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".option")) {
        // Xử lý khi click vào song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          if (currentURL.includes("rank.html")) {
            _this.renderRank();
          } else {
            _this.render();
          }
          audio.play();
        }
        // Xử lý khi click vào song option
        if (e.target.closest(".option")) {
        }
      }
    };
    //Tăng / Giam âm thanh
    volumeSlider.oninput = function () {
      const volumeValue = parseFloat(this.value) / 100;
      audio.volume = volumeValue; 
      if (volumeValue === 0) {
        iconMax.style.display = "none";
        iconMin.style.display = "inline-block";
      } else {
        iconMax.style.display = "inline-block";
        iconMin.style.display = "none";
      }
    };
    iconMax.onclick = function () {
      audio.muted = true;
      volumeSlider.value = 0;
      iconMax.style.display = "none";
      iconMin.style.display = "inline-block";
    };
    iconMin.onclick = function () {
      audio.muted = false;
      volumeSlider.value = audio.volume * 100;
      iconMax.style.display = "inline-block";
      iconMin.style.display = "none";
    };
    // Tìm kiếm
    searchButton.onclick = function () {
      const searchTerm = searchInput.value.toLowerCase();
      const matchedSongIndexes = _this.songs.reduce((indexes, song, index) => {
        if (song.name.toLowerCase().includes(searchTerm) || song.singer.toLowerCase().includes(searchTerm)) {
            indexes.push(index);
          }
        return indexes;
      }, []);
      if (matchedSongIndexes.length > 0) {
        searchResultsContainer.innerHTML = ""; // Xóa kết quả tìm kiếm trước đó
        searchResultsContainer.innerHTML = `
          <div class="search-info">
          <h2>Kết quả tìm kiếm: </h2>
          </div>
        `;
        matchedSongIndexes.forEach((index) => {
          const song = _this.songs[index];
          const songElement = document.createElement("div");
          songElement.classList.add("song");
          songElement.innerHTML = `
            <div class="thumb" style="background-image: url('${song.image}')"></div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          `;
          songElement.querySelector(".body").addEventListener("click", function () {
            _this.currentIndex = index;
            _this.loadCurrentSong();
            audio.play(); // Phát bài hát
            if (currentURL.includes("rank.html")) {
              _this.renderRank();
            } else {
              _this.render();
            }
            _this.scrollToActiveSong();
          });
          searchResultsContainer.appendChild(songElement);
        });
      };
    };
    


  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 300);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    headingName.textContent = this.currentSong.singer;
    startEnd.textContent = this.currentSong.time;
    musicImg.style.backgroundImage = `url('${this.currentSong.image}')`;;
    audio.src = this.currentSong.path;
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  
  start: function () {
    // Gán cấu hình từ config vào ứng dụng
    this.loadConfig();

    // Định nghĩa các thuộc tính cho object
    this.defineProperties();

    // Lắng nghe / xử lý các sự kiện (DOM events)
    this.handleEvents();

    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    this.loadCurrentSong();

    // Render playlist
    if (currentURL.includes("rank.html")) {
      this.renderRank();
    } else {
      this.render();
    }
  },
};
app.start();



$(document).ready(function() {
  $(window).scroll(function() { 
      if($(this).scrollTop()) {
          $('#go-to-top').fadeIn();
      } else {
          $('#go-to-top').fadeOut();
      }
  });
});
