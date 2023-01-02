import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const delayEl = form.elements['delay'];
const stepEl = form.elements['step'];
const amountEl = form.elements['amount'];
let position = 0;

Notify.init({
  width: '400px',
  timeout: 5000,
});

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  let delay = Number(delayEl.value);
  
  for (let i = 1; i <= amountEl.value; i += 1) {
    position += 1;

    createPromise(position, delay)
      .then(({ position, delay }) => Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`))
      .catch(({ position, delay }) => Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
    
    delay = Number(stepEl.value) + delay;
  }
  form.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}