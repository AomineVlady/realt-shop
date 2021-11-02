'use strict'

import { getResponse } from './modules/backend.js';
import { COUNT_CARDS, adapter } from './modules/common.js';
import './modules/fill-template-wrap.js';
import { renderCards } from './modules/render-cards.js';
import './modules/sorting.js';
import './modules/popup.js';
import './modules/favorite-add.js';
import './modules/filters.js';
import './modules/map.js'


export let cardsData = [];

const onError = (errorMessage) => {
    console.log(errorMessage);
};

const onLoad = (data) => {
    cardsData = adapter(data.products);
    const cards = cardsData.slice(0, COUNT_CARDS);
    // const setFavoriteCard = (id) => {
    //     cardsData[id].favorite = !cardsData[id].favorite
    //     return cardsData;
    // }
    renderCards(cards);
};

getResponse(onLoad, onError);



//common file - useless cuz all function needs in import is here
//здесь все common переменные , 
//из модуля экспортируеться только 1 функция. здесь вызов 

//её же везде вызывать и в кдике по favorite
//в рендер крточки передавать два параметра для отрисовки карточки (картЛист и setFavorite -- для )
//вызов рендер здесь 