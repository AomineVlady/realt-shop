"use strict"

var mySlider = new rSlider({
  target: '#sampleSlider',
  values: [10000, 1000000],
  range: true,
  tooltip: true,
  scale: true,
  labels: false,
  step: 10000
});

const COUNT_OBJECT = 7; //количество обьектов
const COUNT_PHOTOS = 4; //количество фотографий
const COUNT_ROOMS = 7; //количество комнат
const MIN_COUNT_AREA = 30; 
const MAX_COUNT_AREA = 250; 
const BUILDING_MAX = 40; 
const PRICE_MIN = 250000; //минимальная цена квартиры
const PRICE_MAX = 2000000; //максимальная цена квартиры
const PRODUCT_CATEGORY = "Недвижимость"; //максимальная цена квартиры
const arrayObject = []; //массив обьектов
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

const getRandomInt = (min,max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min));

const getUrlPhotos = (arr) => {
  let urls = [];
  let count = getRandomInt(1,COUNT_PHOTOS);
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
    arr[i] = {
      name: nameList[getRandomInt(0,nameList.length)],
      description: descriptionList[getRandomInt(0,descriptionList.length)],
      price: getRandomInt(PRICE_MIN,PRICE_MAX),
      category: PRODUCT_CATEGORY,
      seller:{
        fullname:sellerNameList[getRandomInt(0,sellerNameList.length)],
        rating: getRandomInt(0,50)/10
      },
      publishDate: Date.now(),
      address:{
        city: cityList[getRandomInt(0,cityList.length)],
        street: streetList[getRandomInt(0,streetList.length)],
        building: getRandomInt(1,BUILDING_MAX)
      },
      photos: getUrlPhotos(photosUrlList),
      filters:{
        type: filtersTypeList[getRandomInt(0,filtersTypeList.length)],
        area: getRandomInt(MIN_COUNT_AREA, MAX_COUNT_AREA),
        roomsCount:getRandomInt(1,COUNT_ROOMS)
      }
    }
  }
  return arr;
};

console.log(getArrayObjects(arrayObject));