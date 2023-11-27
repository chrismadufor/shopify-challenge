// Range
let progress = document.getElementById("progress");

progress.style.background = `linear-gradient(to right, #1a1a1a 0%, #1a1a1a ${progress.value}%, #e3e3e3 ${progress.value}%, #e3e3e3 100%)`;

// menu & alert
let menu = document.getElementById("menu-pop-up");
let menuBtn = document.getElementById("menu-btn");
let alert = document.getElementById("alert-pop-up");
let alertBtn = document.getElementById("alert-btn");
console.log("Flex", menu.style.display);

menuBtn.addEventListener("click", () => {
  if (menu.style.display === "none" || menu.style.display === "") {
    alert.style.display = "none";
    menu.style.display = "flex";
  } else menu.style.display = "none";
});


alertBtn.addEventListener("click", () => {
  if (alert.style.display === "none" || alert.style.display === "") {
    menu.style.display = "none";
    alert.style.display = "flex";
  } else alert.style.display = "none";
});

// trial
let trialCloseIcon = document.getElementById("trial-icon")
let trial = document.getElementById("trial")

trialCloseIcon.addEventListener("click", () => {
    // trial.style.visibility = "hidden"
    trial.style.display = "none"
})

// set up
let setUpWrap = document.getElementById("set-up-wrap")
let setUpControlIcon = document.getElementById("setup-control-icon")

setUpControlIcon.addEventListener("click", () => {
    setUpWrap.classList.toggle("active")
})
