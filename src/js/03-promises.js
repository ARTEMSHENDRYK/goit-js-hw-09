import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('form');

formRef.addEventListener('submit', onSubmit);

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

function onSubmit(e) {
  e.preventDefault();

  let delayForm = Number(formRef.delay.value);
  const step = Number(formRef.step.value);
  const amount = formRef.amount.value;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delayForm)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });

    delayForm += step;
  }
}