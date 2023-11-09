import cv2
import numpy as np
import math
import matplotlib.pyplot as plt
import os
import time
start_time = time.time()
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

        bin_h = np.histogram(h,bins=[0,26,41,121,191,271,296,316,360]) # histogram with bins according to reference
        bin_s = np.histogram(s,bins = [0,0.2,0.7,1])
        bin_v = np.histogram(v,bins = [0,0.2,0.7,1])
        # binh = [(i*36) for i in range(11)]
        # bins = [(i*0.1) for i in range(11)]
        # bin_h = np.histogram(h,bins=binh)
        # bin_s = np.histogram(s,bins = bins)
        # bin_v = np.histogram(v,bins = bins)
        vector = np.concatenate([bin_h[0], bin_s[0], bin_v[0]], axis=0)
        hasil.append(vector)
    return hasil
    
def cosineSimilarity(vector1,vector2):
    sum = 0.0
    for i in range(9):
        sum += np.dot(vector1[i], vector2[i]) / (np.linalg.norm(vector1[i]) * np.linalg.norm(vector2[i]))
    return sum/9 # return the average of cosine similarity, block 3x3

def loadDataVectorData(path,dir_list):
    arr_vectors = []
    for i in dir_list:
        arr = hsvToVector(matrixRGBtoHSV(imgToMatrix(path + i)))
        arr_vectors.append(arr)
    return arr_vectors
        


# testing
img_vector = hsvToVector(matrixRGBtoHSV(imgToMatrix(r'test/948.jpg'))) # misal 948.jpg
dir_list = os.listdir('test/')
data = loadDataVectorData('test/',dir_list)
arr_similarity = []
for i in range(len(data)):
    arr_similarity.append((cosineSimilarity(img_vector,data[i]) , i))
arr_similarity.sort(key=lambda x: x[0],reverse=True)
print("5 foto terdekat pertama : ")
for i in range(5):
    print(dir_list[int(arr_similarity[i][1])])

end_time = time.time()
print("--- %s seconds ---" % (end_time - start_time))
