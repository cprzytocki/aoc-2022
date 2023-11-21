async function part1() {
	console.log('Hello via Bun!');

	const file = Bun.file('input.txt');
	const text = await file.text();

	const rounds = text.split('\n');

	enum RPS_U {
		ROCK = 'X',
		PAPER = 'Y',
		SCISSORS = 'Z',
	}

	enum RPS_O {
		ROCK = 'A',
		PAPER = 'B',
		SCISSORS = 'C',
	}

	enum RPS {
		WIN = 'WIN',
		LOSE = 'LOSE',
		DRAW = 'DRAW',
	}

	const points = {
		[RPS_U.ROCK]: 1,
		[RPS_U.PAPER]: 2,
		[RPS_U.SCISSORS]: 3,
		[RPS.WIN]: 6,
		[RPS.LOSE]: 0,
		[RPS.DRAW]: 3,
	};

	function roundResult(user: RPS_U, opponent: RPS_O) {
		switch (user) {
			case RPS_U.ROCK:
				if (opponent === RPS_O.ROCK) {
					return RPS.DRAW;
				}
				if (opponent === RPS_O.PAPER) {
					return RPS.LOSE;
				}
				if (opponent === RPS_O.SCISSORS) {
					return RPS.WIN;
				}
				break;
			case RPS_U.PAPER:
				if (opponent === RPS_O.ROCK) {
					return RPS.WIN;
				}
				if (opponent === RPS_O.PAPER) {
					return RPS.DRAW;
				}
				if (opponent === RPS_O.SCISSORS) {
					return RPS.LOSE;
				}
				break;
			case RPS_U.SCISSORS:
				if (opponent === RPS_O.ROCK) {
					return RPS.LOSE;
				}
				if (opponent === RPS_O.PAPER) {
					return RPS.WIN;
				}
				if (opponent === RPS_O.SCISSORS) {
					return RPS.DRAW;
				}
				break;
		}
		throw new Error('Invalid input');
	}

	function calculatScore(result: RPS, user: RPS_U) {
		return points[result] + points[user];
	}

	const userScore = rounds.reduce((acc, round) => {
		const [opponent, user] = round.split(' ');
		const result = roundResult(user as RPS_U, opponent as RPS_O);
		return acc + calculatScore(result, user as RPS_U);
	}, 0);

	console.log(userScore);
}
// part 2

// await part2();
async function part2() {
	console.log('Hello via Bun!');

	const file = Bun.file('input.txt');
	const text = await file.text();

	const rounds = text.split('\n');

	enum RPS_U {
		ROCK = 'X',
		PAPER = 'Y',
		SCISSORS = 'Z',
	}

	enum RPS_O {
		ROCK = 'A',
		PAPER = 'B',
		SCISSORS = 'C',
	}

	enum RPS {
		WIN = 'Z',
		LOSE = 'X',
		DRAW = 'Y',
	}

	const points_shape = {
		[RPS_U.ROCK]: 1,
		[RPS_U.PAPER]: 2,
		[RPS_U.SCISSORS]: 3,
	};
	const points_outcome = {
		[RPS.WIN]: 6,
		[RPS.LOSE]: 0,
		[RPS.DRAW]: 3,
	};

	function shapeResult(result: RPS, opponent: RPS_O) {
		switch (result) {
			case RPS.WIN:
				if (opponent === RPS_O.ROCK) {
					return RPS_U.PAPER;
				}
				if (opponent === RPS_O.PAPER) {
					return RPS_U.SCISSORS;
				}
				if (opponent === RPS_O.SCISSORS) {
					return RPS_U.ROCK;
				}
				break;
			case RPS.LOSE:
				if (opponent === RPS_O.ROCK) {
					return RPS_U.SCISSORS;
				}
				if (opponent === RPS_O.PAPER) {
					return RPS_U.ROCK;
				}
				if (opponent === RPS_O.SCISSORS) {
					return RPS_U.PAPER;
				}
				break;
			case RPS.DRAW:
				if (opponent === RPS_O.ROCK) {
					return RPS_U.ROCK;
				}
				if (opponent === RPS_O.PAPER) {
					return RPS_U.PAPER;
				}
				if (opponent === RPS_O.SCISSORS) {
					return RPS_U.SCISSORS;
				}
				break;
		}

		throw new Error('Invalid input');
	}

	function calculatScore(result: RPS, user: RPS_U) {
		return points_outcome[result] + points_shape[user];
	}

	const userScore = rounds.reduce((acc, round) => {
		const [opponent, result] = round.split(' ');
		const user = shapeResult(result as RPS, opponent as RPS_O);

		return acc + calculatScore(result as RPS, user as RPS_U);
	}, 0);

	console.log(userScore);
}
