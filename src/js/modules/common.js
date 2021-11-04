"use strict"

import './rSlider.min.js';

const PRICE_MIN = 2000000;
const PRICE_MAX = 50000000;
const SLIDER_STEP = 1000;

const setSliderValues = () => {
    const pricesValues = [];
    for (let i = PRICE_MIN; i < PRICE_MAX + 1; i += SLIDER_STEP) {
        pricesValues.push(i);
    }
    return pricesValues;
}

const mySlider = new rSlider({
    target: '#sampleSlider',
    values: setSliderValues(),
    range: true,
    tooltip: true,
    scale: true,
    labels: true,
    set: [PRICE_MIN, PRICE_MAX],
    step: SLIDER_STEP,
});


const monthsList = [
    'Января', 'Февраля', 'Марта',
    'Апереля', 'Мая', 'Июня',
    'Июля', 'Августа', 'Сентября',
    'Октября', 'Ноября', 'Декабря'
];

const dateNow = Date.now();

export const dateTransform = (arg) => {
    const dateDifference = dateNow - +arg;
    const day = 86400000;
    if (dateDifference <= day) {
        return "Сегодня";
    }
    if (dateDifference > day && dateDifference <= day * 2) {
        return "Вчера"
    }
    else {
        const resultDate = new Date(+arg);

        return `${resultDate.getDate()} ${monthsList[resultDate.getUTCMonth()]} ${resultDate.getFullYear()}`
    }
}

export const priceTransform = (arg) => {
    const argString = arg.toString().split('');
    if (argString.length > 3) {
        for (let i = argString.length - 4; i >= 0; i -= 3) {
            argString[i] += " ";
        }
    }
    return argString.join('');
};

export const adapter = (cards) => {
    const cardsList = []
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        cardsList.push({
            id: `card_${i}`,
            favorite: false,
            name: card.name,
            description: card.description,
            price: card.price,
            category: card.category,
            coordinates: card.coordinates,
            seller: {
                fullname: card.seller.fullname,
                rating: card.seller.rating,
            },
            publishDate: +card['publish-date'],
            address: {
                city: card.address.city,
                street: card.address.street,
                building: card.address.building,
            },
            photos: card.photos,
            filters: {
                type: card.filters.type,
                area: card.filters.area,
                roomsCount: card.filters['rooms-count'],
            },
        })
    }
    return cardsList;
}

export const clearHTMLItem = item => {
    item.innerHTML = "";
}

export const checkFavoriteCard = (card) => {
    return card.favorite ? " fav-add--active" : "";
}

export const getCardContentData = (list, id) => list.find(item => item.id === id);
