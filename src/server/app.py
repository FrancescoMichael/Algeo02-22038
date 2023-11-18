from flask import Flask,request,jsonify,redirect, url_for, request
from hsvsimilarity import*
import json
import time
global start_time
global time_length
global total_result
total_result = 0
start_time = 0
time_length = 0

np.seterr(divide='ignore', invalid='ignore')

app = Flask(__name__)

@app.route('/load_data',methods = ['POST', 'GET'])
def load_data():
    global start_time
    start_time = time.time()
    path_initial = './imgDataset/'

    dir_list = os.listdir('./imgDataset/') # receive path of all images
    # if (os.path.isdir("./imgDataset/" + dir))
    if (os.path.isdir('./imgDataset/' + dir_list[0])):
        path_initial = './imgDataset/' + dir_list[0]+'/'
        dir_list = os.listdir('./imgDataset/' + dir_list[0]+'/')
        
    
    data_vector = loadVectorData(path_initial,dir_list) # load vectors for all image dataset

    dictData = [{"Path" : dir_list[i],"vector":data_vector[i]} for i in range(len(data_vector))] # load dictionary

    json_object = json.dumps(dictData, indent=4)

    #writing cache
    with open("./data_cache/color_cache.json", "w") as outfile:
        outfile.write(json_object)
    
    return 'loading data'

@app.route('/data')
def data():
    global time_length
    global start_time
    
    if (start_time == 0):
        start_time = time.time() # start time if using cache
    
    l = os.listdir('./imgUpload/')

    with open("./data_cache/color_cache.json", 'r') as openfile:
        json_object = json.load(openfile)

    dir_list = [obj['Path'] for obj in json_object] # read path from cache
    data = [obj['vector'] for obj in json_object]# read

    img_vector = hsvToVector(matrixRGBtoHSV(imgToMatrix('./imgUpload/'+l[0]))) # process ulploaded image

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
    

if __name__ == '__main__':
    app.run(debug = True)