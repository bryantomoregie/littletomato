let countdown;
const timerDisplay = document.querySelector(".time_remaining");
const pomodoroButton = document.querySelector("#pomodoro");
const buttons = document.querySelectorAll(".time_button");
localStorage.setItem("pomodoro", "25:00");
localStorage.setItem("short", "5:00");
localStorage.setItem("long", "10:00");

timerDisplay.textContent = localStorage.pomodoro;

function convert(input) {
  let integer = parseInt(input);
  let seconds = integer * 60;
  timer(seconds);
}

function timer(seconds) {
  clearInterval(countdown);  
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}


function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

buttons.forEach((button) =>
  button.addEventListener("click", function () {
    let variable = button.id;
    let time = localStorage.getItem(variable);
    convert(time);
  })
);

const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.getElementById("close");
const overlay = document.getElementById("overlay");

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

overlay.addEventListener("click", () => {
  const modal = document.querySelector(".modal.active");
  closeModal(modal);
});

closeModalButtons.addEventListener("click", () => {
  const modal = document.getElementById("modal");
  closeModal(modal);
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}
