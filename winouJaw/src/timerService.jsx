class TimerService {
  constructor() {
    this.timeLeft = 0;
    this.isRunning = false;
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.subscribers = [];
    this.timerRef = null;
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  notify() {
    this.subscribers.forEach((callback) => callback(this.getState()));
  }

  getState() {
    return {
      timeLeft: this.timeLeft,
      isRunning: this.isRunning,
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds,
    };
  }

  startTimer() {
    if (!this.isRunning) {
      this.timeLeft = this.hours * 3600 + this.minutes * 60 + this.seconds;
      this.isRunning = true;
      this.notify();
      this.timerRef = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft -= 1;
          this.notify();
        } else {
          this.pauseTimer();
        }
      }, 1000);
    }
  }

  pauseTimer() {
    this.isRunning = false;
    clearInterval(this.timerRef);
    this.notify();
  }

  resetTimer() {
    this.isRunning = false;
    this.timeLeft = 0;
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    clearInterval(this.timerRef);
    this.notify();
  }

  setHours(hours) {
    this.hours = hours;
    this.notify();
  }

  setMinutes(minutes) {
    this.minutes = minutes;
    this.notify();
  }

  setSeconds(seconds) {
    this.seconds = seconds;
    this.notify();
  }
}

export default new TimerService();
