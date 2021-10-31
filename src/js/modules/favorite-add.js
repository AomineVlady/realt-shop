"use strict"
import { favoriteProducts, cardsList, sortBtnList, filterBtn, filterForm, getCardContentData} from './common.js';
import { renderCards } from './render-cards.js';

const favoriteListBtn = document.querySelector('#favourites');

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
    const card = getCardContentData(cardsList, parseInt(evt.currentTarget.id.match(/\d+/)).toString());
    !card.favorite ? card.favorite = true : delete card.favorite;
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