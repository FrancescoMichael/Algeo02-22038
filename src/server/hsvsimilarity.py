
import cv2
import numpy as np
import math
import matplotlib.pyplot as plt
import os
import time
import json
import concurrent.futures




def imgToVector(path):
    return hsvToVector(matrixRGBtoHSV(imgToMatrix(path)))


def imgToMatrix(path):
    im = cv2.imread(path)
    width = im.shape[1]
    height = im.shape[0]
    dim = (width,height)

    #resizing image
    if ((width != 256 or height != 256) and (width >= 256) and (height >= 256)):
        width = 256
        height = 256
        dim = (width,height)
        # resizing tidak mempengaruhi akurasi
    elif (width < 256 and height < 256 and width >= 128 and height >= 128):
        width = 128
        height = 128
        dim = (width,height)
    elif (width >= 64 and height >= 64):
        width = 64
        height = 64
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
    #version 2
    b,k,elmt = arr.shape
    baris = int(b/4)
    kolom = int(k/4)
    hasil = []
    for i in range(0,b,baris):
        for j in range(0,k,kolom):
            temp = arr[i : (i+baris) , j : (j+kolom),0:3]
            temp = temp.reshape(1,-1,3)
            h = temp[0,:,0]
            s = temp[0,:,1]
            v = temp[0,:,2]
            bin_h = np.histogram(h,bins=[0,26,41,121,191,271,296,316,360])
            bin_s = np.histogram(s,bins = [0,0.2,0.7,1])
            bin_v = np.histogram(v,bins = [0,0.2,0.7,1])
            vector = np.concatenate([bin_h[0], bin_s[0], bin_v[0]], axis=0)
            vector = vector.reshape(-1)
            hasil.append(vector.tolist())
    return hasil

    # # version 3
    # hasil = []
    # image = arr
    # sub_shape = (int(image.shape[0]/4),int(image.shape[1]/4),3)

    # #divide the matrix into sub_matrices of subshape
    # view_shape = tuple(np.subtract(image.shape, sub_shape) + 1) + sub_shape
    # strides = image.strides + image.strides
    # sub_matrices = np.squeeze(np.lib.stride_tricks.as_strided(image,view_shape,strides)[::sub_shape[0],::sub_shape[1],:])
    # arr = sub_matrices
    # for i in range(4):
    #     for k in range(4):
    #         temp = arr[i][k]
    #         temp = temp.reshape(1,-1,3)
    #         h = temp[0,:,0]
    #         s = temp[0,:,1]
    #         v = temp[0,:,2]
    #         bin_h = np.histogram(h,bins=[0,26,41,121,191,271,296,316,360])
    #         bin_s = np.histogram(s,bins = [0,0.2,0.7,1])
    #         bin_v = np.histogram(v,bins = [0,0.2,0.7,1])
    #         vector = np.concatenate([bin_h[0], bin_s[0], bin_v[0]], axis=0)
    #         vector = vector.reshape(-1)
    #         hasil.append(vector.tolist())
    # return hasil



def cosineSimilarity(vector1,vector2):
    k = []
    sum = 0
    for i in range(16):
        # k.append(np.dot(vector1[i], vector2[i]) / (np.linalg.norm(vector1[i]) * np.linalg.norm(vector2[i])))
        sum += (np.dot(vector1[i], vector2[i]) / (np.linalg.norm(vector1[i]) * np.linalg.norm(vector2[i])))
    # print(k)

    return sum/16 # return the average of cosine similarity, block 4x4

def loadVectorData(path,dir_list):
    arr_vectors = []
    list_extension = ['jpg','jpeg','png']

    with concurrent.futures.ThreadPoolExecutor() as executor:
        for i in range(len(dir_list)):
            if (dir_list[i][len(dir_list[i]) - 3 :]) in list_extension:
                p = executor.submit(imgToVector,path + dir_list[i])
                # print(p.result())

                arr_vectors.append(p.result())
    # return arr_vectors
    # for i in dir_list:
    #     if (i[len(i)-3:] in list_extension):
    #         arr = hsvToVector(matrixRGBtoHSV(imgToMatrix(path + i)))
    #         arr_vectors.append(arr)
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


def split_to_16_parts(image):
    sub_shape = (int(image.shape[0]/4),int(image.shape[1]/4),3)

    #divide the matrix into sub_matrices of subshape
    view_shape = tuple(np.subtract(image.shape, sub_shape) + 1) + sub_shape
    strides = image.strides + image.strides
    sub_matrices = np.squeeze(np.lib.stride_tricks.as_strided(image,view_shape,strides)[::sub_shape[0],::sub_shape[1],:])
    return sub_matrices

