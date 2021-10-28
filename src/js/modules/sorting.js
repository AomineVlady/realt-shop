'use strict'

import { cardsList,sortBtnList } from './common.js';
import { renderCards } from './render-cards.js';


sortBtnList.forEach(item => {
  item.addEventListener('change', (evt) => {
    renderCards(sortbyField(evt.target.value));
  });
})

export const sortbyField = (field) => {
  const copyDataList = cardsList.slice();
  switch (field) {
    case 'popular':
      return copyDataList;
    case 'cheap':
      return copyDataList.sort((first, second) => first.price - second.price);
    case 'new':
      return copyDataList.sort((first, second) => second.publishDate - first.publishDate);
  }
};