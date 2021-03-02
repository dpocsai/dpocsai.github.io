const question = document.querySelector('.question');
const equation = document.querySelector('.equation');
const high = document.querySelector('.high');
const same = document.querySelector('.same');
const low = document.querySelector('.low');
const start = document.querySelector('.start');
const h3 = document.querySelector('.equation');
const h2 = document.querySelector('.points');
const time = document.querySelector('.time');
let check = [];
let score = 0;
let highscore = 0;
let all = 0;
let good = 0;
let bad = 0;
const allh5 = document.querySelector('.all');
const goodh5 = document.querySelector('.good');
const badh5 = document.querySelector('.bad');
start.addEventListener('click', function() {
	allh5.innerText = '';
	goodh5.innerText = '';
	badh5.innerText = '';
	time.style.border = '2px solid white';
	let t = 19;
	const testtimer = () => {
		time.innerText = t;
		t--;
		if (t < 3) {
			time.style.border = '2px solid red';
		}
		if (t === -1) {
			clearInterval(test);
			time.innerText = 0;
		}
	};
	const test = setInterval(testtimer, 1000);

	question.style.color = 'white';
	const timer = setTimeout(function() {
		question.innerText = `HIGHSCORE: ${highscore}`;
		equation.innerText = score;
		time.style.border = '2px solid white';
		if (score > highscore) {
			highscore = score;
			question.style.color = 'yellow';
			question.innerText = `NEW HIGHSCORE! ${highscore}`;
		}
		score = 0;
		check = [];
		allh5.innerText = `Total: ${all}`;
		goodh5.innerText = `Correct: ${good}`;
		badh5.innerText = `Incorrect: ${bad}`;
		high.disabled = true;
		low.disabled = true;
		same.disabled = true;
		setTimeout(function() {
			high.disabled = false;
			low.disabled = false;
			same.disabled = false;
		}, 1200);
	}, 20000);
	h2.innerText = score;
	let num = Math.floor(Math.random() * 16);
	question.innerText = `${num}`;
	check.push(num);
	equation.innerText = `${Math.floor(Math.random() * 10)}+${Math.floor(Math.random() * 10)}`;
	const reset = document.querySelector('.reset');
	reset.addEventListener('click', function() {
		score = 0;
		h2.innerText = score;
		check = [];
		clearTimeout(timer);
		clearInterval(test);
		question.innerText = `HIGHSCORE: ${highscore}`;
		equation.innerHTML = 'Tap<span> START </span>to begin';
		allh5.innerText = '';
		goodh5.innerText = '';
		badh5.innerText = '';
		time.innerText = '20';
	});
});
high.addEventListener('click', function() {
	if (+equation.innerText[0] + +equation.innerText[2] > check[check.length - 1]) {
		score++;
		all++;
		good++;
		h2.innerText = `${score}`;
		h2.style.border = '2px solid green';
		setTimeout(() => {
			h2.style.border = '2px solid white';
		}, 300);
	} else {
		all++;
		bad++;
		score -= 2;
		h2.innerText = `${score}`;
		h2.style.border = '2px solid red';
		setTimeout(() => {
			h2.style.border = '2px solid white';
		}, 300);
	}
	let num = Math.floor(Math.random() * 18);
	question.innerText = `${num}`;
	check.push(num);
	equation.innerText = `${Math.floor(Math.random() * 10)}+${Math.floor(Math.random() * 10)}`;
});

same.addEventListener('click', function() {
	if (+equation.innerText[0] + +equation.innerText[2] === check[check.length - 1]) {
		score++;
		all++;
		good++;
		h2.innerText = `${score}`;
		h2.style.border = '2px solid green';
		setTimeout(() => {
			h2.style.border = '2px solid white';
		}, 300);
	} else {
		all++;
		bad++;
		score -= 2;
		h2.innerText = `${score}`;
		h2.style.border = '2px solid red';
		setTimeout(() => {
			h2.style.border = '2px solid white';
		}, 300);
	}
	let num = Math.floor(Math.random() * 18);
	question.innerText = `${num}`;
	check.push(num);
	equation.innerText = `${Math.floor(Math.random() * 10)}+${Math.floor(Math.random() * 10)}`;
});

low.addEventListener('click', function() {
	if (+equation.innerText[0] + +equation.innerText[2] < check[check.length - 1]) {
		score++;
		all++;
		good++;
		h2.innerText = `${score}`;
		h2.style.border = '2px solid green';
		setTimeout(() => {
			h2.style.border = '2px solid white';
		}, 300);
	} else {
		all++;
		bad++;
		score -= 2;
		h2.innerText = `${score}`;
		h2.style.border = '2px solid red';
		setTimeout(() => {
			h2.style.border = '2px solid white';
		}, 300);
	}
	let num = Math.floor(Math.random() * 18);
	question.innerText = `${num}`;
	check.push(num);
	equation.innerText = `${Math.floor(Math.random() * 10)}+${Math.floor(Math.random() * 10)}`;
});

high.addEventListener('click', function() {
	high.style.backgroundColor = 'rgb(0, 124, 0)';
	high.style.width = '155px';
	high.style.height = '155px';
	setTimeout(function() {
		high.style.backgroundColor = 'rgb(0, 94, 0)';
		high.style.width = '150px';
		high.style.height = '150px';
	}, 100);
});
low.addEventListener('click', function() {
	low.style.backgroundColor = 'rgb(124, 0, 0)';
	low.style.width = '155px';
	low.style.height = '155px';
	setTimeout(function() {
		low.style.backgroundColor = 'rgb(94, 0, 0)';
		low.style.width = '150px';
		low.style.height = '150px';
	}, 100);
});
same.addEventListener('click', function() {
	same.style.backgroundColor = 'rgb(0, 0, 124)';
	same.style.width = '155px';
	same.style.height = '155px';
	setTimeout(function() {
		same.style.backgroundColor = 'rgb(0, 0, 94)';
		same.style.width = '150px';
		same.style.height = '150px';
	}, 100);
});
