"use strict";
class CountdownTimer {
  constructor(selector, targetDate) {
    this.refs = {
      spanDays: document.querySelector('span[data-value="days"]'),
      spanHours: document.querySelector('span[data-value="hours"]'),
      spanMins: document.querySelector('span[data-value="mins"]'),
      spanSecs: document.querySelector('span[data-value="secs"]'),
    };
    this.selector = selector;
    this.targetDate = new Date(targetDate).getTime();
    this.leftTime = this.targetDate - new Date().getTime();
    this.days = Math.floor(this.leftTime / (1000 * 60 * 60 * 24));
    this.hours = Math.floor(
      (this.leftTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    this.mins = Math.floor((this.leftTime % (1000 * 60 * 60)) / (1000 * 60));
    this.secs = Math.floor((this.leftTime % (1000 * 60)) / 1000);
    this.refs.spanDays.textContent = this.days;
    this.refs.spanSecs.textContent = this.secs;
    this.refs.spanHours.textContent = this.hours;
    this.refs.spanMins.textContent = this.mins;
    this.timerId = null;
  }

  start() {
    this.timerId = setInterval(() => {
      if (this.leftTime > 1000) this.leftTime -= 1000;
      else this.stop();

      const secsLeft = Math.floor((this.leftTime % (1000 * 60)) / 1000);
      const minsLeft = Math.floor(
        (this.leftTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const hoursLeft = Math.floor(
        (this.leftTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const daysLeft = Math.floor(this.leftTime / (1000 * 60 * 60 * 24));
      this.refs.spanSecs.textContent = secsLeft.toString().padStart(2, "0");
      this.refs.spanMins.textContent = minsLeft.toString().padStart(2, "0");
      this.refs.spanHours.textContent = hoursLeft.toString().padStart(2, "0");
      this.refs.spanDays.textContent = daysLeft.toString().padStart(2, "0");
    }, 1000);
  }

  stop() {
    clearInterval(this.timerId);
  }
}

const timer = new CountdownTimer("#timer-1", "Aug 27, 2020");
timer.start();
