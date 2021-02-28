const s = new Date() / 1000;
let record = 5.6570000648498535;
let count = 1;
const boxes = document.querySelectorAll('div');
const nums = [];
while (nums.length < 16) {
	let n = Math.floor(Math.random() * 16) + 1;
	if (!nums.includes(n)) nums.push(n);
}
for (let i = 0; i < boxes.length; i++) {
	boxes[i].innerText = nums[i];
	boxes[i].addEventListener('click', function() {
		if (+boxes[i].innerText === count) {
			count++;
			boxes[i].style.backgroundColor = 'lightgray';
			boxes[i].style.color = 'lightgray';
			if (count === 17) {
				const h3 = document.querySelector('h3');
				const f = new Date() / 1000;
				const time = f - s;
				h3.innerText = `TIME: ${time}`;
				if (time < record) {
					h3.innerText = `NEW RECORD! : ${time}`;
				}
			}
		}
	});
}
