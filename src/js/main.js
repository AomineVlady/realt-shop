'use strict'

import { getResponse } from './modules/backend.js';
import { adapter } from './modules/common.js';
import './modules/fill-template-wrap.js';
import { renderCards } from './modules/render-cards.js';
import { sortingBtnAddEventListeners } from './modules/sorting.js';
import { initPopup } from './modules/popup.js';
import { initFavorite } from './modules/favorite-add.js';
import { initFilters } from './modules/filters.js';

const COUNT_CARDS = 7;
let cardsData = [];

const onError = (errorMessage) => {
    console.log(errorMessage);
};

const initListeners = (cardsData) => {
    renderCards(cardsData);
    initFilters(cardsData);
    initFavorite(cardsData);
    initPopup(cardsData)
    sortingBtnAddEventListeners();
};

const onLoad = (data) => {
    cardsData = adapter(data.products);
    const cardsCount = Math.min(cardsData.length, COUNT_CARDS);
    const cards = cardsData.slice(0, cardsCount);
    initListeners(cards)
};

getResponse(onLoad, onError);