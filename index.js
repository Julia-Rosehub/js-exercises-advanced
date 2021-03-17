'use strict';

let root = document.getElementById('root'),
    timer = document.getElementById('timer');

// Первое задание

let week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

let month = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
    "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
];

const HOUR_STRING = ['час', 'часа', 'часов'],
    MINUTE_STRING = ['минута', 'минуты', 'минут'],
    SECOND_STRING = ['секунда', 'секунды', 'секунд'];

const declOfNum = (n, titles) => n + ' ' + titles[n % 10 === 1 && n % 100 !== 11 ?
    0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];

let monthName = month[new Date().getMonth()];

let dayName = week[new Date().getDay()],
    dateName = new Date().getDate(),
    yearName = new Date().getFullYear();

let hours = new Date().getHours(),
    minutes = new Date().getMinutes(),
    seconds = new Date().getSeconds();

let elem;

const createNewElem = () => {
    elem = document.createElement('div');
    elem.textContent = `
    Сегодня ${dayName},
        ${dateName}
        ${monthName}
        ${yearName} 
        ${declOfNum(hours, HOUR_STRING)} 
        ${declOfNum(minutes, MINUTE_STRING)} 
        ${declOfNum(seconds, SECOND_STRING)}
`;

    elem.style.color = 'red';
    root.append(elem);
};

createNewElem();

// Второе задание

const prependZero = num => {
    if (num < 10) {
        num = '0' + num;
    } return num;
};

const prependZeroHours = num => {
    if (num < 12) {
        num = '0' + num;
    } return num;
};

elem.insertAdjacentHTML('afterend',
    document.createElement('div').textContent = `
            ${prependZero(dateName)}.
            ${prependZero(new Date().getMonth())}.
            ${yearName} - 
            ${prependZero(hours)}:
            ${prependZeroHours(minutes)}:
            ${prependZeroHours(seconds)}
`);

let time = setInterval(() => {
    while (timer.firstChild) {
        timer.removeChild(timer.firstChild);
    }

    timer.textContent = `
        ${prependZero(new Date().getDate())}.
        ${prependZero(new Date().getMonth())}.
        ${yearName}- 
        ${prependZero(new Date().getHours())}:
        ${prependZeroHours(new Date().getMinutes())}:
        ${prependZeroHours(new Date().getSeconds())}                
  `
}, 1000);

