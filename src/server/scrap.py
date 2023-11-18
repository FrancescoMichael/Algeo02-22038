import requests
from bs4 import BeautifulSoup

# URL website yang ingin di-scrapping
url = "https://informatika.stei.itb.ac.id/~rinaldi.munir/AljabarGeometri/2022-2023/algeo22-23.htm"

# Kirim permintaan GET ke URL
response = requests.get(url)

def get_data(url):
    r = requests.get(url)
    return r.text

htmldata = get_data(url)
soup = BeautifulSoup(htmldata, 'html.parser')
for item in soup.find_all('img'):
    print(item['src'])