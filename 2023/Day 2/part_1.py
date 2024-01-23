f = open('input.txt', 'r')
lines = f.readlines()

games_list = []

max_red = 12
max_green = 13
max_blue = 14

for l in lines:
	line = l.strip()
	# print(line)
	game_start_idx = line.find(":")
	game_num = int(line[line.find(" "):game_start_idx])

	sets = line[game_start_idx+2:].split("; ")

	set_num = 0
	game_possible = True

	for s in sets:
		cubes_lst = s.split(", ")
		cubes = {
			'red': 0,
			'blue': 0,
			'green': 0
		}

		for c in cubes_lst:
			split = c.split(" ")
			cubes[split[1]]=int(split[0])

		is_possible = cubes['red']<=max_red and cubes['green']<=max_green and cubes['blue']<=max_blue
		if not is_possible:
			game_possible = False
			break

	if game_possible:
		games_list.append(game_num)
			

print()
games_sum = sum(games_list)
print("ANSWER:", games_sum)