(function() {

	function SVGMenu(el, options) {
		this.el = el;
		this.init();
	}

	SVGMenu.prototype.init = function() {
		this.trigger = this.el.querySelector('button.menu__handle');
		this.shapeEl = this.el.querySelector('div.morph-shape');

		var s = Snap(this.shapeEl.querySelector('svg'));
		this.pathEl = s.select('path');
		this.paths = {
			reset: this.pathEl.attr('d'),
			open: this.shapeEl.getAttribute('data-morph-open'),
			close: this.shapeEl.getAttribute('data-morph-close')
		};

		this.isOpen = false;

		this.initEvents();
	};

	SVGMenu.prototype.initEvents = function() {
		this.trigger.addEventListener('click', this.toggle.bind(this));
	};

	SVGMenu.prototype.toggle = function() {
		var self = this;
		var $el = $(self.el);
		if (this.isOpen) {
			$el.removeClass('menu--anim');
			setTimeout(function() {
				$el.removeClass('menu--open');
				$(".mask-in").removeClass("act");
			}, 250);
		} else {
			$el.addClass('menu--anim');
			setTimeout(function() {
				$el.addClass('menu--open');
				$(".mask-in").addClass("act");
			}, 250);
		}
		this.pathEl.stop().animate({
			'path': this.isOpen ? this.paths.close : this.paths.open
		}, 350, mina.easeout, function() {
			self.pathEl.stop().animate({
				'path': self.paths.reset
			}, 800, mina.elastic);
		});

		this.isOpen = !this.isOpen;
	};


	$(".mask-in,.mask").click(function() {
		var $el = $(SM.el);
		if (SM.isOpen) {
			$el.removeClass('menu--anim');
			setTimeout(function() {
				$el.removeClass('menu--open');
				$(".mask-in").removeClass("act");
			}, 250);
		} else {
			$el.addClass('menu--anim');
			setTimeout(function() {
				$el.addClass('menu--open');
				$(".mask-in").addClass("act");
			}, 250);
		}
		SM.pathEl.stop().animate({
			'path': SM.isOpen ? SM.paths.close : SM.paths.open
		}, 350, mina.easeout, function() {
			SM.pathEl.stop().animate({
				'path': SM.paths.reset
			}, 800, mina.elastic);
		});

		SM.isOpen = !SM.isOpen;
	});

	var SM = new SVGMenu(document.getElementById('menu'));

})();