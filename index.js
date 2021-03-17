'use strict';

let arg = 'Javascript - это динамический, слабо типизированный язык';

const callbackFunc = argument => {
    console.log(argument.slice(0, 30) + '...');
};

const init = (arg, callback) => {
    if (typeof (arg) !== 'string') {
        alert('Переданный аргумент не является строкой');
        return;
    }
    let argTrim = arg.trim();
    if (argTrim.length > 30) {
        callback(argTrim);
    };
};

// Вызываем функцию, вместо arg передаем значение, например 5 или 'Javascript - это динамический, слабо типизированный язык.';
init(arg, callbackFunc);
