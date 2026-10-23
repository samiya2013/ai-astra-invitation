
document.addEventListener("DOMContentLoaded", () => {
  const targetDate = new Date("2026-10-27T16:00:00+05:30").getTime();

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  const countdownEl = document.getElementById("countdown");

  function updateCountdown() {
    const remaining = targetDate - Date.now();

    if (remaining <= 0) {
      countdownEl.innerHTML =
        '<p class="launch-message">THE FUTURE STARTS NOW ✦</p>';
      return;
    }

    daysEl.textContent = Math.floor(remaining / 86400000);
    hoursEl.textContent = String(
      Math.floor((remaining % 86400000) / 3600000)
    ).padStart(2, "0");

    minutesEl.textContent = String(
      Math.floor((remaining % 3600000) / 60000)
    ).padStart(2, "0");

    secondsEl.textContent = String(
      Math.floor((remaining % 60000) / 1000)
    ).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  const invitation = document.querySelector(".invitation");
  if (invitation) {
    console.log("AI ASTRA invitation loaded!");
  }
});

