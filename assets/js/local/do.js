;(function ($) { // store vars in a privately scoped anonymous function

	document.ontouchmove = function (e) { // prevent default up/down page scrolling on iOS
		e.preventDefault();
	};

	var $objectCache = {
			row: {},
			col: {}
		},
		frameImgs = _.shuffle([
			'abstract_macro.jpg',
			'angry_flower.jpg',
			'baby_rhino.jpg',
			'bar_art.jpg',
			'baseball.jpg',
			'beach_scene.jpg',
			'bike_racer.jpg',
			'bitters.jpg',
			'blurry.jpg',
			'blurry_lights.jpg',
			'boogie_boarder.jpg',
			'bread_loafs.jpg',
			'bread_rolls.jpg',
			'cast_iron_food.jpg',
			'cityscape.jpg',
			'cityscape2.jpg',
			'copper_coil.jpg',
			'crazy_cat.jpg',
			'cute_dog.jpg',
			'derp_deer.jpg',
			'dinner_plate.jpg',
			'disco_ball.jpg',
			'dj.jpg',
			'dominican_ladies.jpg',
			'dutch_minivan.jpg',
			'fake_blond.jpg',
			'foggy_coast.jpg',
			'gorilla_in_forest.jpg',
			'indian_lady.jpg',
			'line_of_trees.jpg',
			'mangy_puppy.jpg',
			'motorcross.jpg',
			'ninja_kick.jpg',
			'old_lady.jpg',
			'old_man.jpg',
			'orchid.jpg',
			'pig.jpg',
			'runway_models.jpg',
			'shadowed_horse.jpg',
			'small_bar.jpg',
			'smoking_model.jpg',
			'solitary_building.jpg',
			'solo_island.jpg',
			'sprinters.jpg',
			'steak_salad.jpg',
			'street_car.jpg',
			'sushi.jpg',
			'transistors.jpg',
			'ubuntu_laptop.jpg',
			'underwater_swimmer.jpg',
			'vegas_ny.jpg',
			'vegas_ny_night.jpg',
			'veggies.jpg',
			'water_drop.jpg',
			'wet_glass.jpg',
			'white_people.jpg',
			'wilting_daisies.jpg'
		]).slice(0, 11), // shuffle all available images, then save the first 11
		imgPlease = function () { // return an image and rotate the list
			frameImgs.push(frameImgs.shift()); // remove the first element and add it to the end of the list
			return frameImgs[0]; // supply the current first image in the list
		},
		activeFrame = {
			row: 6,
			col: 6
		},
		drawGrid = function () {

			//

		},
		attachSwipe = function () {
			$objectCache.body.on('swipeLeft swipeRight swipeUp swipeDown', function (e) {
	    		//console.log(e);
	    		switch (e.type) {
					case 'swipeLeft':
						doSlide('right');
						break;
					case 'swipeRight':
						doSlide('left');
						break;
					case 'swipeUp':
						doSlide('down');
						break;
					case 'swipeDown':
						doSlide('up');
						break;
				}
	    	});
		},
		attachClick = function () {
			$objectCache.tapTarget.on('click', function (e) {
	    		//console.log(e);
	    		e.stopImmediatePropagation();
	    		doSlide($(this).data('slideDir'));
	    	});
		},
		attachType = function () {
			$objectCache.body.on('keydown', function (e) {
	    		//console.log(e);
	    		switch (e.which) {
					case 37:
						doSlide('left');
						break;
					case 38:
						doSlide('up');
						break;
					case 39:
						doSlide('right');
						break;
					case 40:
						doSlide('down');
						break;
				}
	    	});
		},
		doSlide = function (slideDir) { // slide in any primary direction: up, down, left, or right

			function quickSlide() {
				$objectCache.grid.scrollTo('.row-' + activeFrame.row + ' > .col-' + activeFrame.col, 750, {
					easing: 'easeOutExpo'
				});
			}

			function longSlide() {
				$objectCache.grid.scrollTo('.row-' + activeFrame.row + ' > .col-' + activeFrame.col, 3000, {
					easing: 'easeInOutBack'
				});
			}

			switch (slideDir) {
				case 'left':
					activeFrame.col--;
					break;
				case 'right':
					activeFrame.col++;
					break;
				case 'up':
					activeFrame.row--;
					break;
				case 'down':
					activeFrame.row++;
					break;
			}

			// around the world?
			if (activeFrame.row < 1) {
				activeFrame.row = 11;
				longSlide();
			} else if (activeFrame.row > 11) {
				activeFrame.row = 1;
				longSlide();
			} else if (activeFrame.col < 1) {
				activeFrame.col = 11;
				longSlide();
			} else if (activeFrame.col > 11) {
				activeFrame.col = 1;
				longSlide();
			} else {
				quickSlide();
			}

		},
		initFrameSize = function () {
			var iWidth = parseInt(window.innerWidth),
				iHeight = parseInt(window.innerHeight),
				iDiag = null,
				topLeftAngle = null,
				skewAngle = null;

	    	$('body, .visible-frame, .frame-col').css({
	    		width: iWidth,
	    		height: iHeight
	    	});
	    	$('.frame-container').css({
	    		width: (iWidth * 11) + 1000,
	    		height: (iHeight * 11) + 1000
	    	});

	    	/* special maths to position tap targets correctly */
	    	// 1) find the hypotenuse/diag measure of the screen using the Pythagorean theorem
	    	iDiag = Math.sqrt(Math.pow(iWidth, 2) + Math.pow(iHeight, 2));
			// 2) drawing a mental triangle with the hypotenuse running from the top left of the page to the bottom right, find the upper left angle using the Law of cosines, then convert the output from radians to degrees
			topLeftAngle = Math.acos(((Math.pow(iDiag, 2) + Math.pow(iWidth, 2) ) - Math.pow(iHeight, 2)) / (2 * iDiag * iWidth)) * (180 / Math.PI);
			// 3) find the skew angle using the previous solved angle
			skewAngle = 90 - (2 * topLeftAngle);
			/* /special maths to position tap targets correctly */

	    	$objectCache.tapTargetContainer.css({
	    		width: iDiag,
				height: iDiag,
				top: (iDiag / 2) * -1,
				'-webkit-transform': 'rotate(' + topLeftAngle + 'deg) skewX(-' + skewAngle + 'deg)',
				'-moz-transform': 'rotate(' + topLeftAngle + 'deg) skewX(-' + skewAngle + 'deg)',
				'-ms-transform': 'rotate(' + topLeftAngle + 'deg) skewX(-' + skewAngle + 'deg)',
				'-o-transform': 'rotate(' + topLeftAngle + 'deg) skewX(-' + skewAngle + 'deg)',
				transform: 'rotate(' + topLeftAngle + 'deg) skewX(-' + skewAngle + 'deg)'
	    	});

	    	// move back to center
    		$objectCache.grid.scrollTo('.row-6 > .col-6');

		},
		initWorld = function () {
			/* build grid */

			var tempGridFragment = '';

			_(11).times(function (n) {
				var tempNum = n + 1;
				tempGridFragment += '<div class="frame-row row-' + tempNum + '">';
				_(11).times(function (n) {
					var tempNum = n + 1,
						tempImg = imgPlease();
					tempGridFragment += '<img class="frame-col col-' + tempNum + '" src="assets/images/frames/' + tempImg + '" alt="' + tempImg.split('.')[0].replace('_', ' ') + '" />';
				});
				tempGridFragment += '</div>';
				imgPlease(); // rotate 1 more time
			});

			$('.frame-container').html(tempGridFragment);

			/* /build grid */

			/* cache DOM objects */

			$objectCache.body = $('body');

			$objectCache.grid = $('.visible-frame');

			_(11).times(function (n) {
				var tempNum = n + 1;
				$objectCache.row[tempNum] = $objectCache.grid.find('.row-' + tempNum);
				$objectCache.col[tempNum] = $objectCache.grid.find('.col-' + tempNum);
			});

			$objectCache.loadingOverlay = $('.loading-overlay');

			$objectCache.tapTarget = $('.tap-target');

			$objectCache.tapTargetContainer = $objectCache.tapTarget.parent();

			/* /cache DOM objects */

			/* register event handlers */

			// update frame height when window is resized or orientation changes
	 		$(window).on('orientationchange resize', function (e) {
	    		initFrameSize();
	    	});

			// register swipe event
	    	attachSwipe();
	    	attachClick();
	    	attachType();

			/* /register event handlers */

	    	// initialize frame height
	 		initFrameSize();

	    	// draw the grid for the first time
	    	drawGrid();

	    	// once the page has fully loaded, run image prefetching
	    	$(window).load(function () {
	    		preFetchImages();

	    		$objectCache.body.addClass('delayed');

	    		// start it off in the middle
	    		$objectCache.grid.scrollTo('.row-6 > .col-6');

	    		//$objectCache.loadingOverlay.animate({ opacity: 0 }, 'slow');
				var t = setTimeout(function () {
					$objectCache.loadingOverlay.fadeOut(1000);
				}, 250);
			});
		},
		preFetchCount = 0,
		preFetchImages = function () {
			var dummyImageObject = new Image();
			dummyImageObject.src = 'assets/images/frames/' + frameImgs[preFetchCount];
			dummyImageObject.onload = function () {
				preFetchCount++;
				if (preFetchCount < frameImgs.length) preFetchImages();
			};
		};

    /* when DOM is ready, bind some shit */

    $(function() {

    	initWorld();

	});

    /* /when DOM is ready, bind some shit */

})(jQuery);