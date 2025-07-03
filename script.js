window.onload = () => {
    const challenges = [
      "Create a responsive button with hover effect.",
      "Center a div using Flexbox.",
      "Build a simple form with email validation.",
      "Create a card layout using CSS Grid.",
      "Add a click-to-toggle dark mode button.",
      "Animate an element using CSS transitions.",
      "Create a collapsible accordion menu.",
      "Build a simple image slider.",
      "Write a JS function to reverse a string.",
      "Create a navbar with dropdown items."
    ];

    function getTodayDate() {
      return new Date().toISOString().split("T")[0];
    }

    function loadChallenge() {
      const today = getTodayDate();
      const saved = JSON.parse(localStorage.getItem("dailyDev5")) || {};
      if (saved.date === today && saved.challenge) {
        document.getElementById("daily-challenge").textContent = saved.challenge;
      } else {
        const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
        document.getElementById("daily-challenge").textContent = randomChallenge;
        localStorage.setItem("dailyDev5", JSON.stringify({ date: today, challenge: randomChallenge }));
      }
    }

    function updateStreak() {
      const today = getTodayDate();
      const streakData = JSON.parse(localStorage.getItem("dev5Streak")) || {
        streak: 0,
        lastDate: null,
      };

      if (streakData.lastDate === today) return;

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yDate = yesterday.toISOString().split("T")[0];

      if (streakData.lastDate === yDate) {
        streakData.streak += 1;
      } else {
        streakData.streak = 1;
      }

      streakData.lastDate = today;
      localStorage.setItem("dev5Streak", JSON.stringify(streakData));
      displayStreak();
    }

    function displayStreak() {
      const { streak = 0 } = JSON.parse(localStorage.getItem("dev5Streak")) || {};
      document.getElementById("streak").textContent = `🔥 ${streak}-Day Streak`;
    }

    document.getElementById("run-btn").addEventListener("click", function () {
      const html = document.getElementById("html-code").value;
      const css = `<style>${document.getElementById("css-code").value}</style>`;
      const js = `<script>${document.getElementById("js-code").value}<\/script>`;
      const output = html + css + js;
      const iframe = document.getElementById("live-preview");
      iframe.srcdoc = output;

      updateStreak();
    });

    // Timer
    let timerInterval;
    let secondsLeft = 300;

    function startTimer() {
      clearInterval(timerInterval);
      secondsLeft = 300;

      function formatTime(secs) {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `⏱ ${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
      }

      timerInterval = setInterval(() => {
        document.getElementById("timer").textContent = formatTime(secondsLeft);
        secondsLeft--;
        if (secondsLeft < 0) {
          clearInterval(timerInterval);
          alert("Time's up! Submit your code.");
        }
      }, 1000);
    }
    loadChallenge();
    displayStreak();
    document.getElementById("start-timer-btn").addEventListener("click", () => {
    startTimer();
});
};

  