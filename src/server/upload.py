import os
import zipfile
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

UPLOAD_TEST = ''
app.config['UPLOAD_TEST'] = UPLOAD_TEST

UPLOAD_DATASET = 'imgDataset'
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

@app.route('/upload', methods=['POST'])
def upload_image():
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
                    multiple_files = request.files.getList('multiple_files')
                    for file in multiple_files:
                        if file:
                            multiple_filename = os.path.join(app.config['UPLOAD_DATASET'], secure_filename(file.filename))
                    # image_for_dataset_path = os.path.join(app.config['UPLOAD_DATASET'], 'image_for_dataset.png')
                    # image_for_dataset.save(image_for_dataset_path)
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
    app.run(port=5000)
