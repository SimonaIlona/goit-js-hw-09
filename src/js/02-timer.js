import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const daysSpan = document.querySelector('span[data-days]');
const hoursSpan = document.querySelector('span[data-hours]');
const minutesSpan = document.querySelector('span[data-minutes]');
const secondsSpan = document.querySelector('span[data-seconds]');

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

startBtn.disabled = true;
let timerID = null;

const onTimerStart = () => {
  const selectedDate = flatpickrFn.selectedDates[0];

  timerID = setInterval(() => {
    const start = new Date();
    const countdown = selectedDate - start;
    startBtn.disabled = true;
    if (countdown < 0) {
      clearInterval(timerID);
      return;
    }
    const m = convertMs(countdown);
    updateLivePage(m);
  }, 1000);
};

const updateLivePage = ({ days, hours, minutes, seconds }) => {
  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
};

startBtn.addEventListener('click', onTimerStart);

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onChange(selectedDates) {
    console.log(selectedDates[0]);
    const currentDate = new Date();
    if (selectedDates[0] < currentDate) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};

const flatpickrFn = flatpickr('#datetime-picker', options);
