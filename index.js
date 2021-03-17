'use strict';

// *** Проверка на простое число ***
const init = () => {

    let n = 100;

    for (let i = 2; i <= n; i++) {
        // устанавливаем флаг для простых чисел
        let flag = 1;

        let j;

        if (i > 2) {
            for (j = 2; j * j <= i; j++) {
                if (i % j === 0) {
                    flag = 0;
                    break;
                }
            }
        }

        if (flag === 1) {
            console.log(`Делители числа ${i}: 1 и ${i}`);
        }
    }
};

init();
