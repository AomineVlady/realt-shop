"use strict"

import './rSlider.min.js';

const COUNT_CARDS = 7;
const COUNT_PHOTOS_MAX = 4;
const COUNT_PHOTOS_MIN = 1;
const COUNT_ROOMS = 7;
const MIN_COUNT_AREA = 30;
const MAX_COUNT_AREA = 250;
const BUILDING_MAX = 40;
const BUILDING_MIN = 1;
const RATING_MAX = 5;
const PRICE_MIN = 250000;
const PRICE_MAX = 2000000;
const PRODUCT_CATEGORY = "Недвижимость";
const MAX_DAYS_MILLISECONDS = 432000000;

const nameList = [
    'Двушка в центре Питера',
    'Однушка в спальнике Питера',
    'Трешка рядом с Кремлём',
    'Студия для аскетов',
    'Апартаменты для фрилансера'
];

const descriptionList = [
    'Студия с лаконичным дизайном возле Ангары.',
    'Трёхкомнатная квартира для большой семьи рядом с Кремлём.',
    '2 минуты до набережной и прекрасного вида на Волгу.',
    'В квартире есть сауна, джакузи и домашний кинотеатр. Перепланировка согласована.',
    'Уютная однушка в тихом спальном районе. Рядом лес и озёра.'
];

const sellerNameList = [
    'Бюро Семёна',
    'Игнат-Агент',
    'Виталий Петрович',
    'Марья Андреевна'
];

const cityList = [
    'Иркутск',
    'Москва',
    'Красноярск',
    'Минск',
];

const streetList = [
    'ул. Шахтеров',
    'ул. Полярная',
    'ул. Лиственная',
    'ул. Мира',
    'ул. Советская'
];

const filtersTypeList = [
    'house',
    'flat',
    'apartments'
];

const photosUrlList = [
    "img/apt_1.png",
    "img/apt_2.png",
    "img/apt_3.png",
    "img/apt_4.png",
    "img/apt_5.png",
    "img/apt_6.png",
    "img/house_1.png",
    "img/house_2.png",
    "img/house_3.png",
    "img/house_4.png"
];

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
    const dateDifference = dateNow - arg;
    const day = 86400000;
    if (dateDifference <= day) {
        return "Сегодня";
    }
    if (dateDifference > day && dateDifference <= day * 2) {
        return "Вчера"
    }
    else {
        const resultDate = new Date(arg);

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

export const popup = document.querySelector('.popup');
export const filterBtn = document.querySelector('.filter__button');
export const filterForm = document.querySelector('.filter__form');

export const cardsWrapper = document.querySelector('.results__list');

localStorage.clear();
export const favoriteProducts = [];
localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));

export const clearHTMLItem = item => {
    item.innerHTML = "";
}

export const checkFavoriteCard = (card) => {
    return card.favorite ? " fav-add--active" : "";
}

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

const getUrlPhotos = (arr) => {
    const urls = [];
    const count = getRandomInt(COUNT_PHOTOS_MIN, COUNT_PHOTOS_MAX);
    while (urls.length !== count) {
        const rndElem = arr[getRandomInt(0, arr.length)];
        if (!urls.includes(rndElem)) {
            urls.push(rndElem);
        };
    };

    return urls;
};

const setListCards = () => {
    const list = [];
    for (let i = 0; i < COUNT_CARDS; i++) {
        list.push({
            card_id: `card_${i}`,
            name: nameList[getRandomInt(0, nameList.length)],
            description: descriptionList[getRandomInt(0, descriptionList.length)],
            price: getRandomInt(PRICE_MIN, PRICE_MAX),
            category: PRODUCT_CATEGORY,
            seller: {
                fullname: sellerNameList[getRandomInt(0, sellerNameList.length)],
                rating: getRandomInt(0, RATING_MAX * 10) / 10,
            },
            publishDate: dateNow - (getRandomInt(0, MAX_DAYS_MILLISECONDS)),
            address: {
                city: cityList[getRandomInt(0, cityList.length)],
                street: streetList[getRandomInt(0, streetList.length)],
                building: getRandomInt(BUILDING_MIN, BUILDING_MAX)
            },
            photos: getUrlPhotos(photosUrlList),
            filters: {
                type: filtersTypeList[getRandomInt(0, filtersTypeList.length)],
                area: getRandomInt(MIN_COUNT_AREA, MAX_COUNT_AREA),
                roomsCount: getRandomInt(1, COUNT_ROOMS),
            },
        })
    }

    return list;
};

export const sortBtnList = document.querySelectorAll('.sorting__order-tab input[name=sorting-order]');

export const cardsList = setListCards();
export let cards = cardsList.slice();

export const getCopyCardsList = arrCards => {
    cards = arrCards.slice(); 
}

export const getCardContentData = (list, id) => {
    for (let item of list) {
        if (item.card_id === id) {
            return item;
        }
    }
}