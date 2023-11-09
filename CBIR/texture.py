import cv2
import numpy as np
import math
import time
import matplotlib.pyplot as plt

start_time = time.time()

# import matplotlib.pyplot as plt

img1 = cv2.imread("Julian.jpg")
img2 = cv2.imread("Sean.jpg")
# cv2.imshow('Image', img1)
# cv2.waitKey(0)
img_bgr_matrix = np.array(img1)

def bgr_to_greyscale(img_bgr_matrix):
    row = img_bgr_matrix.shape[0]
    col = img_bgr_matrix.shape[1]

    img_greyscale_matrix = np.zeros((row, col), dtype=int)

    for i in range(row):
        for j in range(col):
            img_greyscale_matrix[i][j] = (img_bgr_matrix[i][j][0] * 0.114 + img_bgr_matrix[i][j][1] * 0.587 + img_bgr_matrix[i][j][2] * 0.299)
    return img_greyscale_matrix

# plt.imshow(bgr_to_greyscale(img_bgr_matrix), cmap=plt.get_cmap('gray'))
# plt.show()

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
    
    print(symmetric_matrix[205][204])

    return symmetric_matrix

def create_feature_vector(symmetrix_matrix):
    contrast = 0.
    homogeneity = 0.
    entropy = 0.

    for i in range(256):
        for j in range(256):
            contrast += symmetrix_matrix[i][j] * ((i-j) ** 2)
            homogeneity += symmetrix_matrix[i][j] / (1 + ((i-j) ** 2))
            if symmetrix_matrix[i][j] != 0:
                entropy -= symmetrix_matrix[i][j] * math.log(symmetrix_matrix[i][j])

    return np.array([contrast, homogeneity, entropy])


def compare_images(image1, image2):
    bgr_matrix1 = np.array(image1)
    bgr_matrix2 = np.array(image2)

    greyscale_matrix1 = bgr_to_greyscale(bgr_matrix1)
    greyscale_matrix2 = bgr_to_greyscale(bgr_matrix2)

    coocurence_matrix1 = create_coocurence_matrix(greyscale_matrix1)
    coocurence_matrix2 = create_coocurence_matrix(greyscale_matrix2)

    # print("Co-occurrence Matrix 1:")
    # print(create_coocurence_matrix(greyscale_matrix1))

    # print("Co-occurrence Matrix 2:")
    # print(create_coocurence_matrix(greyscale_matrix2))

    symmetric_matrix1 = create_symmetric_matrix(coocurence_matrix1)
    symmetric_matrix2 = create_symmetric_matrix(coocurence_matrix2)

    feature_vector1 = create_feature_vector(symmetric_matrix1)
    feature_vector2 = create_feature_vector(symmetric_matrix2)

    norm1 = np.linalg.norm(feature_vector1)
    norm2 = np.linalg.norm(feature_vector2)

    print("Feature Vector 1:", feature_vector1)
    print("Feature Vector 2:", feature_vector2)
    print("Norm 1:", norm1)
    print("Norm 2:", norm2)

    if norm1 == 0 or norm2 == 0:
        similarity = 0  # or handle it in a way that makes sense for your application
    else:
        similarity = np.vdot(feature_vector1, feature_vector2) / (norm1 * norm2)

    print("Similarity:", similarity)

compare_images(img1,img2)

end_time = time.time()

print("--- %s seconds ---" % (end_time - start_time))