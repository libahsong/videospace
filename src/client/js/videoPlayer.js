const videoContainer = document.getElementById("videoContainer");
const video = document.querySelector("video");
const videoController = document.getElementById("videoController");
const psBtn = videoController.querySelector("#playPauseBtn");
const psBtnIcon = psBtn.querySelector("i");
const volumeBtn = videoController.querySelector("#volume");
const volumeBtnIcon = volumeBtn.querySelector("i");
const volumeRange = videoController.querySelector("#volumeRange");
const currentTimeZone = document.getElementById("currentTime");
const totalTimeZone = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenIcon = document.getElementById("fullScreen");
// const fullScreenIcon = fullScreen.querySelector("i");
const textarea = document.querySelector("textarea");

let volumeValue = 0.5;
video.volume = volumeValue;
let mouseMoveTimeout = null;
let mouseLeaveTimeout = null;

const handlePlayAndStop = () => {
  if (video.paused) {
    video.play();
    psBtnIcon.className = "fas fa-pause";
  } else {
    video.pause();
    psBtnIcon.className = "fas fa-play";
  }
};

const handleSound = () => {
  if (video.muted) {
    video.muted = false;
    volumeRange.value = volumeValue;
    volumeBtnIcon.className = "fas fa-volume-up";
  } else {
    video.muted = true;
    volumeRange.value = 0;
    volumeBtnIcon.className = "fas fa-volume-mute";
  }
};

const handleVolume = (event) => {
  const {
    target: { value },
  } = event;

  if (video.muted) {
    video.muted = false;
    volumeBtnIcon.className = "fas fa-volume-mute";
  }
  if (value === "0") {
    volumeBtnIcon.className = "fas fa-volume-off";
  } else {
    volumeBtnIcon.className = "fas fa-volume-up";
  }
  video.volume = volumeValue = value;
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(11, 8);

const handleLoadedMetaData = () => {
  totalTimeZone.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currentTimeZone.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleFullScreen = () => {
  const fullScreen = document.fullscreenElement;
  if (fullScreen) {
    document.exitFullscreen();
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenIcon.classList = "fas fa-compress";
  }
};

const hideControls = () => videoController.classList.remove("showing");

const handleMouseMove = (event) => {
  if (mouseMoveTimeout) {
    clearTimeout(mouseMoveTimeout);
  }
  if (mouseLeaveTimeout) {
    clearTimeout(mouseLeaveTimeout);
  }
  videoController.classList.add("showing");
  mouseMoveTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = (event) => {
  if (mouseMoveTimeout) {
    clearTimeout(mouseMoveTimeout);
  }
  mouseLeaveTimeout = setTimeout(hideControls, 2000);
};

const handleArrowVolume = (key) => {
  //40 "ArrowDown"
  if (key === "ArrowDown" && !video.muted) {
    let volumeDown = video.volume;
    if (volumeDown > 0) {
      volumeDown = (video.volume - 0.1).toFixed(1);
      video.volume = volumeRange.value = volumeValue = volumeDown;
    }
    if (volumeDown === 0) {
      volumeBtnIcon.className = "fas fa-volume-off";
    } else {
      volumeBtnIcon.className = "fas fa-volume-up";
    }
  }
  //38 "ArrowUp"
  if (key === "ArrowUp") {
    let volumeUp = video.volume;
    if (video.muted) {
      video.muted = false;
      volumeBtnIcon.className = "fas fa-volume-mute";
    }
    if (volumeUp < 1) {
      volumeUp = (video.volume * 10 + 1) / 10;
    }

    volumeBtnIcon.className = "fas fa-volume-up";

    video.volume = volumeRange.value = volumeValue = volumeUp;
  }
};

const handleKey = (event) => {
  console.log("keydown");
  //f key
  if (event.key === "f") {
    handleFullScreen();
  }
  //space bar
  if (event.key === " ") {
    event.preventDefault();
    handlePlayAndStop(event.keyCode);
  }
  //40 "ArrowDown"
  if (event.key === "ArrowDown") {
    event.preventDefault();
    handleArrowVolume(event.key);
  }
  //38 "ArrowUp"
  if (event.key === "ArrowUp") {
    event.preventDefault();
    handleArrowVolume(event.key);
  }
};

const handleExpand = () => {
  if (!document.fullscreenElement) {
    fullScreenIcon.classList = "fas fa-expand";
  }
};

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
};

const initKeyEvent = () => {
  document.addEventListener("keydown", handleKey);
};
const revokeKeyEvent = () => {
  document.removeEventListener("keydown", handleKey);
};
// if (video.readyState >= 2) {
//   handleLoadedMetaData();
// }
if (textarea) {
  textarea.addEventListener("focusin", revokeKeyEvent);
  textarea.addEventListener("focusout", initKeyEvent);
}
document.addEventListener("keydown", handleKey);
document.addEventListener("fullscreenchange", handleExpand);
video.addEventListener("loadedmetadata", handleLoadedMetaData);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
psBtn.addEventListener("click", handlePlayAndStop);
video.addEventListener("click", handlePlayAndStop);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("ended", handleEnded);
volumeBtn.addEventListener("click", handleSound);
volumeRange.addEventListener("input", handleVolume);
timeline.addEventListener("input", handleTimelineChange);
fullScreenIcon.addEventListener("click", handleFullScreen);
