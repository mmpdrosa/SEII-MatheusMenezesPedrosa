import numpy as np

A = np.array([[1, 1], [1.5, 4]])
b = np.array([2200,5050])

# Ax = b <=> x = A-1 b

x = np.linalg.inv(A).dot(b) 
print(x)

x = np.linalg.solve(A,b) # best way
print(x)
