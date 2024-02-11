const fs = require('fs');

function calc_score(winners) {
	let len = winners.length;
	let score = 0;

	if (len===0) return score;

	// console.group('calc_score');
	// console.log(len, 'winners:', winners);

	for (let i=0; i < len; i++) {
		if (i===0) score=1;
		else score *= 2;

		// console.log(`${winners[i]} - ${score} point(s)`)
	}

	// console.log(`score: ${score}`);
	// console.groupEnd();

	return score;
}

fs.readFile('input.txt', (err, data) => {
	if (err) throw err;

	const lines = data.toString().split(/\r?\n/);

	let sum = 0;
	
	for (let i=0; i < lines.length; i++) {
		const line = lines[i];
		// console.log(line);

		const split = line.split('|');
		const card_num = split[0].split(':')[0];
		// console.group(card_num)

		const draw_numbers = split[0]
										.split(':')[1]
										.split(' ')
										.filter(n => n!=='')
										.map(n => parseInt(n))
		const my_numbers = split[1]
									.split(' ')
									.filter(n => n!=='')
									.map(n => parseInt(n));

		// console.log('Draw numbers:', draw_numbers)
		// console.log('My numbers:', my_numbers)
		// console.log()

		let winning_numbers = [];

		for (let i=0; i < draw_numbers.length; i++) {
			const draw = draw_numbers[i];
			const win = my_numbers.includes(draw);
			
			if (win) winning_numbers.push(draw);
		}

		const score = calc_score(winning_numbers);

		sum += score;

		// console.groupEnd()
		// console.log()

	}

	console.log('Answer:', sum)

});
