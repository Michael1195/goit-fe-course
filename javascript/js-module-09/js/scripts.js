"use strict";

class Stopwatch {
  constructor(timers) {
    this.timers = timers;
    this.timerId = null;
    this.deltaTime = null;
    this.arrTimer = [];
    this.timerDiv();
  }

  timerDiv() {
    const timerDiv = document.createElement("div");
    timerDiv.classList.add("timer");

    const stopwatchDiv = document.createElement("div");
    stopwatchDiv.classList.add("stopwatch");

    const p = document.createElement("p");
    p.classList.add("time");
    p.classList.add("js-time");
    p.textContent = "00:00.0";

    const btnStart = document.createElement("button");
    btnStart.classList.add("btn");
    btnStart.classList.add("js-start");
    btnStart.textContent = "Start";

    const btnLap = document.createElement("button");
    btnLap.classList.add("btn");
    btnLap.classList.add("js-take-lap");
    btnLap.textContent = "Lap";

    const btnReset = document.createElement("button");
    btnReset.classList.add("btn");
    btnReset.classList.add("js-reset");
    btnReset.classList.add("active-res");
    btnReset.setAttribute("disabled", "disabled");
    btnReset.textContent = "Reset";

    stopwatchDiv.append(p, btnStart, btnLap, btnReset);

    timerDiv.appendChild(stopwatchDiv);

    const ulLaps = document.createElement("ul");
    ulLaps.classList.add("laps");
    ulLaps.classList.add("js-laps");

    timerDiv.appendChild(ulLaps);
    this.timers.appendChild(timerDiv);

    btnStart.addEventListener(
      "click",
      this.startTimer.bind(this, p, btnStart, btnReset)
    );

    btnReset.addEventListener(
      "click",
      this.stopTimer.bind(this, p, btnStart, btnReset)
    );

    btnLap.addEventListener(
      "click",
      this.addTimerUl.bind(this, btnLap, ulLaps)
    );
  }

  startTimer(p, btnStart, btnReset) {
    btnReset.removeAttribute("disabled");
    btnReset.classList.remove("active-res");
    btnStart.classList.add("active");

    if (btnStart.textContent === "Pause") {
      btnStart.textContent = "Continue";
      clearInterval(this.timerId);
      return;
    }

    let startTime = Date.now();

    if (btnStart.textContent === "Continue") {
      startTime = Date.now() - this.deltaTime;
    }
    btnStart.textContent = "Pause";

    this.timerId = setInterval(
      this.updateClockface.bind(this),
      100,
      p,
      startTime
    );
  }

  updateClockface(p, startTime) {
    const currentTime = Date.now();
    this.deltaTime = currentTime - startTime;
    const time = new Date(this.deltaTime);
    p.textContent = this.updateContent(time);
  }

  updateContent(time) {
    let min = time.getMinutes();
    let sec = time.getSeconds();
    const ms = Number.parseInt(time.getMilliseconds() / 100);
    if (min < 10) {
      min = 0 + `${min}`;
    }
    if (sec < 10) {
      sec = 0 + `${sec}`;
    }

    return `${min}:${sec}.${ms}`;
  }

  stopTimer(p, btnStart, btnReset) {
    clearInterval(this.timerId);
    this.timerId = null;
    this.deltaTime = null;
    p.textContent = "00:00.0";
    btnStart.classList.remove("active");
    btnStart.textContent = "Start";
    btnReset.classList.add("active-res");
    btnReset.setAttribute("disabled", "disabled");
  }

  addTimerUl(btnLap, ulLaps) {
    btnLap.classList.add("active");
    setTimeout(() => {
      btnLap.classList.remove("active");
    }, 100);
    const timeLi = new Date(this.deltaTime);

    const t = this.updateContent(timeLi);

    this.arrTimer.push(t);
    const li = document.createElement("li");
    li.textContent = t;
    ulLaps.appendChild(li);
  }
}

const timers = document.querySelector(".js-timers");

const tike1 = new Stopwatch(timers);
const tike2 = new Stopwatch(timers);
