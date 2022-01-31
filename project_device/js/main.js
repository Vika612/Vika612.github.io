'use strict';

/*  SLIDER */

let position = 0;
const slidesToShow = 1;
const slidesToScroll = 1;
const promoSlider = document.querySelector('.promo-slider');
const track = document.querySelector('.promo-slider__list');
const items = document.querySelectorAll('.promo-slider__item');
const bullets = document.querySelectorAll('.promo-slider__btn');
const itemsCount = items.length;
const itemWidth = 1160;
const movePosition = slidesToScroll * itemWidth;
const bullitsList = document.querySelector('.promo-slider__btns');

 // создать модель слайдера
 const slider = new Slider();
 slider.create();
 startMode();

/*===========================================================*/

function clearBullitList(){
  while (bullitsList.hasChildNodes()) {
    bullitsList.removeChild(bullitsList.firstChild);
  }
}

function createBullits() {
  for (let i = 0; i <= items.length-1; i++) {
    let li = document.createElement('li');
    let button = document.createElement('button');
    button.className = "promo-slider__btn";
    button.dataset.index = i;
    button.dataset.controltype = 'bullit';
    button.type = 'button';
    button.ariaLabel = `Перейти на слайд ${i+1}`;
    li.appendChild(button);
    bullitsList.appendChild(li);
  }
}

function startMode() {
// очистить список буллитов
  clearBullitList();

// создать нужное количество буллитов - по количеству слайдов
  createBullits();

// менять положение слайдера на основании модели ( - заполнить табиндексы для всех экранов)

  moveSlider.call(document.querySelector('.promo-slider__btn'));
}

promoSlider.addEventListener('click', (event) => {
  if (event.target.dataset.controltype) {
    moveSlider.call(event.target);
  }
});

function Slider() {
  this.sliderSkeleton = [],

  this.create = () => {
    const sliderSkeleton = [];
    items.forEach(() => {
      sliderSkeleton.push(false);
    });
    sliderSkeleton[0] = true;
    this.sliderSkeleton = sliderSkeleton;
  },

  this.setActiveScreen = (idScreen) => {
    this.sliderSkeleton[this.getActiveScreen()] = false;
    this.sliderSkeleton[idScreen] = true;
  },

  this.getActiveScreen = () => {
    return this.sliderSkeleton.indexOf(true);
  }
}

function setSliderPosition(k) {
  position = -(itemWidth * k);
  track.style.transform = `translateX(${position}px)`;
  if (document.querySelector('.promo-slider__item--active')){
    document.querySelector('.promo-slider__item--active').classList.remove('promo-slider__item--active');
  }
  items[k].classList.add('promo-slider__item--active');
}

function setLinkTabindex(k) {
  const linksPreviousActiveScreen = document.querySelectorAll('.promo-slider__item a');
  linksPreviousActiveScreen.forEach((link) => {
    link.tabIndex = -1;
  });
  const linksActiveScreen = document.querySelectorAll('.promo-slider__item--active a');
  linksActiveScreen.forEach((link) => {
    link.tabIndex = 0;
  });
}

function setActiveBullit(k) {
  if (document.querySelector('.promo-slider__btn--active')){
    document.querySelector('.promo-slider__btn--active').classList.remove('promo-slider__btn--active');
  }
  document.querySelectorAll('.promo-slider__btn')[k].classList.add('promo-slider__btn--active');
}

function moveSlider() {
  let index = getNextActiveScreenNumber(this);
  slider.setActiveScreen(index);
  setSliderPosition(index);
  setLinkTabindex(index);
  setActiveBullit(index);
}

function getNextActiveScreenNumber(button) {
  let nextNumber;
  switch (button.dataset.controltype) {
    case 'next':
      nextNumber = (slider.getActiveScreen() < slider.sliderSkeleton.length - 1) ? slider.getActiveScreen() + 1 : slider.getActiveScreen();
      break;

    case 'previous':
      nextNumber = (slider.getActiveScreen() > 0) ? slider.getActiveScreen() - 1 : slider.getActiveScreen();
      break;

    case 'bullit':
      nextNumber = +button.dataset.index;
      break;
  }
  return nextNumber;
}


/* TABS */

const tabNavs = document.querySelectorAll('.button--tab');

tabNavs.forEach((tabNav) => {

  tabNav.addEventListener('click', (e) => {
    e.preventDefault();
    const activeTabAttr = e.target.dataset.tab;

    document.querySelector('.button--tab.active').classList.remove('active');
    document.querySelector('.tabs__item-content.active').classList.remove('active');

    tabNav.classList.add('active');

    const activeScreen = `.tabs__item-content--${activeTabAttr}`;

    document.querySelector(activeScreen).classList.add('active');
  });
});


/* MODAL */

const openBtn = document.querySelector('.delivery-bonus__link');
const closeBtn = document.querySelector('.modal__close');
const popup = document.querySelector('.modal');

  openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    popup.classList.add('modal--show');
    document.body.style.overflow = 'hidden';
  });

  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    popup.classList.remove('modal--show');
    document.body.style.overflow = 'visible';
  });

  popup.addEventListener('click', (e) => {
    if (e.target.closest('.modal__content') === null) {
      popup.classList.remove('modal--show');
      document.body.style.overflow = 'visible';
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      popup.classList.remove('modal--show');
      document.body.style.overflow = 'visible';
    }
  });


  /* COUNTER */

  const counter = document.querySelector('.counter');
  const input = document.getElementById('number');

  const ACTION = {
    PLUS: 'plus',
    MINUS: 'minus'
  };

  const calculateItem = (action) => {

  switch (action) {
    case ACTION.PLUS:
      input.value++;
      break;
    case ACTION.MINUS:
      input.value--;
      break;
    }
  };

  counter.addEventListener('click', (e) => {
    if (e.target.classList.contains('counter__button--increase')) {
      calculateItem(ACTION.PLUS);
    }

    if (e.target.classList.contains('counter__button--decrease')) {

      if (Number(input.value) !== 1) {
      calculateItem(ACTION.MINUS);
      }
    }
  });

