let canvas, ctx, analyser;
let audio = document.getElementById("music");
let fileInput = document.getElementById("fileInput");
let songHeading = document.getElementById("song-heading");

fileInput.addEventListener("change", () => {
  if (fileInput.value) {
    audio.src = fileInput.files[0].name;
    songHeading.innerText = fileInput.files[0].name.split(".")[0];
    audio.load();
  }
});

window.onload = function () {
  canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = 500;
  document.body.appendChild(canvas);
  ctx = canvas.getContext("2d");
};

function initializeAnimate() {
  audioLoad();
  draw();
}

document.getElementById("animate").addEventListener("click", initializeAnimate);

function removeAnimateButton() {
  document
    .getElementById("animate")
    .removeEventListener("click", initializeAnimate);
  document.getElementById("animate").remove();
  document
    .querySelector(".audio-container")
    .classList.add("audio-container-new");
}

function audioLoad() {
  removeAnimateButton();

  let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  analyser = audioCtx.createAnalyser();

  let source = audioCtx.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);
}

function draw() {
  requestAnimationFrame(draw);
  let freqByteData = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(freqByteData);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let x = 0;
  for (let i = 1; i < freqByteData.length; i++) {
    // ctx.fillStyle = "#3c3c3d";
    ctx.fillStyle = "#FE4164";
    ctx.fillRect(x, canvas.height - freqByteData[i], 10, canvas.height);
    x += 20;
  }
}
