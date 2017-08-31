// funkcija 'debounce' se pokrece svaki put kada skrolujemo, ali zato funkcija koju prosledjujemo njoj (checkSlide) se pokrece svakih 20 milisekundi (wait) sto ce dosta smanjiti broj zahteva
function debounce(func, wait = 20, immediate = true) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

// selektujemo sve slike
const sliderImages = document.querySelectorAll('.slide-in');

function checkScroll(e) {
	sliderImages.forEach(sliderImage => {
		
		// window.scrollY nam govori koliko smo skrolovali u odnosu na gornju ivicu browsera
		//window.scrollY + window.innerHeight nam govori koliko smo skrolovali u odnosu na donju ivicu browsera
		const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
		
		// sliderImage.offsetTop na govori koliko je gornja ivica slike udaljena od gornje ivice browsera
		// sliderImage.offsetTop + sliderImage.height nam govori koliko je donja ivica slike udaljena od gornje ivice browsera
		const imageBottom = sliderImage.offsetTop + sliderImage.height;
		
		const isHalfShown = slideInAt > sliderImage.offsetTop;
		const isNotScrolledPast = window.scrollY < imageBottom;
		
		if(isHalfShown && isNotScrolledPast) {
			sliderImage.classList.add('active');
		} else {
			sliderImage.classList.remove('active');
		}
	})
}

window.addEventListener('scroll', debounce(checkScroll));