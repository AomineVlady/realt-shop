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
  'House',
  'apartment',
  'flat'
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

const getListCards = () =>{
  let list = [];
  for (let i = 0; i < COUNT_CARDS; i++) {
    list.push({
      name: nameList[getRandomInt(0,nameList.length)],
      description: descriptionList[getRandomInt(0,descriptionList.length)],
      price: getRandomInt(PRICE_MIN,PRICE_MAX),
      category: PRODUCT_CATEGORY,
      seller:{
        fullname:sellerNameList[getRandomInt(0,sellerNameList.length)],
        rating: getRandomInt(0,RATING_MAX*10)/10
      },
      // publishDate: getRandomInt(Date.now()-MAX_DAYS_MILLISECONDS,Date.now()),
      publishDate: getRandomInt(Date.now()-MAX_DAYS_MILLISECONDS,Date.now()),
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
};//костыль?

const dateTransform = (arg) =>{
  let dateDifference = Date.now()- arg;
  let day = 86400000;
  if (dateDifference<=day) {
    return "Сегодня";
  }
  if (dateDifference>day && dateDifference<= day*2) {
    return "Вчера"
  }
  else{
    let resultDate = new Date(arg);
    return resultDate.toISOString().substr(0, 10);
  }
}//костыль?

const cardsWrapper = document.querySelector('.results__list');
const cardFragment = document.createDocumentFragment();
const popup = document.querySelector('.popup');
const popupBtnClose = document.querySelector('.popup__close');
const createCardFragment = (cards) =>{
  for (const card of cards) {
    let cardElement = document.createElement("li");
    cardElement.className = 'results__item';
    cardElement.classList.add('product');
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

const cardsTemplate = createCardFragment(CARDS_LIST);

const fillCards = (cards) =>{
  cardsWrapper.appendChild(cards);
}

fillCards(cardsTemplate);

const cardsItems = document.querySelectorAll('.results__item');

cardsItems.forEach(item => {
  item.addEventListener('click', function(evt){
    if (evt.target === item.querySelector('img') || evt.target === item.querySelector('a')){
      evt.preventDefault();
      openPopup();
    }
  })
});

const openPopup = () =>{
  popup.classList.add('popup--active');
  initPopupEventListener();
}

const closePopup = () =>{
  popup.classList.remove('popup--active');
  removePopupEventListener();
}

const popupBtnCloseClick = (evt) =>{
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
