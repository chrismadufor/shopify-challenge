// Range
let progress = document.getElementById("progress");

progress.style.background = `linear-gradient(to right, #1a1a1a 0%, #1a1a1a ${progress.value}%, #e3e3e3 ${progress.value}%, #e3e3e3 100%)`;

// menu
let menu = document.getElementById("menu-pop-up");
let menuBtn = document.getElementById("menu-btn");

menuBtn.addEventListener("click", () => {
    // console.log()
  if (menu.style.display === "none") menu.style.display = "block";
  else menu.style.display = "none";
});

// alert
let alert = document.getElementById("alert-pop-up");
let alertBtn = document.getElementById("alert-btn");

menuBtn.addEventListener("click", () => {
  if (menu.style.display === "none") menu.style.display = "block";
  else menu.style.display = "none";
});
