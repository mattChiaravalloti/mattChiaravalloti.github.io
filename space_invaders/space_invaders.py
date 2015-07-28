import pygame
import sys, random
from pygame.locals import *

pygame.init()

# create the screen, make it 840 px wide, 660 px tall, and make it black
screen = pygame.display.set_mode([640,460])
screen.fill((0,0,0))

# give the window the caption
pygame.display.set_caption("Space Invaders")

# set the font
font = pygame.font.SysFont(None, 24)

# create a clock to slow the game down
main_clock = pygame.time.Clock()

# initialize the ground rectangle
ground = pygame.Rect(0,440,640,2)

# initialize player data
level = 1

move_left = False
move_right = False

high_score = 0
score = 0
lives = 2
alive = True

player_x = 315
player_y = 410

player_top = pygame.Rect(player_x + 20, player_y, 10, 5)
player_bottom = pygame.Rect(player_x, player_y + 5, 48, 18)

player_speed = 3

player_shot = pygame.Rect(0,0,0,0)
player_shot_speed = 8
player_shot_is_out = False

def draw_player():
	pygame.draw.rect(screen, (0,255,0), player_bottom)
	pygame.draw.rect(screen, (0,255,0), player_top)

def draw_player_shot():
	pygame.draw.rect(screen, (0,255,0), player_shot)

# draw the remaining lives in the lower left corner
def draw_lives(num_lives):
	x_pos = 10
	y_pos = 445

	for x in range(0,num_lives):
		pygame.draw.rect(screen, (0,255,0), (x_pos, y_pos + 5, 30, 10))
		pygame.draw.rect(screen, (0,255,0), (x_pos + 13, y_pos, 5, 5))

		x_pos += 40

def draw_ground():
	pygame.draw.rect(screen, (0,255,0), ground)

# redraw the black background
def draw_screen():
	screen.fill((0,0,0))

# draw the argued text to the screen in the argued position
def draw_text(display_string, font, surface, x, y):
    text_display = font.render(display_string, 1, (255, 255, 255))
    text_rect = text_display.get_rect()
    text_rect.topleft = (x, y)
    surface.blit(text_display, text_rect)

# aliens
top_alien_open = pygame.image.load("top_alien_open.png")
top_alien_closed = pygame.image.load("top_alien_closed.png")
top_alien_rect = top_alien_open.get_rect()

mid_alien_open = pygame.image.load("mid_alien_open.png")
mid_alien_closed = pygame.image.load("mid_alien_closed.png")
mid_alien_rect = mid_alien_open.get_rect()

bot_alien_open = pygame.image.load("bot_alien_open.png")
bot_alien_closed = pygame.image.load("bot_alien_closed.png")
bot_alien_rect = bot_alien_open.get_rect()

invaders = []

alien_speed = 1
num_times_dropped = 0

invader_initial_x = 80
invader_initial_y = 50

invaders_move_left = True
invaders_move_right = False

invader_open_frame = True
invader_frame_timer = 0

def create_invaders():
	invader_x = invader_initial_x
	invader_y = invader_initial_y

	for row in range(0,6):
		for col in range(0,11):
			invader_width = 0
			invader_height = 0
			if row > 3:
				invader_width = bot_alien_rect.width
				invader_height = bot_alien_rect.height
			elif row > 1:
				invader_width = mid_alien_rect.width
				invader_height = mid_alien_rect.height
			else:
				invader_width = top_alien_rect.width
				invader_height = top_alien_rect.height

			invader = pygame.Rect(invader_x, invader_y, invader_width, invader_height)
			invaders.append(invader)

			invader_x += (invader_width + 15)
		invader_y += 35
		invader_x = invader_initial_x

create_invaders()

def move_invaders_right(speed):
	for invader in invaders:
		invader.x += speed

def move_invaders_left(speed):
	for invader in invaders:
		invader.x -= speed

def move_invaders_down():
	for invader in invaders:
		invader.y += 8

