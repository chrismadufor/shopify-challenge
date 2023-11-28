// Range
let progress = document.getElementById("progress");
let menu = document.getElementById("menu-pop-up");
let menuBtn = document.getElementById("menu-btn");
let alert = document.getElementById("alert-pop-up");
let alertBtn = document.getElementById("alert-btn");
let trialCloseIcon = document.getElementById("trial-icon");
let trial = document.getElementById("trial");
let setUpWrap = document.getElementById("set-up-wrap");
let setUpControlIcon = document.getElementById("setup-control-icon");
let checkboxItems = document.querySelectorAll(".checkbox");
let setupItems = document.querySelectorAll(".setup-item");
let setupItemTitles = document.querySelectorAll(".setup-item-title");
let rangeCount = document.getElementById("range-count");
const dynamicContent = document.getElementById("dynamic-content");
let completeItems = document.querySelectorAll(".complete-step");

// Helper functions

const updateAriaLiveContent = (str) => {
  dynamicContent.ariaLabel = str;
};

const updateProgressCountAndProgressBar = () => {
  let completeSteps = document.querySelectorAll(".complete-step");
  rangeCount.innerText = completeSteps.length;
  progress.setAttribute("value", `${completeSteps.length * 20}`);
  if (completeSteps.length === setupItems.length)
    updateAriaLiveContent("Fantastic! All sections have been completed");
};

const closeActiveSetupGuideSection = () => {
  setupItems.forEach((element) => {
    element.classList.remove("active");
  });
};

const updateAriaLabelText = (element, currentString, newString) => {
  element.ariaLabel = element.ariaLabel.replace(currentString, newString);
};

const openNextIncompleteSetupGuideSection = (index) => {
  let count;
  if (index + 1 === setupItems.length) count = 0;
  else count = index + 1;
  while (count < setupItems.length) {
    if (!setupItems[count].classList.contains("complete-step")) {
      // we found one!
      closeActiveSetupGuideSection();

      // open next incomplete section
      setupItems[count].classList.add("active");
      // focus on the next incomplete section
      setupItems[count].focus();
      break;
    }

    // restart count is required
    if (count === index) break;
    else if (count + 1 === setupItems.length) count = 0;
    else count++;
  }
};

// toggle menu & alert containers

menuBtn.addEventListener("click", () => {
  if (menu.style.display === "none" || menu.style.display === "") {
    alert.style.display = "none";
    menu.style.display = "flex";
    updateAriaLiveContent("Menu has been opened");
    updateAriaLabelText(menuBtn, "open", "close");
    updateAriaLabelText(alertBtn, "close", "open");
    menu.focus();
  } else {
    menu.style.display = "none";
    updateAriaLiveContent("Menu has been closed");
    updateAriaLabelText(menuBtn, "close", "open");
  }
});

alertBtn.addEventListener("click", () => {
  if (alert.style.display === "none" || alert.style.display === "") {
    menu.style.display = "none";
    alert.style.display = "flex";
    updateAriaLiveContent("Alert pop up has been opened");
    updateAriaLabelText(alertBtn, "open", "close");
    updateAriaLabelText(menuBtn, "close", "open");
    alert.focus();
  } else {
    alert.style.display = "none";
    updateAriaLiveContent("Alert pop up has been closed");
    updateAriaLabelText(alertBtn, "close", "open");
  }
});

// remove trial container
trialCloseIcon.addEventListener("click", () => {
  trial.style.display = "none";
  updateAriaLiveContent("Trial section has been closed");
  trialCloseIcon.blur()
});

// toggle set up guide
setUpControlIcon.addEventListener("click", () => {
  if (setUpWrap.classList.contains("active")) {
    setUpWrap.classList.remove("active");
    updateAriaLiveContent("Set up guide has been collapsed");
    updateAriaLabelText(setUpControlIcon, "collapse", "expand");
  } else {
    setUpWrap.classList.add("active");
    updateAriaLiveContent("Set up guide has been expanded");
    updateAriaLabelText(setUpControlIcon, "expand", "collapse");
  }
});

// checkbox toggle
checkboxItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    if (item.classList.contains("active")) {
      item.classList.remove("active");
      item.classList.add("loading");
      updateAriaLiveContent("Loading.");
      setTimeout(() => {
        item.classList.remove("loading");
        closeActiveSetupGuideSection();
        setupItems[index].classList.remove("complete-step");
        setupItems[index].classList.add("active");
        updateProgressCountAndProgressBar();
        updateAriaLiveContent("Take your time! Step marked as incomplete");
        updateAriaLabelText(item, "as not done", "as done");
      }, 1200);
    } else {
      item.classList.add("loading");
      updateAriaLiveContent("Loading.");
      setTimeout(() => {
        item.classList.remove("loading");
        item.classList.add("active");
        setupItems[index].classList.remove("active");
        setupItems[index].classList.add("complete-step");
        updateProgressCountAndProgressBar();
        openNextIncompleteSetupGuideSection(index);
        updateAriaLabelText(item, "as done", "as not done");
        let completeSteps = document.querySelectorAll(".complete-step");
        if (completeSteps.length === setupItems.length)
          updateAriaLiveContent("Fantastic! All steps have been completed");
        else updateAriaLiveContent("Great job! Previous step completed");
      }, 1200);
    }
  });
});

// open setup guide section on title click
setupItemTitles.forEach((item, index) => {
  item.addEventListener("click", () => {
    closeActiveSetupGuideSection();
    setupItems[index].classList.add("active");
  });
});
