var mySlider = new rSlider({
  target: '#sampleSlider',
  values: [10000, 1000000],
  range: true,
  tooltip: true,
  scale: true,
  labels: false,
  step: 10000
});

"use strict"

const COUNT_OBJECT = 7; //количество обьектов
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
]

const getRandomInt = (min,max) => Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min);

const getArrayObjects = (arr) =>{ 
  for (let i = 0; i < COUNT_OBJECT; i++) {
    arr[i] = {
      name: nameList[Math.floor(getRandomInt(0,nameList.length))],
      description: descriptionList[Math.floor(getRandomInt(0,descriptionList.length))],
      price: Math.floor(getRandomInt(PRICE_MIN,PRICE_MAX)),
      category: PRODUCT_CATEGORY,
      seller:{
        fullname:sellerNameList[Math.floor(getRandomInt(0,sellerNameList.length))],
        rating: +getRandomInt(0,5).toFixed(1)
      },
      publishDate: Date.now(),
      address:{
        city: cityList[Math.floor(getRandomInt(0,cityList.length))],
        street: streetList[Math.floor(getRandomInt(0,streetList.length))],
        building: Math.round(getRandomInt(1,40))
      },
      filters:{
        type: filtersTypeList[Math.floor(getRandomInt(0,filtersTypeList.length))],
        area: Math.floor(getRandomInt(30,250)),
      }
    }
  }
  return arr;
};

console.log(getArrayObjects(arrayObject));