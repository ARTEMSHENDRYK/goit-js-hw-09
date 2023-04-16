import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputDTPRef = document.querySelector("#datetime-picker");
const startBtnRef = document.querySelector("[data-start]");
const daysRef = document.querySelector("[data-days]");
const hoursRef = document.querySelector("[data-hours]");
const minutesRef = document.querySelector("[data-minutes]");
const secondsRef = document.querySelector("[data-seconds]");

// Об'єкт параметрів flatpickr. В методі onClose перевіряємо дату на валіднісь та активуємо button Start
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      startBtnRef.disabled = true;
      Notify.failure("Please choose a date in the future");
    }
    else {
      startBtnRef.disabled = false;
      Notify.success("Click [Start] to countdown");
    }
  },
};

const fp = new flatpickr(inputDTPRef, options);
let timerId = 0;

startBtnRef.disabled = true;

startBtnRef.addEventListener("click", countDown);

function countDown(evt) {
  let countDownTime = fp.selectedDates[0] - Date.now();

  clearInterval(timerId);
  startBtnRef.disabled = true;
  timerId = setInterval(() => {
    countDownTime -= 1000; 

    if (countDownTime <= 0) {
      clearInterval(timerId);
      Notify.warning("The End!");
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(countDownTime); 
    secondsRef.textContent = addLeadingZero(seconds);        
    minutesRef.textContent = addLeadingZero(minutes);
    hoursRef.textContent = addLeadingZero(hours);
    daysRef.textContent = addLeadingZero(days);
  }, 1000);  
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}