def draw_invaders():
	cutoff = invaders[0].bottom

	for invader in invaders:
		if invader.y >= cutoff + 100:
			if invader_open_frame:
				screen.blit(bot_alien_open, invader)
			else:
				screen.blit(bot_alien_closed, invader)
		elif invader.y >= cutoff + 40:
			if invader_open_frame:
				screen.blit(mid_alien_open, invader)
			else:
				screen.blit(mid_alien_closed, invader)
		else:
			if invader_open_frame:
				screen.blit(top_alien_open, invader)
			else:
				screen.blit(top_alien_closed, invader)

def get_farthest_left():
	min_x = 640
	index_of_min = 0

	for invader in invaders:
		if invader.x < min_x:
			min_x = invader.x
			index_of_min = invaders.index(invader)

	return index_of_min

def get_farthest_right():
	max_right = 0
	index_of_max = 0

	for invader in invaders:
		if invader.right > max_right:
			max_right = invader.right
			index_of_max = invaders.index(invader)

	return index_of_max

bonus_alien = pygame.image.load("bonus_alien.png")
bonus_alien_rect = bonus_alien.get_rect()
bonus_alien_rect.x = 10
bonus_alien_rect.y = 30

bonus_alien_is_out = False

bonus_alien_timer = 0

def draw_bonus_alien():
	screen.blit(bonus_alien, bonus_alien_rect)

invader_shots = []
invader_shot_speed = 5

invader_shot_timer = 0

def random_invader_shoot():
	random_invader_num = random.randint(0,len(invaders) - 1)
	random_invader = invaders[random_invader_num]

	shot_x = random_invader.x + int(random_invader.width / 2)
	shot_y = random_invader.bottom

	shot = pygame.Rect(shot_x, shot_y, 2, 10)
	invader_shots.append(shot)

def move_invader_shots():
	for shot in invader_shots:
		shot.y += invader_shot_speed
		if shot.y > 460:
			invader_shots.remove(shot)

def draw_invader_shots():
	for shot in invader_shots:
		pygame.draw.rect(screen, (255,255,255), shot)

# initialize barrier data
barriers = []

def create_barriers():
	barrier_y = 360

	for barrier_num in range(0,4):
		barrier_x = 120 * (barrier_num + 1)
		barrier = []
		for block_num in range(0,10):
			block = pygame.Rect(barrier_x + block_num * 5, barrier_y, 5, 5)
			barrier.append(block)
		barrier_y += 5
		barrier_x -= 5
		for row in range(0,3):
			for block_num in range(0,12):
				block = pygame.Rect(barrier_x + block_num * 5, barrier_y, 5, 5)
				barrier.append(block)
			barrier_y += 5
		for col in range(0,2):
			for block_num in range(0,3):
				block = pygame.Rect(barrier_x + block_num * 5, barrier_y, 5, 5)
				barrier.append(block)
			barrier_x += 45
		barriers.append(barrier)
		barrier_y = 360

create_barriers()

def draw_barriers():
	for barrier in barriers:
		for block in barrier:
			pygame.draw.rect(screen, (0,255,0), block)

