'use strict'

import { cardsData } from '../main.js';
import './common.js';
import { renderCards } from './render-cards.js';

const sortBtnList = document.querySelectorAll('.sorting__order-tab input[name=sorting-order]');
const debouncTime = 500;
const debouncing = (func) => {
  let timeout;
  return function(){
    const funcSteps = () => { func.apply(this,arguments) }
    clearTimeout(timeout);
    timeout = setTimeout(funcSteps, debouncTime)
  };
}

sortBtnList.forEach(item => {
  item.addEventListener('change', debouncing((evt) => {
    renderCards(sortbyField(evt.target.value));
  }));
})

export const sortbyField = (field) => {
  const copyCards = cardsData.slice();
  switch (field) {
    case 'popular':
      return copyCards;
    case 'cheap':
      return copyCards.sort((first, second) => first.price - second.price);
    case 'new':
      return copyCards.sort((first, second) => second['publish-date'] - first['publish-date']);
  }
};

