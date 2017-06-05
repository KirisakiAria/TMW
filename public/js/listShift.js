jQuery(document).ready(function($) {
	//cache some jQuery objects
	var modalTrigger = $('.cd-modal-trigger'),
		transitionLayer = $('.cd-transition-layer'),
		transitionBackground = transitionLayer.children(),
		modalWindow = $('.cd-modal');

	var frameProportion = 1.78, //png frame aspect ratio
		frames = transitionLayer.data('frame'), //number of png frames
		resize = false;

	//set transitionBackground dimentions
	setLayerDimensions();
	$(window).on('resize', function() {
		if (!resize) {
			resize = true;
			(!window.requestAnimationFrame) ? setTimeout(setLayerDimensions, 300): window.requestAnimationFrame(setLayerDimensions);
		}
	});

	//open modal window
	modalTrigger.on('click', function(event) {
		event.preventDefault();
		var href = $(this).data("href");
		$("html,body").addClass('overflow-hidden');
		transitionLayer.addClass('visible opening');
		setTimeout(function() {
			modalWindow.addClass('visible');
			transitionLayer.removeClass('opening');
		}, 1000);
		//获取单页内容
		$.ajax({
			url: window.location.href + "/" + href,
			type: "get",
			success: function(data) {
				$(".modal-content").find("h3").html(data.titlel);
				$(".modal-content").find("p").html(data.content);
			}
		});
	});

	//close modal window
	modalWindow.on('click', '.modal-close', function(event) {
		event.preventDefault();
		transitionLayer.addClass('closing');
		modalWindow.removeClass('visible');
		transitionBackground.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
			transitionLayer.removeClass('closing opening visible');
			transitionBackground.off('webkitAnimationEnd oanimationend msAnimationEnd animationend');
		});
		$("html,body").removeClass('overflow-hidden');
		$(".modal-content").find("h3,p").empty();
	});

	function setLayerDimensions() {
		var windowWidth = $(window).width(),
			windowHeight = $(window).height(),
			layerHeight, layerWidth;

		if (windowWidth / windowHeight > frameProportion) {
			layerWidth = windowWidth;
			layerHeight = layerWidth / frameProportion;
		} else {
			layerHeight = windowHeight * 1.2;
			layerWidth = layerHeight * frameProportion;
		}

		transitionBackground.css({
			'width': layerWidth * frames + 'px',
			'height': layerHeight + 'px',
		});

		resize = false;
	}
});