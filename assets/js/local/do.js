(function () { // store vars in a privately scoped anonymous function

	document.ontouchmove = function (e) { // prevent default up/down page scrolling on iOS
		e.preventDefault();
	}

	var frameHeight = null,
		frameImgs = _.shuffle([
			'abstract_arial.jpg',
			'ants_in_line.jpg',
			'babseball.jpg',
			'baby_rhino.jpg',
			'bike_sprinter.jpg',
			'brandenburg_gate.jpg',
			'city_scape.jpg',
			'covered_face.jpg',
			'derp_deer.jpg',
			'flower_face.jpg',
			'foggy_coast.jpg',
			'giraffe.jpg',
			'golden_gate.jpg',
			'island_paradise.jpg',
			'long_exposure.jpg',
			'maze_pattern.jpg',
			'old_trees.jpg',
			'orchid.jpg',
			'photoshoot_outtake.jpg',
			'pretty_indian.jpg',
			'runway_models.jpg',
			'siamese_cat.jpg',
			'small_bar.jpg',
			'small_island.jpg',
			'steak_salad.jpg',
			'train_window.jpg',
			'veggies.jpg',
			'wilting_daisies.jpg'
		]),
		initFrameSize = function () {
			if (window.innerWidth > 1024) { // if loading on a desktop reduce the height to allow for a pretty frame
	    		frameHeight = window.innerHeight - 80;
	    	} else { // on a tablet use full available height
	    		frameHeight = window.innerHeight;
	    	}

	    	$('.visible-frame, section').css('height', frameHeight);
		};

    /* when DOM is ready, bind some shit */

    $(function() {

    	// redirect to the "start" frame
    	location.hash = 'start';

    	// initialize frame height
 		initFrameSize();

 		// update frame height when window is resized or orientation changes
 		$(window).on('orientationchange resize', function (e) {
    		initFrameSize();
    	});

    	// initialize frame images
    	$('.frame').each( function (index, item) {
    		$(this).css('background-image', 'url(assets/images/frames/' + frameImgs[index] + ')')
    	});

 		// register swipe events
    	$('body').on('swipeLeft swipeRight swipeUp swipeDown', function (e) {
    		console.log(e.type);
    		$('body').css('background-image', 'url(http://lorempixel.com/g/342/' + parseInt((frameHeight + 1) / 3) + '/)');
    	});

	});

    /* /when DOM is ready, bind some shit */

})();