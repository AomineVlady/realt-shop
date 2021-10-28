'use strict'

import { renderCards } from './render-cards.js'
import { cardsList, cards,getCopyCardsList } from './common.js'

const getSliderValues = (value) => {
    return value.split(',').map(item => +item);
}

const form = document.forms[0];

const checkCardPrice = (cardPrice, filterPrice) => cardPrice >= filterPrice[0] && cardPrice <= filterPrice[1];
const checkCardType = (cardType, house, flat, apartments,) => {
    if (house || flat || apartments) {
        switch (cardType) {
            case "house":
                return house

            case "flat":
                return flat

            case "apartments":
                return apartments
        }
    }
    else return true;
}

const checkCardRooms = (cardRoomsCount, filterRoomsCount) => {
    switch (filterRoomsCount) {
        case 'one':
            return cardRoomsCount === 1;
        case 'two':
            return cardRoomsCount === 2;
        case 'three':
            return cardRoomsCount === 3;
        case 'four':
            return cardRoomsCount === 4;
        case 'fivemore':
            return cardRoomsCount >= 5;
        default: return true;
    }
}

const retrieveFormValue = (evt) => {
    evt.preventDefault();
    const { sampleSlider, house, flat, apartments, square, rooms } = form;
    const values = {
        sampleSlider: getSliderValues(sampleSlider.value),
        house: house.checked,
        flat: flat.checked,
        apartments: apartments.checked,
        square: +square.value,
        rooms: rooms.value
    }
    document.querySelector('#sort-popular').checked = true;
    let filteredCardsList = cardsList.filter(card => (
        checkCardPrice(card.price, values.sampleSlider) &&
        checkCardType(card.filters.type, values.house, values.flat, values.apartments) &&
        checkCardRooms(card.filters.roomsCount, values.rooms) &&
        card.filters.area >= values.square)
    );
    getCopyCardsList(filteredCardsList);
    renderCards(cards);
};

form.addEventListener('submit', retrieveFormValue);

