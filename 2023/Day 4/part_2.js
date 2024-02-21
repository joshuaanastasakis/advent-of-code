const fs = require('fs');

function calc_score(winners) {
	let len = winners.length;
	let score = 0;

	if (len===0) return score;

	console.group('calc_score');
	console.log(len, 'winners:', winners);

	for (let i=0; i < len; i++) {
		if (i===0) score=1;
		else score *= 2;

		console.log(`${winners[i]} - ${score} point(s)`)
	}

	console.log(`score: ${score}`);
	console.groupEnd();

	return score;
}

fs.readFile('input.txt', (err, data) => {
	if (err) throw err;

	const lines = data.toString().split(/\r?\n/);

	let sum = 0;
	let cards = {
		'1': 1
	};
	
	let i=0;
	let count=0;
	while (i < lines.length) {
		const line = lines[i];
		const card_num = i+1;

		const split = line.split('|');

		console.group(card_num)

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

		let winning_numbers = draw_numbers.filter(n => my_numbers.includes(n)).map((e, idx) => card_num+(idx+1));

		// calc_score(winning_numbers);

		// TODO: loop for x from 0 to cards[i]
		for (let x=0; x < cards[i]; x++) {

			for (let j=0; j < winning_numbers.length; j++) {
				const card = winning_numbers[j];
				cards[card] = (cards[card] || 0) + 1;
			}

			// console.log(cards)

			// const score = Object.keys(winning_numbers).map(n => winning_numbers[n]).reduce((prev, curr) => prev+curr, 0);
			
			// console.log('temp score:', score);		

			// sum += score;
		}
		// console.groupEnd()
			// console.log()

		count++;
		i++;
	}

	console.log('Answer:', sum+1)

});
