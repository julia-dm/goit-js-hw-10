import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  dataPicker: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
        //   backgroundColor: 'red',
        //   messageColor: 'white',
      });
    } else {
      elements.startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);
document.addEventListener('DOMContentLoaded', function () {
  elements.startBtn.disabled = true;
});
elements.startBtn.addEventListener('click', clickBtn);

function clickBtn() {
  if (!selectedDate) {
    iziToast.error({
      message: 'Please select a date first',
      position: 'topRight',
      icon: '',
    });
    return;
  }

  const interval = setInterval(() => {
    const defaultDate = new Date();
    const diffTime = selectedDate - defaultDate;

    if (diffTime <= 0) {
      clearInterval(interval);
      elements.days.textContent = '00';
      elements.hours.textContent = '00';
      elements.minutes.textContent = '00';
      elements.seconds.textContent = '00';
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(diffTime);

    elements.days.textContent = formating(days);
    elements.hours.textContent = formating(hours);
    elements.minutes.textContent = formating(minutes);
    elements.seconds.textContent = formating(seconds);
  }, 1000);
}
function formating(numbers) {
  return numbers.toString().padStart(2, '0');
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
