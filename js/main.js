require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import cards from './modules/cards';
import modal from './modules/modal';
import timer from './modules/timer';
import forms from './modules/forms';
import calc from './modules/calc';
import slider from './modules/slider';
import {modalOpen} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => modalOpen('.modal', modalTimerId), 50000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    cards();
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2020-12-31');
    forms('form', modalTimerId);
    calc();
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
});