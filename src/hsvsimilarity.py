import cv2
import numpy as np
import math
import matplotlib.pyplot as plt
np.seterr(divide='ignore', invalid='ignore')

def imgToMatrix(path):
    im = cv2.imread(path)
    arr = np.array(im,dtype='float')
    arr = np.flip(arr,2)
    n_horizontal, n_vertical, n_elmt = arr.shape

    return arr[0 : n_horizontal - (n_horizontal%3) , 0 : n_vertical - (n_vertical%3), :] # crop photo so that it can be divided to three

def matrixRGBtoHSV(rgb_matrix):
    # Normalize the RGB values to the range [0, 1]
    rgb_matrix = rgb_matrix / 255.0

    r, g, b = rgb_matrix[:,:, 0], rgb_matrix[:,:, 1], rgb_matrix[:,:, 2]
    cmax = np.max(rgb_matrix, axis=-1)
    cmin = np.min(rgb_matrix, axis=-1)
    delta = cmax - cmin

    h = np.where(np.isclose(delta,0),0,np.where(np.isclose(cmax, r), 60 * (((g - b) / delta) % 6),
                     np.where(np.isclose(cmax, g), 60 * (((b - r) / delta) + 2),
                              np.where(np.isclose(cmax,b) ,60*(((r-g)/delta)+4) , 0 ))))
    s = np.where(np.isclose(cmax, 0.0), 0.0, delta / cmax)
    v = cmax
    hsv_matrix = np.dstack((h, s, v))
    return hsv_matrix

def hsvToVector(arr):
    image_vector = arr.reshape(1, -1, 3)
    a,n,c = image_vector.shape
    hasil = []
    b = round(n/9)
    for i in range(0,n,b):
        h = image_vector[0, i:(i+b), 0]
        s = image_vector[0, i:(i+b), 1]
        v = image_vector[0, i:(i+b), 2]

        bin_h = np.histogram(h,bins=[0,26,41,121,191,271,296,316,360])
        bin_s = np.histogram(s,bins = [0,0.2,0.7,1])
        bin_v = np.histogram(v,bins = [0,0.2,0.7,1])
        vector = np.concatenate([bin_h[0], bin_s[0], bin_v[0]], axis=0)
        hasil.append(vector)
    return hasil
    

def cosineSimilarity(vector1,vector2):
    sum = 0.0
    for i in range(9):
        sum += np.dot(vector1[i], vector2[i]) / (np.linalg.norm(vector1[i]) * np.linalg.norm(vector2[i]))
    return sum/9



def readFolder():
    pass

arr = imgToMatrix('test/948.jpg') # yang dicari
arr = matrixRGBtoHSV(arr)
arr = hsvToVector(arr)


arr2 = imgToMatrix('test/953.jpg')
arr2 = matrixRGBtoHSV(arr2)
arr2 = hsvToVector(arr2)

# print(arr)
# print(arr2)

# arr = matrixRGBtoHSV(arr)
# arr = rgb_to_hsv(arr)
# arr = hsvToVector(arr)
print(cosineSimilarity(arr,arr2))

# print(arr)
# print(arr2)