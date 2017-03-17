$(function() {

	$(".animsition").animsition({
		inClass: 'zoom-in',
		outClass: 'zoom-out',
		inDuration: 800,
		outDuration: 800,
		linkElement: '.animsition-link',
		loading: true,
		loadingParentElement: 'body',
		loadingClass: 'loading',
		loadingInner: '<div class="loader">' +
			'<div class="loader-inner ball-scale-ripple-multiple">' +
			'<div></div>' +
			'<div></div>' +
			'<div></div>' +
			' </div>' +
			' </div>',
		timeout: false,
		timeoutCountdown: 5000,
		onLoadEvent: true,
		browser: ['animation-duration', '-webkit-animation-duration'],
		overlay: false,
		overlayClass: 'animsition-overlay-slide',
		overlayParentElement: 'body',
		transition: function(url) {
			window.location.href = url;
		}
	});
})