import pygame
import sys
from pygame.locals import *

pygame.init()

# create the screen, make it 640 px wide, 460 px tall, and make it white
screen = pygame.display.set_mode([640,460])
screen.fill((255,255,255))

# give the window the caption "Pong!"
pygame.display.set_caption("Pong!")

# set the font
font = pygame.font.SysFont(None, 72)

# create a clock to slow the game down
main_clock = pygame.time.Clock()

# initialize the net rectangle
net = pygame.Rect(319,0,2,460)

# intialize the turn variable
turn = 0

# initialize the player rectangles
player1 = pygame.Rect(30,200,10,60)
player2 = pygame.Rect(600,200,10,60)

# initialize each player's attributes
player1_move_up = False
player1_move_down = False

player1_score = 0

player2_move_up = False
player2_move_down = False

player2_score = 0

player_speed = 6

# ball attributes
ball_pos_x = 0
ball_pos_y = 0

ball_radius = 5

ball_speed = [5, -5]
ball_can_move = False

ball = pygame.draw.circle(screen, (0,0,0), (ball_pos_x, ball_pos_y), ball_radius, 0)

# tell pygame to draw the player rectangles to the screen
def draw_players():
	pygame.draw.rect(screen, (0,0,0), player1)
	pygame.draw.rect(screen, (0,0,0), player2)

# tell pygame to draw the net to the screen
def draw_net():
	pygame.draw.rect(screen, (0,0,0), net)

# tell pygame to redraw the white background over everything
# recall: this helps simulate motion by drawing over old rectangles
def draw_screen():
	screen.fill((255,255,255))

# draw the argued text to the screen in the argued position
def draw_text(display_string, font, surface, x, y):
    text_display = font.render(display_string, 1, (0, 0, 0))
    text_rect = text_display.get_rect()
    text_rect.topleft = (x, y)
    surface.blit(text_display, text_rect)

# run the game until the user(s) close the window
while True:
	# check for in-game events such as key-presses and button clicks
	for event in pygame.event.get():
		# if the user closes the window, don't crash!
		if event.type == QUIT:
			pygame.quit()
			sys.exit()
		# if either player hits their respective up or down key, change their
		# movement attributes--(THIS DOESN'T MAKE THE PLAYERS MOVE)
		if event.type == KEYDOWN:
			if event.key == K_w:
				player1_move_up = True
				player1_move_down = False
			if event.key == K_s:
				player1_move_up = False
				player1_move_down = True
			if event.key == K_UP:
				player2_move_up = True
				player2_move_down = False
			if event.key == K_DOWN:
				player2_move_up = False
				player2_move_down = True
		# When either player releases their respective movement keys, change
		# their movement attributes--(THIS DOESN'T STOP THE PLAYERS)
		if event.type == KEYUP:
			if event.key == K_w:
				player1_move_up = False
				player1_move_down = False
			if event.key == K_s:
				player1_move_up = False
				player1_move_down = False
			if event.key == K_UP:
				player2_move_up = False
				player2_move_down = False
			if event.key == K_DOWN:
				player2_move_up = False
				player2_move_down = False
			# when the space bar is pressed, release the ball
			if event.key == K_SPACE:
				ball_can_move = True

	# tick the game by 50 milliseconds
	main_clock.tick(50)

	# check if player1 wants to and can move--if so, change the y position
	if player1_move_up and player1.top > 0:
		player1.y -= player_speed
	if player1_move_down and player1.bottom < 460:
		player1.y += player_speed

	# check if player2 wants to and can move--if so, change the y position
	if player2_move_up and player2.top > 0:
		player2.y -= player_speed
	if player2_move_down and player2.bottom < 460:
		player2.y += player_speed

	if ball_can_move:
		# update ball position
		ball_pos_x += ball_speed[0]
		ball_pos_y += ball_speed[1]

		# check if either player got the ball past the other
		if ball_pos_x >= 640:
			player1_score += 1
			ball_can_move = False
			turn += 1
		elif ball_pos_x <= 0:
			player2_score += 1
			ball_can_move = False
			turn += 1

		# check if ball hits the top or bottom of the screen
		if ball_pos_y >= 460:
			ball_pos_y = 445
			ball_speed[1] = -ball_speed[1]
		elif ball_pos_y <= 0:
			ball_pos_y = 15
			ball_speed[1] = -ball_speed[1]

		# check if ball hits either player
		if ball.colliderect(player1):
			ball_pos_x = player1.x + 25
			ball_speed[0] = -ball_speed[0]
		if ball.colliderect(player2):
			ball_pos_x = player2.x - 15
			ball_speed[0] = -ball_speed[0]
	# if the ball is not in play-mode, draw it in front of the player's paddle
	else:
		# even turn means player1 serves, odd means player2
		if turn % 2 == 0:
			ball_pos_x = player1.x + 20
			ball_pos_y = player1.y + 30
		else:
			ball_pos_x = player2.x - 10
			ball_pos_y = player2.y + 30

	# draw the screen over everything, then draw the net, then the players, then the ball
	draw_screen()
	draw_net()
	draw_players()
	ball = pygame.draw.circle(screen, (0,0,0), (ball_pos_x,ball_pos_y), ball_radius, 0)

	# display the scores
	draw_text("%s" % (player1_score), font, screen, 250, 20)
	draw_text("%s" % (player2_score), font, screen, 365, 20)

	# update the display with all the new drawings
	pygame.display.update()