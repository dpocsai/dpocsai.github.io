const easy = document.querySelector('.easy');
const hard = document.querySelector('.hard');
const time = document.querySelector('.timer');
const score = document.querySelector('.score');
const boxes = document.querySelectorAll('.test');
const guess = document.querySelector('.guess');
const question = document.querySelector('h2');
const reset = document.querySelector('.reset');
const rules = document.querySelector('p');

let hardNums = [];
let scorecount = 0;
let idx = 3;
let s = 1;

hard.addEventListener('click', function() {
	rules.innerText = 'TAP HERE FOR RULES';
	score.innerText = `Score: 0`;
	idx = 3;
	s = 1;
	scorecount = 0;
	guess.disabled = false;
	time.style.color = 'black';
	for (let box of boxes) {
		box.innerText = '';
		box.style.fontSize = '35px';
	}
	hardNums = [];
	question.innerText = '';
	while (hardNums.length < idx) {
		let hrn = Math.floor(Math.random() * idx) + 1;
		if (!hardNums.includes(hrn)) hardNums.push(hrn);
	}
	for (let i = 0; i < idx; i++) {
		boxes[i].innerText = hardNums[i];
		boxes[i].disabled = false;
	}
	let t = 59;
	const testtimer = () => {
		time.innerText = `Time: ${t}`;
		t--;
		if (t < 5) {
			time.style.color = 'red';
		}
		if (t === -1) {
			clearInterval(test);
			time.innerText = `Time: 0`;
			guess.disabled = true;
			question.innerText = 'Select Difficulty';
			idx = 3;
			s = 1;
			scorecount = 0;
			for (let box of boxes) {
				box.disabled = true;
			}
		}
	};
	const test = setInterval(testtimer, 1000);
	reset.addEventListener('click', function() {
		clearInterval(test);
		rules.innerText = 'TAP HERE FOR RULES';
		time.innerText = `Time: 60`;
		idx = 3;
		s = 1;
		scorecount = 0;
		guess.disabled = false;
		time.style.color = 'black';
		for (let box of boxes) {
			box.innerText = '';
			box.style.fontSize = '35px';
			box.disabled = true;
		}
		hardNums = [];
		question.innerText = 'Select Difficulty';
		score.innerText = 'Score: 0';
	});
});

guess.addEventListener('click', function() {
	question.innerText = hardNums.length ? hardNums[Math.floor(Math.random() * idx)] : 'Select Difficulty';
	for (let box of boxes) {
		box.style.fontSize = '0';
		box.style.backgroundColor = 'lightgray';
	}
});
for (let b of boxes) {
	b.addEventListener('click', function() {
		if (b.innerText === question.innerText) {
			scorecount += s;
			idx < 9 ? idx++ : (idx + 0, s++);
			for (let box of boxes) {
				box.style.backgroundColor = 'rgb(23,178,0)';
				setTimeout(function() {
					box.style.backgroundColor = 'lightgray';
				}, 80);
			}
		} else {
			scorecount -= s;
			for (let box of boxes) {
				box.style.backgroundColor = 'rgb(255,40,46)';
				setTimeout(function() {
					box.style.backgroundColor = 'lightgray';
				}, 80);
			}
		}
		score.innerText = `Score: ${scorecount}`;
		for (let box of boxes) {
			box.style.fontSize = '35px';
		}
		hardNums = [];
		while (hardNums.length < idx) {
			let hrn = Math.floor(Math.random() * idx) + 1;
			if (!hardNums.includes(hrn)) hardNums.push(hrn);
		}
		for (let i = 0; i < idx; i++) {
			boxes[i].innerText = hardNums[i];
		}
		question.innerText = '';
	});
}

rules.addEventListener('click', function() {
	rules.innerText =
		rules.innerText === 'TAP HERE FOR RULES'
			? 'Upon selecting a difficulty, the timer will count down from 60 seconds and 3 random numbers will appear in the grid. Quickly memorize their position and tap GUESS when ready, keeping in mind that the timer is constantly running. The numbers will then dissapear and a question will pop up asking you to tap the box in which the number was in. If correct, 1 point is awarded and now 4 random numbers will appear. If wrong, 1 point is taken away and the same amount of randoms numbers will appear. This continues until the grid is full. After the grid is full, the points rewarded per correct answer will increase by 1 each time. The penalty for wrong answers remains the same however. Tap anywhere in this box to hide rules.'
			: 'TAP HERE FOR RULES';
});
