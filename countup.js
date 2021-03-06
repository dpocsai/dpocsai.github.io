let boxes = document.querySelectorAll('.div');
let start = document.querySelector('.start');
let reset = document.querySelector('.reset');
let time1 = document.querySelector('.one');
let time2 = document.querySelector('.two');
let time3 = document.querySelector('.three');
let total = document.querySelector('h2');
let statistics = document.querySelector('footer');
let count = 1;
let nums = [];
let s;
let f;
let stats = [];
const makeNums = () => {
	start.disabled = true;
	if (time1.innerText && time2.innerText && time3.innerText && total.innerText) {
		time1.innerText = '';
		time2.innerText = '';
		time3.innerText = '';
		total.innerText = '';
	}

	s = 0;
	f = 0;
	count = 1;
	nums = [];

	while (nums.length < 16) {
		let n = Math.floor(Math.random() * 16) + 1;
		if (!nums.includes(n)) {
			nums.push(n);
		}
	}

	for (let i = 0; i < nums.length; i++) {
		boxes[i].disabled = false;
		boxes[i].innerText = nums[i];
		boxes[i].style.fontSize = '35px';
		boxes[i].style.backgroundColor = 'white';
	}
	s = new Date() / 1000;
};
const resetAll = () => {
	statistics.innerHTML = 'Check Stats';
	start.disabled = false;
	time1.innerText = '';
	time2.innerText = '';
	time3.innerText = '';
	total.innerText = '';
	s = 0;
	f = 0;
	count = 1;
	nums = [];
	for (let box of boxes) {
		box.style.fontSize = '0';
		box.style.backgroundColor = 'white';
		box.disabled = false;
	}
};
reset.addEventListener('click', resetAll);

start.addEventListener('click', makeNums);

for (let box of boxes) {
	box.addEventListener('click', function() {
		if (+box.innerText === count) {
			count++;
			box.style.fontSize = '0';
			box.style.backgroundColor = 'lightgray';
		}
		if (count === 17) {
			f = new Date() / 1000;
			!time1.innerText ? setTime(time1) : !time2.innerText ? setTime(time2) : setTime(time3);
		}
		if (total.innerText) {
			for (let box of boxes) {
				box.disabled = true;
			}
		}
	});
}

const setTime = (time) => {
	time.innerText = f - s;
	stats.push(+time.innerText);
	console.log(stats);
	time3.innerText ? (total.innerText = +time1.innerText + +time2.innerText + +time3.innerText) : makeNums();
};

reset.addEventListener('click', function() {
	reset.style.width = '83%';
	reset.style.fontSize = '32px';
	setTimeout(function() {
		reset.style.width = '80%';
		reset.style.fontSize = '30px';
	}, 100);
});
start.addEventListener('click', function() {
	start.style.width = '83%';
	start.style.fontSize = '32px';
	setTimeout(function() {
		start.style.width = '80%';
		start.style.fontSize = '30px';
	}, 100);
});

statistics.addEventListener('click', function() {
	let avg = stats.reduce((a, b) => a + b) / stats.length;
	let max = Math.max(...stats);
	let min = Math.min(...stats);
	statistics.innerHTML = `<b>Games:</b> ${stats.length}<br><b>Average:</b> ${avg}<br><b>Best:</b> ${min}<br><b>Worst:</b> ${max}`;
});
