// Range
let progress = document.getElementById("progress");

progress.style.background = `linear-gradient(to right, #1a1a1a 0%, #1a1a1a ${progress.value}%, #e3e3e3 ${progress.value}%, #e3e3e3 100%)`;

// menu & alert
let menu = document.getElementById("menu-pop-up");
let menuBtn = document.getElementById("menu-btn");
let alert = document.getElementById("alert-pop-up");
let alertBtn = document.getElementById("alert-btn");

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
let trialCloseIcon = document.getElementById("trial-icon");
let trial = document.getElementById("trial");

trialCloseIcon.addEventListener("click", () => {
  trial.style.display = "none";
});

// set up
let setUpWrap = document.getElementById("set-up-wrap");
let setUpControlIcon = document.getElementById("setup-control-icon");

setUpControlIcon.addEventListener("click", () => {
  setUpWrap.classList.toggle("active");
});

const updateRange = () => {
  // update range count and progress bar
  let completeSteps = document.querySelectorAll(".complete-step");
  rangeCount.innerText = completeSteps.length;
  progress.setAttribute("value", `${completeSteps.length * 20}`);
  progress.style.background = `linear-gradient(to right, #1a1a1a 0%, #1a1a1a ${progress.value}%, #e3e3e3 ${progress.value}%, #e3e3e3 100%)`;
};

let checkboxItems = document.querySelectorAll(".checkbox");
let setupItems = document.querySelectorAll(".setup-item");
let setupItemTitles = document.querySelectorAll(".setup-item-title");
let rangeCount = document.getElementById("range-count");

const closeSetUpItem = () => {
  setupItems.forEach((element) => {
    element.classList.remove("active");
  });
};
checkboxItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    if (item.classList.contains("active")) {
      item.classList.remove("active")
      setupItems[index].classList.remove("complete-step");
      updateRange();
    } else {
      item.classList.add("loading");
      setTimeout(() => {
        item.classList.remove("loading");
        item.classList.add("active");
        setupItems[index].classList.remove("active");
        setupItems[index].classList.add("complete-step");
        
       let count = index + 1
        while (count < setupItems.length) {
          console.log("While loop ran")
          count++
        }
        updateRange();
      }, 800);
    }
  });
});

setupItemTitles.forEach((item, index) => {
  item.addEventListener("click", () => {
    setupItems.forEach((element) => {
      element.classList.remove("active");
    });
    setupItems[index].classList.add("active");
  });
});
