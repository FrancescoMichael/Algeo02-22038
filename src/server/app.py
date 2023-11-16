from flask import Flask,request,jsonify,redirect, url_for, request
from hsvsimilarity import*
import json
import time


np.seterr(divide='ignore', invalid='ignore')

app = Flask(__name__)

@app.route('/load_data',methods = ['POST', 'GET'])
def load_data():
    start = time.time()
    l = os.listdir('./imgUpload/')
    img_vector = hsvToVector(matrixRGBtoHSV(imgToMatrix('./imgUpload/'+l[0])))
    dir_list = os.listdir('../../test/')
    datas = loadVectorData('../../test/',dir_list)

    dictData = []
    for i in range(len(datas)):
        dictData.append({"Path" : dir_list[i],"vector":datas[i]})
    json_object = json.dumps(dictData, indent=4)
    with open("./data_cache/color_cache.json", "w") as outfile:
        outfile.write(json_object)
    
    return redirect(url_for('data',start_time = start))



@app.route('/data/<int:start_time>')
def data(start_time = 0):
    if (start_time == 0):
        start_time = time.time()
    
    l = os.listdir('./imgUpload/')
    with open("./data_cache/color_cache.json", 'r') as openfile:
        json_object = json.load(openfile)
    dir_list = [obj['Path'] for obj in json_object]
    img_vector = hsvToVector(matrixRGBtoHSV(imgToMatrix('./imgUpload/'+l[0])))
    data = [obj['vector'] for obj in json_object]
    arr_similarity = []
    for i in range(len(data)):
        arr_similarity.append((cosineSimilarity(img_vector,data[i]) , i))
    arr_similarity.sort(key=lambda x: x[0],reverse=True)

    i = 0
    while (arr_similarity[i][0]*100 > 60):
        percent = arr_similarity[i][0]*100
        i += 1
    ob_arr = []
    arr_similarity = arr_similarity[0:i]
    i = 1
    for ob in arr_similarity:
        percentobj = "" +str(round(ob[0]*100,2)) +"%"
        
        ob_arr.append({"id":str(i),"percentage":percentobj , "image": dir_list[ob[1]]})
        i += 1
    end_time = time.time()
    global time_length
    time_length = round(end_time - start_time,3) 

    f = []
    for ob in ob_arr:
        extra = request.args.get("extra")
        if extra:
            ob["extra"] = extra
        f.append(ob)
    return jsonify(f),200
    

@app.route('/execution_time')
def execution():
    return str(time_length)   
    



if __name__ == '__main__':
    app.run(debug = True)