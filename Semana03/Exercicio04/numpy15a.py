import numpy as np

a = np.zeros((2,3)) 
print(a)

b = np.ones((2,3))
print(b)

c = 5 * np.ones((3,3))
print(c)
c = np.full((3,3), 5.0)
print(c)

d = np.eye(3)
print(d)

e = np.arange(10)
print(e)

f = np.linspace(0, 10, 5)
print(f)
