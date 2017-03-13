$(function() {
	//菜单
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
					$(".mask").removeClass("act");
				}, 250);
				this.pathEl.stop().animate({
					'path': this.paths.close
				}, 350, mina.easeout, function() {
					self.pathEl.stop().animate({
						'path': self.paths.reset
					}, 700, mina.elastic);
				});
			} else {
				$el.addClass('menu--anim');
				setTimeout(function() {
					$el.addClass('menu--open');
					$(".mask").addClass("act");
				}, 250);

				this.pathEl.stop().animate({
					'path': this.paths.open
				}, 350, mina.backin, function() {
					self.pathEl.stop().animate({
						'path': self.paths.reset
					}, 700, mina.elastic);
				});
			}
			this.isOpen = !this.isOpen;
		};
		new SVGMenu(document.getElementById('menu'));
	})();
})