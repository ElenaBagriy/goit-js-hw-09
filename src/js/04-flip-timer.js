import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "flatpickr/dist/flatpickr.min.css";
import "notiflix/dist/notiflix-3.2.5.min.css";
import {updateAllSegments} from './beautiful-timer';

const button = document.querySelector('button[data-start]');

button.disabled = true;
let selectedDate;
let intervalId = null;
let counter = 0;

Notify.init({
    width: '400px',
    position: 'center-top',
    showOnlyTheLastOne: true,
    clickToClose: true,
    fontSize: '16px',
});

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
        selectedDate = selectedDates[0];
        checkFutureDate();
    },
};

flatpickr('input#datetime-picker', options);
    
button.addEventListener('click', startCountdown);

function startCountdown() {
    if (counter > 0) {
        return;
    };
    
    intervalId = setInterval(() => {
        counter += 1;
        const currentDate = Date.now();
        const timeLeft = convertMs(selectedDate - currentDate);
        console.log(timeLeft)
        
        updateAllSegments(timeLeft);
    }, 1000);
}

function checkFutureDate() {
    const currentDate = Date.now();
    const isFutureDate = selectedDate - currentDate > 0 ? true : false;

    if (!isFutureDate) {
        Notify.failure('Please choose a date in the future');
        return;
    }
    button.disabled = false;
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.padStart(2, 0);
}
