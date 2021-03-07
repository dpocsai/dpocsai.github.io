const boxes = document.querySelectorAll('.div');
const start = document.querySelector('.start');
const reset = document.querySelector('.reset');
const score = document.querySelector('.score');
const time = document.querySelector('.time');
const question = document.querySelector('.q');

let scoreCount = 0;
let nums = [];
let q;

const makeNums = () => {
	nums = [];
	while (nums.length < 16) {
		let n = Math.floor(Math.random() * 99) + 1;
		if (!nums.includes(n)) {
			nums.push(n);
		}
	}
	for (let i = 0; i < nums.length; i++) {
		boxes[i].innerText = nums[i];
	}
	question.innerText = nums[Math.floor(Math.random() * 16)];
};
start.addEventListener('click', function() {
	start.disabled = true;
	for (let box of boxes) {
		box.disabled = false;
	}
	makeNums();
	scoreCount = 0;
	score.innerText = 'Score:0';
	let t = 19;
	const timer = () => {
		time.innerText = `Time:${t}`;
		t--;
		if (t < 3) {
			time.style.color = 'red';
		}
		if (t === -1) {
			clearInterval(timer_);
			question.innerText = `SCORE:${scoreCount}`;
			for (let box of boxes) {
				box.innerText = '';
				box.disabled = true;
			}
			time.innerText = `Time:0`;
			time.style.color = 'black';
		}
	};
	const timer_ = setInterval(timer, 1000);
	reset.addEventListener('click', function() {
		clearInterval(timer_);
		start.disabled = false;
		for (let box of boxes) {
			box.innerText = '';
		}
		nums = [];
		question.innerText = '?';
		scoreCount = 0;
		score.innerText = 'Score:0';
		time.innerText = `Time:20`;
		time.style.color = 'black';
		t = 19;
	});
});

for (let box of boxes) {
	box.addEventListener('click', function() {
		if (question.innerText === box.innerText) {
			scoreCount++;
			score.innerText = `Score:${scoreCount}`;
			makeNums();
		} else {
			scoreCount--;
			score.innerText = `Score:${scoreCount}`;
			makeNums();
		}
	});
}
