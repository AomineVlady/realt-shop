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

const photosUrlList = [ //NEED REVIEW
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

const getUrlPhotos = (arr) => {             //NEED REVIEW
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


const getArrayObjects = (arr) =>{
  for (let i = 0; i < COUNT_OBJECT; i++) {
    arr.push = {
      name: nameList[getRandomInt(0,nameList.length)],
      description: descriptionList[getRandomInt(0,descriptionList.length)],
      price: getRandomInt(PRICE_MIN,PRICE_MAX),
      category: PRODUCT_CATEGORY,
      seller:{
        fullname:sellerNameList[getRandomInt(0,sellerNameList.length)],
        rating: getRandomInt(0,RATING_MAX*10)/10
      },
      publishDate: Date.now(),
      address:{
        city: cityList[getRandomInt(0,cityList.length)],
        street: streetList[getRandomInt(0,streetList.length)],
        building: getRandomInt(BUILDING_MIN,BUILDING_MAX)
      },
      photos: getUrlPhotos(photosUrlList), //NEED REVIEW
      filters:{
        type: filtersTypeList[getRandomInt(0,filtersTypeList.length)],
        area: getRandomInt(MIN_COUNT_AREA, MAX_COUNT_AREA),
        roomsCount:getRandomInt(1,COUNT_ROOMS)
      }
    }
  }
  return arr;
};


var mySlider = new rSlider({
  target: '#sampleSlider',
  values: [10000, 1000000],
  range: true,
  tooltip: true,
  scale: true,
  labels: false,
  step: 10000
});

console.log(getArrayObjects(arrayObject));