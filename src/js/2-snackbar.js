import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  form: document.querySelector('.form'),
  delayTime: document.querySelector('input[type="number"]'),
  radioRejected: document.querySelector(
    'input[type="radio"][value="rejected"]'
  ),
  radioFulfilled: document.querySelector(
    'input[type="radio"][value="fulfilled"]'
  ),
  submitBtn: document.querySelector('button[type="submit"]'),
};

elements.form.addEventListener('submit', handleSubmit);

function handleSubmit(evt) {
  evt.preventDefault();
  let inputTime = Number(elements.delayTime.value);
  const selectedOption = elements.radioRejected.checked
    ? 'rejected'
    : 'fulfilled';

  createPromise(inputTime, selectedOption)
    .then(delay => {
      iziToast.success({
        title: 'OK',
        iconUrl: './img/Group1.svg',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: ' #59a10d',
        messageColor: 'white',
        titleColor: 'white',
      });
    })
    .catch(option => {
      iziToast.error({
        title: 'Error',
        iconUrl: './img/Group.svg',
        message: `Illegal operation`,
        position: 'topRight',
        backgroundColor: ' #ef4040',
        messageColor: 'white',
        titleColor: 'white',
      });
    });
}

function createPromise(inputTime, option) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (option === 'fulfilled') {
        resolve(inputTime);
      } else {
        reject(option);
      }
    }, inputTime);
  });
}
