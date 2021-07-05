import {modalClose, modalOpen} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    //============== Forms ==============//

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так!'
    }

    forms.forEach(form => {
        bindPostData(form);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            // // Способ с XMLHttpRequest
            // const req = new XMLHttpRequest();
            // req.open('POST', 'server.php');


            // // При связке XMLHttpRequest + FormData нам заголовок устонавливать не нужно, он станет автоматически
            // // Для FormData
            // req.setRequestHeader('Content-type','multipart/form-data');
            // // Для JSON
            // req.setRequestHeader('Content-type', 'application/json');

            // Для FormData || Для JSON
            const formData = new FormData(form);

            // // Для JSON
            // const object = {};
            // formData.forEach((value, key) => {
            //     object[key] = value;
            // });
            // VS
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // // Для FormData
            // req.send(formData);

            // // Для JSON
            // req.send(json);

            // Способ с Fetch API
            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                    statusMessage.remove();
                });

            // // Способ с XMLHttpRequest
            // req.addEventListener('load', () => {
            //     if (req.status === 200) {
            //         showThanksModal(message.success);
            //         form.reset();
            //         statusMessage.remove();
            //     } else {
            //         showThanksModal(`${message.failure} ${req.statusText} ${req.status} `);
            //     }
            // });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        prevModalDialog.classList.remove('show');
        modalOpen('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            modalClose('.modal');
        }, 3000);
    }
}

export default forms;