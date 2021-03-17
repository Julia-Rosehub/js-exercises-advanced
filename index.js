'use strict';

let lang = prompt('Введите значение переменной lang'),
    namePerson,
    promptResult = prompt('Введите имя');

if (lang='ru') {
    console.log('Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье');  
} else if (lang='eng') {
    console.log('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');  
} 

switch (lang) {
    case 'ru':
        console.log('Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье');  
        break;    
    case 'eng': 
        console.log('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');  
}

let arr = {
    'ru': ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    'eng': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
}

console.log(arr[lang]);

namePerson = (promptResult === 'Артем') ? console.log("Директор") : 
        (promptResult === "Максим") ? console.log("Преподаватель") : 
        console.log("Студент");
