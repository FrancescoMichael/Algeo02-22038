from flask import Flask,request,jsonify,redirect, url_for, request
from hsvsimilarity import*

import os
import zipfile
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import shutil


import json
import time
global start_time
global time_length
global total_result
global path_initial
path_initial = ""
total_result = 0
start_time = 0
time_length = 0

np.seterr(divide='ignore', invalid='ignore')

app = Flask(__name__)
CORS(app)

UPLOAD_TEST = '../client/public/imgUpload'
app.config['UPLOAD_TEST'] = UPLOAD_TEST

UPLOAD_DATASET = '../client/public/imgDataset'
app.config['UPLOAD_DATASET'] = UPLOAD_DATASET

def ensure_upload_folder(folder_path):
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

def download_image_from_url(url, save_path):
    response = requests.get(url, stream=True)
    with open(save_path, 'wb') as file:
        for chunk in response.iter_content(chunk_size=1024):
            if chunk:
                file.write(chunk)

def unzip_file(zip_path, extract_path):
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_path)
    os.remove(zip_path)

@app.route('/load_data',methods = ['POST', 'GET'])
def load_data():
    global start_time
    global time_length
    global path_initial

    start_time = time.time()
    path_initial = ""

    dir_list = os.listdir('../client/public/imgDataset/') # receive path of all images
    # if (os.path.isdir("./imgDataset/" + dir))
    if (os.path.isdir('../client/public/imgDataset/' + dir_list[0])):
        path_initial = dir_list[0]+'/'
        dir_list = os.listdir('../client/public/imgDataset/' + dir_list[0]+'/')
        
    
    data_vector = loadVectorData('../client/public/imgDataset/'+path_initial,dir_list) # load vectors for all image dataset

    dictData = [{"Path" : path_initial + dir_list[i],"vector":data_vector[i]} for i in range(len(data_vector))] # load dictionary

    json_object = json.dumps(dictData, indent=4)

    #writing cache
    with open("./data_cache/color_cache.json", "w") as outfile:
        outfile.write(json_object)
    
    
    
    if (start_time == 0):
        start_time = time.time() # start time if using cache
    
    l = os.listdir('../client/public/imgUpload/')

    with open("./data_cache/color_cache.json", 'r') as openfile:
        json_object = json.load(openfile)

    dir_list = [obj['Path'] for obj in json_object] # read path from cache
    data = [obj['vector'] for obj in json_object]# read

    img_vector = hsvToVector(matrixRGBtoHSV(imgToMatrix('../client/public/imgUpload/'+l[0]))) # process ulploaded image

    # version 1    
    arr_similarity = []
    global total_result
    total_result = 0
    for i in range(len(data)):
        cosine_result = cosineSimilarity(img_vector,data[i])
        if (cosine_result >= 0.6):
            arr_similarity.append(( cosine_result, i))
            total_result += 1
    arr_similarity.sort(key=lambda x: x[0],reverse=True)


    ob_arr = []
    i = 1
    for ob in arr_similarity:
        percentobj = "" +str(round(ob[0]*100,2)) +"%"
        
        ob_arr.append({"id":str(i),"percentage":percentobj , "image": dir_list[ob[1]]})
        i += 1
    

    f = []
    for ob in ob_arr:
        extra = request.args.get("extra")
        if extra:
            ob["extra"] = extra
        f.append(ob)
    end_time = time.time()
  
    time_length = end_time - start_time
    
    start_time = 0
    return jsonify(f),200


