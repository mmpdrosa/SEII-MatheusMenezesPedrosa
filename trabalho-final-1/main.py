import numpy as np


def system(u: float, x: list) -> list:
    x1 = x[0]
    x2 = x[1]

    mass = 0.850
    gravity = 9.81
    p = mass * gravity
    l1 = 0.75
    l2 = 1.20
    J = 1e-2
    ua = 0.10

    return np.array([x2, -(p * l1)/J * np.sin(x1) - ua/J * x2 + l2/J * u], dtype='float64')


def range_kutta(uk, xk, h):
    k1 = system(uk, xk)
    k2 = system(uk, xk + h*k1/2.0)
    k3 = system(uk, xk + h*k2/2.0)
    k4 = system(uk, xk + h*k3)

    xkp1 = xk + (h/6.0)*(k1 + 2*k2 + 2*k3 + k4)

    return xkp1


def compute_angle(input_angle, angle, fps=60):
    h = 1/fps
    l1 = 0.75
    l2 = 1.20
    p = 0.85*9.81

    u = np.sin(np.deg2rad(input_angle))*p*l1/l2

    x = np.zeros([2], dtype='float64')
    x[0] = angle

    next_angle = range_kutta(u, x, h)[0]

    return next_angle


if __name__ == '__main__':
    input_angle = 80
    angle = 0

    for i in range(200):
        print(np.rad2deg(angle))
        angle = compute_angle(input_angle, angle)
