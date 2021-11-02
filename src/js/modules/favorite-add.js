"use strict"
import { sortBtnList, filterForm, getCardContentData} from './common.js';
import { renderCards } from './render-cards.js';

localStorage.clear();
export let favoriteProducts = [];
localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));

const favoriteListBtn = document.querySelector('#favourites');
const filterBtn = document.querySelector('.filter__button');

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
    const card = getCardContentData(cardsList, evt.currentTarget.id);
    !card.favorite ? card.favorite = true : card.favorite = false;
    setfavoriteCardsList(card);
    favAddBtnClassListToggle(evt.currentTarget);

    favoriteListBtn.addEventListener('change', () => {
        if (favoriteListBtn.checked) {
            toggleBlockFields();
            renderCards(JSON.parse(localStorage.getItem('favoriteProducts')));
        }
        else {
            toggleBlockFields();
            renderCards(cardsList);
        }
    });
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

