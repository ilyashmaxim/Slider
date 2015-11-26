/*$(function() {*/

(function() {
	'use strict';
	//debugger;

	function Slider(node, slides) {
		this.root = node;
		this.slides = slides.slice();
		this.Builder();
		this.AnimateImg();
		this.SelectImg();
	}
	Slider.prototype.Builder = function() {
		var conteiner = document.createElement('div');
		$(conteiner).addClass('conteiner');
		var coll1 = document.createElement('div');
		$(coll1).addClass('coll navi');
		for (var i = 0; i < 4; i++) {
			var link = document.createElement('a');
			$(link).addClass('classLink').attr({
				"href": "#",
				"value": (i + 1)
			});
			coll1.appendChild(link);
		}
		conteiner.appendChild(coll1);
		var coll2 = document.createElement('div');
		$(coll2).addClass('coll gallery');
		for (var j = 0; j < this.slides.length; j++) {
			var img = document.createElement('img');
			$(img).attr('src', this.slides[j]).attr('value', (j + 1));
			if (j === 0) {
				$(img).addClass('classImg active');
			} else {
				$(img).addClass('classImg notactive');
			}
			coll2.appendChild(img);
		}
		conteiner.appendChild(coll2);
		this.root.appendChild(conteiner);
	};

	Slider.prototype.SelectImg = function() {
		var self = this;
		$('.navi').on('click', '.classLink', function(event) {
			var target = event.target;
			var linkIndex = $(target).attr('value');
			$('.active').addClass('notactive').removeClass('active');
			$('.classImg')
				.filter('[value=' + linkIndex + ']')
				.addClass('active')
				.removeClass('notactive')
				.stop();
			clearInterval(interval);
			setTimeout(self.AnimateImg(), 3000);
		});
	};
	Slider.prototype.AnimateImg = function() {
		var count = 1;
		var $selfy = $('.classImg');
		var interval = setInterval(Anim, 1000);

		function Anim() {
			if (count > 4) count = 1;
			var $activeImg = $selfy.filter('[value=' + count + ']');
			var $previusImg;
			if (count === 1) {
				$previusImg = $selfy.filter('[value=' + 4 + ']');
			} else {
				$previusImg = $selfy.filter('[value=' + (count - 1) + ']');
			}
			//$('.gallery').animate(800, function() {
			//	$activeImg.addClass('active').removeClass('notactive');
			//	$previusImg.addClass('notactive').removeClass('active');
			//});
			$activeImg.css({
				'margin-left': 0,
				'display': 'block',
				'float':'right'
			}).animate({
				'margin-left': 340
			}, 800, function() {
				$activeImg.addClass('notactive').removeClass('active');
			});
			$previusImg.css({
				'margin-left': -340,
				'display': 'block',
				'float':'left'
			}).animate({
				'margin-left': 0,
				'display': 'none'
			}, 800, function() {
				$previusImg.addClass('active').removeClass('notactive');
			});
			count++;
		}
	};
	window.Slider = Slider;
})();

/*});*/