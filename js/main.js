// Rotate logo 360deg on each page refresh
(function rotate() {
	const logo = document.querySelector('.logo');
	logo.style.animation = 'spin 1000ms linear';
})();

// Hamburger menu
(function hamburgerMenu() {
	const hamburger = document.querySelector('.hamburger'),
		menu = document.querySelector('.menu');

	if (window.innerWidth < 1024) {
		const menuIcon = document.querySelector('#menu-icon'),
			body = document.querySelector('body');

		hamburger.addEventListener('click', () => {
			if (menu.style.display === 'none' || menu.style.display === '') {
				setTimeout(() => {
					menu.style.display = 'flex';
					menu.style.flexFlow = 'column nowrap';
					menu.style.justifyContent = 'center';
					menu.style.alignItems = 'center';
					menu.style.animation = 'slideIn 400ms ease-in';
				}, 1);

				menuIcon.classList.remove('icon-menu');
				menuIcon.classList.add('icon-x');
				body.style.overflow = 'hidden';
			} else {
				slideOut();
			}
		});

		// Outside click
		menu.addEventListener('click', () => {
			slideOut();
		});

		function slideOut() {
			menu.style.animation = 'slideOut 350ms ease-in';
			setTimeout(() => {
				menu.style.display = 'none';
			}, 300);

			menuIcon.classList.remove('icon-x');
			menuIcon.classList.add('icon-menu');
			body.style.overflow = 'unset';
		}
	}

	// Remove menu div & hamburger
	if (window.innerWidth > 1023) {
		const navigation = document.querySelector('#navigation'),
			menu = document.querySelector('.menu');

		navigation.appendChild(menu);
		hamburger.remove();
		menu.remove();
	}
})();
