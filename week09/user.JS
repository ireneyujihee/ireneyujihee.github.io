document.addEventListener("DOMContentLoaded", () => {
  const timerEl = document.getElementById("timer");
  const start = Date.now();

  function updateTimer() {
    const seconds = Math.floor((Date.now() - start) / 1000);
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    timerEl.textContent = `${m}:${s}`;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
});
