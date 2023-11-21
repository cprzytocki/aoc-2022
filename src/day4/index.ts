console.log('hi');
const file = Bun.file('input.txt');
const text = await file.text();

const pairs = text
	.split('\n')
	.map((line) =>
		line.split(',').map((n) => n.split('-').map((n) => parseInt(n, 10)))
	);

console.log(pairs[0]);

function minMax(min1: number, max1: number, min2: number, max2: number) {
	if ((min1 >= min2 && max1 <= max2) || (min2 >= min1 && max2 <= max1)) {
		return true;
	}
	return false;
}

const overlaps = pairs.reduce((acc, [a, b]) => {
	const [min1, max1] = a;
	const [min2, max2] = b;

	if (minMax(min1, max1, min2, max2)) {
		return acc + 1;
	}
	return acc;
}, 0);

function between(a: number, min: number, max: number) {
	return a >= min && a <= max;
}

function minMax2(min1: number, max1: number, min2: number, max2: number) {
	if (between(min1, min2, max2) || between(min2, min1, max1)) return true;
	if (between(max1, min2, max2) || between(max2, min1, max1)) return true;

	return false;
}

const overlaps2 = pairs.reduce((acc, [a, b]) => {
	const [min1, max1] = a;
	const [min2, max2] = b;

	if (minMax2(min1, max1, min2, max2)) {
		return acc + 1;
	}
	return acc;
}, 0);
