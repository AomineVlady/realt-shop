"use strict"
import { favoriteProducts, cardsList, getCardContentData, sortBtnList, filterBtn, filterForm } from './common.js';
import { renderCards } from './render-cards.js';

const favoriteListBtn = document.querySelector('#favourites');

export const onCardListFavoriteClick = (evt) => {
    evt.preventDefault();
    const card = getCardContentData(cardsList, evt.currentTarget.closest('.results__item').id);
    !favoriteProducts.includes(card) ? favoriteProducts.push(card) : favoriteProducts.splice(favoriteProducts.indexOf(card), 1);
    !evt.currentTarget.classList.contains('fav-add--active') ?
        evt.currentTarget.classList.add('fav-add--active') : evt.currentTarget.classList.remove('fav-add--active');
    localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));
};

const disabledFields = () => {
    filterBtn.hasAttribute('disabled') ? filterBtn.removeAttribute('disabled') : filterBtn.setAttribute('disabled', 'disabled');
    filterForm.querySelectorAll('input').forEach(item => {
        item.hasAttribute('disabled') ? item.removeAttribute('disabled') : item.setAttribute('disabled', 'disabled');
    });
    sortBtnList.forEach(item => {
        item.hasAttribute('disabled') ? item.removeAttribute('disabled') : item.setAttribute('disabled', 'disabled');
    });
};

favoriteListBtn.addEventListener('change', () => {
    if (favoriteListBtn.checked) {
        disabledFields();
        renderCards(JSON.parse(localStorage.getItem('favoriteProducts')));
        document.querySelectorAll('button.fav-add').forEach(item => item.classList.add('fav-add--active'));
    }
    else {
        disabledFields();
        renderCards(cardsList);
    }
});