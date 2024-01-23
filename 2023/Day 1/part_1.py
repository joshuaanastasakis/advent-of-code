f = open('input.txt', 'r')
lines = f.readlines()

sumSoFar = 0

for line in lines:
	digits = []
	for c in line:
		if c.isnumeric():
			digits.append(int(c))
	num = digits[0]*10 + digits[-1]
	sumSoFar+=num

print("ANSWER:", sumSoFar)