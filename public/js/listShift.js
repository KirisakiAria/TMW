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
		var modalId = $(event.target).attr('href');
		transitionLayer.addClass('visible opening');
		setTimeout(function() {
			modalWindow.filter(modalId).addClass('visible');
			transitionLayer.removeClass('opening');
		}, 1000);
		//过渡结束进行ajax
		modalWindow.filter(modalId).get(0).addEventListener("transitionend", function() {
			var json = {
				time: new Date().getTime()
			};
			window.history.pushState(json, "", "/index");
		});
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