import { get } from 'http';

console.log('hi');

const file = Bun.file('input.txt');
const text = await file.text();

const rucksacks = text.split('\n');

const splitRuckSacks = rucksacks.map((rucksack) => {
	const numberOfItems = rucksack.length;
	const firsthalf = rucksack.slice(0, numberOfItems / 2);
	const secondhalf = rucksack.slice(numberOfItems / 2, numberOfItems);

	return [firsthalf.split(''), secondhalf.split('')];
});

function getItemValue(c: string) {
	if (c.length !== 1) new Error('Invalid input');

	let val = c.charCodeAt(0) - 96;
	if (val < 0) val += 32 + 26;
	return val;
}

const rucksackValues = splitRuckSacks.map(([firsthalf, secondhalf]) => {
	// split string into character array
	const uniqueItems = new Set<string>();
	for (const item of firsthalf) {
		if (secondhalf.includes(item)) uniqueItems.add(item);
	}
	return [...uniqueItems].reduce((acc, item) => acc + getItemValue(item), 0);
});

const sum = rucksackValues.reduce((acc, val) => acc + val, 0);

const rucksackValues2 = [];
for (let i = 0; i < rucksacks.length; i += 3) {
	const r1 = rucksacks[i];
	const r2 = rucksacks[i + 1];
	const r3 = rucksacks[i + 2];

	const repeated = new Set<string>();
	r1.split('').forEach((item) => {
		if (r2.includes(item) && r3.includes(item)) repeated.add(item);
	});
	rucksackValues2.push(
		[...repeated].reduce((acc, item) => acc + getItemValue(item), 0)
	);
}

const sum2 = rucksackValues2.reduce((acc, val) => acc + val, 0);
console.log(sum2);