# run the game until the user(s) close the window
while True:
	# check for in-game events such as key-presses and button clicks
	for event in pygame.event.get():
		# if the user closes the window, don't crash!
		if event.type == QUIT:
			pygame.quit()
			sys.exit()
		if event.type == KEYDOWN:
			if event.key == K_LEFT:
				move_left = True
				move_right = False
			if event.key == K_RIGHT:
				move_left = False
				move_right = True
		if event.type == KEYUP:
			if event.key == K_LEFT:
				move_left = False
				move_right = False
			if event.key == K_RIGHT:
				move_left = False
				move_right = False
			if event.key == K_SPACE and not player_shot_is_out:
				player_shot = pygame.Rect(player_top.x + 2, player_top.top, 3, 10)
				player_shot_is_out = True
			if not alive:
				if event.key == K_RETURN:
					lives = 2
					score = 0
					level = 0
					alive = True
					player_top = pygame.Rect(player_x + 20, player_y, 10, 5)
					player_bottom = pygame.Rect(player_x, player_y + 5, 48, 18)
					player_shot_is_out = False
					invaders = []
					invader_shots = []
					barriers = []
					create_barriers()
					create_invaders()
					invader_frame_timer = 0
					invader_shot_timer = 0
					bonus_alien_timer = 0
					alien_speed = 1
					num_times_dropped = 0

	# tick the game
	main_clock.tick(25 + (2 * level))

	# move the player
	if move_left and player_bottom.left > 0:
		player_bottom.x -= player_speed
		player_top.x -= player_speed
	if move_right and player_bottom.right < 640:
		player_bottom.x += player_speed
		player_top.x += player_speed

	if invaders_move_right:
		move_invaders_right(alien_speed)
		if invaders[get_farthest_right()].right >= 640:
			move_invaders_down()
			invaders_move_left = True
			invaders_move_right = False
			num_times_dropped += 1
			if num_times_dropped % int(12 / level) == 0:
				alien_speed += 1
	if invaders_move_left:
		move_invaders_left(alien_speed)
		if invaders[get_farthest_left()].left <= 0:
			move_invaders_down()
			invaders_move_left = False
			invaders_move_right = True
			num_times_dropped += 1
			if num_times_dropped % int(12 / level) == 0:
				alien_speed += 1

	invader_frame_timer += 1
	if invader_frame_timer % 25 == 0:
		invader_open_frame = not invader_open_frame

	invader_shot_timer += 1
	if invader_shot_timer % 80 == 0:
		random_invader_shoot()

	bonus_alien_timer += 1
	if bonus_alien_timer % 500 == 0:
		bonus_alien_is_out = True

	if bonus_alien_is_out:
		bonus_alien_rect.x += 4
		if bonus_alien_rect.x > 640:
			bonus_alien_rect.x = -10
			bonus_alien_is_out = False

	# check if player shot the barrier
	for barrier in barriers:
		for block in barrier:
			if player_shot.colliderect(block):
				player_shot_is_out = False
				barrier.remove(block)

			for shot in invader_shots:
				if shot.colliderect(block):
					invader_shots.remove(shot)
					barrier.remove(block)

	for shot in invader_shots:
		if player_top.colliderect(shot) or player_bottom.colliderect(shot):
			player_top.x = 20
			player_bottom.x = 0
			invader_shots.remove(shot)
			lives -= 1

	for invader in invaders:
		if player_shot.colliderect(invader):
			score += 100
			player_shot = pygame.Rect(0,0,0,0)
			player_shot_is_out = False
			invaders.remove(invader)

		if player_top.colliderect(invader) or player_bottom.colliderect(invader) or invader.colliderect(ground):
			alive = False

		for barrier in barriers:
			for block in barrier:
				if invader.colliderect(block):
					barrier.remove(block)

	if player_shot.colliderect(bonus_alien_rect):
		score += 250
		bonus_alien_rect.x = -10
		player_shot = pygame.Rect(0,0,0,0)
		player_shot_is_out = False
		bonus_alien_is_out = False

	if lives < 0:
		alive = False

	if invaders == []:
		level += 1
		lives += 1
		score += 500
		alien_speed = 1
		num_times_dropped = 0
		create_invaders()

	# draw the screen over everything, then draw the net, then the players, then the ball
	draw_screen()
	draw_ground()
	draw_lives(lives)

	if alive:
		draw_player()
		draw_barriers()

		draw_invaders()

		if bonus_alien_is_out:
			draw_bonus_alien()

		move_invader_shots()
		draw_invader_shots()

		if player_shot_is_out:
			player_shot.y -= player_shot_speed
			if player_shot.y <= 0:
				player_shot_is_out = False
			draw_player_shot()

		# display the scores
		draw_text("Score: %s" % (score), font, screen, 50, 20)
		draw_text("High Score: %s" % (max(score, high_score)), font, screen, 200, 20)
		draw_text("Level: %s" % (level), font, screen, 400, 20)

	else:
		high_score = score
		draw_text("Game over! Final Score: %s" % (score), font, screen, 100, 200)
		draw_text("Press ENTER to play again!", font, screen, 150, 300)

	# update the display with all the new drawings
	pygame.display.update()