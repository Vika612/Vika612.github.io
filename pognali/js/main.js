'use strict';

/* SCROLL */

const header = document.querySelector('.header');
const introUserMenu = document.querySelector('.intro__user-menu');

  window.onscroll = () => {
    if (window.pageYOffset > 50) {
      header.classList.add('header--scroll');

      if (introUserMenu) {
        introUserMenu.classList.add('intro__user-menu--scroll');
      }

    } else {
      header.classList.remove('header--scroll');

      if (introUserMenu) {
        introUserMenu.classList.remove('intro__user-menu--scroll');
      }
    }
  };


/* MENU */

const headerBody = document.querySelector('.header');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');

headerBody.classList.add('header--js');
navigation.classList.add('header__navigation--closed');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navigation.classList.toggle('header__navigation--closed');
    headerBody.classList.toggle('header--opened');
  });
}


/* LEVEL */

const progressBars = document.querySelectorAll('.progress__level');

function setProgress (element) {
  const radius = element.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  const percent = element.dataset.level;

  element.style.strokeDasharray = `${circumference}`;

  const offset = circumference - circumference * percent / 100;
  element.style.strokeDashoffset = offset;
}

if (progressBars) {
  for (let i = 0; i < progressBars.length; i++) {
    setProgress(progressBars[i]);
  }
}


/* TABS */

const tabNavs = document.querySelectorAll('.alphabet-js');

if (tabNavs) {
  tabNavs.forEach((tabNav) => {

    tabNav.addEventListener('click', (e) => {
      e.preventDefault();
      const activeTabAttr = e.target.dataset.tab;

      document.querySelector('.alphabet-js.active').classList.remove('active');
      document.querySelector('.countries-js.active').classList.remove('active');

      tabNav.classList.add('active');

      const activeScreen = `.countries-js--${activeTabAttr}`;

      document.querySelector(activeScreen).classList.add('active');
    });
  });
}


  /* MODAL */

const openBtn = document.querySelector('.add-profile__link');
const closeBtn = document.querySelector('.modal__close');
const popup = document.querySelector('.modal');

if (openBtn) {
  openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    popup.classList.add('modal--show');
  });

  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    popup.classList.remove('modal--show');
  });

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      popup.classList.remove('modal--show');
    }
  });
}


/* ACCORDION */

const accTitles = document.querySelectorAll('.criterions__title');

for (let i = 0; i < accTitles.length; i++) {
  let acc = accTitles[i];
  acc.addEventListener('click', function (evt) {
    if (evt.target.checked) {
      for (let j = 0; j < accTitles.length; j++) {
        accTitles[j].checked = accTitles[j] === evt.target ? true : false;
      }
    }
  });
}


/* FILTER */

const filterContainer = document.querySelector('.filter__container');
const filterToggle = document.querySelector('.filter-toggle');
const filterClose = document.querySelector('.dropdown-filter__close');

if (filterContainer) {
  filterContainer.classList.add('filter__container--closed');
  filterContainer.classList.add('filter__container--js');

filterToggle.addEventListener('click', () => {
  filterContainer.classList.toggle('filter__container--closed');
  filterToggle.classList.toggle('active');
});

filterClose.addEventListener('click', () => {
  filterContainer.classList.add('filter__container--closed');
  filterToggle.classList.toggle('active');
});
}


/* COUNTER */

const counters = document.querySelectorAll('.counter');
const inputs = document.querySelectorAll('.counter__input');

if (counters) {

  const ACTION = {
    PLUS: 'plus',
    MINUS: 'minus'
  };

  const calculateItem = (action, input) => {

  switch (action) {
    case ACTION.PLUS:
      input.value++;
      break;
    case ACTION.MINUS:
      let inputValue = 1 * input.value;
      inputValue = inputValue > 0 ? --inputValue : inputValue;
      input.value = inputValue;
      break;
    }
  };

  counters.forEach((counter, i) => {
    counter.addEventListener('click', (e) => {
      if (e.target.classList.contains('counter__button--increase')) {
        calculateItem(ACTION.PLUS, inputs[i]);
      }

      if (e.target.classList.contains('counter__button--decrease')) {
        calculateItem(ACTION.MINUS, inputs[i]);
      }
    });
  });
}


/* SLIDER */

let position = 0;
const slidesToShow = 1;
const slidesToScroll = 1;
const container = document.querySelector('.calendar-slider');
const track = document.querySelector('.calendar-slider__list');
const btnPrev = document.querySelector('.calendar-slider__button--prev');
const btnNext = document.querySelector('.calendar-slider__button--next');
const items = document.querySelectorAll('.calendar-slider__item');
const itemsCount = items.length;

if (container) {

  btnNext.addEventListener('click', () => {
    const sliderItemWidth = document.querySelector('.calendar-slider__item').clientWidth;

    position = position - sliderItemWidth;
    setPosition();
    checkBtns();
  });

  btnPrev.addEventListener('click', () => {
    const sliderItemWidth = document.querySelector('.calendar-slider__item').clientWidth;

    position = position + sliderItemWidth;
    setPosition();
    checkBtns();
  });

  const setPosition = () => {
    track.style.transform = `translateX(${position}px)`;
  };

  const checkBtns = () => {
    const sliderItemWidth = document.querySelector('.calendar-slider__item').clientWidth;

    btnPrev.disabled = position === 0;
    btnNext.disabled = position <= -(itemsCount - slidesToShow) * sliderItemWidth;
  };

  checkBtns();
}
