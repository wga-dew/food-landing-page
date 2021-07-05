function modalOpen(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function modalClose(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    //============== Modals ==============//

    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            modalOpen(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => modalOpen(modalSelector, modalTimerId));
    });


    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            modalClose(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            modalClose(modalSelector);
        }
    });

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {modalOpen};
export {modalClose};
