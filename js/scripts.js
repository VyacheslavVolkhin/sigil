document.addEventListener("DOMContentLoaded", function () {



	// filter actions
	const filterButtonOpen = document.querySelector('.js-filter-open');
	const filterSection = document.querySelector('.filter-box');
	if (filterSection) {
		filterButtonOpen.addEventListener("click", function(event) {
				document.body.classList.add("filter-show");
				event.preventDefault();
		})
		filterSection.addEventListener("click", function (event) {
			//filter close
			if (event.target.matches(".js-filter-toggle")) {
				document.body.classList.toggle("filter-show");
				event.preventDefault();
			} else if (event.target.matches(".js-filter-more")) {
				event.target.closest('.filter-section-wrap').classList.toggle('show-all')
				event.preventDefault();
			} else if (event.target.matches(".js-filter-more-filters")) {
				event.target.closest('.filter-box').classList.toggle('show-all-filters')
				event.preventDefault();
			}
		});
	}



	   //range slider
	   const slider = document.getElementById('range-slider');
	   const minInput = document.getElementById('input-number-min');
	   const maxInput = document.getElementById('input-number-max');
	   
	   const min = 0;
	   const max = 6000;
	   
	   if (slider) {
		noUiSlider.create(slider, {
			start: [1200, 2400],
			connect: true,
			range: {
			'min': [min],
			'max': [max]
			}
		  });
		  
		  slider.noUiSlider.on('update', (values, handle) => {
			const value = values[handle];
		  
			if (handle === 0) {
			minInput.value = Math.round(value);
			} else {
			maxInput.value = Math.round(value);
			}
		  });
		  
		  minInput.addEventListener('change', () => {
			slider.noUiSlider.set([minInput.value, null]);
		  });
		  
		  maxInput.addEventListener('change', () => {
			slider.noUiSlider.set([null, maxInput.value]);
		  });
	   }
	
	
	//order sections
	const orderBoxes = document.querySelectorAll('.order-box');

	orderBoxes.forEach((box, index) => {
		const btnNext = box.querySelector('.js-button-order-next');
		const btnBack = box.querySelector('.js-button-order-prev');

		if (btnNext) {
			btnNext.addEventListener('click', function(event) {
				event.preventDefault();
				if (index < orderBoxes.length - 1) {
					orderBoxes[index].classList.remove('active');
					orderBoxes[index + 1].classList.add('active');
				}
			});
		}

		if (btnBack) {
			btnBack.addEventListener('click', function(event) {
				event.preventDefault();
				if (index > 0) {
					orderBoxes[index].classList.remove('active');
					orderBoxes[index - 1].classList.add('active');
				}
			});
		}
	});
	

  //title-decor calculate width
  const titleDecorBox = document.querySelector(".title-decor-box");
  if (titleDecorBox) {
    const pageTitle = document.querySelector(".page-title");
    const decorLeft = document.querySelector(".decor-left");
    const decorRight = document.querySelector(".decor-right");

    const titleDecorBoxWidth = titleDecorBox.offsetWidth;
    const pageTitleWidth = pageTitle.offsetWidth;
    const halfPageTitleWidth = pageTitleWidth / 2;

    const halfTitleDecorBoxWidth = titleDecorBoxWidth / 2;
    const decorWidth = halfTitleDecorBoxWidth - halfPageTitleWidth;

    decorLeft.style.width = `${decorWidth}px`;
    decorRight.style.width = `${decorWidth}px`;
  }

  //fancybox
  Fancybox.bind("[data-fancybox]", {
    //settings
  });


  //btn tgl
  let tglButtons = document.querySelectorAll('.js-btn-tgl')
  if (tglButtons) {
	for (i = 0;i < tglButtons.length;i++) {
		tglButtons[i].addEventListener('click', function(e) {
			this.classList.contains('active') ? this.classList.remove('active') : this.classList.add('active')
			e.preventDefault()
			e.stopPropagation()
			return false
		})
	  }
  }

  //js popup wrap
  const togglePopupButtons = document.querySelectorAll(".js-btn-popup-toggle");
  const closePopupButtons = document.querySelectorAll(".js-btn-popup-close");
  const popupElements = document.querySelectorAll(".js-popup-wrap");
  const wrapWidth = document.querySelector(".wrap").offsetWidth;
  const bodyElem = document.querySelector("body");
  function popupElementsClear() {
    document.body.classList.remove("menu-show");
    //document.body.classList.remove("filter-show");
    document.body.classList.remove("search-show");
    popupElements.forEach((element) => element.classList.remove("popup-right"));
  }
  function popupElementsClose() {
    togglePopupButtons.forEach((element) => {
      if (!element.closest(".no-close")) {
        element.classList.remove("active");
      }
    });
  }
  function popupElementsContentPositionClass() {
    popupElements.forEach((element) => {
      let pLeft = element.offsetLeft;
      let pWidth = element.querySelector(".js-popup-block").offsetWidth;
      let pMax = pLeft + pWidth;
      if (pMax > wrapWidth) {
        element.classList.add("popup-right");
      } else {
        element.classList.remove("popup-right");
      }
    });
  }
  for (i = 0; i < togglePopupButtons.length; i++) {
    togglePopupButtons[i].addEventListener("click", function (e) {
      popupElementsClear();
      if (this.classList.contains("active")) {
        this.classList.remove("active");
      } else {
        popupElementsClose();
        this.classList.add("active");
        if (this.closest(".popup-menu-wrap")) {
          document.body.classList.add("menu-show");
        }
        if (this.closest(".popup-search-wrap")) {
          document.body.classList.add("search-show");
        }
        if (this.closest(".popup-filter-wrap")) {
          document.body.classList.add("filter-show");
        }
        popupElementsContentPositionClass();
      }
      e.preventDefault();
      e.stopPropagation();
      return false;
    });
  }
  for (i = 0; i < closePopupButtons.length; i++) {
    closePopupButtons[i].addEventListener("click", function (e) {
      popupElementsClear();
      popupElementsClose();
      e.preventDefault();
      e.stopPropagation();
      return false;
    });
  }
  document.onclick = function (event) {
    if (!event.target.closest(".js-popup-block")) {
      popupElementsClear();
      popupElementsClose();
    }
  };
  popupElements.forEach((element) => {
    if (element.classList.contains("js-popup-select")) {
      let popupElementSelectItem = element.querySelectorAll(
        ".js-popup-block li a"
      );
      if (element.querySelector(".js-popup-block .active")) {
        element.classList.add("select-active");
        let popupElementActive = element.querySelector(
          ".js-popup-block .active"
        ).innerHTML;
        let popupElementButton = element.querySelector(".js-btn-popup-toggle");
        popupElementButton.innerHTML = "";
        popupElementButton.insertAdjacentHTML("beforeend", popupElementActive);
      } else {
        element.classList.remove("select-active");
      }
      for (i = 0; i < popupElementSelectItem.length; i++) {
        popupElementSelectItem[i].addEventListener("click", function (e) {
          this.closest(".js-popup-wrap").classList.add("select-active");
          if (
            this.closest(".js-popup-wrap").querySelector(
              ".js-popup-block .active"
            )
          ) {
            this.closest(".js-popup-wrap")
              .querySelector(".js-popup-block .active")
              .classList.remove("active");
          }
          this.classList.add("active");
          let popupElementActive = element.querySelector(
            ".js-popup-block .active"
          ).innerHTML;
          let popupElementButton = element.querySelector(
            ".js-btn-popup-toggle"
          );
          popupElementButton.innerHTML = "";
          popupElementButton.insertAdjacentHTML(
            "beforeend",
            popupElementActive
          );
          popupElementsClear();
          popupElementsClose();
          if (!this.closest(".js-tabs-nav")) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
        });
      }
    }
  });


  //js tabs
  const tabsNav = document.querySelectorAll('.js-tabs-nav')
  const tabsBlocks = document.querySelectorAll('.js-tab-block')
  const tabsButtonTitle = document.querySelectorAll('.js-tab-title')
  const tabsButtonContent = document.querySelectorAll('.js-tab-content')
  function tabsActiveStart() {
	for (iTab = 0; iTab < tabsBlocks.length; iTab++) {
		if (tabsBlocks[iTab].classList.contains('active')) {
			tabsBlocks[iTab].classList.remove('active')
		}
	}
	for (i = 0; i < tabsNav.length; i++) {
		let tabsNavElements = tabsNav[i].querySelectorAll('[data-tab]')
		for (iElements = 0; iElements < tabsNavElements.length; iElements++) {
			if (tabsNavElements[iElements].classList.contains('active')) {
				let tabsNavElementActive = tabsNavElements[iElements].dataset.tab
				for (j = 0; j < tabsBlocks.length; j++) {
					if (tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive) > -1) {
						console.log(tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive))
						tabsBlocks[j].classList.add('active')
					}
				}
			}
		}
	}
	
  }
  for (i = 0; i < tabsButtonTitle.length; i++) {
	tabsButtonTitle[i].addEventListener('click', function (e) {
		this.classList.toggle('active')
		e.preventDefault()
		e.stopPropagation()
		return false
	})
  }
  for (i = 0; i < tabsNav.length; i++) {
	tabsNav[i].addEventListener('click', function (e) {
		if (e.target.closest('[data-tab]')) {
			let tabsNavElements = this.querySelector('[data-tab].active')
			tabsNavElements ? tabsNavElements.classList.remove('active') : false
			e.target.closest('[data-tab]').classList.add('active')
			tabsActiveStart()
			e.preventDefault()
			e.stopPropagation()
			return false
		}
	})
  }
  tabsActiveStart()

  // Popups
  let popupCurrent;
  let popupsList = document.querySelectorAll(".popup-outer-box");

  document.querySelectorAll(".js-popup-open").forEach(function (element) {
    element.addEventListener("click", function (e) {
      document.querySelector(".popup-outer-box").classList.remove("active");
      document.body.classList.add("popup-open");

      popupCurrent = this.getAttribute("data-popup");
      document
        .querySelector(
          `.popup-outer-box[id="${popupCurrent}"
			]`
        )
        .classList.add("active");

      e.preventDefault();
      e.stopPropagation();
      return false;
    });
  });
  document.querySelectorAll(".js-popup-close").forEach(function (element) {
    element.addEventListener("click", function (event) {
      document.body.classList.remove("popup-open");
      for (i = 0; i < popupsList.length; i++) {
        popupsList[i].classList.remove("active");
      }
      event.preventDefault();
      event.stopPropagation();
    });
  });
  document.querySelectorAll(".popup-outer-box").forEach(function (element) {
    element.addEventListener("click", function (event) {
      if (!event.target.closest(".popup-box")) {
        document.body.classList.remove("popup-open");
        document.body.classList.remove("popup-open-scroll");
        document.querySelectorAll(".popup-outer-box").forEach(function (e) {
          e.classList.remove("active");
        });
        return false;
      }
    });
  });

  //slider gallery
  const swiperSliderGallery = new Swiper(".slider-gallery .swiper", {
    loop: false,
    slidesPerView: "auto",
    spaceBetween: 0,
    autoHeight: false,
    speed: 400,
    pagination: false,
    autoplay: false,
    navigation: {
      nextEl:
        ".btn-action-ico.ico-arrow.ico-arrow-next.button-slider-gallery-next",
      prevEl:
        ".btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-gallery-prev",
    },
    breakpoints: {},
  });



  //slider compare
  const swiperSliderCompare = new Swiper('.slider-compare .swiper', {
	loop: false,
	slidesPerView: 'auto',
	spaceBetween: 0,
	autoHeight: false,
	speed: 400,
	pagination: {
		el: '.slider-compare-pagination',
		clickable: true,
	},
	autoplay: false,
	navigation: {
		nextEl: '.btn-action-ico.ico-arrow.ico-arrow-next.button-slider-compare-next',
		prevEl: '.btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-compare-prev',
	},
	breakpoints: {
		768: {
			slidesPerView: 3,
		},
		1200: {
			slidesPerView: 4,
		},
	},
  
  });


  //slider media thumbs preview
  const swiperMediaPreview = new Swiper(".slider-media-thumbs .swiper",
  {
	loop: false,
	slidesPerView: 5,
	spaceBetween: 0,
	threshold: 5,
	watchSlidesVisibility: true,
	watchSlidesProgress: true,
	freeMode: false,
	navigation: false,
	direction: "vertical",
	breakpoints: {
		1024: {
		},
	},
  });
  
  //slider media thumbs main
  const swiperMediaMain = new Swiper(".slider-media-main .swiper",
  {
	loop: false,
	slidesPerView: 1,
	spaceBetween: 0,
	autoHeight: true,
	speed: 400,
	threshold: 5,
	freeMode: false,
	watchSlidesProgress: true,
	navigation: {
	  nextEl: ".button-slider-media-main-next",
	  prevEl: ".button-slider-media-main-prev",
	},
	pagination: {
	  clickable: true,
	},
	thumbs: {
	  swiper: swiperMediaPreview,
	},
  });


  //slider tiles
  const swiperSliderTiles = new Swiper('.slider-tiles .swiper', {
	loop: false,
	slidesPerView: 'auto',
	spaceBetween: 0,
	autoHeight: false,
	speed: 400,
	pagination: false,
	autoplay: false,
	navigation: {
		nextEl: '.btn-action-ico.ico-arrow.ico-arrow-next.button-slider-tiles-next',
		prevEl: '.btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-tiles-prev',
	},
	breakpoints: {
		1024: {
			slidesPerView: 4,
		},
	},
  
  });
  
  
  
});


