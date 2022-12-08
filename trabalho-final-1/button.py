from dataclasses import dataclass, field

import pygame

pygame.font.init()
gui_font = pygame.font.Font(None, 30)


@dataclass
class Button:
    text: str
    size: tuple
    position: tuple
    event: int

    pressed: bool = field(init=False, default=False)

    top_rect: pygame.Rect = field(init=False, hash=False)
    top_rect_color: pygame.Color = field(init=False, default='#475F77')

    elevation: int = field(init=False, default=5)
    current_elevation: int = field(init=False, default=5)

    def draw(self, screen):
        _, y = self.position
        self.top_rect = pygame.Rect(self.position, self.size)

        bottom_rect = pygame.Rect(self.position, self.size)
        bottom_rect_color = '#354B5E'

        text_surf = gui_font.render(self.text, True, '#FFFFFF')
        text_rect = text_surf.get_rect(center=self.top_rect.center)

        self.top_rect.y = y - self.current_elevation
        text_rect.center = self.top_rect.center

        bottom_rect.midtop = self.top_rect.midtop
        bottom_rect.height = self.top_rect.height + self.current_elevation

        pygame.draw.rect(screen, bottom_rect_color,
                         bottom_rect, border_radius=12)
        pygame.draw.rect(screen, self.top_rect_color,
                         self.top_rect, border_radius=12)
        screen.blit(text_surf, text_rect)

        self.check_click()

    def check_click(self):
        mouse_position = pygame.mouse.get_pos()
        if self.top_rect.collidepoint(mouse_position):
            self.top_rect_color = '#D74B4B'
            if pygame.mouse.get_pressed()[0]:
                self.current_elevation = 0
                self.pressed = True
            else:
                self.current_elevation = self.elevation
                if self.pressed:
                    pygame.event.post(pygame.event.Event(self.event))
                    self.pressed = False
        else:
            self.current_elevation = self.elevation
            self.top_rect_color = '#475F77'
