/* Based off of advanced scrolling script provided in class */

(function () {
	'use strict';

	const captions = [
		'',
		'',
		'<div class="row1"><div class="top-left"><img src="images/monterey/geese.jpeg" alt="geese in a park"><h1 class="caption-header">Monterey Bay Park</h1><p class="caption">As a child, I spent countless hours running on the grass while my parents warned me not to get too close to the geese. This particular park has cypresses with particularly low-hanging branches that made a perfect climbing structure for a toddler.</p></div><div class="top-right"><img src="images/monterey/beach.jpeg" alt="beach in monterey"><h1 class="caption-header">Monterey Beach</h1><p class="caption">I spent many hours building sand castles and wading in the water while giggling with my sister.</p></div></div><div class="row2"><div class="bottom-left"><img src="images/monterey/seals.jpeg" alt="seals in monterey"><h1 class="caption-header">Coast Guard Pier</h1><p class="caption">I distinctly remember the pungent smell of sea lions that I encountered seasonally, year after year.</p></div><div class="bottom-right"><img src="images/monterey/tree.jpg" alt="A tree with flowers"><h1 class="caption-header">Monterey State Historic Park</h1><p class="caption">Almost daily, my parents and I would pass through this historic area and admire the gardens when going for a walk.</p></div>',
		'<div class="row1"><div class="top-left"><img src="images/hmb/muir.jpeg" alt="muir woods"><h1 class="caption-header">Muir Woods</h1><p class="caption">A quite recent expedition, I had the privilege of taking a hike and spending time among the redwoods in Muir Woods.</p></div><div class="top-right"><img src="images/hmb/castle-rock.jpeg" alt="castle rock state park"><h1 class="caption-header">Caste Rock State Park</h1><p class="caption">A classic Bay Area bouldering spot, I went on one of my first outdoor climbing trips in the bay. I nearly froze my hands while among the shady trees and boulders, but I warmed up on a fun top rope route.</p></div></div><div class="row2"><div class="bottom-left"><img src="images/hmb/beach.jpg" alt="half moon bay beach"><h1 class="caption-header">Francis Beach</h1><p class="caption">This is my favorite beach in Half Moon Bay due to its easy access from the coastal trail. I sometimes take a detour from the coastal trail when on a run.</p></div><div class="bottom-right"><img src="images/hmb/sunset.jpeg" alt="half moon bay sunset"><h1 class="caption-header">Beachwood</h1><p class="caption">I frequently enjoy a beautiful sunset view over the fields and eucalyptus groves behind my house when I am home.</p></div></div>',
		'<div class="row1"><div class="top-left"><img src="images/slovenia/triglav-1.jpeg" alt="julian alps"><h1 class="caption-header">Triglav National Park</h1><p class="caption">One of many breathtaking views in Triglav National Forest, this is from a trip dear to my heart. This was my second ascent of Triglav, for which I was joined by my sister and cousin.</p></div><div class="top-right"><img src="images/slovenia/forest.jpeg" alt="alpine forest"><h1 class="caption-header">Triglav National Park</h1><p class="caption">I remember stopping at this lush alpine meadow and eating a PB&J sandwich on my descent from the summit of Mt. Triglav.</p></div></div><div class="row2"><div class="bottom-left"><img src="images/slovenia/triglav-3.jpeg" alt="julian alps"><h1 class="caption-header">Triglav National Park</h1><p class="caption">The views from 9k+ feet are stunning. Due to the small size of Slovenia, I was able to see both Italy and Austria from such points of high elevation.</p></div><div class="bottom-right"><img src="images/slovenia/triglav-2.jpeg" alt="julian alps"><h1 class="caption-header">Triglav National Park</h1><p class="caption">This view was from my first ascent of Triglav, which took place with my parents and sister. A longer, 2-day route (compared to my second single day ascent), I remember starting to feel the fatigue once the vegetation gave way to endless rocky terrain.</p></div></div>',
		'<div class="row1"><div class="top-left"><img src="images/davis/berryessa.jpeg" alt="lake berryessa"><h1 class="caption-header">Annie\'s Rock</h1><p class="caption">My second time hiking near Lake Berryessa, this trail was much more remote and less trodden. My housemate and I did not run into anyone else on this particular loop.</p></div><div class="top-right"><img src="images/davis/putah.jpeg" alt="putah creek"><h1 class="caption-header">Putah Creek</h1><p class="caption">A Davis classic, I\'ve spent my fair share of afternoons biking to the Putah Creek Trailhead and walking along the river.</p></div></div><div class="row2"><div class="bottom-left"><img src="images/davis/rainbow.jpeg" alt="lake tahoe"><h1 class="caption-header">Rainbow, Lake Tahoe</h1><p class="caption">This was my first outdoor bouldering trip since climbing consistently. The weather was perfect and I took a break from climbing to skip rocks next to this stream while a friend played guitar.</p></div><div class="bottom-right"><img src="images/davis/dardanelle.jpeg" alt="lake dardanelle"><h1 class="caption-header">Lake Dardanelle, Desolation Wilderness</h1><p class="caption">As part of my first backpacking trip, I camped next to this gorgeous lake. Alpine lakes are my favorite scenery!</p></div></div>',
		'<div class="row1"><div class="top-left"><img src="images/seattle/rialto.jpeg" alt="rialto beach"><h1 class="caption-header">Rialto Beach, Olympic National Park</h1><p class="caption">I was thrilled to visit Olympic National Park because of it\'s incredibly diverse environments. Though I prefer mountains to beaches, this remains one of the most beautiful beaches I have visited. I saw anemones, colorful pebbles, and majestic rock formations at sunset.</p></div><div class="top-right"><img src="images/seattle/si.jpeg" alt="mt si"><h1 class="caption-header">Mount Si</h1><p class="caption">This mountain holds a special place in my heart. Having hiked and trailran it solo twice, as well as hiked it with my sister and family, it holds many fond memories. It is also a fantastic training hike and I use it as one of my main reference points for comparing difficulties of other hikes.</p></div></div><div class="row2"><div class="bottom-left"><img src="images/seattle/kayak.jpeg" alt="front of a kayak"><h1 class="caption-header">Lake Washington</h1><p class="caption">I knew I couldn\'t take the gorgeous lakes in the PNW for granted, so I tried kayaking for the first time since I was a small child. It was a ton of fun, and this particular session was a solo trip where I kayaked 4 miles.</p></div><div class="bottom-right"><img src="images/seattle/snowlake.jpeg" alt="snowlake lake"><h1 class="caption-header">Snow Lake</h1><p class="caption">This gorgeous view was part of a team hike I did with my coworkers. Besides seeing this lake from an overlook, I also walked down to the water and took a dip.</p></div></div>'];

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