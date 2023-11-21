console.log('hi');
const file = Bun.file('input.txt');
const text = await file.text();
const buffer = new Array<string>();

function arrayHasRepeat(array: string[]) {
	const set = new Set<string>(array);
	return set.size !== array.length;
}

function part1(bufferSize: number) {
	for (let i = 0; i < text.length; i++) {
		const char = text[i];
		buffer.push(char);
		if (buffer.length < bufferSize) continue;
		if (!arrayHasRepeat(buffer)) {
			return i + 1;
		}
		buffer.shift();
	}
}

const answer1 = part1(4);
const answer2 = part1(14);
console.log({ answer1, answer2 });
