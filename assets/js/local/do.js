(function () { // store vars in a privately scoped anonymous function

	document.ontouchmove = function (e) { // prevent default up/down page scrolling on iOS
		e.preventDefault();
	};

	var $activePanels = null,
		initFrameSize = function () {
			if (window.innerWidth > 1024) { // if loading on a desktop reduce the height to allow for a pretty frame
	    		var frameHeight = window.innerHeight - 80;
	    	} else { // on a tablet use full available height
	    		var frameHeight = window.innerHeight;
	    	}

	    	$('.visible-frame, section').css('height', frameHeight);

	    	location.hash = 'check1';
	    	location.hash = 'endless';
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
		]),
		imgPlease = function () { // return an image and rotate the list
			frameImgs.push(frameImgs.shift()); // remove the first element and add it to the end of the list
			return frameImgs[0]; // supply the current first image in the list
		},
		theKnownWorld = {
			'0x1': '',
			'-1x0': '',
			'0x0': '',
			'1x0': '',
			'0x-1': ''
		},
		activeFrame = {
			coordX: 0,
			coordY: 0
		},
		drawGrid = function () {

			$('.frameUp').data('coord-x', activeFrame.coordX).data('coord-y', activeFrame.coordY + 1);
			$('.frameLeft').data('coord-x', activeFrame.coordX - 1).data('coord-y', activeFrame.coordY);
			$('.frameCenter').data('coord-x', activeFrame.coordX).data('coord-y', activeFrame.coordY);
			$('.frameRight').data('coord-x', activeFrame.coordX + 1).data('coord-y', activeFrame.coordY);
			$('.frameDown').data('coord-x', activeFrame.coordX).data('coord-y', activeFrame.coordY - 1);

			$activePanels.each( function (index, item) {
	    		var tempCoordString = $(this).data('coord-x') + 'x' + $(this).data('coord-y');

	    		if (theKnownWorld[tempCoordString] == undefined || theKnownWorld[tempCoordString] == '') theKnownWorld[tempCoordString] = imgPlease(); // if the given coordinates don't yet have an image associated, set an image

	    		$(this).css('background-image', 'url(assets/images/frames/' + theKnownWorld[tempCoordString] + ')');
	    	});
		},
		doSwipe = function (swipeType) {

			switch (swipeType) {
				case 'swipeLeft':
					activeFrame.coordX++;
					break;
				case 'swipeRight':
					activeFrame.coordX--;
					break;
				case 'swipeUp':
					activeFrame.coordY--;
					break;
				case 'swipeDown':
					activeFrame.coordY++;
					break;
			}

			$('.visible-frame').scrollTo('.' + swipeType, 1000, {
				easing: 'easeOutExpo',
				onAfter: function () {
					$('.frameCenter').css('background-image', 'url(assets/images/frames/' + theKnownWorld[activeFrame.coordX + 'x' + activeFrame.coordY] + ')');
					$('.visible-frame').scrollTo('.frameCenter', {
						onAfter: function () {
							drawGrid();
							attachSwipeEvent();
						}
					});
				}
			});

			preAssignImages();

		},
		preAssignImages = function () {
			var neighborFrames = [];
			_(3).times(function (n) {
				n++;
				neighborFrames.push((activeFrame.coordX + n) + 'x' + activeFrame.coordY);
				neighborFrames.push((activeFrame.coordX - n) + 'x' + activeFrame.coordY);
				neighborFrames.push(activeFrame.coordX + 'x' + (activeFrame.coordY + n));
				neighborFrames.push(activeFrame.coordX + 'x' + (activeFrame.coordY - n));
				neighborFrames.push((activeFrame.coordX + n) + 'x' + (activeFrame.coordY + n));
				neighborFrames.push((activeFrame.coordX - n) + 'x' + (activeFrame.coordY - n));
			});

			$.each(neighborFrames, function (index, item) {
	    		if (theKnownWorld[item] == undefined || theKnownWorld[item] == '') theKnownWorld[item] = imgPlease(); // if the given coordinates don't yet have an image associated, set an image
	    	});
		},
		preFetchCount = 0,
		preFetchImages = function () {

			if (preFetchCount < frameImgs.length) preFetchNext();

			function preFetchNext () {
				var dummyImageObject = new Image();
				dummyImageObject.src = 'assets/images/frames/' + frameImgs[preFetchCount];
				dummyImageObject.onload = function () {
					preFetchCount++;
					t = setTimeout(preFetchImages, 1000);
				};
			}
		},
		attachSwipeEvent = function () {
			$('body').one('swipeLeft swipeRight swipeUp swipeDown', function (e) {
	    		doSwipe(e.type);
	    	});
		};

    /* when DOM is ready, bind some shit */

    $(function() {

    	$activePanels = $('section').not('.placeholder');

    	// redirect to the "start" frame
    	location.hash = 'endless';

    	// initialize frame height
 		initFrameSize();

 		// update frame height when window is resized or orientation changes
 		$(window).on('orientationchange resize', function (e) {
    		initFrameSize();
    	});

    	// draw the grid for the first time
    	drawGrid();

 		// register swipe event
    	attachSwipeEvent();

    	// once the page has fully loaded, run image prefetching
    	$(window).load(function () {
    		preFetchImages();
		});

	});

    /* /when DOM is ready, bind some shit */

})();