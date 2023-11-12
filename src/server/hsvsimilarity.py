
import cv2
import numpy as np
import math
import matplotlib.pyplot as plt
import os
import time
import multiprocessing
import json

# class Hsvobj:
#     def __init__(self,percentage,name_path):
#         self.percentage = percentage
#         self.name_path = name_path



start_time = time.time()
np.seterr(divide='ignore', invalid='ignore')


def imgToMatrix(path):
    im = cv2.imread(path)
    width = im.shape[1]
    height = im.shape[0]
    dim = (width,height)
    #resizing image
    if (width != 256 or height != 256):
        width = 256
        height = 256
        dim = (width,height)
        im = cv2.resize(im,dim,interpolation = cv2.INTER_AREA)

    arr = np.array(im,dtype='float')
    arr = np.flip(arr,2)
    n_horizontal, n_vertical, n_elmt = arr.shape
    return arr[0 : n_horizontal - (n_horizontal%4) , 0 : n_vertical - (n_vertical%4), :] # crop photo so that it can be divided to a four by four block image

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
    b = round(n/16)
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
    for i in range(16):
        sum += np.dot(vector1[i], vector2[i]) / (np.linalg.norm(vector1[i]) * np.linalg.norm(vector2[i]))
    return sum/16 # return the average of cosine similarity, block 3x3

def loadVectorData(path,dir_list):
    arr_vectors = []
    for i in dir_list:
        arr = hsvToVector(matrixRGBtoHSV(imgToMatrix(path + i)))
        arr_vectors.append(arr)
    return arr_vectors

def distance1(vector1,vector2):
    sum = 0.0
    for i in range(16):

        h1_ = np.average(vector1[i])
        h2_ = np.average(vector2[i])

        # calculate score
        hasil= 0
        hasil = np.sum(np.sqrt(vector1[i] * vector2[i]))     
        hasil = math.sqrt( 1 - ( 1 / math.sqrt(h1_*h2_*len(vector1[i])*len(vector1[i])) ) * hasil )
        sum += hasil

    return sum/16# return the average of cosine similarity, block 3x3



# def obj_dict(obj):
#     return obj.__dict__


# k = "hello"
# li = [{'name':k}]
# l = os.listdir('src/imgUpload')
# img_vector = hsvToVector(matrixRGBtoHSV(imgToMatrix('src/imgUpload/'+l[0])))
# dir_list = os.listdir('test/')
# data = loadVectorData('test/',dir_list)
# arr_similarity = []
# for i in range(len(data)):
#     arr_similarity.append((cosineSimilarity(img_vector,data[i]) , i))
# arr_similarity.sort(key=lambda x: x[0],reverse=True)

# i = 0
# # print("gambar di atas 60 percent : ")
# while (arr_similarity[i][0]*100 > 60):
#     percent = arr_similarity[i][0]*100
#     # print(dir_list[int(arr_similarity[i][1])] + f" percent : {percent}%")
#     i += 1
# # print(f"total = {i} gambar di atas 60 percent")
# arr_similarity = arr_similarity[0:5]
# ob_arr = []
# for ob in arr_similarity:
#     percentobj = "" +str(round(ob[0]*100,2)) +"%"
#     hsvob = Hsvobj(percentobj,dir_list[ob[1]])
#     ob_arr.append(hsvob)
# jsonStr = json_string = json.dumps([ob.__dict__ for ob in ob_arr])
# print(jsonStr)


