from flask import Flask,request,jsonify
from hsvsimilarity import*
import json
np.seterr(divide='ignore', invalid='ignore')

app = Flask(__name__)

@app.route('/data')
def compare_image():
    l = os.listdir('./imgUpload/')
    img_vector = hsvToVector(matrixRGBtoHSV(imgToMatrix('./imgUpload/'+l[0])))
    dir_list = os.listdir('../../test/')
    data = loadVectorData('../../test/',dir_list)
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
    for ob in arr_similarity:
        percentobj = "" +str(round(ob[0]*100,2)) +"%"
        
        ob_arr.append({"percentage":percentobj , "image":dir_list[ob[1]]})
    f = []
    for ob in ob_arr:
        extra = request.args.get("extra")
        if extra:
            ob["extra"] = extra
        f.append(ob)
    return jsonify(f),200
    
if __name__ == '__main__':
    app.run(debug = True)