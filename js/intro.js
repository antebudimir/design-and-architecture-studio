// Fade out intro img after 2000ms
(function fadeOut() {
	const intro = document.querySelector('#intro'),
		logo = document.querySelector('.logo');

	setTimeout(() => {
		intro.style.transition = 'opacity 3000ms';
		intro.style.opacity = '0';
	}, 3000);

	// Give transition 4000ms to do its thing & then change z-index so that the buttons become functional
	setTimeout(() => {
		intro.style.zIndex = '-1';
		logo.style.animation = 'spin 1000ms linear';
	}, 4000);
})();
