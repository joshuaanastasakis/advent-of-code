f = open('input.txt', 'r')
lines = f.readlines()

games_list = {}
power_list = []

for l in lines:
	line = l.strip()
	print(line)
	game_start_idx = line.find(":")
	game_num = line[line.find(" "):game_start_idx]

	sets = line[game_start_idx+2:].split("; ")

	set_num = 0
	game_possible = True

	cubes = {
		'red': 0,
		'blue': 0,
		'green': 0
	}

	for s in sets:
		cubes_lst = s.split(", ")
		power = 1
		for c in cubes_lst:
			split = c.split(" ")
			count = int(split[0])
			colour = split[1]
			if cubes[colour]<count:
				cubes[colour]=count

	power = 1
	for colour,count in cubes.items():
		power*=count
	
	games_list[game_num] = power

print()
for game in games_list:
	print(game, ':', games_list[game])

game_sum = sum([games_list[game] for game in games_list])
print("ANSWER:", game_sum)