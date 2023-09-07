const slider = document.getElementById('slider');
const sliderElements = document.querySelectorAll('.slider__element');
const rootStyle = document.documentElement.style;
let slideCounter = 0;
let isInTransition = false;
const DIRECTION = {
	left: 'left',
	right: 'right',
};
const getTransformValue = () =>
	Number(rootStyle.getPropertyValue('--slider-transform').replace('px', ''));
const reorderSlide = () => {
	const transformValue = getTransformValue();
	rootStyle.setProperty('--transition', 'none');
	if (slideCounter === sliderElements.length - 1) {
		slider.appendChild(slider.firstElementChild);
		rootStyle.setProperty(
			'--slider-transform',
			`${transformValue + sliderElements[slideCounter].scrollWidth}px`
		);
		slideCounter--;
	} else if (slideCounter === 0) {
		slider.prepend(slider.lastElementChild);
		rootStyle.setProperty(
			'--slider-transform',
			`${transformValue - sliderElements[slideCounter].scrollWidth}px`
		);
		slideCounter++;
	}

	isInTransition = false;
};
const moveSlider = direction => {
	if (isInTransition) return;
	const transformValue = getTransformValue();
	rootStyle.setProperty('--transition', 'transform 1s');
	isInTransition = true;
	if (direction === DIRECTION.left) {
		rootStyle.setProperty(
			'--slider-transform',
			`${transformValue + sliderElements[slideCounter].scrollWidth}px`
		);
		slideCounter--;
	} else if (direction === DIRECTION.right) {
		rootStyle.setProperty(
			'--slider-transform',
			`${transformValue - sliderElements[slideCounter].scrollWidth}px`
		);
		slideCounter++;
	}
};

document.addEventListener('click', e => {
	if (e.target.matches('.btn--left')) {
		moveSlider(DIRECTION.left);
	}
	if (e.target.matches('.btn--right')) {
		moveSlider(DIRECTION.right);
	}
});
slider.addEventListener('transitionend', reorderSlide);
reorderSlide();
setInterval(() => {
	moveSlider(DIRECTION.right);
}, 5000);
