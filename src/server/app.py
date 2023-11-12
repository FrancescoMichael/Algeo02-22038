from flask import Flask
from hsvsimilarity import*
import json
app = Flask(__name__)

@app.route('/data')
def compare_image():
    l = os.listdir('src/imgUpload')
    img_vector = hsvToVector(matrixRGBtoHSV(imgToMatrix('src/imgUpload/'+l[0])))
    dir_list = os.listdir('test/')
    data = loadVectorData('test/',dir_list)
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
    arr_similarity = arr_similarity[0:5]
    ob_arr = []
    for ob in arr_similarity:
        percentobj = "" +str(round(ob[0]*100,2)) +"%"
        hsvob = Hsvobj(percentobj,dir_list[ob[1]])
        ob_arr.append(hsvob)
    jsonStr = json_string = json.dumps([ob.__dict__ for ob in ob_arr])
    
    return jsonStr    
    
if __name__ == '__main__':
    app.run(debug = True)