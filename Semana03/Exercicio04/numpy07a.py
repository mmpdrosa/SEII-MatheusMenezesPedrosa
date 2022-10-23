import numpy as np

a = np.array([[1,2], [3,4]])
print(a)
print(a.shape)

print(a[0])
print(a[0][0])
print(a[0,0])

print(a[:,0]) 
print(a[0,:])

print(a.T)

b = np.array([[1, 2], [3,4]])

print(np.linalg.inv(b))

print(np.linalg.det(b))

print(np.diag(b))

c = np.diag(b)
print(c)
