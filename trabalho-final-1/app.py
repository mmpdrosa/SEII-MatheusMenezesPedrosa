import os

import numpy as np
import pygame

from button import Button
from main import compute_angle

screen_size = screen_width, screen_height = (1280, 720)
screen_title = ''

frames_per_second = 60

screen = pygame.display.set_mode(screen_size)
pygame.display.set_caption(screen_title)
base_font = pygame.font.Font(None, 32)

pendulum_image_1 = pygame.image.load(os.path.join('assets', 'pendulum-1.png'))
pendulum_image_2 = pygame.image.load(os.path.join('assets', 'pendulum-2.png'))
pendulum_images = (pendulum_image_1, pendulum_image_2)

origin = (640, 200)
pivot = (20, 20)

start_event = pygame.USEREVENT + 1
stop_event = pygame.USEREVENT + 2

start_button = Button('Start', (200, 40), (100, 300), start_event)
stop_button = Button('Stop', (200, 40), (100, 350), stop_event)

buttons = [start_button, stop_button]

input_rect = pygame.Rect(100, 250, 200, 40)


def update_window(pendulum_image, pendulum_image_rect, input_text):
    screen.fill((255, 255, 255))

    pygame.draw.rect(screen, (255, 0, 0), input_rect)
    text_surface = base_font.render(input_text, True, (0, 0, 0))
    screen.blit(text_surface, (input_rect.x + 5, input_rect.y + 5))

    for button in buttons:
        button.draw(screen)

    screen.blit(pendulum_image, pendulum_image_rect)

    pygame.draw.circle(screen, (128, 128, 128), (origin[0], origin[1]), 10)
    pygame.draw.circle(screen, (0, 0, 0), (origin[0], origin[1]), 8)

    pygame.display.update()


def rotate_pendulum_image(image, angle):
    image_rect = image.get_rect(
        topleft=(origin[0] - pivot[0], origin[1] - pivot[1]))
    offset_center_to_pivot = pygame.math.Vector2(origin) - image_rect.center
    rotated_offset = offset_center_to_pivot.rotate(-angle)
    rotated_image_center = (
        origin[0] - rotated_offset.x, origin[1] - rotated_offset.y)
    rotated_image = pygame.transform.rotate(image, angle)
    rotated_image_rect = rotated_image.get_rect(center=rotated_image_center)

    return rotated_image, rotated_image_rect


def main():
    clock = pygame.time.Clock()

    simulating = False
    pendulum_image_index = 0
    angle = 0
    input_angle = 0
    input_pressed = False
    input_text = ''

    running = True
    while running:
        clock.tick(frames_per_second)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

            if event.type == start_event:
                simulating = True
                print('start')

            if event.type == stop_event:
                simulating = False
                print('stop')

                input_angle = 0
                input_text = ''

            if event.type == pygame.MOUSEBUTTONDOWN:
                if input_rect.collidepoint(event.pos):
                    input_pressed = True
                else:
                    input_pressed = False

            if simulating and input_pressed and event.type == pygame.KEYDOWN:
                if event.key == pygame.K_BACKSPACE:
                    input_text = input_text[:-1]

                elif event.key == pygame.K_RETURN:
                    input_angle = float(input_text)
                else:
                    input_text += event.unicode

        pendulum_image = pendulum_images[pendulum_image_index]
        pendulum_image, pendulum_image_rect = rotate_pendulum_image(
            pendulum_image, angle)

        if simulating:
            pendulum_image_index ^= 1

        angle = compute_angle(input_angle, np.deg2rad(angle))
        angle = np.rad2deg(angle)

        update_window(pendulum_image, pendulum_image_rect, input_text)

    pygame.quit()


if __name__ == '__main__':
    main()
