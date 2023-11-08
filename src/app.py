import cv2
import numpy as np
import math 


def imgToMatrix(path):
    im = cv2.imread(path)
    arr = np.array(im,dtype='float')
    arr = np.flip(arr,2)
    return arr

def matrixRGBtoHSV(arr):
    #normalised matrix
    
    
    (row,col,c) = arr.shape
    arr = arr/255
    
    for  i in range(0,row):
        for j in range(0,col):
            r = arr[i][j][0]
            g = arr[i][j][1]
            b = arr[i][j][2]
            cmax = max(r,g,b)
            cmin = min(r,g,b)
            delta = cmax - cmin
            if (math.isclose(delta,0.0)):
                h = 0
            elif (math.isclose(cmax,r) ):
                h = 60 * (((g-b)/delta)%6)
            elif (math.isclose(cmax,g)):
                h = 60 * (((b-r)/delta)+2)
            elif (math.isclose(cmax,b)):
                h = 60 * (((r-g)/delta)+4)

            if (math.isclose(cmax,0.0)):
                s = 0
            else:
                s =  delta/cmax
            
            arr[i][j][0] = h
            arr[i][j][1] = s
            arr[i][j][2] = cmax

    return arr

def hsvToVector(arr):
    image_vector = arr.reshape(1, -1, 3)
    h = image_vector[0, :, 0]
    v = image_vector[0, :, 1]
    s = image_vector[0, :, 2]
    vector = np.concatenate([[h, v, s]], axis=0)
    return vector

    
    
    
    


arr = imgToMatrix('test/948.jpg')
arr = matrixRGBtoHSV(arr)
arr = hsvToVector(arr)
print(arr)