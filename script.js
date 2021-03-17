'use strict';

const urlData = './cars.json';

document.addEventListener('DOMContentLoaded', () => {

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    const getData = (url) => new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', url);
        request.setRequestHeader('Content-type', 'application/json');
        request.send();
        request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) {
                return;
            }

            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                resolve(response);
            } else {
                reject(request.statusText);
            }
        });
    });

    const outputCars = (data) => {
        select.addEventListener('change', ({ target }) => {

            data.cars.forEach(element => {
                if (target.options[target.selectedIndex].text === element.brand) {
                    output.textContent = `${element.brand}
                                        ${element.model}
                                        ${element.price}
                                       `
                }
            });
        });
    };

    getData(urlData)
        .then(outputCars)
        .catch(err => output.textContent = `Произошла ошибка: ${err}`);
});