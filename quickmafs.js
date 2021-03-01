const boxes = document.querySelectorAll('div');
let x = [];
let records = [];

for (let i = 0; i < boxes.length; i++) {
	const plus = document.querySelector('#plus');
	const times = document.querySelector('#times');
	plus.addEventListener('click', function() {
		const s = new Date() / 1000;
		boxes[i].innerText = `${Math.floor(Math.random() * 10)} + ${Math.floor(Math.random() * 10)}`;
		x.push(+boxes[i].innerText[0] + +boxes[i].innerText[4]);
		x.sort((a, b) => a - b);
		boxes[i].addEventListener('click', function() {
			if (+boxes[i].innerText[0] + +boxes[i].innerText[4] !== Math.min(...x)) {
				document.body.style.backgroundColor = 'maroon';
				const h1 = document.querySelector('h1');
				h1.innerText = 'GAME OVER';
			} else if (+boxes[i].innerText[0] + +boxes[i].innerText[4] === Math.min(...x)) {
				x.shift();
				boxes[i].style.backgroundColor = 'lightgray';
				boxes[i].style.color = 'lightgray';
				if (!x.length) {
					const h3 = document.querySelector('h3');
					const f = new Date() / 1000;
					const time = f - s;
					h3.innerText = `${time}`;
				}
			}
		});
	});
	times.addEventListener('click', function() {
		const s = new Date() / 1000;
		boxes[i].innerText = `${Math.floor(Math.random() * 9) + 1} x ${Math.floor(Math.random() * 9) + 1}`;
		x.push(+boxes[i].innerText[0] * +boxes[i].innerText[4]);
		x.sort((a, b) => a - b);
		boxes[i].addEventListener('click', function() {
			if (+boxes[i].innerText[0] * +boxes[i].innerText[4] !== Math.min(...x)) {
				document.body.style.backgroundColor = 'maroon';
				const h1 = document.querySelector('h1');
				h1.innerText = 'GAME OVER';
			} else if (+boxes[i].innerText[0] * +boxes[i].innerText[4] === Math.min(...x)) {
				x.shift();
				boxes[i].style.backgroundColor = 'lightgray';
				boxes[i].style.color = 'lightgray';
				if (!x.length) {
					const h3 = document.querySelector('h3');
					const f = new Date() / 1000;
					const time = f - s;
					h3.innerText = `${time}`;
				}
			}
		});
	});
}
