'use strict';

/* MENU */

(function () {
  var headerBody = document.querySelector('.header__wrapper');
  var headerMenu = document.querySelector('.header__menu');
  var burger = document.querySelector('.burger');

  if (headerBody) {
    headerBody.classList.add('header__wrapper--js');

    if (burger) {
      burger.addEventListener('click', function () {
        headerBody.classList.toggle('header__wrapper--js');
        headerMenu.classList.toggle('header__menu--js');
        burger.classList.toggle('active');
      });
    }
  }
}());


/* LOGIN */

(function () {
  var ESC = 27;
  var loginOpenBtn = document.querySelector('.user-menu__link-login');
  var loginOpen = document.querySelector('.menu-header__link-login');
  var loginModal = document.querySelector('.login');

  if (loginModal) {
    var loginCloseBtn = document.querySelector('.login__close');
    var form = loginModal.querySelector('form');
    var userEmail = form.querySelector('[name=email]');
    var userPassword = form.querySelector('[name=password]');

    var isStorageSupport = true;
    var storage = '';

    try {
      storage = localStorage.getItem('email');
    } catch (err) {
      isStorageSupport = false;
    }

    if (loginOpenBtn || loginOpen) {

      var openModal = function () {
        loginModal.classList.add('login--show');
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onModalEscPress);

        if (loginCloseBtn) {
          loginCloseBtn.addEventListener('click', function () {
            closeModal();
          });
        }
      };

      var closeModal = function () {
        if (loginModal.classList.contains('login--show')) {
          loginModal.classList.remove('login--show');
          document.body.style.overflow = '';
        }
        window.removeEventListener('keydown', onModalEscPress);
      };

      var onModalEscPress = function (evt) {
        if (evt.keyCode === ESC) {
          evt.preventDefault();
          closeModal();
        }
      };

      loginOpenBtn.addEventListener('click', function (evt) {
        evt.preventDefault();
        openModal();

        if (storage) {
          userEmail.value = storage;
          userPassword.focus();
        } else {
          userEmail.focus();
        }
      });

      loginOpen.addEventListener('click', function (evt) {
        evt.preventDefault();
        openModal();

        if (storage) {
          userEmail.value = storage;
          userPassword.focus();
        } else {
          userEmail.focus();
        }
      });

      loginModal.addEventListener('click', function (evt) {
        var loginContent = loginModal.querySelector('.login__content');
        if (!loginContent.contains(evt.target)) {
          closeModal();
        }
      });

      if (form) {
        form.addEventListener('submit', function () {
          if (isStorageSupport) {
            localStorage.setItem('email', userEmail.value);
          }
        });
      }
    }
  }
}());


/* FILTER */

(function () {
  var filter = document.querySelector('.filter');
  var filterToggle = document.querySelector('#filter-toggle');
  var filterToggleLabel = document.querySelector('.main-catalog__toggle');
  var filterAccList = document.querySelectorAll('.filter-acc');

  if (filter) {
    filter.classList.remove('filter--nojs');

    if (filterToggle) {

      filterToggle.addEventListener('change', function () {
        if (filterToggle.checked) {
          filter.classList.add('filter--opened');
          filterToggleLabel.classList.add('main-catalog__toggle--opened');
        } else {
          filter.classList.remove('filter--opened');
          filterToggleLabel.classList.remove('main-catalog__toggle--opened');
        }
      });

      for (var i = 0; i < filterAccList.length; i++) {
        var filterAcc = filterAccList[i];
        filterAcc.classList.remove('nojs');
      }
    }
  }
}());


/* FAQ */

(function () {
  var faqList = document.querySelector('.faq__list');

  if (faqList) {
    faqList.classList.remove('faq__list--nojs');

    var toggleFaqItem = function (item) {
      item.classList.toggle('faq__item--opened');
    };

    faqList.addEventListener('click', function (evt) {
      var faqItem = evt.target.closest('li');
      toggleFaqItem(faqItem);
    });
  }
}());


/* ADD-TO-CART */
(function () {
  var ESC = 27;
  var cartOpenBtn = document.querySelector('.card-info__button');

  if (cartOpenBtn) {

    var cartModal = document.querySelector('.cart');
    var cartCloseBtn = document.querySelector('.cart__close');

    var openModal = function () {
      cartModal.classList.add('cart--show');
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onModalEscPress);
      cartCloseBtn.addEventListener('click', function () {
        closeModal();
      });
    };

    var closeModal = function () {
      if (cartModal.classList.contains('cart--show')) {
        cartModal.classList.remove('cart--show');
        document.body.style.overflow = '';
      }
      window.removeEventListener('keydown', onModalEscPress);
    };

    var onModalEscPress = function (evt) {
      if (evt.keyCode === ESC) {
        evt.preventDefault();
        closeModal();
      }
    };

    cartOpenBtn.addEventListener('click', function (evt) {
      evt.preventDefault();
      openModal();
    });

    cartModal.addEventListener('click', function (evt) {
      var cartContent = cartModal.querySelector('.cart__wrapper');
      if (!cartContent.contains(evt.target)) {
        closeModal();
      }
    });
  }
}());


/* CALCULATE ITEM */

(function () {
  var ACTION = {
    PLUS: 'plus',
    MINUS: 'minus'
  };

  var cart = document.getElementById('cart');
  var subTotal = document.querySelector('.cart__subtotal');

  var getItemSubTotalPrice = function (input) {
    return Number(input.value) * Number(input.dataset.price);
  };

  var calculateItem = function (action) {
    var input = document.getElementById('number');

    switch (action) {
      case ACTION.PLUS:
        input.value++;
        break;
      case ACTION.MINUS:
        input.value--;
        break;
    }

    subTotal.textContent = getItemSubTotalPrice(input);
  };

  if (cart) {
    cart.addEventListener('click', function (event) {
      if (event.target.classList.contains('cart__button--increase')) {
        calculateItem(ACTION.PLUS);
      }

      if (event.target.classList.contains('cart__button--decrease')) {
        calculateItem(ACTION.MINUS);
      }
    });
  }
}());


/* SLIDER */

(function () {
  var sliderContainer = document.querySelector('.new__slider');

  if (sliderContainer) {
    // eslint-disable-next-line no-new
    // eslint-disable-next-line no-undef
    var swiper = new Swiper('.new__slider', {
      slidesPerView: 2,
      spaceBetween: 30,
      slidesPerGroup: 2,
      loop: true,
      simulateTouch: false,
      breakpoints: {
        0: {
          pagination: {
            el: '.new__item-count',
            clickable: true,
            type: 'custom',
            renderCustom: function (Swiper, current, total) {
              return current + ' of ' + total;
            },
          },
        },
        768: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          pagination: {
            el: '.new__item-count',
            clickable: true,
            renderBullet: function (index, className) {
              return '<button class="' + className + '" aria-label="Slide ' + (index + 1) + '">' + (index + 1) + '</button>';
            },
          },
        },
        1024: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          pagination: {
            el: '.new__item-count',
            clickable: true,
            renderBullet: function (index, className) {
              return '<button class="' + className + '" aria-label="Slide ' + (index + 1) + '">' + (index + 1) + '</button>';
            },
          },
        },
      },
      navigation: {
        nextEl: '.new__item-next-button',
        prevEl: '.new__item-prev-button',
      },
    });
    swiper.slideNext();
  }
}());
