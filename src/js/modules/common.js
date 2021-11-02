"use strict"

import './rSlider.min.js';

export const COUNT_CARDS = 7;
const PRICE_MIN = 2000000;
const PRICE_MAX = 50000000;


const getSliderValues = () => {
    const pricesValues = [];
    for (let i = PRICE_MIN; i < PRICE_MAX + 1; i += 1000) {
        pricesValues.push(i);
    }
    return pricesValues;
}

const mySlider = new rSlider({
    target: '#sampleSlider',
    values: getSliderValues(),
    range: true,
    tooltip: true,
    scale: true,
    labels: true,
    set: [PRICE_MIN, PRICE_MAX],
    step: 1000,
});

export const monthsList = [
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


export const filterForm = document.querySelector('.filter__form');

export const cardsWrapper = document.querySelector('.results__list');

export const clearHTMLItem = item => {
    item.innerHTML = "";
}

export const checkFavoriteCard = (card) => {
    return card.favorite ? " fav-add--active" : "";
}

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);


// const setListCards = () => {
//     const list = [];
//     for (let i = 0; i < COUNT_CARDS; i++) {
//         list.push({
//             card_id: `card_${i}`,
//             name: nameList[getRandomInt(0, nameList.length)],
//             description: descriptionList[getRandomInt(0, descriptionList.length)],
//             price: getRandomInt(PRICE_MIN, PRICE_MAX),
//             category: PRODUCT_CATEGORY,
//             seller: {
//                 fullname: sellerNameList[getRandomInt(0, sellerNameList.length)],
//                 rating: getRandomInt(0, RATING_MAX * 10) / 10,
//             },
//             publishDate: dateNow - (getRandomInt(0, MAX_DAYS_MILLISECONDS)),
//             address: {
//                 city: cityList[getRandomInt(0, cityList.length)],
//                 street: streetList[getRandomInt(0, streetList.length)],
//                 building: getRandomInt(BUILDING_MIN, BUILDING_MAX)
//             },
//             photos: getUrlPhotos(photosUrlList),
//             filters: {
//                 type: filtersTypeList[getRandomInt(0, filtersTypeList.length)],
//                 area: getRandomInt(MIN_COUNT_AREA, MAX_COUNT_AREA),
//                 roomsCount: getRandomInt(1, COUNT_ROOMS),
//             },
//         })
//     }

//     return list;
// };



export const getCardContentData = (list, id) => list.find(item => item.id === id);

export const sortBtnList = document.querySelectorAll('.sorting__order-tab input[name=sorting-order]');

// export let cardsList = []

// const initCards = async () => {
//     cardsList = await getResponse()
//     inintCardsId(cardsList);
//     cards = cardsList.slice(0,COUNT_CARDS);
//     renderCards(cards);
// }

// initCards()

// export let cards = cardsList.slice();

export const getCopyCardsList = arrCards => {
    cards = arrCards.slice();
}
