from flask import Flask,request,jsonify,redirect, url_for, request
from hsvsimilarity import*
import json
import time


np.seterr(divide='ignore', invalid='ignore')

app = Flask(__name__)

@app.route('/load_data',methods = ['POST', 'GET'])
def load_data():
    start = time.time()

    dir_list = os.listdir('../../test/') # receive path of all images
    
    data_vector = loadVectorData('../../test/',dir_list) # load vectors for all image dataset

    dictData = [{"Path" : dir_list[i],"vector":data_vector[i]} for i in range(len(data_vector))] # load dictionary

    json_object = json.dumps(dictData, indent=4)

    #writing cache
    with open("./data_cache/color_cache.json", "w") as outfile:
        outfile.write(json_object)
    
    return redirect(url_for('data',start_time = start))

@app.route('/data/<int:start_time>')
def data(start_time = 0):
    global time_length
    
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
    for i in range(len(data)):
        cosine_result = cosineSimilarity(img_vector,data[i])
        if (cosine_result >= 0.6):
            arr_similarity.append(( cosine_result, i))
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
    return jsonify(f),200
    

@app.route('/execution_time')
def execution():
    if (time_length < 60):
        execution_time = {'id':'1','execution_time':str(round(time_length,2))+" secs"}
    else:
        minutes = time_length//60
        seconds = (time_length%60)/100
        execution_time = {'id':'1','execution_time': int(str(minutes))+'.'+str(round(seconds,2))+" minutes"}

    return execution_time   
    

if __name__ == '__main__':
    app.run(debug = True)