'use strict'

import { renderCards } from './render-cards.js';
import { filterDataCopy } from './filters.js';
import { debouncing } from './common.js';

const sortBtnList = document.querySelectorAll('.sorting__order-tab input[name=sorting-order]');
export let sortedDataCopy = [];


export const sortingBtnAddEventListeners = () => {
  sortBtnList.forEach(item => {
    item.addEventListener('change', debouncing((evt) => {
      sortedDataCopy = sortbyField(evt.target.value);
      renderCards(sortedDataCopy);
    }));
  })
}

const sortbyField = (field) => {
  const copyCards = filterDataCopy.slice();
  switch (field) {
    case 'popular': return copyCards;
    case 'cheap': return copyCards.sort((first, second) => first.price - second.price);
    case 'new': return copyCards.sort((first, second) => second.publishDate - first.publishDate);
  }
};

