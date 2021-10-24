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
  "img/apt_2.png" ,
  "img/apt_3.png",
  "img/apt_4.png",
  "img/apt_5.png",
  "img/apt_6.png",
  "img/house_1.png",
  "img/house_2.png",
  "img/house_3.png",
  "img/house_4.png"
];

const getRandomInt = (min,max) => Math.floor(Math.random() * (max - min) + min);

const getUrlPhotos = (arr) => {           
  let urls = [];
  let count = getRandomInt(COUNT_PHOTOS_MIN,COUNT_PHOTOS_MAX);
  while(urls.length !== count) {
    let rndElem = arr[getRandomInt(0,arr.length)];
    if(!urls.includes(rndElem)){
      urls.push(rndElem);
    };
  };
  return urls;
};

const dateNow = Date.now();

const getListCards = () =>{
  let list = [];
  for (let i = 0; i < COUNT_CARDS; i++) {
    list.push({
      card_id: `card_${i}`,
      name: nameList[getRandomInt(0,nameList.length)],
      description: descriptionList[getRandomInt(0,descriptionList.length)],
      price: getRandomInt(PRICE_MIN,PRICE_MAX),
      category: PRODUCT_CATEGORY,
      seller:{
        fullname:sellerNameList[getRandomInt(0,sellerNameList.length)],
        rating: getRandomInt(0,RATING_MAX*10)/10
      },
      publishDate: dateNow - (getRandomInt(0,MAX_DAYS_MILLISECONDS)),
      address:{
        city: cityList[getRandomInt(0,cityList.length)],
        street: streetList[getRandomInt(0,streetList.length)],
        building: getRandomInt(BUILDING_MIN,BUILDING_MAX)
      },
      photos: getUrlPhotos(photosUrlList),
      filters:{
        type: filtersTypeList[getRandomInt(0,filtersTypeList.length)],
        area: getRandomInt(MIN_COUNT_AREA, MAX_COUNT_AREA),
        roomsCount:getRandomInt(1,COUNT_ROOMS)
      }
    })
  }
  return list;
};

const CARDS_LIST = getListCards();

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
  let argString = arg.toString().split('');
  if (argString.length>3) {
    for (let i = argString.length-4; i >= 0; i-=3) {
        argString[i] += " ";
    }
  }
  return argString.join('');
};

const transformMonthNubmerToString = (month) =>{
  switch (+month) {
    case 1:
      return 'Января';
    case 2:
      return 'Февраля';
    case 3:
      return 'Марта';
    case 4:
      return 'Апереля';
    case 5:
      return 'Мая';
    case 6:
      return 'Июня';
    case 7:
      return 'Июля';
    case 8:
      return 'Августа';
    case 9:
      return 'Сентября';
    case 10:
      return 'Октября';
    case 11:
      return 'Ноября';
    case 12:
      return 'Декабря';
    default:
      return "month"
  }
}

const dateTransform = (arg) =>{
  let dateDifference = dateNow - arg;
  let day = 86400000;
  if (dateDifference<=day) {
    return "Сегодня";
  }
  if (dateDifference>day && dateDifference<= day*2) {
    return "Вчера"
  }
  else{
    let resultDate = new Date(arg);
    return `${resultDate.getDate()} ${transformMonthNubmerToString(resultDate.getUTCMonth()+1)} ${resultDate.getFullYear()}`
  }
}


const cardsWrapper = document.querySelector('.results__list');
const cardFragment = document.createDocumentFragment();

const clearHTMLItem = item => {
  item.innerHTML = "";
}

const fillHTMLTemplates = (wrapper,template) =>{
  wrapper.appendChild(template);
}

clearHTMLItem(cardsWrapper);

const createCardFragment = (cards) =>{
  for (const card of cards) {
    let cardElement = document.createElement("li");
    cardElement.className = 'results__item';
    cardElement.classList.add('product');
    cardElement.id = card.card_id;
    cardElement.innerHTML = `
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
      </div>`;
    cardFragment.appendChild(cardElement);
  }
  return cardFragment;
};

const cardsListTemplate = createCardFragment(CARDS_LIST);

fillHTMLTemplates(cardsWrapper,cardsListTemplate);

const cardsItemsList = cardsWrapper.querySelectorAll('.results__item');

const getCardData = (list,id) =>{
  for (let item of list) {
    if (item.card_id === id) {
      return item; 
    }
  }
}

const getPhotoList = (list,name) => {
  let result = '';
  for (let i = 1; i < list.length; i++) {
    result+= `
  <li class="gallery__item">
    <img src="${list[i]}" width="124" height="80" alt="${name}">
  </li>`;
  }
  return result;
}

const popupFragment = document.createDocumentFragment();

const createPopupContentFragment = (data) =>{
  let popupElement = document.createElement("div");
  popupElement.className = 'popup__inner';
  popupElement.innerHTML = `
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
          ${getPhotoList(data.photos,data.name)}
        </ul>
      </div>
      <ul class="popup__chars chars">
        <li class="chars__item">
          <div class="chars__name">Площадь</div>
          <div class="chars__value">${data.filters.area}</div>
        </li>
        <li class="chars__item">
          <div class="chars__name">Количество комнат</div>
          <div class="chars__value">${data.filters.roomsCount}</div>
        </li>
        <li class="chars__item">
          <div class="chars__name">Тип недвижимости</div>
          <div class="chars__value">${data.filters.type}</div>
        </li>
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
  </div>`;
  return popupFragment.appendChild(popupElement)
}

const popup = document.querySelector('.popup');

const addEventsCards = cardsItems =>{
  cardsItems.forEach(card => {
    card.addEventListener('click', function(evt){
      if (evt.target === card.querySelector('img') || evt.target === card.querySelector('a')){
        evt.preventDefault();
        clearHTMLItem(popup);
        let cardData = getCardData(CARDS_LIST,evt.currentTarget.id);
        let popupContentTemplate = createPopupContentFragment(cardData);
        fillHTMLTemplates(popup,popupContentTemplate);
        openPopup();
      }
    })
  });
}

addEventsCards (cardsItemsList);

const popupBtnClose = popup.querySelector('.popup__close');


const openPopup = () =>{
  popup.classList.add('popup--active');
  initPopupEventListener();
}

const closePopup = () =>{
  popup.classList.remove('popup--active');
  removePopupEventListener();
}

const popupBtnCloseClick = () =>{
  evt.preventDefault();
  closePopup();
}

const popupPressEsc = (evt) => {
  if (evt.key === 'Escape') {
      evt.preventDefault()
      closePopup();       
  }
}

const initPopupEventListener = () =>{
  popupBtnClose.addEventListener('click',popupBtnCloseClick);
  document.addEventListener('keydown',popupPressEsc);
}

const removePopupEventListener = () =>{
  popupBtnClose.removeEventListener('click',popupBtnCloseClick);
  document.removeEventListener('keydown',popupPressEsc);
}

