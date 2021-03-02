const question = document.querySelector('.question');
const equation = document.querySelector('.equation');
const high = document.querySelector('.high');
const same = document.querySelector('.same');
const low = document.querySelector('.low');
const start = document.querySelector('.start');
const h3 = document.querySelector('.equation');
const op = [ '+', 'x' ];
let check = [];
let score = 0;
let highscore = 0;

start.addEventListener('click', function() {
	setTimeout(function() {
		question.innerText = 'TAP RESET';
		equation.innerText = `SCORE: ${score}`;
		if (score > highscore) {
			highscore = score;
			const h2 = document.querySelector('h2');
			h2.innerText = `HIGHSCORE: ${score}`;
		}
	}, 10000);
	let num = Math.floor(Math.random() * 18);
	question.innerText = `${num}`;
	check.push(num);
	equation.innerText = `${Math.floor(Math.random() * 10)}+${Math.floor(Math.random() * 10)}`;
});
high.addEventListener('click', function() {
	if (+equation.innerText[0] + +equation.innerText[2] > check[check.length - 1]) {
		score++;
	} else {
		score -= 2;
	}
	let num = Math.floor(Math.random() * 18);
	question.innerText = `${num}`;
	check.push(num);
	equation.innerText = `${Math.floor(Math.random() * 10)}+${Math.floor(Math.random() * 10)}`;
});

same.addEventListener('click', function() {
	if (+equation.innerText[0] + +equation.innerText[2] === check[check.length - 1]) {
		score++;
	} else {
		score -= 2;
	}
	let num = Math.floor(Math.random() * 18);
	question.innerText = `${num}`;
	check.push(num);
	equation.innerText = `${Math.floor(Math.random() * 10)}+${Math.floor(Math.random() * 10)}`;
});

low.addEventListener('click', function() {
	if (+equation.innerText[0] + +equation.innerText[2] < check[check.length - 1]) {
		score++;
	} else {
		score -= 2;
	}
	let num = Math.floor(Math.random() * 18);
	question.innerText = `${num}`;
	check.push(num);
	equation.innerText = `${Math.floor(Math.random() * 10)}+${Math.floor(Math.random() * 10)}`;
});
const reset = document.querySelector('.reset');
reset.addEventListener('click', function() {
	score = 0;
	check = [];
	question.innerHTML = 'Tap<span> START </span>to begin';
	equation.innerText = `Highscore: ${highscore}`;
});
high.addEventListener('click', function() {
	high.style.backgroundColor = 'rgb(0, 124, 0)';
	high.style.width = '105px';
	high.style.height = '105px';
	setTimeout(function() {
		high.style.backgroundColor = 'rgb(0, 94, 0)';
		high.style.width = '100px';
		high.style.height = '100px';
	}, 100);
});
low.addEventListener('click', function() {
	low.style.backgroundColor = 'rgb(124, 0, 0)';
	low.style.width = '105px';
	low.style.height = '105px';
	setTimeout(function() {
		low.style.backgroundColor = 'rgb(94, 0, 0)';
		low.style.width = '100px';
		low.style.height = '100px';
	}, 100);
});
same.addEventListener('click', function() {
	same.style.backgroundColor = 'rgb(0, 0, 124)';
	same.style.width = '105px';
	same.style.height = '105px';
	setTimeout(function() {
		same.style.backgroundColor = 'rgb(0, 0, 124)';
		same.style.width = '100px';
		same.style.height = '100px';
	}, 100);
});
