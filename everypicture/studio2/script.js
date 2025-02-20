/* Based off of advanced scrolling script provided in class */

(function () {
	'use strict';

	const captions = [
		'',
		'',
		'<div id="row1"><div class="top-left"><img src="images/monterey/geese.jpeg" alt="geese in a park"><h1 class="caption-header">Laguna Grande Regional Park</h1><p class="caption">As a child, I spent countless hours running on the grass while my parents warned me not to get too close to the geese. This particular park has cypresses with particularly low-hanging branches that made a perfect climbing structure for a toddler.</p></div><div class="top-right"><img src="images/monterey/beach.jpeg" alt="beach in monterey"></div></div><div id="row2"><div class="bottom-left"><img src="images/monterey/seals.jpeg" alt="seals in monterey"></div><div class="bottom-right"><img src="images/monterey/tree.jpg" alt="A tree with flowers"></div>',
		'<div id="row1"><div class="top-left"><img src="images/hmb/muir.jpeg" alt="muir woods"></div><div class="top-right"><img src="images/hmb/castle-rock.jpeg" alt="castle rock state park"></div></div><div id="row2"><div class="bottom-left"><img src="images/hmb/beach.jpg" alt="half moon bay beach"></div><div class="bottom-right"><img src="images/hmb/sunset.jpeg" alt="half moon bay sunset"></div></div>',
		'<div id="row1"><div class="top-left"><img src="images/slovenia/triglav-1.jpeg" alt="julian alps"></div><div class="top-right"><img src="images/slovenia/forest.jpeg" alt="alpine forest"></div></div><div id="row2"><div class="bottom-left"><img src="images/slovenia/triglav-3.jpeg" alt="julian alps"></div><div class="bottom-right"><img src="images/slovenia/triglav-2.jpeg" alt="julian alps"></div></div>',
		'<div id="row1"><div class="top-left"><img src="images/davis/berryessa.jpeg" alt="lake berryessa"></div><div class="top-right"><img src="images/davis/putah.jpeg" alt="putah creek"></div></div><div id="row2"><div class="bottom-left"><img src="images/davis/rainbow.jpeg" alt="lake tahoe"></div><div class="bottom-right"><img src="images/davis/dardanelle.jpeg" alt="lake dardanelle"></div></div>',
		'<div id="row1"><div class="top-left"><img src="images/seattle/rialto.jpeg" alt="rialto beach"></div><div class="top-right"><img src="images/seattle/si.jpeg" alt="mt si"></div></div><div id="row2"><div class="bottom-left"><img src="images/seattle/kayak.jpeg" alt="front of a kayak"></div><div class="bottom-right"><img src="images/seattle/snowlake.jpeg" alt="snowlake lake"></div></div>'];

	let figCaption = document.querySelector('figcaption');

	figCaption.innerHTML = captions[1];

	/* Edge case: If the user is down the page and clicks the 
	browser refresh button for some reason, the page will refresh
	with the position down the page preserved, but the caption for
	the first section will appear, which is incorrect.

	This simply puts the top of the page at the top of the
	window when the user clicks the refresh button, preventing 
	this potential error.*/
	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	}

	window.addEventListener('load', function () {
		const posts = document.querySelectorAll('section');
		let postTops = [];
		let pageTop;
		let counter = 1;
		let prevCounter = 1;
		let doneResizing;

		// new variables for setting scroll direction...
		let exitDirection;
		let enterDirection;

		resetPagePosition();

		window.addEventListener('scroll', function () {
			pageTop = window.pageYOffset + 300;

			if (pageTop > postTops[counter]) {
				counter++;
				console.log(`scrolling down ${counter}`);
			} else if (counter > 1 && pageTop < postTops[counter - 1]) {
				counter--;
				console.log(`scrolling up ${counter}`);
			}

			/* there are different styles on the stylesheet for having the
			captions come in from the bottom and exit off the top, if the 
			user is scrolling down, or having captions come in from the top and exit at the bottom, if the user is scrolling up. */

			if (counter != prevCounter) {
				document.querySelector('#bg').className = 'sect' + counter;
				
				if (document.querySelector('#bg').className != 'sect1') {
					setTimeout(function () {
						document.querySelector('#note').style.display = 'block';
					}, 2600);
				}

				//if the user is scrolling down
				if (counter > prevCounter) {
					//set the correct classes
					exitDirection = 'animate exitup';
					enterDirection = 'animate enterup';
				}
				// if the user is scrolling up
				else {
					//set the correct classes
					exitDirection = 'animate exitdown';
					enterDirection = 'animate enterdown';
				}

				// uses the variables set above to set the classes...
				figCaption.className = exitDirection;
				figCaption.addEventListener('animationend', function () {
					let newCaption = document.querySelector('figcaption').cloneNode(true);
					figCaption.remove();
					newCaption.className = enterDirection;
					newCaption.innerHTML = captions[counter];
					document.querySelector('figure').appendChild(newCaption);
					figCaption = document.querySelector('figcaption');
				});

				prevCounter = counter;
				document.querySelector('#note').style.display = 'none';
			}

		}); // end window scroll function

		window.addEventListener('resize', function () {
			clearTimeout(doneResizing);
			doneResizing = setTimeout(function () {

				resetPagePosition();

			}, 500);
		});

		function resetPagePosition() {
			postTops = [];
			posts.forEach(function (post) {
				postTops.push(Math.floor(post.getBoundingClientRect().top) + window.pageYOffset);
			});

			const pagePosition = window.pageYOffset + 300;
			counter = 0;

			postTops.forEach(function (post) { if (pagePosition > post) { counter++; } });

		}

	}); // end window load function

})();