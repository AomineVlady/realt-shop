'use strict'

import { cardsWrapper, priceTransform, dateTransform, clearHTMLItem, getCardContentData, checkFavoriteCard} from './common.js'
import { fillHTMLTemplates } from './fill-template-wrap.js'
import { onCardListFavoriteClick } from './favorite-add.js'
import { openPopup } from './popup.js'


const sortBtnList = document.querySelectorAll('.sorting__order-tab input[name=sorting-order]');

const getCardsElements = (card) => {
  return `<li class="results__item product" id = "${card.id}">
        <button class="product__favourite fav-add ${checkFavoriteCard(card)}" type="button" aria-label="Добавить в избранное">
          <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="product__image">
          <div class="product__image-more-photo hidden">+2 фото</div>
          <img src="${card.photos[0]}" width="318" height="220" alt="${card.name}">
        </div>
        <div class="product__content">
          <h3 class="product__title">
            <a href="#">${card.name}</a>
          </h3>
          <div class="product__price">${priceTransform(card.price)} ₽</div>
          <div class="product__address">${card.address.city} ${card.address.street} ${card.address.building}</div>
          <div class="product__date">${dateTransform(card.publishDate)}</div>
        </div>
      </li>`;
};



export const renderCards = (cardList) => {
  clearHTMLItem(cardsWrapper);
  for (const card of cardList) {
    fillHTMLTemplates(cardsWrapper, getCardsElements(card));
  }
  
  const onCardClick = (evt) => {
    evt.preventDefault();
    if (evt.target === evt.currentTarget.querySelector('img') || evt.target === evt.currentTarget.querySelector('a')) {
      openPopup(getCardContentData(cardList, evt.currentTarget.id));
    }
  }
  
  const removeEventListenerCards = (cardsItems) => {
    cardsItems.forEach(card => {
      card.removeEventListener('click', onCardClick);
      card.querySelector('button.fav-add').removeEventListener('click', () => onCardListFavoriteClick(event,cardList));
    });
  }
  
  removeEventListenerCards(cardsWrapper.querySelectorAll('.results__item'));

  const addEventListenerCards = (cardsItems) => {
    cardsItems.forEach(card => {
      card.addEventListener('click', onCardClick);
      card.querySelector('button.fav-add').addEventListener('click', () => onCardListFavoriteClick(event,cardList));
    });
  }

  
  
  addEventListenerCards(cardsWrapper.querySelectorAll('.results__item'));
}
