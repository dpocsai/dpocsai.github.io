const boxes = document.querySelectorAll('.div');
const mid = document.querySelector('.mid');
const score = document.querySelector('.score');
const time = document.querySelector('.time');
const start = document.querySelector('.start');
const reset = document.querySelector('.reset');

const colors = [ 'red', 'blue', 'darkGreen', 'blueviolet', 'cyan', 'magenta', 'yellow', 'chartreuse' ];
let sc = 0;
let sm = 1;
let hs = 0;
const shuffle = () => {
	for (let i = colors.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));

		[ colors[i], colors[j] ] = [ colors[j], colors[i] ];
	}
	return colors;
};

const setColors = () => {
	shuffle();
	for (let i = 0; i < boxes.length; i++) {
		boxes[i].style.backgroundColor = colors[i];
	}

	mid.style.backgroundColor = colors[Math.floor(Math.random() * 8)];
	mid.style.border = `5px solid ${colors[Math.floor(Math.random() * 8)]}`;
};
start.addEventListener('click', function() {
	sc = 0;
	sm = 1;
	score.style.color = 'black';
	score.innerText = `Score:${sc}`;
	setColors();
	start.disabled = true;
	for (let box of boxes) {
		box.disabled = false;
	}
	mid.disabled = false;
	let t = 19;
	const timer = () => {
		time.innerText = `Time:${t}`;
		t--;
		if (t <= 3) {
			time.style.color = 'red';
		}
		if (t === -1) {
			clearInterval(timer_);
			start.disabled = false;
			for (let box of boxes) {
				box.disabled = true;
				box.style.backgroundColor = 'white';
			}
			mid.disabled = true;
			time.style.color = 'black';
			mid.style.backgroundColor = 'black';
			mid.style.border = '5px solid black';
			sm = 1;
			if (sc > hs) {
				hs = sc;
				score.style.color = 'yellow';
				score.innerText = `Highscore!${hs}`;
			}
		}
	};
	const timer_ = setInterval(timer, 1000);
	reset.addEventListener('click', function() {
		start.disabled = false;
		sc = 0;
		sm = 1;
		score.innerText = `Score:${sc}`;
		for (let box of boxes) {
			box.disabled = true;
			box.style.backgroundColor = 'white';
		}
		mid.disabled = true;
		time.style.color = 'black';
		time.innerText = `Time:0`;
		score.style.color = 'black';
		mid.style.backgroundColor = 'black';
		mid.style.border = '5px solid black';
		clearInterval(timer_);
	});
});
mid.addEventListener('click', function() {
	if (sc >= 10) {
		sm = 2;
	}
	if (sc >= 30) {
		sm = 3;
	}
	if (sc >= 60) {
		sm = 4;
	}
	if (mid.style.backgroundColor === mid.style.borderColor) {
		sc += sm * 2;
		score.innerText = `Score:${sc}`;
		setColors();
	} else {
		sc -= sm;
		score.innerText = `Score:${sc}`;

		setColors();
	}
});
for (let box of boxes) {
	box.addEventListener('click', function() {
		if (sc >= 10) {
			sm = 2;
		}
		if (sc >= 30) {
			sm = 3;
		}
		if (sc >= 60) {
			sm = 4;
		}
		if (mid.style.backgroundColor === mid.style.borderColor) {
			sc -= sm * 2;
			score.innerText = `Score:${sc}`;
			setColors();
		} else {
			if (box.style.backgroundColor === mid.style.backgroundColor) {
				sc += sm;
				score.innerText = `Score:${sc}`;
				setColors();
			} else {
				sc -= sm;
				score.innerText = `Score:${sc}`;
				setColors();
			}
		}
	});
}
