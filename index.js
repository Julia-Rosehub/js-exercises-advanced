'use strict';

let root = document.getElementById('root');

let week = ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'];
const first = week.splice(0, 1);
const newWeek = week.push(first);

const getToday = () => {
    let today = '';
    week.forEach((item, i) => {
        if (i === new Date().getDay()) {
            today = i - 1;
        }
    });
    return today;
};

const today = getToday();

week.forEach((item, i) => {
    let newItem = document.createElement('div');
    newItem.textContent = item;

    if (item === 'сбт' || item === 'вск') {
        newItem.style.fontStyle = 'italic';
    }
    if (i == today) {
        newItem.style.fontWeight = 'bold';
    }

    root.append(newItem);
})




