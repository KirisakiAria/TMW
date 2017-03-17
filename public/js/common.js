$(function() {
	$(".animsition").animsition({
		inClass: 'zoom-in',
		outClass: 'zoom-out',
		inDuration: 800,
		outDuration: 800,
		linkElement: '.animsition-link',
		loading: true,
		loadingParentElement: 'body',
		loadingClass: 'animsition-loading',
		loadingInner: '<div class="svg-container" id="container">' +
			'<svg id="loader" width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">'+
		'<path id="jump" fill="none" stroke="#383845" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M47.5,94.3c0-23.5,19.9-42.5,44.5-42.5s44.5,19,44.5,42.5" />' +
		'<g stroke="#383845" stroke-width="1">' +
		'<ellipse id="circleL" fill="none" stroke-miterlimit="10" cx="47.2" cy="95.6" rx="10.7" ry="2.7" />' +
		'<ellipse id="circleR" fill="none" stroke-miterlimit="10" cx="136.2" cy="95.6" rx="10.7" ry="2.7" />' +
		'</g>' +
		'</svg>' +
		'</div>',
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