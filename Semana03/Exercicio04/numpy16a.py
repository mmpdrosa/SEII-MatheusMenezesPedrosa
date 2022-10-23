import numpy as np

a = np.random.random((3,2))
print(a)

b = np.random.randn(3,2)
print(b)

R = np.random.randn(10000)
print(R.mean(), R.var(), R.std())

R = np.random.randint(3,10,size=(3,3))
print(R)

c = np.random.choice(5, size=10)
print(c)

d = np.random.choice([-8,2,3,4], size=8)
print(d)
