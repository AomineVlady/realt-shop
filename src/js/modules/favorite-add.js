"use strict"
import { getCardContentData} from './common.js';
import { renderCards } from './render-cards.js';

const favoriteListBtn = document.querySelector('#favourites');
const filterForm = document.querySelector('.filter__form');
const sortBtnList = document.querySelectorAll('.sorting__order-tab input[name=sorting-order]');
const filterBtn = document.querySelector('.filter__button');

localStorage.clear();
let favoriteProducts = [];
localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));

const setfavoriteCardsList = card => {
    !favoriteProducts.includes(card) ?
     favoriteProducts.push(card) :
      favoriteProducts.splice(favoriteProducts.indexOf(card), 1);
      localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));
};

const favAddBtnClassListToggle = btn =>  {
    !btn.classList.contains('fav-add--active') ?
     btn.classList.add('fav-add--active') :
      btn.classList.remove('fav-add--active');
}

export const onCardListFavoriteClick = (evt) => {
    evt.preventDefault();
    const card = getCardContentData(favoriteProducts, evt.currentTarget.getAttribute('data-id'));
    // need fixed. Here have a err.
    !card.favorite ? card.favorite = true : card.favorite = false;
    setfavoriteCardsList(card);
    favAddBtnClassListToggle(evt.currentTarget);
};

const toggleBlockFields = () => {
    filterBtn.hasAttribute('disabled') ? filterBtn.removeAttribute('disabled') :
     filterBtn.setAttribute('disabled', 'disabled');
    filterForm.querySelectorAll('input').forEach(item => {
        item.hasAttribute('disabled') ? item.removeAttribute('disabled') :
         item.setAttribute('disabled', 'disabled');
    });
    sortBtnList.forEach(item => {
        item.hasAttribute('disabled') ? item.removeAttribute('disabled') :
         item.setAttribute('disabled', 'disabled');
    });
};

const initListener = () => {
    favoriteListBtn.addEventListener('change', () => {
        if (favoriteListBtn.checked) {
            toggleBlockFields();
            renderCards(JSON.parse(localStorage.getItem('favoriteProducts')));
        }
        else {
            toggleBlockFields();
            renderCards(favoriteProducts);
        }
    });   
};
     
export const initFavorite = (cardsData) => {
    favoriteProducts = cardsData;
    initListener();
};