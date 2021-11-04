"use strict"
import { getCardContentData } from './common.js';
import { renderCards } from './render-cards.js';

const favoriteListBtn = document.querySelector('#favourites');
const filterForm = document.querySelector('.filter__form');
const sortBtnList = document.querySelectorAll('.sorting__order-tab input[name=sorting-order]');
const filterBtn = document.querySelector('.filter__button');

localStorage.clear();
let cardsList = []
let favoriteProducts = []; //fors localStorage
localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));

const setfavoriteCardsList = card => {
    !favoriteProducts.includes(card) ?
        favoriteProducts.push(card) :
        favoriteProducts.splice(favoriteProducts.indexOf(card), 1);
    localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));
};

const favAddBtnClassListToggle = btn => {
    !btn.classList.contains('fav-add--active') ?
        btn.classList.add('fav-add--active') :
        btn.classList.remove('fav-add--active');
}

export const onCardListFavoriteClick = (evt) => {
    evt.preventDefault();
    const card = getCardContentData(cardsList, evt.currentTarget.closest('.js-data-wrap').getAttribute('data-id'));
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
        const favoriteCards = JSON.parse(localStorage.getItem('favoriteProducts'));
        if (favoriteListBtn.checked && favoriteCards.length != 0) {
            toggleBlockFields();
            renderCards(favoriteCards);
        }
        else {
            toggleBlockFields();
            renderCards(cardsList);
        }
    });
};

export const initFavorite = (cardsData) => {
    cardsList = cardsData;
    initListener();
};