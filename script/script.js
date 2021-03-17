window.addEventListener('DOMContentLoaded', () => {

    'use strict';

    const popup = document.querySelector('.popup'),
        popupContent = popup.querySelector('.popup-content');

    const deadline = '18 March 2021';

    // ***TIMER***
    const countTimer = (deadline) => {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
        let interval;
        let timeRemaining;

        const getTimeRemaining = () => {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime();

            if (dateNow > dateStop) {
                timeRemaining = 0;
                return { timeRemaining: 0, hours: 0, minutes: 0, seconds: 0 };
            }

            timeRemaining = (dateStop - dateNow) / 1000;

            let seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            return { timeRemaining, hours, minutes, seconds };
        };

        const prependZero = (timerValue) => {
            if (timerValue <= 9) return '0' + timerValue;
            return timerValue;
        };

        let updateTime = () => {
            let timer = getTimeRemaining();
            timerHours.textContent = prependZero(timer.hours);
            timerMinutes.textContent = prependZero(timer.minutes);
            timerSeconds.textContent = prependZero(timer.seconds);

            if (timer.timeRemaining > 0) {
                clearInterval(interval);
                interval = setInterval(updateTime, 1000);
            } else {
                clearInterval(interval);
            }
        };

        updateTime();
    };

    // ***MENU***
    const toggleMenu = () => {
        const menu = document.querySelector('menu');

        document.body.addEventListener('click', (e) => {
            let target = e.target;

            if (target.closest('.menu')) {
                menu.classList.add('active-menu');
            } else {
                menu.classList.remove('active-menu');
            }
        });
    };

    let count = 0;
    let animationInterval;
    let animatePopup = function animate() {

        animationInterval = requestAnimationFrame(animatePopup);

        count++;

        if ((popupContent.style.left.slice(0, popupContent.style.left.length - 2)) < (popup.clientWidth / 2.5)) {
            popupContent.style.left = count * 15 + 'px';
        } else {
            cancelAnimationFrame(animationInterval);
            count = 0;
        }
    };

    // ***TABS***

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', e => {
            let target = e.target;
            while (target !== tabHeader) {
                if (target.classList.contains('service-header-tab')) {
                    tab.forEach((item, i) => {
                        if (item === target) {
                            toggleTabContent(i);
                        }
                    });
                    return;
                }
                target = target.parentNode;
            }
        });
    };

    // ***POPUP***
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = popup.querySelector('.popup-content'),
            popupClose = document.querySelector('.popup-close');

        popupBtn.forEach(elem => {

            elem.addEventListener('click', () => {
                if (document.documentElement.clientWidth > 768) {
                    popup.style.display = 'block';
                    idInter = requestAnimationFrame(animatePopup);
                }
                popup.style.display = 'block';
            });
        });

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
            popupContent.removeAttribute('style');
        });
    };

    // ***SLIDER***
    const initSlider = () => {
        const slides = document.querySelectorAll('.portfolio-item'),
            slider = document.querySelector('.portfolio-content'),
            dot = document.querySelectorAll('.dot');

        //задать переменную для активного слайда. 
        let currentSlide = 0;
        let interval;

        // вынести смену класса в отдельные функции
        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slides, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
            nextSlide(slides, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 2000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        // реализовать логику переключения по нажатию по точкам и стрелкам
        slider.addEventListener('click', e => {

            e.preventDefault();

            let target = e.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slides, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            // метод matches вернет true или false в зависимости от того, соответствует
            // ли элемент указанному селектору
            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    //если элемент(точка)равен таргет, то индекс этой точки присвоить к текущему слайду 
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }
            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slides, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', (e) => {
            if (e.target.matches('.portfolio-btn') ||
                e.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (e) => {
            if (e.target.matches('.portfolio-btn') ||
                e.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(2000);
    };

    // ***IMAGES***

    // менять изображения при наведении курсора
    const changeImages = () => {

        const commandImages = document.querySelectorAll('#command .row img');
        let variableToKeepFotoTemporarily;

        commandImages.forEach(elem => {

            elem.addEventListener('mouseover', ({ target }) => {
                variableToKeepFotoTemporarily = target.src;
                target.src = target.getAttribute('data-img');
            });

            elem.addEventListener('mouseout', ({ target }) => {
                target.src = variableToKeepFotoTemporarily;
            });
        });
    };

    // ***ALLOW ONLY NUMBERS***

    //разрешить ввод только цифр в поля input type='number'
    const allowOnlyNumbers = () => {

        const inputTypeNumberElems = document.querySelectorAll('input[type="number"]');

        inputTypeNumberElems.forEach(elem => {
            elem.addEventListener('input', ({ target }) => {

                // если не цифры - заменяем на ''
                target.value = target.value.replace(/[^\d]/g, '');
            });
        });
    };

    // ***CALCULATOR***

    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;

            const typeValue = calcType.options[calcType.selectedIndex].value;
            const squareValue = calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            totalValue.textContent = Math.round(total);
        };

        //если что-то меняется на инпутах, селектах
        calcBlock.addEventListener('change', ({ target }) => {
            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });
    };

    // ***FORM***

    const sendForm = (formId) => {
        const errorMessage = 'Что-то пошло не так...',
            successMessage = 'Спасибо, мы с вами скоро свяжемся.';

        const form = document.getElementById(formId);
        let allInputs = form.querySelectorAll('input');

        let preloader;
        const createPreloader = () => {
            preloader = document.createElement('div');
            preloader.classList.add('preloader');
            const preloaderRow = document.createElement('div');
            preloaderRow.classList.add('preloader__row');
            const preloaderItem = document.createElement('div');
            preloaderItem.classList.add('preloader__item');
            const preloaderItem2 = document.createElement('div');
            preloaderItem2.classList.add('preloader__item');

            preloaderRow.append(preloaderItem);
            preloaderRow.append(preloaderItem2);

            preloader.append(preloaderRow);
        };

        createPreloader();

        const validateInput = (input) => {
            input.addEventListener('input', ({ target }) => {
                target.value = target.value.replace(/[^а-я ]/gi, '');
            });
        };

        allInputs.forEach(item => {

            if (item.name === 'user_phone') {
                let inputPhone = form.querySelector('input[name=user_phone]');
                inputPhone.addEventListener('input', ({ target }) => {
                    target.value = target.value.replace(/[^\d+]/g, '');
                });
            }
            if (item.name === 'user_name') {
                let inputName = form.querySelector('input[name=user_name]');
                validateInput(inputName);
            }
            if (item.name === 'user_message') {
                let inputMessage = form.querySelector('input[name=user_message]');
                validateInput(inputMessage);
            }
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            preloader.classList.add('loaded');
            form.appendChild(preloader);
            const formData = new FormData(form);

            let body = {};

            formData.forEach((val, key) => {
                body[key] = val;
            });

            const postData = (body, outputData, errorData) => {
                const request = new XMLHttpRequest();
                request.addEventListener('readystatechange', () => {

                    if (request.readyState !== 4) return;

                    if (request.status === 200) {
                        outputData();
                    } else {
                        errorData(request.status);
                    }
                });
                request.open('POST', './server.php');
                request.setRequestHeader('Content-Type', 'application-json');

                //отправить данные на сервер
                request.send(JSON.stringify(body));

                //очистить форму после отправки
                document.getElementById(formId).reset();
            }

            postData(body,
                () => {
                    preloader.classList.remove('loaded');
                    preloader.style.color = 'white';
                    preloader.textContent = successMessage;
                },
                (error) => {
                    preloader.textContent = errorMessage;
                    console.log(error);
                });
        });
    };

    // ***PRELOADER***
    const createStyle = () => {
        const style = document.createElement('style');
        style.textContent = `
            .preloader {
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                z-index: 1001;
              }
              
              .preloader__row {
                position: relative;
                top: 50%;
                left: 50%;
                width: 70px;
                height: 70px;
                margin-left: -35px;
                text-align: center;
                animation: preloader-rotate 2s infinite linear;
              }
              
              .preloader__item {
                position: absolute;
                display: inline-block;
                top: 0;
                background-color: #337ab7;
                border-radius: 100%;
                width: 35px;
                height: 35px;
                animation: preloader-bounce 2s infinite ease-in-out;
              }
              
              .preloader__item:last-child {
                top: auto;
                bottom: 0;
                animation-delay: -1s;
              }
              
              @keyframes preloader-rotate {
                100% {
                  transform: rotate(360deg);
                }
              }
              
              @keyframes preloader-bounce {
              
                0%,
                100% {
                  transform: scale(0);
                }
              
                50% {
                  transform: scale(1);
                }
              }
              
              .loaded_hiding .preloader {
                transition: 0.3s opacity;
                opacity: 0;
              }
              
              .loaded .preloader {
                display: none;
              }`;

        document.head.append(style);
    };

    createStyle();
    countTimer(deadline);
    toggleMenu();
    tabs();
    togglePopup();
    initSlider();
    changeImages();
    allowOnlyNumbers();
    calc();
    sendForm('form1');
    sendForm('form2');
    sendForm('form3');
});

