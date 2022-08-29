"use strict"

// form-send

document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		let formData = new FormData(form);

		if (error === 0) {
			form.classList.add('_sending');
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				form.reset();
				form.classList.remove('_sending');
			} else {
				alert("Ошибка");
				form.classList.remove('_sending');
			}
		} else {
			alert('Заполните обязательные поля');
		}

	}


	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
				formAddError(input);
				error++;
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}
	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
	//Функция теста email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
});

// animation

const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 10;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	setTimeout(() => {
		animOnScroll();
	}, 0);
}

// burger

$(document).ready(function(){
    $('.header__burger').click(function(event) {
		$('.header__burger,.header__menu').toggleClass('active');
		$('body').toggleClass('lock');
	});
	$('.header__link').click(function(event) {
		$('.header__burger,.header__menu').toggleClass('active');
	});

	$('.contacts__framelock').click(function(event) {
		$('.contacts__framelock').toggleClass('active');
	});
    
// slider

    $('.projects__slider').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="./icons/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="./icons/right.png"></button>',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });
    
    $('.reviews__slider').slick({
        speed: 1200,
        arrows: false,
        adaptiveHeight: true,
        dots: true
    });

// scroll

	$("body").on('click', '[href*="#"]', function(e){
		var fixed_offset = 80;
		$('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1000);
		e.preventDefault();
	  });

// lazy img

	  [].forEach.call(document.querySelectorAll('img[data-src]'),    function(img) {
		img.setAttribute('src', img.getAttribute('data-src'));
		img.onload = function() {
		  img.removeAttribute('data-src');
		};
	  });

// lazy yandex map

	let ok = false;                    
	window.addEventListener('scroll', function() {
		if (ok === false) {
			ok = true;    
			setTimeout(() => {                    
				let script = document.createElement('script');
				script.src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A9ae10cc03a540fc947b0d73fa203322e16997000f2e0b54d93749d243c2e7ff2&amp;width=100%25&amp;height=400&amp;lang=ru_RU&amp;scroll=false';
				document.getElementById('yamap').replaceWith(script);                        
			}, 2500)    
		}
	});

	
});