// field counter
document.addEventListener('DOMContentLoaded', () => {
	// Выбираем все счетчики на странице
	const counters = document.querySelectorAll('.js-counter');

	counters.forEach(counter => {
		const btnPlus = counter.querySelector('.js-button-counter-plus');
		const btnMinus = counter.querySelector('.js-button-counter-minus');
		const input = counter.querySelector('.js-input-counter');

		const dataUnit = input.dataset.unit || '';
		const dataStepRaw = input.dataset.step || '1';
		const dataStep = parseFloat(dataStepRaw.replace(',', '.'));
		const dataMin = parseFloat(input.dataset.min) || 0;
		const dataMax = parseFloat(input.dataset.max) || Infinity;

		// Определяем разделитель десятичных
		const decimalSeparator = dataStepRaw.includes(',') ? ',' : '.';

		// Функция для парсинга значения из инпута
		const parseValue = (val) => {
			return parseFloat(val.replace(dataUnit, '').trim().replace(',', '.')) || dataMin;
		};

		// Функция для форматирования значения с единицей
		const formatValue = (val) => {
			const decimals = (dataStepRaw.split(decimalSeparator)[1] || '').length;
			return val.toFixed(decimals) + dataUnit;
		};

		// Функция для обновления состояния кнопок
		const updateButtons = (val) => {
			if (val <= dataMin) {
				btnMinus.classList.add('button-disabled');
			} else {
				btnMinus.classList.remove('button-disabled');
			}

			if (val >= dataMax) {
				btnPlus.classList.add('button-disabled');
			} else {
				btnPlus.classList.remove('button-disabled');
			}
		};

		// Флаг для отслеживания, инициализировано ли поле
		let isInitialized = false;

		// Функция для инициализации поля с начальным значением
		const initializeInput = () => {
			if (!isInitialized) {
				currentValue = dataMin;
				input.value = formatValue(currentValue);
				updateButtons(currentValue);
				isInitialized = true;
			}
		};

		// Инициализация значения инпута
		let currentValue = null;
		const initialValueAttr = input.getAttribute('value');

		if (initialValueAttr !== null && initialValueAttr !== '') {
			// Если атрибут value существует и не пустой, инициализируем поле этим значением
			let parsedInitialValue = parseFloat(initialValueAttr.replace(',', '.'));
			if (isNaN(parsedInitialValue)) {
				parsedInitialValue = dataMin;
			}
			parsedInitialValue = Math.max(dataMin, Math.min(parsedInitialValue, dataMax));

			// Приведение к кратности dataStep
			const stepCount = Math.round((parsedInitialValue - dataMin) / dataStep);
			parsedInitialValue = parseFloat((dataMin + stepCount * dataStep).toFixed(10));

			currentValue = parsedInitialValue;
			input.value = formatValue(currentValue);
			isInitialized = true;
			updateButtons(currentValue);
		} else {
			// Если атрибут value отсутствует, оставляем поле пустым
			input.value = '';
			updateButtons(dataMin); // Устанавливаем начальное состояние кнопок
		}

		// Обработчик клика по кнопке плюс
		btnPlus.addEventListener('click', () => {
			initializeInput();
			if (btnPlus.classList.contains('button-disabled')) return;
			currentValue = parseFloat((currentValue + dataStep).toFixed(10));
			if (currentValue > dataMax) currentValue = dataMax;
			input.value = formatValue(currentValue);
			updateButtons(currentValue);
		});

		// Обработчик клика по кнопке минус
		btnMinus.addEventListener('click', () => {
			initializeInput();
			if (btnMinus.classList.contains('button-disabled')) return;
			currentValue = parseFloat((currentValue - dataStep).toFixed(10));
			if (currentValue < dataMin) currentValue = dataMin;
			input.value = formatValue(currentValue);
			updateButtons(currentValue);
		});

		// Обработчик фокуса на инпуте
		input.addEventListener('focus', () => {
			initializeInput();
			// Убираем единицу измерения для редактирования
			if (currentValue !== null) {
				input.value = parseValue(input.value).toString().replace('.', decimalSeparator);
			}
		});

		// Обработчик потери фокуса инпутом
		input.addEventListener('blur', () => {
			if (input.value === '') {
				// Если поле пустое, сбрасываем
				currentValue = null;
				input.value = '';
				btnPlus.classList.remove('button-disabled');
				btnMinus.classList.remove('button-disabled');
				isInitialized = false;
				return;
			}

			let val = parseFloat(input.value.replace(',', '.'));
			if (isNaN(val)) {
				val = dataMin;
			}
			val = Math.max(dataMin, Math.min(val, dataMax));

			// Приведение к кратности dataStep
			const stepCount = Math.round((val - dataMin) / dataStep);
			val = parseFloat((dataMin + stepCount * dataStep).toFixed(10));

			input.value = formatValue(val);
			currentValue = val;
			updateButtons(currentValue);
		});

		// Обработчик ввода в инпут
		input.addEventListener('input', (e) => {
			let value = input.value;

			// Разрешенные символы: цифры и один десятичный разделитель
			const regex = dataStepRaw.includes(',') ?
				/[^0-9,]/g :
				/[^0-9.]/g;
			value = value.replace(regex, '');

			// Разрешить только один десятичный разделитель
			const parts = value.split(decimalSeparator);
			if (parts.length > 2) {
				value = parts[0] + decimalSeparator + parts.slice(1).join('');
			}

			input.value = value;
		});

		// Запрет некратных step значений при вводе
		input.addEventListener('change', () => {
			if (input.value === '') {
				currentValue = null;
				btnPlus.classList.remove('button-disabled');
				btnMinus.classList.remove('button-disabled');
				isInitialized = false;
				return;
			}

			let val = parseFloat(input.value.replace(',', '.'));
			if (isNaN(val)) {
				val = dataMin;
			}
			val = Math.max(dataMin, Math.min(val, dataMax));

			// Проверка кратности dataStep
			const remainder = (val - dataMin) / dataStep;
			if (!Number.isInteger(remainder)) {
				// Округляем до ближайшего кратного
				val = dataMin + Math.round(remainder) * dataStep;
			}

			input.value = formatValue(val);
			currentValue = val;
			updateButtons(currentValue);
		});
	});
});


