
document.addEventListener("DOMContentLoaded", () => {
  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");
  const countdownElement = document.getElementById("countdown");
  const notificationButton = document.getElementById("enable-notifications");
  const notificationStatus = document.getElementById("notification-status");

  // 27 October 2026, 4:00 PM in India (IST, UTC+5:30)
  const launchDate = new Date("2026-10-27T16:00:00+05:30").getTime();

  let notificationEnabled = false;
  let launchNotificationSent = false;

  function updateCountdown() {
    const now = Date.now();
    const difference = launchDate - now;

    if (difference <= 0) {
      countdownElement.innerHTML = `
        <div class="launch-message">
          🚀 AI ASTRA HAS LAUNCHED!<br>
          <small>WELCOME TO AIML.</small>
        </div>
      `;

      if (notificationEnabled && !launchNotificationSent && "Notification" in window && Notification.permission === "granted") {
        new Notification("🚀 AI ASTRA HAS LAUNCHED!", {
          body: "Welcome to AIML. The future starts now!"
        });
        launchNotificationSent = true;
      }

      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    daysElement.textContent = String(days).padStart(2, "0");
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");
  }

  if (notificationButton && notificationStatus) {
    notificationButton.addEventListener("click", async () => {
      if (!("Notification" in window)) {
        notificationStatus.textContent = "Your browser does not support notifications.";
        return;
      }

      try {
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
          notificationEnabled = true;
          notificationStatus.textContent = "✅ Launch notifications enabled!";
          notificationButton.textContent = "🔔 Notifications Enabled";

          // If the event has already launched, notify immediately.
          if (Date.now() >= launchDate && !launchNotificationSent) {
            new Notification("🚀 AI ASTRA HAS LAUNCHED!", {
              body: "Welcome to AIML. The future starts now!"
            });
            launchNotificationSent = true;
          }
        } else {
          notificationStatus.textContent = "Notifications weren't enabled. You can allow them in your browser settings.";
        }
      } catch (error) {
        notificationStatus.textContent = "Unable to enable notifications. Please check your browser settings.";
      }
    });
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
});
