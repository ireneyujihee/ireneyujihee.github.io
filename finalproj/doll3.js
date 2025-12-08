const tops = [
  "top1.png", "top2.png", "top3.png", "top4.png",
  "top5.png", "top6.png", "top7.png", "top8.png"
];

const bottoms = [
  "bottom1.png", "bottom2.png", "bottom3.png", "bottom4.png",
  "bottom5.png", "bottom6.png", "bottom7.png", "bottom8.png"
];

const topPositions = {
  "top1.png": { width: 220, top: 180, x: -5 },
  "top2.png": { width: 220, top: 180, x: -5 },
  "top3.png": { width: 100, top: 200, x: 1 },
  "top4.png": { width: 100, top: 200, x: 3 },
  "top5.png": { width: 105, top: 185, x: 2 },
  "top6.png": { width: 100, top: 185, x: 2 },
  "top7.png": { width: 150, top: 184, x: -4 },
  "top8.png": { width: 150, top: 178, x: -3 }
};

const bottomPositions = {
  "bottom1.png": { width: 170, top: 304, x: 2 },
  "bottom2.png": { width: 190, top: 304, x: 1 },
  "bottom3.png": { width: 130, top: 307, x: -2 },
  "bottom4.png": { width: 145, top: 304, x: -1 },
  "bottom5.png": { width: 130, top: 307, x: 1 },
  "bottom6.png": { width: 145, top: 304, x: -4 },
  "bottom7.png": { width: 165, top: 306, x: 1 },
  "bottom8.png": { width: 170, top: 304, x: -3 }
};


const topPreview = document.getElementById("top-preview");
const bottomPreview = document.getElementById("bottom-preview");

const topLayer = document.getElementById("top-layer");
const bottomLayer = document.getElementById("bottom-layer");

const topPrevBtn = document.getElementById("top-prev");
const topNextBtn = document.getElementById("top-next");

const bottomPrevBtn = document.getElementById("bottom-prev");
const bottomNextBtn = document.getElementById("bottom-next");

const dressBtn = document.getElementById("dress-btn");
const resetBtn = document.getElementById("reset-btn");

let currentTopIndex = 0;
let currentBottomIndex = 0;

topPreview.src = tops[currentTopIndex];
bottomPreview.src = bottoms[currentBottomIndex];

const BASE_DOLL_HEIGHT = 580;

function getScaleFactor() {
  const stage = document.querySelector(".doll-stage");
  return stage.offsetHeight / BASE_DOLL_HEIGHT;
}

topNextBtn.addEventListener("click", () => {
  currentTopIndex = (currentTopIndex + 1) % tops.length;
  topPreview.src = tops[currentTopIndex];
});

topPrevBtn.addEventListener("click", () => {
  currentTopIndex = (currentTopIndex - 1 + tops.length) % tops.length;
  topPreview.src = tops[currentTopIndex];
});

bottomNextBtn.addEventListener("click", () => {
  currentBottomIndex = (currentBottomIndex + 1) % bottoms.length;
  bottomPreview.src = bottoms[currentBottomIndex];
});

bottomPrevBtn.addEventListener("click", () => {
  currentBottomIndex = (currentBottomIndex - 1 + bottoms.length) % bottoms.length;
  bottomPreview.src = bottoms[currentBottomIndex];
});


function applyOutfit() {
  const scale = getScaleFactor();

  const topSrc = tops[currentTopIndex];
  const bottomSrc = bottoms[currentBottomIndex];

  topLayer.src = topSrc;

  if (topPositions[topSrc]) {
    const t = topPositions[topSrc];
    topLayer.style.width = t.width * scale + "px";
    topLayer.style.top = t.top * scale + "px";
    topLayer.style.left = `calc(50% + ${t.x * scale}px)`;
  }

  bottomLayer.src = bottomSrc;

  if (bottomPositions[bottomSrc]) {
    const b = bottomPositions[bottomSrc];
    bottomLayer.style.width = b.width * scale + "px";
    bottomLayer.style.top = b.top * scale + "px";
    bottomLayer.style.left = `calc(50% + ${b.x * scale}px)`;
  }
}

dressBtn.addEventListener("click", applyOutfit);

resetBtn.addEventListener("click", () => {
  topLayer.src = "";
  bottomLayer.src = "";
  topLayer.removeAttribute("style");
  bottomLayer.removeAttribute("style");
});

window.addEventListener("resize", () => {
  if (topLayer.src || bottomLayer.src) {
    applyOutfit();
  }
});
