console.log('hi');
const file = Bun.file('input1.txt');
const text = await file.text();

const pairs = text.split('\n');

const parsed = pairs.map((pair) => {
	const layer = [];
	for (let i = 1; i < pair.length; i += 4) {
		layer.push(pair[i]);
	}
	return layer;
});

const boxArray = parsed[0].map(() => new Array<string>());
for (let row = parsed.length - 2; row >= 0; row--) {
	for (let column = 0; column < parsed[row].length; column++) {
		const element = parsed[row][column];
		if (element !== ' ') boxArray[column].push(element);
	}
}

const instructionFile = Bun.file('input2.txt');
const instructionText = await instructionFile.text();

const parsedInstructionText = instructionText
	.replaceAll('move ', '')
	.replaceAll('from ', '')
	.replaceAll('to ', '')
	.split('\n')
	.map((line) => line.split(' ').map((n) => parseInt(n, 10)));

function moveBox(move: number, from: number, to: number) {
	for (let i = 0; i < move; i++) {
		const element = boxArray[from - 1].pop();
		if (element) boxArray[to - 1].push(element);
	}
}
// moveBox(2, 0, 1);
// console.log(boxArray);

for (const instruction of parsedInstructionText) {
	const [move, from, to] = instruction;
	moveBox(move, from, to);
}

const answer = boxArray.map((stack) => stack[stack.length - 1]).join('');

const boxArray2 = parsed[0].map(() => new Array<string>());
for (let row = parsed.length - 2; row >= 0; row--) {
	for (let column = 0; column < parsed[row].length; column++) {
		const element = parsed[row][column];
		if (element !== ' ') boxArray2[column].push(element);
	}
}

function moveBox2(move: number, from: number, to: number) {
	const boxes = new Array<string>();

	for (let i = 0; i < move; i++) {
		const element = boxArray2[from - 1].pop();
		if (element) boxes.push(element);
	}

	boxArray2[to - 1].push(...boxes.reverse());
}

for (const instruction of parsedInstructionText) {
	const [move, from, to] = instruction;
	moveBox2(move, from, to);
}
const answer2 = boxArray2.map((stack) => stack[stack.length - 1]).join('');

console.log(answer2);
