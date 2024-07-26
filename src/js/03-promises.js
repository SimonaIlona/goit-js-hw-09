import Notiflix from 'notiflix';

const form = document.querySelector(".form");

form.addEventListener("submit", onSubmitForm);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve({position, delay});
        } else {
          reject({position, delay});
        }
    }, delay);
  });
};

function onSubmitForm(entry) {
  entry.preventDefault();
  let delay = Number(form.delay.value);

  for (let i = 1; i <= form.amount.value; i++) {
    createPromise(i, delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  delay += Number(form.step.value);  
  };
};