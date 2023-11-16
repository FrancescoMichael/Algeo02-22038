from flask import Flask,request,jsonify
from hsvsimilarity import*
import json
np.seterr(divide='ignore', invalid='ignore')

app = Flask(__name__)

@app.route('/load_data')
def load_data():
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
    return "loading_Data...."



@app.route('/data')
def compare_image():
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
    # print("gambar di atas 60 percent : ")
    while (arr_similarity[i][0]*100 > 60):
        percent = arr_similarity[i][0]*100
        # print(dir_list[int(arr_similarity[i][1])] + f" percent : {percent}%")
        i += 1
    # print(f"total = {i} gambar di atas 60 percent")
    ob_arr = []
    arr_similarity = arr_similarity[0:i]
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
    return jsonify(f),200
    
if __name__ == '__main__':
    app.run(debug = True)