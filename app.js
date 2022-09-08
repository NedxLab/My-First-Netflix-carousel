document.addEventListener("click", e => {
    var handle;
    if(e.target.matches(".handle")) {
        handle = e.target;
    } else {
        handle = e.target.closest(".handle");
    }
     if(handle != null) {
        handleClick(handle);
    }
    document.querySelectorAll(".progress-bar").forEach(changeProgressBar);
})

window.addEventListener("DOMContentLoaded", ()=> {
    document.querySelectorAll(".progress-bar").forEach(changeProgressBar);
})
const throttledProgressBar = throttle(()=> {
    document.querySelectorAll(".progress-bar").forEach(changeProgressBar)
}, 100);
    window.addEventListener("resize", throttledProgressBar);

function changeProgressBar(ProgressBar) {
    ProgressBar.innerHTML = "";
    const slider = ProgressBar.closest(".row").querySelector(".slider");
    const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue("--slider-index"));
    const itemPerScreen = parseInt(getComputedStyle(slider).getPropertyValue("--item-per-screen"));
    const itemCount = slider.children.length;
    const numberOfSlidesOnDisplay = Math.ceil( itemCount / itemPerScreen);
    for( var i = 0; i < numberOfSlidesOnDisplay; i++ ) { 
        const displayBar = document.createElement("div");
        displayBar.classList.add("progress-item");
        if(i === sliderIndex) {
            displayBar.classList.add("active");
        }
        ProgressBar.append(displayBar);
    } 
}


function handleClick(handle) {
    const progressBar = handle.closest('.row').querySelector('.progress-bar');
    const reverseSlider = progressBar.children.length;
    const slider = handle.closest(".container").querySelector(".slider");
    const sliderIndex = parseInt(
        getComputedStyle(slider).getPropertyValue("--slider-index")
    );
    if(handle.classList.contains("left-handle")) {
        slider.style.setProperty("--slider-index", sliderIndex - 1)
        if(sliderIndex <= 0) {
            slider.style.setProperty("--slider-index", 2);
        }
    } 
    else if
    (handle.classList.contains("right-handle")) { 
        slider.style.setProperty("--slider-index", sliderIndex + 1)
        if(sliderIndex + 1 === reverseSlider) {
            slider.style.setProperty("--slider-index", 0);
        }
    }
}

function throttle(cb, delay = 1000) {
    let shouldWait = false
    let waitingArgs
    const timeoutFunc = () => {
      if (waitingArgs == null) {
        shouldWait = false
      } else {
        cb(...waitingArgs)
        waitingArgs = null
        setTimeout(timeoutFunc, delay)
      }
    }
  
    return (...args) => {
      if (shouldWait) {
        waitingArgs = args
        return
      }
  
      cb(...args)
      shouldWait = true
      setTimeout(timeoutFunc, delay)
    }
  }