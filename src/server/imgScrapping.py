from selenium import webdriver
from selenium.webdriver.common.by import By
from PIL import Image
import requests
import io
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

def get_image_online(web_driver,url):
    web_driver.get(url) # get url
    all_images = web_driver.find_elements(By.TAG_NAME,"img") # find all with tag img
    img_urls =[]
    for elm in all_images:
        if elm.get_attribute('src') and 'http' in elm.get_attribute('src'):
            img_urls.append(elm.get_attribute('src'))
    return img_urls # return a list of urls images


def download_image(url,file_name):
    try:
        img = requests.get(url,verify=False).content # get content from url
        image = Image.open(io.BytesIO(img)) # change content to binary file and then open that file
        path = "./imgDataset/"
        with open(path+file_name,"wb") as f: # save the file
            if (file_name[len(file_name)-3:] == "jpg"): # if jpg
                image.save(f,"JPEG")
            elif (file_name[len(file_name)-3:] == "png"): # if png
                image.save(f,"PNG")
    except  FileNotFoundError as a1:
        print("Failed to download, folder path might be wrong")
    except  Exception  as e:
        print(e)
        print("Failed to image scrape")

# to handle pop ups
options = Options()
options.add_argument('--headless')
options.add_experimental_option('detach', True)
options.add_argument("--disable-popup-blocking")
wd = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
list_of_urls = get_image_online(wd,"https://informatika.stei.itb.ac.id/~rinaldi.munir//AljabarGeometri/2022-2023/algeo22-23.htm")

names = 0
for url in list_of_urls:
    extension = url[len(url)-3 :]
    if (extension == "jpg" or extension == "jpeg"):
        download_image(url,"test"+str(names)+".jpg")
    elif (extension == "png"):
        download_image(url,"test"+str(names)+".png")
    names += 1

wd.quit()



