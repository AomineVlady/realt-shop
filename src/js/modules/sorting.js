'use strict'

import { renderCards } from './render-cards.js';
import { filterDataCopy } from './filters.js';

const sortBtnList = document.querySelectorAll('.sorting__order-tab input[name=sorting-order]');
const debouncTime = 500;

const debouncing = (func) => {
  let timeout;
  return function () {
    const funcSteps = () => { func.apply(this, arguments) }
    clearTimeout(timeout);
    timeout = setTimeout(funcSteps, debouncTime)
  };
}



export const sortingBtnAddEventListeners = () => {
  sortBtnList.forEach(item => {
    item.addEventListener('change', debouncing((evt) => {
      renderCards(sortbyField(evt.target.value));
    }));
  })
}

const sortbyField = (field) => {
  const copyCards = filterDataCopy.slice();
  switch (field) {
    case 'popular':
      return copyCards;
    case 'cheap':
      return copyCards.sort((first, second) => first.price - second.price);
    case 'new':
      return copyCards.sort((first, second) => second.publishDate - first.publishDate);
  }
};

