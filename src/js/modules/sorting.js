'use strict'

import { cards } from './common.js';
import { renderCards } from './render-cards.js';

const sortBtnList = document.querySelectorAll('.sorting__order-tab input[name=sorting-order]');

sortBtnList.forEach(item => {
  item.addEventListener('change', (evt) => {
    renderCards(sortbyField(evt.target.value));
  });
})

export const sortbyField = (field) => {
  const copyCards = cards.slice();
  switch (field) {
    case 'popular':
      return copyCards;
    case 'cheap':
      return copyCards.sort((first, second) => first.price - second.price);
    case 'new':
      return copyCards.sort((first, second) => second['publish-date'] - first['publish-date']);
  }
};