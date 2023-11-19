# Tugas Besar 2 IF2123 Aljabar Linier dan Geometri - Application of Vector Algebra in Image Retrieval System

> _Jaring_ is a web-based Image Retrieval System that use vector algebra to analyze image data with Cotent Based Image Retrieval (CBIR) approach.

## Table of Contents
* [General Info](#general-information)
* [Team Members](#team-members)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Usage](#usage)
* [Room for Improvement](#room-for-improvement)


## General Information
Within _Jaring_, you can compare an image with image datasets that you desire, whether by adding your own image datasets or by providing URL to a website where image scraping will be performed. For more accurate results, it is preferred that the images are prepared (e.g. by croping the image to display only one object) for better accuracy.

## Team Members
| **NIM**  |       **Nama**           |
| :------: | :----------------------: |
| 13522038 | Francesco Michael Kusuma |
| 13522075 |    Marvel Pangondian     |
| 13522080 |  Julian Chandra Sutadi   |

## Technologies Used
- Go (Gin) 
- Python (Flask)
- OpenCV2
- Vite
- React JS
- Tailwind CSS


## Features
- CBIR (Color-Based and Texture-Based)
- Image Scraping
- File Caching


## Screenshots
![Example screenshot](./img/screenshot.png)
<!-- If you have screenshots you'd like to share, include them here. -->


## Setup
Install dependencies in `src/server/texture` by running the commands below:
```
go get -u github.com/gin-contrib/cors
go get -u github.com/gin-contrib/cors
```


## Usage
Run the command below in `src/client`:
```
npm run dev
```
Run the command below in `src/server`:
```
py app.py
```
Run the command below in `src/server/texture`:
```
go run ./routes.go texture.go
```
After running those three commands, open `localhost:3000` in your web browser to load the website.


## Room for Improvement
Room for improvement:
- Better web management and structure
- Make website responsive 

To do:
- Add camera feature
- Add export result to pdf feature
- Add object detection
  
