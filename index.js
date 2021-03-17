'use strict';

let num = 266219;

const makeArrayFromNumber = (num) => {
    // объявляем переменную, куда будем записывать результат умножения всех чисел в массиве
    let finalResult = 1;

    // преобразуем число в строку, а затем в массив
    let arrayFromString = Array.from(num.toString());

    // циклом проходим по всем элементам массива 
    for (let j = 0; j < arrayFromString.length; j++) {

        // результат записываем в переменую finalResult,используем оператор присваивания с умножением       
        finalResult *= arrayFromString[j];
    };

    console.log('Результат произведения цифр числа 266219', finalResult);

    return finalResult;
};

const powFunction = (a, n) => {
    let resultPowFunction = 1;

    for (let i = 0; i < n; i++) {
        resultPowFunction *= a;
    }
    console.log('Результат возведения в степень полученного выше числа', resultPowFunction);

    return resultPowFunction;
};

// результат функции возведения в степень
const finalResult = makeArrayFromNumber(num);

const resultPowFunction = powFunction(finalResult, 3);

// преобразуем результат в строку
console.log(`Первые 2 цифры числа ${resultPowFunction}`, resultPowFunction.toString().slice(0, 2));