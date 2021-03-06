!(function () {
	function n(n) {
		r(n), t(n), e(n), a(n), i(n), s(n);
	}
	function r(n) {
		var r = n.params.slider;
		(r.className += ' gabs-initiated'),
			(r.style.position = 'relative'),
			(r.style.overflow = 'hidden'),
			(r.style.padding = '0');
		for (var t = 0; t < r.children.length; t++)
			(r.children[t].style.width = '100%'),
				(r.children[t].style.position = 'absolute'),
				(r.children[t].style.top = '0'),
				(r.children[t].style.left = '0'),
				(r.children[t].style[b.boxSizing] = 'border-box'),
				(r.children[t].style.willChange = T.transform),
				0 == t
					? ((r.children[0].style.position = 'relative'),
					  (r.children[0].style.zIndex = '2'))
					: (r.children[t].style.zIndex = '1');
		var e = new Event('initiated');
		r.dispatchEvent(e);
	}
	function t(n) {
		n.params.slider.addEventListener('mouseover', function (r) {
			o(n);
		}),
			n.params.slider.addEventListener('mouseout', function (r) {
				s(n);
			}),
			n.params.slider.addEventListener('touchstart', function (r) {
				h(r, n);
			}),
			n.params.slider.addEventListener('touchmove', function (r) {
				p(r, n);
			}),
			n.params.slider.addEventListener('touchend', function (r) {
				x(r, n);
			});
	}
	function e(n) {
		function r(r) {
			this.addEventListener('click', function (t) {
				t.preventDefault(),
					d(n, { toIndex: r, moveBackward: n.currentIndex > r }),
					m(n);
			}),
				(this.style.cursor = 'pointer');
		}
		if (n.params.indicators) {
			if (!n.params.indicators.children.length)
				for (var t = 0; t < n.params.slider.children.length; t++)
					n.params.indicators.insertAdjacentHTML(
						'beforeend',
						'<span class="gabs-indicator">&bull;</span>',
					);
			for (var t = 0; t < n.params.indicators.children.length; t++)
				r.call(n.params.indicators.children[t], t);
		}
	}
	function a(n) {
		n.params.btnNext &&
			n.params.btnNext.addEventListener('click', function (r) {
				d(n, { toIndex: c(n) }), m(n);
			}),
			n.params.btnPrevious &&
				n.params.btnPrevious.addEventListener('click', function (r) {
					d(n, { toIndex: l(n), moveBackward: !0 }), m(n);
				});
	}
	function i(n) {
		if (n.params.indicators) {
			for (var r = 0; r < n.params.indicators.children.length; r++)
				n.params.indicators.children[
					r
				].className = n.params.indicators.children[r].className.replace(
					' gabs-active',
					'',
				);
			n.params.indicators.children[n.currentIndex].className += ' gabs-active';
		}
	}
	function s(n) {
		if (n.params.animate) {
			o(n),
				(n.interval = setInterval(function () {
					d(n, { toIndex: c(n) });
				}, n.params.animationDelay));
			var r = new Event('start');
			n.params.slider.dispatchEvent(r);
		}
	}
	function o(n) {
		if (n.interval || n.timeout) {
			clearInterval(n.interval),
				clearInterval(n.timeout),
				(n.interval = null),
				(n.timeout = null);
			var r = new Event('stop');
			n.params.slider.dispatchEvent(r);
		}
	}
	function l(n) {
		var r = n.currentIndex - 1;
		return 0 > r ? n.params.slider.children.length - 1 : r;
	}
	function c(n) {
		var r = n.currentIndex + 1;
		return r == n.params.slider.children.length ? 0 : r;
	}
	function d(n, r) {
		var t = null;
		(t =
			r.toIndex == n.currentIndex ? '0%' : r.moveBackward ? '100%' : '-100%'),
			u(n, {
				toIndex: r.toIndex,
				xPos: t,
				useTransition: !0,
				moveBackward: r.moveBackward,
			}),
			(n.currentIndex = r.toIndex),
			i(n);
	}
	function u(n, r) {
		function t() {
			if (
				(r.useTransition &&
					((n.params.slider.children[e].style[b.transition] =
						T.transform + ' ' + n.params.animationDuration + 'ms'),
					(n.params.slider.children[r.toIndex].style[b.transition] =
						T.transform + ' ' + n.params.animationDuration + 'ms')),
				(n.params.slider.children[e].style[b.transform] =
					'translateX(' + r.xPos + ')'),
				r.useTransition)
			)
				n.params.slider.children[r.toIndex].style[b.transform] =
					'translateX(0%)';
			else {
				var t = window.innerWidth * (a / 100);
				r.moveBackward && (t *= -1),
					(t += parseInt(r.xPos, 10) * (a / 100)),
					(n.params.slider.children[r.toIndex].style[b.transform] =
						'translateX(' + t + 'px)');
			}
		}
		for (
			var e = n.currentIndex, a = 5, i = 0;
			i < n.params.slider.children.length;
			i++
		)
			if (
				((n.params.slider.children[i].style[b.transition] = 'none'),
				e != r.toIndex &&
					(i == r.toIndex
						? (n.params.slider.children[r.toIndex].style.zIndex = '2')
						: i == e
						? (n.params.slider.children[e].style.zIndex = '3')
						: (n.params.slider.children[i].style.zIndex = '1'),
					i != e))
			) {
				var s = n.params.slider.children[i].style[b.transform];
				s && (s = s.match(/\d+/)[0]);
				var o = !(!s || 100 == s || s == a);
				r.moveBackward
					? o ||
					  (n.params.slider.children[i].style[b.transform] =
							'translateX(-' + a + '%)')
					: o ||
					  (n.params.slider.children[i].style[b.transform] =
							'translateX(' + a + '%)');
			}
		r.useTransition ? setTimeout(t, 1) : t();
	}
	function m(n) {
		o(n),
			(n.timeout = setTimeout(function () {
				s(n);
			}, n.params.animationDelay));
	}
	function h(n, r) {
		o(r),
			n.touches.length > 1
				? f(r)
				: 1 == n.touches.length &&
				  ((r.touchXStart = n.targetTouches[0].pageX),
				  (r.touchXCurrent = r.touchXStart),
				  (r.touchYStart = n.targetTouches[0].pageY),
				  (r.touchYCurrent = r.touchYStart));
	}
	function f(n) {
		var r = n.touchXCurrent - n.touchXStart,
			t = 0.2 * window.innerWidth;
		t > 110 && (t = 110),
			r > t
				? d(n, { toIndex: l(n), moveBackward: !0 })
				: -1 * t > r
				? d(n, { toIndex: c(n) })
				: d(n, { toIndex: n.currentIndex });
	}
	function p(n, r) {
		n.touches.length > 1
			? f(r)
			: 1 == n.touches.length &&
			  ((r.touchXCurrent = n.targetTouches[0].pageX),
			  (r.touchYCurrent = n.targetTouches[0].pageY),
			  I(r) ? (n.preventDefault(), v(r)) : f(r));
	}
	function v(n) {
		var r = n.touchXCurrent - n.touchXStart,
			t = r > 0,
			e = null;
		t
			? ((e = n.currentIndex - 1),
			  0 == n.currentIndex && (e = n.params.slider.children.length - 1))
			: ((e = n.currentIndex + 1),
			  n.currentIndex == n.params.slider.children.length - 1 && (e = 0)),
			u(n, { toIndex: e, xPos: r + 'px', useTransition: !1, moveBackward: t });
	}
	function x(n, r) {
		f(r), s(r);
	}
	function I(n) {
		var r = n.touchXCurrent - n.touchXStart,
			t = n.touchYCurrent - n.touchYStart;
		return Math.abs(t) > Math.abs(r) ? !1 : !0;
	}
	function g(n, r) {
		var n = n || {},
			r = r || {};
		for (prop in r) n[prop] = r[prop];
		return n;
	}
	function w(n) {
		for (var r in n) if (void 0 !== y.style[n[r]]) return n[r];
		return !1;
	}
	if (window.gaBasicSlider) throw new Error('gaBasicSlider alredy exists');
	window.gaBasicSlider = function (r) {
		var t = {
				slider: null,
				btnNext: null,
				btnPrevious: null,
				indicators: null,
				animate: !0,
				animationDelay: 6e3,
				animationDuration: 500,
			},
			e = {
				params: g(t, r),
				currentIndex: 0,
				interval: null,
				timeout: null,
				touchXStart: null,
				touchXCurrent: null,
				touchYStart: null,
				touchYCurrent: null,
			};
		(this.start = function () {
			(e.params.animate = !0), s(e);
		}),
			(this.stop = function () {
				(e.params.animate = !1), o(e);
			}),
			e.params.slider && e.params.slider.children.length > 1 && n(e);
	};
	var y = document.createElement('div'),
		b = {
			transition: (function () {
				var n = [
					'transition',
					'webkitTransition',
					'MozTransition',
					'OTransition',
					'msTransition',
				];
				return w(n);
			})(),
			transform: (function () {
				var n = [
					'transform',
					'webkitTransform',
					'MozTransform',
					'OTransform',
					'msTransform',
				];
				return w(n);
			})(),
			boxSizing: (function () {
				var n = ['boxSizing', 'webkitBoxSizing', 'MozBoxSizing'];
				return w(n);
			})(),
		},
		T = {
			transform: (function () {
				var n = {
					transform: 'transform',
					webkitTransform: '-webkit-transform',
					MozTransform: '-moz-transform',
					OTransform: '-o-transform',
					msTransform: '-ms-transform',
				};
				return b.transform ? n[b.transform] : !1;
			})(),
		};
})();
// Initialize Slider
const parameters = {
	slider: document.getElementById('bgSlider'),
	btnNext: document.getElementById('myNext'),
	btnPrevious: document.getElementById('myPrevious'),
	indicators: document.getElementById('myIndicators'),
};

const bgSlider = new gaBasicSlider(parameters);
