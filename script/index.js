const state = {
  animation: 1,
  music: false,
  musicMode: 1,
};
const hologram = document.querySelector(".hologram-wrapper");
const character = document.querySelector(".character");
const ny = document.querySelector(".ny-hat");
const hologramHats = document.querySelectorAll(".hologram .hat");

const musicButton = document.getElementById("music");
const animationButton = document.getElementById("animation");

const popup = document.querySelector(".popup");
const popupClose = document.querySelector(".close");
const animationModSelect = document.getElementById("animation-select");

const audio = new Audio("assets/default.mp3");
const audioNy = new Audio("assets/hny.mp3");

audio.volume = 0.6;

audioNy.currentTime = 5;
audioNy.loop = true;

const toggleMusic = (state, musicMode) => {
  if (state) {
    switchNYmusic(musicMode);
  } else {
    audioNy.pause();
    audio.pause();
  }
};
const switchNYmusic = (state) => {
  if (state) {
    audioNy.play();
    audio.pause();
  } else {
    audioNy.pause();
    audio.play();
  }
};

hologramHats.forEach((hat) =>
  hat.addEventListener("click", (e) => {
    hologram.classList.remove("hologram--pavuchach");
    hologram.classList.remove("hologram--ny");
    character.classList.remove("hide");
    ny.classList.remove("hide");
    toggleMusic(state.music, false);
  })
);

hologram.addEventListener("drop", (e) => {
  const data = e.dataTransfer.getData("text/plain");

  switch (data) {
    case "pavuchach":
      hologram.classList.add("hologram--pavuchach");
      character.classList.add("hide");
      ny.classList.remove("hide");
      hologram.classList.remove("hologram--ny");
      state.musicMode = 1;
      toggleMusic(state.music, false);

      break;
    case "ny":
      hologram.classList.add("hologram--ny");
      ny.classList.add("hide");
      character.classList.remove("hide");
      hologram.classList.remove("hologram--pavuchach");
      state.musicMode = 2;
      toggleMusic(state.music, true);
      break;

    default:
      break;
  }
});
hologram.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.stopPropagation();
  e.dataTransfer.dropEffect = "move";
});

character.addEventListener("dragstart", (e) => {
  e.dataTransfer.dropEffect = "move";
  e.dataTransfer.clearData();
  e.dataTransfer.setData("text/plain", e.target.dataset.type);
});
ny.addEventListener("dragstart", (e) => {
  e.dataTransfer.dropEffect = "move";
  e.dataTransfer.clearData();
  e.dataTransfer.setData("text/plain", e.target.dataset.type);
});

musicButton.addEventListener("click", () => {
  state.music = !state.music;
  toggleMusic(state.music, state.musicMode === 2);
  musicButton.classList.toggle("active");
});

popupClose.addEventListener("click", () => {
  popup.classList.remove("visible");
});

animationButton.addEventListener("click", () => {
  popup.classList.add("visible");
});

animationModSelect.addEventListener("input", (e) => {
  switch (e.target.value) {
    case "disable":
      state.animation = 0;
      document.body.classList.remove("toggle-small-animations");
      document.body.classList.remove("toggle-big-animations");
      break;

    case "default":
      state.animation = 1;
      document.body.classList.add("toggle-small-animations");
      document.body.classList.remove("toggle-big-animations");

      break;

    case "all":
      state.animation = 2;
      document.body.classList.add("toggle-small-animations");
      document.body.classList.add("toggle-big-animations");
      break;

    default:
      break;
  }
});
