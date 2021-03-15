const { Engine, Render, Runner, World, Bodies, Body, Events, MouseConstraint, Mouse } = Matter;
const cellsX = 5;
cellsY = 8;
const width = window.innerWidth;
const height = window.innerHeight;
const unitX = width / cellsX;
const unitY = height / cellsY;
const engine = Engine.create();
engine.world.gravity.y = 0;

const { world } = engine;
const render = Render.create({
	element : document.body,
	engine  : engine,
	options : {
		width,
		height,
		wireframes : false
	}
});
Render.run(render);
Runner.run(Runner.create(), engine);
World.add(
	world,
	MouseConstraint.create(engine, {
		mouse      : Mouse.create(render.canvas),
		constraint : {
			render : {
				visible : false
			}
		}
	})
);
// Borders ( around the canvas so shapes stay within it)
const borders = [
	Bodies.rectangle(width / 2, 0, width, 10, { isStatic: true, label: 'border', render: { fillStyle: 'maroon' } }),
	Bodies.rectangle(width / 2, height, width, 10, {
		isStatic : true,
		label    : 'border',
		render   : { fillStyle: 'maroon' }
	}),
	Bodies.rectangle(0, height / 2, 10, height, { isStatic: true, label: 'border', render: { fillStyle: 'maroon' } }),
	Bodies.rectangle(width, height / 2, 10, height, {
		isStatic : true,
		label    : 'border',
		render   : { fillStyle: 'maroon' }
	})
];
World.add(world, borders); //can add an array of elements instead of individuals

//Maze Generation

const shuffle = (arr) => {
	let counter = arr.length;
	while (counter > 0) {
		const index = Math.floor(Math.random() * counter);
		counter--;
		const temp = arr[counter];
		arr[counter] = arr[index];
		arr[index] = temp;
	}
	return arr;
};
const grid = Array(cellsY).fill('').map(() => Array(cellsX).fill(false)); //entire grid
const verticals = Array(cellsY).fill('').map(() => Array(cellsX - 1).fill(false)); //vertical walls
const horizontals = Array(cellsY - 1).fill('').map(() => Array(cellsX).fill(false)); //horizontal walls

const startRow = Math.floor(Math.random() * cellsY); //random starting point for maze generation
const startCol = Math.floor(Math.random() * cellsX); //random starting point for maze generation

//generate a random maze via 2D arrays
const getMaze = (row, col) => {
	//if I have visited the cell(true), then return-check grid array
	if (grid[row][col]) return;
	//mark cell as visited(true)-in grid array
	grid[row][col] = true;
	//assemble randomly-ordered list of neighbours
	let neighbours = shuffle([
		[ row + 1, col, 'down' ],
		[ row, col + 1, 'right' ],
		[ row - 1, col, 'up' ],
		[ row, col - 1, 'left' ]
	]);

	//for each neighbour...
	for (let neighbour of neighbours) {
		const [ nextRow, nextColumn, direction ] = neighbour;
		//1.check if neighbour is out of bounds
		if (nextRow < 0 || nextRow >= cellsY || nextColumn < 0 || nextColumn >= cellsX) {
			continue; //skip rest of code and move on to next neighbour
			//2.if we have visited that neighbour, continue to check the next neighbour
		}
		if (grid[neighbour[0]][neighbour[1]]) {
			continue;
		} //3.remove wall from either horizontals or verticals array
		if (neighbour.includes('left')) {
			verticals[row][col - 1] = true;
		} else if (neighbour.includes('right')) {
			verticals[row][col] = true;
		} else if (neighbour.includes('up')) {
			horizontals[row - 1][col] = true;
		} else if (neighbour.includes('down')) {
			horizontals[row][col] = true;
		}
		getMaze(neighbour[0], neighbour[1]);
	}

	//4. visit the next cell

	//5. recursively call function with new row and col
};

getMaze(startRow, startCol);

//Horizontal maze walls
horizontals.forEach((row, j) => {
	row.forEach((open, i) => {
		if (open) {
			return;
		}
		const midpointX = i * unitX + unitX / 2;
		const midpointY = j * unitY + unitY;
		const wall = Bodies.rectangle(midpointX, midpointY, unitX, 5, {
			isStatic : true,
			label    : 'wall',
			friction : 0,
			render   : { fillStyle: 'maroon' }
		});
		World.add(world, wall);
	});
});
//Vertical maze walls
verticals.forEach((row, j) => {
	row.forEach((open, i) => {
		if (open) {
			return;
		}
		const midpointX = i * unitX + unitX;
		const midpointY = j * unitY + unitY / 2;
		const wall = Bodies.rectangle(midpointX, midpointY, 5, unitY, {
			isStatic : true,
			label    : 'wall',
			friction : 0,
			render   : { fillStyle: 'maroon' }
		});
		World.add(world, wall);
	});
});
// Goal
const goal1 = Bodies.rectangle(width, height - unitY / 2, unitX / 7, unitY, {
	isStatic : true,
	label    : 'goal',
	render   : { fillStyle: 'green' }
});
World.add(world, goal1);

const goal2 = Bodies.rectangle(width - unitX / 2, height, unitX, unitY / 7, {
	isStatic : true,
	label    : 'goal',
	render   : { fillStyle: 'green' }
});
World.add(world, goal2);
// Ball
const ball = Bodies.circle(unitX / 2, unitY / 2, Math.min(unitX * 0.15, unitY * 0.15), {
	label  : 'ball',
	render : { fillStyle: 'cornflowerblue' }
});
World.add(world, ball);

document.addEventListener('keydown', (e) => {
	const { x, y } = ball.velocity;
	const speed = 5;
	if (e.key === 'w' && y > -speed) {
		Body.setVelocity(ball, { x, y: y - 5 });
	} else if (e.key === 'a' && x > -speed) {
		Body.setVelocity(ball, { x: x - 5, y });
	} else if (e.key === 's' && y < speed) {
		Body.setVelocity(ball, { x, y: y + 5 });
	} else if (e.key === 'd' && x < speed) {
		Body.setVelocity(ball, { x: x + 5, y });
	}
});

//Win Condition
Events.on(engine, 'collisionStart', (e) => {
	e.pairs.forEach((collision) => {
		const good = [ 'ball', 'goal' ];
		const bad = [ 'wall', 'border' ];
		if (bad.includes(collision.bodyA.label || bad.includes(collision.bodyB.label))) {
			document.querySelector('h1').innerHTML =
				"<h1><a href='http://127.0.0.1:5500/mazeGame/index.html'>You Lost! </a></h1>";
			document.querySelector('.winner').classList.remove('hidden');
		}

		if (good.includes(collision.bodyA.label) && good.includes(collision.bodyB.label)) {
			document.querySelector('.winner').classList.remove('hidden');

			world.bodies.forEach((body) => {
				if (body.label === 'wall') {
					Body.setStatic(body, false);
				}
			});
		}
	});
});
