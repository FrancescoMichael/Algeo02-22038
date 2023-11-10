import cv2
import numpy as np
import math
import os
import time

start_time = time.time()

img1 = cv2.imread("Julian.jpg")
img2 = cv2.imread("kiamat.jpg")


def bgr_to_greyscale(img_bgr_matrix):
    row = img_bgr_matrix.shape[0]
    col = img_bgr_matrix.shape[1]

    img_greyscale_matrix = np.zeros((row, col), dtype=int)

    for i in range(row):
        for j in range(col):
            img_greyscale_matrix[i][j] = (img_bgr_matrix[i][j][0] * 0.114 + img_bgr_matrix[i][j][1] * 0.587 + img_bgr_matrix[i][j][2] * 0.299)
    return img_greyscale_matrix

def create_coocurence_matrix(img_greyscale_matrix):
    # digunakan d = 1 dan theta = 0 derajat
    coocurence_matrix = np.zeros((256,256), dtype=int)

    row, col = img_greyscale_matrix.shape

    for i in range(row):
        for j in range(col-1):
            coocurence_matrix[img_greyscale_matrix[i][j]][img_greyscale_matrix[i][j+1]] += 1
    return coocurence_matrix

def create_symmetric_matrix(coocurence_matrix):
    transposed_coocurence_matrix = np.transpose(coocurence_matrix)
    symmetric_matrix = np.add(coocurence_matrix,transposed_coocurence_matrix)
    symmetric_matrix = symmetric_matrix.astype(float)

    # proses normalisasi
    total = np.sum(symmetric_matrix)
    for i in range(256):
        for j in range(256):
            symmetric_matrix[i][j] /= total

    return symmetric_matrix

def create_feature_vector(symmetrix_matrix):
    contrast = 0.
    homogeneity = 0.
    ASM = 0.
    energy = 0.
    entropy = 0.
    sum_val = 0.
    GLCM_mean = 0.
    correlation = 0.
    GLCM_variance = 0.

    for i in range(256):
        for j in range(256):
            value = symmetrix_matrix[i][j]
            contrast += value * ((i-j) ** 2)
            homogeneity += value / (1 + ((i-j) ** 2))
            ASM += value ** 2
            sum_val += value
            GLCM_mean += i * value
            if value != 0:
                entropy -= value * math.log(value)

    for i in range(256):
        for j in range(256):
            GLCM_variance += symmetrix_matrix[i][j] * ((i-GLCM_mean) ** 2)

    for i in range(256):
        for j in range(256):
            correlation += symmetrix_matrix[i][j] * ((i-GLCM_mean) * (j - GLCM_mean)) / GLCM_variance

    energy = math.sqrt(ASM)
    return np.array([contrast, homogeneity, entropy, energy, correlation])


def load_images_from_dir(path, dir_list):
    arr_bgr_matrices = []
    for x in dir_list:
        arr_bgr_matrices.append(np.array(cv2.imread(path + x)))
    return arr_bgr_matrices

def cosine_similarty(feature_vector_1, feature_vector_2):
    norm1 = np.linalg.norm(feature_vector_1)
    norm2 = np.linalg.norm(feature_vector_2)

    if norm1 == 0 or norm2 == 0:
        similarity = 0 
    else:
        similarity = np.vdot(feature_vector_1, feature_vector_2) / (norm1 * norm2)

    return similarity


test_feature_vector = create_feature_vector(create_symmetric_matrix(create_coocurence_matrix(bgr_to_greyscale(np.array(cv2.imread("test/948.jpg"))))))

dir_list = os.listdir('test/')
dataset_bgr_matrices = load_images_from_dir("test/", dir_list)

arr_similarity = []
length = len(dataset_bgr_matrices)
for i in range(length):
    feature_vector = create_feature_vector(create_symmetric_matrix(create_coocurence_matrix(bgr_to_greyscale(dataset_bgr_matrices[i]))))
    arr_similarity.append((i, cosine_similarty(test_feature_vector,feature_vector)))

arr_similarity.sort(key=lambda x: x[1],reverse=True)
print("5 foto terdekat pertama : ")
for i in range(5):
    print(dir_list[int(arr_similarity[i][0])])

end_time = time.time()

print("--- %s seconds ---" % (end_time - start_time))