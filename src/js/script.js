"use strict"

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

const dateNow = Date.now();

const monthsList = [
  'Января', 'Февраля', 'Марта',
  'Апереля', 'Мая', 'Июня',
  'Июля', 'Августа', 'Сентября',
  'Октября', 'Ноября', 'Декабря'
];

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
  'Дом',
  'Апартаменты',
  'Квартира'
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

const cardsWrapper = document.querySelector('.results__list');
const popup = document.querySelector('.popup');
const sortBtnList = document.querySelectorAll('.sorting__order-tab input[name=sorting-order]');

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

const getUrlPhotos = (arr) => {
  let urls = [];
  let count = getRandomInt(COUNT_PHOTOS_MIN, COUNT_PHOTOS_MAX);
  while (urls.length !== count) {
    let rndElem = arr[getRandomInt(0, arr.length)];
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

const cardsList = setListCards();

var mySlider = new rSlider({
  target: '#sampleSlider',
  values: [10000, 1000000],
  range: true,
  tooltip: true,
  scale: true,
  labels: false,
  step: 10000
});

const priceTransform = (arg) => {
  const argString = arg.toString().split('');
  if (argString.length > 3) {
    for (let i = argString.length - 4; i >= 0; i -= 3) {
      argString[i] += " ";
    }
  }
  return argString.join('');
};

const dateTransform = (arg) => {
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

const getCardContentData = (list, id) => {
  for (let item of list) {
    if (item.card_id === id) {
      return item;
    }
  }
}

const getTamplateTag = (tagText) => {
  const div = document.createElement('div');
  div.insertAdjacentHTML('beforeend', tagText);
  return div.firstElementChild;
}

const clearHTMLItem = item => {
  item.innerHTML = "";
}

const fillHTMLTemplates = (wrapper, template) => {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(getTamplateTag(template));
  wrapper.appendChild(fragment);
}

const checkEmptyContent = (content,data) => {
  return (data == null || data == "") ? "" : content;
} 

const getCardsElements = (card) => {
  return `<li class="results__item product" id = "${card.card_id}">
      <button class="product__favourite fav-add" type="button" aria-label="Добавить в избранное">
        <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="product__image">
        <div class="product__image-more-photo hidden">+2 фото</div>
        <img src="${card.photos[0]}" width="318" height="220" alt="${card.name}">
      </div>
      <div class="product__content">
        <h3 class="product__title">
          <a href="#">${card.name}</a>
        </h3>
        <div class="product__price">${priceTransform(card.price)} ₽</div>
        <div class="product__address">${card.address.city} ${card.address.street} ${card.address.building}</div>
        <div class="product__date">${dateTransform(card.publishDate)}</div>
      </div>
    </li>`;
};

const cardClick = (evt) => {
  if (evt.target === evt.currentTarget.querySelector('img') || evt.target === evt.currentTarget.querySelector('a')) {
    evt.preventDefault();
    openPopup(getCardContentData(cardsList, evt.currentTarget.id));
  }
}

const addEventListenerCards = cardsItems => {
  cardsItems.forEach(card => {
    card.addEventListener('click', cardClick)
  });
}

const removeEventListenerCards = cardsItems => {
  cardsItems.forEach(card => {
    card.removeEventListener('click', cardClick)
  });
}

const renderCards = (cardList) => {
  removeEventListenerCards(cardsWrapper.querySelectorAll('.results__item'));
  clearHTMLItem(cardsWrapper);
  for (const card of cardList) {
    fillHTMLTemplates(cardsWrapper, getCardsElements(card));
  }
  addEventListenerCards(cardsWrapper.querySelectorAll('.results__item'));
}

const sortbyField = (field) => {
  const copyDataList = cardsList.slice();
  switch (field) {
    case 'popular':
      return copyDataList;
    case 'cheap':
      return copyDataList.sort((first, second) => first.price - second.price);
    case 'new':
      return copyDataList.sort((first, second) => second.publishDate - first.publishDate);
  }
}

renderCards(cardsList);

sortBtnList.forEach(item => {
  item.addEventListener('change', (evt) => {
    renderCards(sortbyField(evt.target.value));
  });
})

const getPhotoList = (list, name) => {
  let result = '';
  for (let i = 1; i < list.length; i++) {
    result += `
  <li class="gallery__item">
    <img src="${list[i]}" width="124" height="80" alt="${name}">
  </li>`;
  }
  return result;
}

const getPopupElement = (data) => {
  return `
  <div class = "popup__inner">
    <button class="popup__close" type="button" aria-label="Закрыть">
      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L8 6.58579L14.2929 0.292893C14.6834 -0.0976311 15.3166 -0.0976311 15.7071 0.292893C16.0976 0.683418 16.0976 1.31658 15.7071 1.70711L9.41421 8L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8 9.41421L1.70711 15.7071C1.31658 16.0976 0.683418 16.0976 0.292893 15.7071C-0.0976311 15.3166 -0.0976311 14.6834 0.292893 14.2929L6.58579 8L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893Z"/>
      </svg>
    </button>
    <div class="popup__date">${dateTransform(data.publishDate)}</div>
    <h3 class="popup__title">${data.name}</h3>
    <div class="popup__price">${priceTransform(data.price)} ₽</div>
    <div class="popup__columns">
      <div class="popup__left">
        <div class="popup__gallery gallery">
          <button class="gallery__favourite fav-add">
            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="gallery__main-pic">
            <img src="${data.photos[0]}" width="520" height="340" alt="${data.name}">
          </div>
          <ul class="gallery__list">
            <li class="gallery__item gallery__item--active">
              <img src="${data.photos[0]}" width="124" height="80" alt="${data.name}">
            </li>
            ${getPhotoList(data.photos, data.name)}
          </ul>
        </div>
        <ul class="popup__chars chars">
          ${checkEmptyContent(`<li class="chars__item">
            <div class="chars__name">Площадь</div>
            <div class="chars__value">${data.filters.area}</div>
          </li>`, data.filters.area)}
          ${checkEmptyContent(`<li class="chars__item">
            <div class="chars__name">Количество комнат</div>
            <div class="chars__value">${data.filters.roomsCount}</div>
          </li>`, data.filters.roomsCount)}
          ${checkEmptyContent(`<li class="chars__item">
            <div class="chars__name">Тип недвижимости</div>
            <div class="chars__value">${data.filters.type}</div>
          </li>`,data.filters.type)}
        </ul>
        <div class="popup__seller seller seller--good">
          <h3>Продавец</h3>
          <div class="seller__inner">
            <a class="seller__name" href="#">${data.seller.fullname}</a>
            <div class="seller__rating"><span>${data.seller.rating}</span></div>
          </div>
        </div>
        <div class="popup__description">
          <h3>Описание товара</h3>
          <p>${data.description}</p>
        </div>
      </div>
      <div class="popup__right">
        <div class="popup__map">
          <img src="img/map.jpg" width="268" height="180" alt="Москва, Нахимовский проспект, дом 5">
        </div>
        <div class="popup__address">${data.address.city}, ${data.address.street}, дом ${data.address.building}</div>
      </div>
    </div>
  </div>`;
}

const setActivePicture = (picture) => {
  const popupPhotoList = popup.querySelectorAll('.gallery__item');
  for (const photo of popupPhotoList) {
    photo.classList.remove('gallery__item--active');
  }
  picture.currentTarget.classList.add('gallery__item--active');
}

const swapMainPhoto = (evt) => {
  const mainPhoto = popup.querySelector('.gallery__main-pic').querySelector('img');
  mainPhoto.src = evt.target.src;
  setActivePicture(evt);
}

const openPopup = (cardData) => {
  clearHTMLItem(popup);
  fillHTMLTemplates(popup, getPopupElement(cardData));
  popup.classList.add('popup--active');
  initPopupEventListener();
}

const closePopup = () => {
  popup.classList.remove('popup--active');
  removePopupEventListener();
}

const popupBtnCloseClick = (evt) => {
  evt.preventDefault();
  closePopup();
}

const popupPressEsc = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault()
    closePopup();
  }
}

const overlayPopupClick = (evt) => {
  evt.preventDefault();
  if (evt.target.classList.contains('popup')) {
    closePopup();
  }
}

const initPopupEventListener = () => {
  popup.querySelectorAll('.gallery__item').forEach(item => {
    item.addEventListener('click', swapMainPhoto)
  });
  popup.querySelector('.popup__close').addEventListener('click', popupBtnCloseClick);
  document.addEventListener('keydown', popupPressEsc);
  popup.addEventListener('click', overlayPopupClick);
}

const removePopupEventListener = () => {
  popup.querySelectorAll('.gallery__item').forEach(item => {
    item.removeEventListener('click', swapMainPhoto)
  });
  popup.querySelector('.popup__close').removeEventListener('click', popupBtnCloseClick);
  document.removeEventListener('keydown', popupPressEsc);
  popup.removeEventListener('click', overlayPopupClick);
}