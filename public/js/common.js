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
		loadingInner: '<div class="loader"></div>',
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

	function fn(e, thisa) {
		e.preventDefault();
		$(".page").find("li").removeClass("act");
		thisa.parent().addClass("act");
		$(".pagecontent").find("a").addClass('hidden');
		$(".loader").remove();
		$(".pagecontent").append('<div class="loader"></div>');
		return thisa.html();
	}
	$(".news").find(".page").find("a").click(function(e) {
		var thisa = $(this);
		var pageid = fn(e, thisa);
		$.ajax({
			url: window.location.href + /page/ + pageid,
			type: "get",
			success: function(data) {
				$("#src1,#src2").remove();
				var html = "";
				data.forEach(function(e, i) {
					html += '<a href="#cd-modal" data-href="' + data[i].id + '"' +
						'class="tilter cd-modal-trigger">' +
						'<figure class="tilter__figure">' +
						'<img class="tilter__image" src="../img/1.jpg" alt="" />' +
						'<div class="tilter__deco tilter__deco--shine">' +
						'<div></div>' +
						'</div>' +
						'<div class="tilter__deco tilter__deco--overlay"></div>' +
						'<figcaption class="tilter__caption">' +
						'<h3 class="tilter__title" data-title=' + data[i].titles + '>' +
						data[i].titles + '</h3>' +
						'<p class="tilter__description" data-title=' + data[i].author + '>' +
						data[i].author + '</p>' +
						'</figcaption>' +
						'<svg class="tilter__deco tilter__deco--lines" viewBox="0 0 300 415">' +
						'<path d="M20.5,20.5h260v375h-260V20.5z" />' +
						'</svg>' +
						'</figure>' +
						'</a>'
				});
				$(".loader").fadeOut().remove();
				$(".pagecontent").empty().append(html);
				$.getScript("/js/hovereffect.js", function() {
					(function() {
						var tiltSettings = {
							movement: {
								imgWrapper: {
									translation: {
										x: 10,
										y: 10,
										z: 30
									},
									rotation: {
										x: 0,
										y: -10,
										z: 0
									},
									reverseAnimation: {
										duration: 200,
										easing: 'easeOutQuad'
									}
								},
								lines: {
									translation: {
										x: 10,
										y: 10,
										z: [0, 70]
									},
									rotation: {
										x: 0,
										y: 0,
										z: -2
									},
									reverseAnimation: {
										duration: 2000,
										easing: 'easeOutExpo'
									}
								},
								caption: {
									rotation: {
										x: 0,
										y: 0,
										z: 2
									},
									reverseAnimation: {
										duration: 200,
										easing: 'easeOutQuad'
									}
								},
								overlay: {
									translation: {
										x: 10,
										y: -10,
										z: 0
									},
									rotation: {
										x: 0,
										y: 0,
										z: 2
									},
									reverseAnimation: {
										duration: 2000,
										easing: 'easeOutExpo'
									}
								},
								shine: {
									translation: {
										x: 100,
										y: 100,
										z: 0
									},
									reverseAnimation: {
										duration: 200,
										easing: 'easeOutQuad'
									}
								}
							}
						};

						function init() {
							[].slice.call(document.querySelectorAll('a.tilter')).forEach(function(el, pos) {
								new TiltFx(el, tiltSettings);
							});
						}

						// Preload all images.
						imagesLoaded(document.querySelector('main'), function() {
							document.body.classList.remove('loading');
							init();
						});

					})();
				});
				$.getScript("/js/listShift.js");
			},
			error: function() {

			}
		});
	});

	$(".daily").find(".page").find("a").click(function(e) {
		var thisa = $(this);
		var pageid = fn(e, thisa);
		$.ajax({
			url: window.location.href + /page/ + pageid,
			type: "get",
			success: function(data) {
				$("#src1,#src2").remove();
				var html = "";
				var circle = ""
				data.forEach(function(e, i, array) {
					if (i >= 3 && i % 3 == 0) {
						//每三个a标签外面套个div 循环三次清空一次变量circle以便进行下次循环
						html += "<div class='grid grid--effect-pollux'>" + circle + "</div>";
						circle = "";
					}
					circle += "<a href='javascript:;' class='cd-modal-trigger grid__item' data-url='daily'  data-href=" + data[i].id + ">" +
						"<div class='stack'>" +
						"<div class='stack__deco'></div>" +
						"<div class='stack__deco'></div>" +
						"<div class='stack__deco'></div>" +
						"<div class='stack__deco'></div>" +
						"<div class='stack__figure'>" +
						"<img class='stack__img' src='../img/1.png' alt='daily'/>" +
						"</div>" +
						"</div>" +
						"<div class='grid__item-caption'>" +
						"<h3 class='grid__item-title' data-title=" + data[i].titles + ">" +
						data[i].titles + "</h3>" +
						"</div>" +
						"</a>";
					//循环到最后一个的时候就把剩下的全部加入到变量html中
					if (i == array.length - 1) {
						html += "<div class='grid grid--effect-pollux'>" + circle + "</div>";
					}
				});
				$(".loader").fadeOut().remove();
				$(".pagecontent").empty().append(html);
			},
			error: function() {

			}
		});
	});
});