@app.route('/data')
def data():
    global time_length
    global start_time
    
    if (start_time == 0):
        start_time = time.time() # start time if using cache
    
    l = os.listdir('../client/public/imgUpload/')

    with open("./data_cache/color_cache.json", 'r') as openfile:
        json_object = json.load(openfile)

    dir_list = [obj['Path'] for obj in json_object] # read path from cache
    data = [obj['vector'] for obj in json_object]# read

    img_vector = hsvToVector(matrixRGBtoHSV(imgToMatrix('../client/public/imgUpload/'+l[0]))) # process ulploaded image

    # version 1    
    arr_similarity = []
    global total_result
    total_result = 0
    for i in range(len(data)):
        cosine_result = cosineSimilarity(img_vector,data[i])
        if (cosine_result >= 0.6):
            arr_similarity.append(( cosine_result, i))
            total_result += 1
    arr_similarity.sort(key=lambda x: x[0],reverse=True)


    ob_arr = []
    i = 1
    for ob in arr_similarity:
        percentobj = "" +str(round(ob[0]*100,2)) +"%"
        
        ob_arr.append({"id":str(i),"percentage":percentobj , "image": dir_list[ob[1]]})
        i += 1
    

    f = []
    for ob in ob_arr:
        extra = request.args.get("extra")
        if extra:
            ob["extra"] = extra
        f.append(ob)
    end_time = time.time()
  
    time_length = end_time - start_time
    
    start_time = 0
    return jsonify(f),200
    

@app.route('/execution_time')
def execution():
    result = str(total_result) + " Results in "
    if (time_length < 60):
        execution_time = {'id':'1','execution_time':result + str(round(time_length,2))+" seconds"}
    else:
        convert = time.strftime("%M.%S",time.gmtime(time_length))
        execution_time = {'id':'1','execution_time': result + convert +" Minutes"}

    return execution_time   
    

@app.route('/upload', methods=['POST'])
def upload_image():
    list_dir = os.listdir("../client/public/imgDataset/")
    for i in list_dir:
        if (os.path.isdir("../client/public/imgDataset/" + i)):
            shutil.rmtree("../client/public/imgDataset/" + i)
        elif (os.path.isfile("../client/public/imgDataset/" + i)):
            os.remove("../client/public/imgDataset/" + i)
    try:
        ensure_upload_folder(app.config['UPLOAD_TEST'])
        ensure_upload_folder(app.config['UPLOAD_DATASET'])

        # Mengecek apakah 'imageToTest' dan 'imageForDataset' ada dalam request.files
        if 'imageToTest' in request.files:
            image_to_test = request.files['imageToTest']
            if image_to_test.filename != '':
                image_to_test_path = os.path.join(app.config['UPLOAD_TEST'], 'image_to_test.png')
                image_to_test.save(image_to_test_path)
            else:
                return jsonify({"error": "No selected file for imageToTest"}), 400
        else:
            image_to_test_path = None

        if 'imageForDataset' in request.files:
            image_for_dataset = request.files['imageForDataset']
            if image_for_dataset.filename != '':
                # Memeriksa apakah file dataset adalah zip
                if image_for_dataset.filename.endswith('.zip'):
                    dataset_folder = os.path.join(app.config['UPLOAD_DATASET'])
                    ensure_upload_folder(dataset_folder)
                    zip_path = os.path.join(dataset_folder, 'dataset.zip')
                    image_for_dataset.save(zip_path)
                    unzip_file(zip_path, dataset_folder)
                else:
                    multiple_files = request.files.getList('imageForDataset')
                    for file in multiple_files:
                        if file:
                            multiple_filename = os.path.join(app.config['UPLOAD_DATASET'], file.filename)
                            multiple_files.save(multiple_filename)
                            
            else:
                return jsonify({"error": "No selected file for imageForDataset"}), 400
        else:
            image_for_dataset_path = None

        # Add your logic for image processing using Flask here
        # ...

        return jsonify({"message": "Images uploaded and processed successfully"})
    except Exception as e:
        return jsonify({"error": str(e)})
    
@app.route('/urlscraping', methods=['POST'])
def url_scraping():
    try:
        data = request.json
        url_for_dataset = data.get('urlForDataset')

        # Implementasi logika scraping URL di sini...

        return jsonify({"message": "URL data processed successfully"})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug = True)