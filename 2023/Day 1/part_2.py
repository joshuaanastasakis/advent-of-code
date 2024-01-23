f = open('input.txt', 'r')
lines = f.readlines()

sumSoFar = 0

num_dict = {
	'one': 1,
	'two': 2,
	'three': 3,
	'four': 4,
	'five': 5,
	'six': 6,
	'seven': 7,
	'eight': 8,
	'nine': 9,
	'zero': 0,
	'0':0,
	'1':1,
	'2':2,
	'3':3,
	'4':4,
	'5':5,
	'6':6,
	'7':7,
	'8':8,
	'9':9,
}

for l in lines:
	line = l.strip()
	digits = []

	print("\nline:", l)

	i=len(line)

	last = ''

	## loop through line in reverse to find the last digit
	while i >= 0:
		found_match = False
		for key in num_dict.keys():
			# print("checking", key, "at", i, "with len", len(key))
			if line.find(key, i, i+len(key)) != -1:
				# print('found', key, 'at', i, 'in', line)
				## if digit found, set last and break out of 'keys' loop
				last = key
				found_match = True
				break
		## if digit found in 'keys' loop, break out of line 'i' loop
		if found_match:
			break
		i-=1
	# print(last)

	## list comprehension to find the keys first-last, to find the first key
	match = {line.find(key):key for key in num_dict.keys() if line.find(key)!=-1}

	first_digit = [num_dict[match[k]] for k in sorted(match.keys())][0]
	last_digit = num_dict[last]

	## calculate the number using first digit in the 10's spot
	num = first_digit*10 + last_digit
	# print("num:", num)
	sumSoFar+=num
	# print("sum:", sumSoFar)

print("ANSWER:", sumSoFar)