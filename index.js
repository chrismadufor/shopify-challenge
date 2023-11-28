// Range
let progress = document.getElementById("progress");

// aria live

const updateDynamicContent = (str) => {
  const dynamicContent = document.getElementById("dynamic-content");
  dynamicContent.ariaLabel = str;
};

// toggle menu & alert containers
let menu = document.getElementById("menu-pop-up");
let menuBtn = document.getElementById("menu-btn");
let alert = document.getElementById("alert-pop-up");
let alertBtn = document.getElementById("alert-btn");

menuBtn.addEventListener("click", () => {
  if (menu.style.display === "none" || menu.style.display === "") {
    updateDynamicContent("Menu has been opened");
    menuBtn.ariaLabel = menuBtn.ariaLabel.replace("open", "close");
    alertBtn.ariaLabel = alertBtn.ariaLabel.replace("close", "open");
    alert.style.display = "none";
    menu.style.display = "flex";
    menu.focus();
  } else {
    menuBtn.ariaLabel = menuBtn.ariaLabel.replace("close", "open");
    updateDynamicContent("Menu has been closed");
    menu.style.display = "none";
  }
});

alertBtn.addEventListener("click", () => {
  if (alert.style.display === "none" || alert.style.display === "") {
    updateDynamicContent("Alert pop up has been opened");
    menu.style.display = "none";
    alert.style.display = "flex";
    alert.focus();
    alertBtn.ariaLabel = alertBtn.ariaLabel.replace("open", "close");
    menuBtn.ariaLabel = menuBtn.ariaLabel.replace("close", "open");
  } else {
    alert.style.display = "none";
    alertBtn.ariaLabel = alertBtn.ariaLabel.replace("close", "open");
    updateDynamicContent("Alert pop up has been closed");
  }
});

// remove trial container
let trialCloseIcon = document.getElementById("trial-icon");
let trial = document.getElementById("trial");

trialCloseIcon.addEventListener("click", () => {
  trial.style.display = "none";
  updateDynamicContent("Trial section has been closed");
  setUpWrap.focus();
});

// toggle set up guide
let setUpWrap = document.getElementById("set-up-wrap");
let setUpControlIcon = document.getElementById("setup-control-icon");

setUpControlIcon.addEventListener("click", () => {
  // setUpWrap.classList.toggle("active");
  if (setUpWrap.classList.contains("active")) {
    setUpWrap.classList.remove("active");
    alertBtn.ariaLabel = alertBtn.ariaLabel.replace("close", "open");
    updateDynamicContent("Set up guide has been collapsed");
  } else {
    setUpWrap.classList.add("active");
    alertBtn.ariaLabel = alertBtn.ariaLabel.replace("open", "close");
    updateDynamicContent("Set up guide has been expanded");
  }
});

const updateRange = () => {
  // update range count and progress bar
  let completeSteps = document.querySelectorAll(".complete-step");
  rangeCount.innerText = completeSteps.length;
  progress.setAttribute("value", `${completeSteps.length * 20}`);
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

// checkbox toggle
checkboxItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    if (item.classList.contains("active")) {
      item.classList.remove("active");
      item.classList.add("loading");
      setTimeout(() => {
        item.classList.remove("loading");
        setupItems[index].classList.remove("complete-step");
        closeSetUpItem();
        setupItems[index].classList.add("active");
        updateRange();
      }, 800);
    } else {
      item.classList.add("loading");
      setTimeout(() => {
        item.classList.remove("loading");
        item.classList.add("active");
        setupItems[index].classList.remove("active");
        setupItems[index].classList.add("complete-step");
        updateRange();
        let count;
        if (index + 1 === setupItems.length) count = 0;
        else count = index + 1;
        while (count < setupItems.length) {
          if (!setupItems[count].classList.contains("complete-step")) {
            closeSetUpItem();
            setupItems[count].classList.add("active");
            break;
          }
          if (count === index) break;
          else if (count + 1 === setupItems.length) count = 0;
          else count++;
        }
      }, 800);
    }
  });
});

// open setup guide section on title click
setupItemTitles.forEach((item, index) => {
  item.addEventListener("click", () => {
    closeSetUpItem();
    setupItems[index].classList.add("active");
  });
});
