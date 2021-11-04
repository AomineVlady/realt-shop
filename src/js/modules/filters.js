'use strict'

import { renderCards } from './render-cards.js'

const form = document.querySelector('.filter__form');
let filterData = [];
export let filterDataCopy = [];

const getSliderValues = (value) => {
    return value.split(',').map(item => +item);
}

const checkCardPrice = (cardPrice, filterPrice) => cardPrice >= filterPrice[0] && cardPrice <= filterPrice[1];

const checkCardType = (cardType, house, flat, apartments) => {
    if (house || flat || apartments) {
        switch (cardType) {
            case "house":
                return house

            case "flat":
                return flat

            case "apartment":
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

const getFiltersData = () => {
    const { sampleSlider, house, flat, apartments, square, rooms } = form;
    const values = {
        sampleSlider: getSliderValues(sampleSlider.value),
        house: house.checked,
        flat: flat.checked,
        apartments: apartments.checked,
        square: +square.value,
        rooms: rooms.value
    }

    return values;
}

const filtredCardsList = (evt) => {
    evt.preventDefault();
    const filteredrData = getFiltersData();
    document.querySelector('#sort-popular').checked = true;
    const filteredData = filterData.filter(card => (
        checkCardPrice(card.price, filteredrData.sampleSlider) &&
        checkCardType(card.filters.type, filteredrData.house, filteredrData.flat, filteredrData.apartments) &&
        checkCardRooms(card.filters.roomsCount, filteredrData.rooms) &&
        card.filters.area >= filteredrData.square)
    );
    filterDataCopy = filteredData;
    renderCards(filteredData);
};



const initListener = () => {
    form.addEventListener('submit', filtredCardsList);
};

export const initFilters = (cardsData) => {
    filterData = cardsData;
    filterDataCopy = filterData.slice();
    initListener();
};