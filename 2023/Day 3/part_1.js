const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
	if (err) throw err;

	let line_numbers = {};
	let line_numbers_all = {};

	let line_symbols = {};

	const lines = data.toString().split(/\r?\n/);
	
	// construct symbol and full number locations
	for (let i=0; i < lines.length; i++) {
		const line = lines[i];

		line_numbers[`${i}`] = [];
		line_symbols[`${i}`] = [];

		capture = null;
		for (let j=0; j < line.length; j++) {
			const char = line[j];
			const eol = j === line.length-1;
			const is_num = !isNaN(char);
			if (is_num) {
				const num = parseInt(char);

				if (capture === null) { // start capturing number
					capture = {
						start: j, 
						end: null,
						value: `${num}`,
						found: false
					}
				}
				else { // continue capturing number
					capture.value += `${num}`;
				}

			} else if (char!=='.') { // capture symbol
				line_symbols[`${i}`].push(j)
			}

			// complete number capture
			if ((is_num && eol) || (!is_num && !!capture)) {
				capture.end = !is_num && !!capture ? j-1 : j;
				capture.value = parseInt(capture.value)
				line_numbers[`${i}`].push(capture);
				capture = null;
			}
		}
	}

	const line_str_map = {
		'-1': 'prev',
		'0': 'curr',
		'1': 'next'
	}

	// collect numbers adjacent to symbols
	for (let i=0; i < lines.length; i++) {
		const line = lines[i];
		// console.group(`Line ${i}`)
		// if (i > 0) console.log('Prev', ('000'+(i-1)).slice(-3), ':', lines[i-1]);
		// console.log('Curr', ('000'+i).slice(-3), ':', lines[i]);
		// if (i < lines.length-1) console.log('Next', ('000'+(i+1)).slice(-3), ':', lines[i+1]);

		const numbers_arr = line_numbers[i];

		for (let n=0; n < numbers_arr.length; n++) {
			const curr_num = numbers_arr[n];
			// console.log('Current Number:',curr_num)

			for (let x=-1; x <= 1; x++) {
				const line_num = i+x;
				const line_num_str = `${line_num}`;
				let line_str = line_str_map[`${x}`];

				if (x===-1 && i===0) continue; // skip prev if at first line
				else if (x===1 && i===lines.length-1) break; // skip next if at last line

				const symbol_arr = line_symbols[line_num_str];

				for (let s = 0; s < symbol_arr.length; s++) {
					const curr_symbol = symbol_arr[s];

					if (!line_numbers[i][n].found && (curr_symbol >= curr_num.start-1 && curr_symbol <= curr_num.end+1)) {
						const match_type = x!==0 ? 'vertical' : 'horizontal';
						// console.group(`found ${match_type} adjacent at ${line_str}`);
						// console.log('curr_num:', curr_num);
						// console.log('symbol_arr:', symbol_arr)
						// console.groupEnd();
						line_numbers[i][n].found = true;
					}
				}
				// console.groupEnd();
			}
		}
		// console.groupEnd();
	}


	const keys = Object.keys(line_numbers);
	const found_arr = keys.map(l => {
		return line_numbers[l].filter(n => n.found===true).map(n => n.value)
	});

	const sum_prep = Object.keys(found_arr).map(l => found_arr[l].reduce((prev, next) => prev+next, 0));
	const sum = sum_prep.reduce((prev, next) => prev+next, 0);
	
	console.log('Answer:', sum)

});
