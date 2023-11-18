package main

import (
	"fmt"
	"image"
	"image/draw"
	"image/jpeg"
	"image/png"
	"math"
	"os"
	"path/filepath"
	"sort"
	// "time"
)

type tuple struct {
	idx        int
	similarity float64
}

type similarImg struct {
	ID         string `json:"id"`
	Image      string `json:"image"`
	Percentage string `json:"percentage"`
}

var similarityList []tuple
var similarImgs = []similarImg{}

func texture() []similarImg {
	// startTime := time.Now()

	testFeature := createFeatureVector(createSymmetricMatrix(createCoocurenceMatrix(rgbToGreyscale(imgToRGB("948.jpg")))))

	dirList := listDir("../../../test/")
	rgbMatrices := loadImagesFromDir("../../../test/", dirList)

	length := len(rgbMatrices)
	for i := 0; i < length; i++ {
		feature := createFeatureVector(createSymmetricMatrix(createCoocurenceMatrix(rgbToGreyscale(imgToRGB(dirList[i])))))
		var temp tuple
		temp.idx = i
		temp.similarity = cosineSimilarity(testFeature, feature)
		similarityList = append(similarityList, temp)
	}

	sort.Slice(similarityList, func(i, j int) bool {
		return similarityList[i].similarity > similarityList[j].similarity
	})

	i := 0
	for similarityList[i].similarity > 0.6 {
		similarImgs = append(similarImgs, similarImg{
			ID:         fmt.Sprint(i + 1),
			Image:      dirList[similarityList[i].idx],
			Percentage: fmt.Sprintf("%.2f", math.Floor(similarityList[i].similarity*10000)/100) + "%",
		})
		i++
	}


	// endTime := time.Now()
	// elapsed := endTime.Sub(startTime)

	return similarImgs
	// fmt.Printf("Program execution time: %v\n", elapsed)
}

func imgToRGB(filename string) [][][3]uint8 {
	name := "../../../test/" + filename

	file, err := os.Open(name)
	if err != nil {
		fmt.Println(err)
	}
	defer file.Close()

	var img image.Image
	format := filepath.Ext(name)
	switch format {
	case ".jpg", ".jpeg":
		img, err = jpeg.Decode(file)
	case ".png":
		img, err = png.Decode(file)
	}
	if err != nil {
		fmt.Println(err)
	}

	// referensi: https://go.dev/blog/image-draw#TOC_6.
	b := img.Bounds()
	rgba := image.NewRGBA(image.Rect(0, 0, b.Dx(), b.Dy()))
	draw.Draw(rgba, rgba.Bounds(), img, b.Min, draw.Src)

	rgb := sliceRGB(*rgba)

	return rgb
}

func sliceRGB(rgba image.RGBA) [][][3]uint8 {
	width, height := rgba.Bounds().Dx(), rgba.Bounds().Dy()
	rgb := make([][][3]uint8, height)

	for i := 0; i < height; i++ {
		rgb[i] = make([][3]uint8, width)
		for j := 0; j < width; j++ {
			r, g, b, _ := rgba.At(j, i).RGBA()
			rgb[i][j][0] = uint8(r >> 8)
			rgb[i][j][1] = uint8(g >> 8)
			rgb[i][j][2] = uint8(b >> 8)
		}
	}

	return rgb
}

func rgbToGreyscale(rgb [][][3]uint8) [][]uint8 {
	row := len(rgb)
	col := len(rgb[0])

	greyscale := make([][]uint8, row)

	for i, x := range rgb {
		greyscale[i] = make([]uint8, col)
		for j, val := range x {
			greyscale[i][j] = uint8(float64(val[0])*0.299 + float64(val[1])*0.587 + float64(val[2])*0.114)
		}
	}

	return greyscale
}

func createCoocurenceMatrix(greyscale [][]uint8) [256][256]uint {
	coocurence := [256][256]uint{}

	row := len(greyscale)
	col := len(greyscale[0])

	for i := 0; i < row; i++ {
		for j := 0; j < col-1; j++ {
			coocurence[greyscale[i][j]][greyscale[i][j+1]] += 1
		}
	}
	return coocurence
}

func createSymmetricMatrix(coocurence [256][256]uint) [256][256]float64 {
	transposedCoocurence := transpose(coocurence)
	symmetric := [256][256]float64{}
	for i := 0; i < 256; i++ {
		for j := 0; j < 256; j++ {
			symmetric[i][j] += float64(coocurence[i][j] + transposedCoocurence[i][j])
		}
	}

	var total float64
	for i := 0; i < 256; i++ {
		for j := 0; j < 256; j++ {
			total += symmetric[i][j]
		}
	}

	// normalization
	for i := 0; i < 256; i++ {
		for j := 0; j < 256; j++ {
			symmetric[i][j] /= total
		}
	}

	return symmetric
}

func createFeatureVector(symmetric [256][256]float64) [5]float64 {
	contrast := 0.
	homogeneity := 0.
	asm := 0.
	energy := 0.
	entropy := 0.
	sumVal := 0.
	glcmMean := 0.
	correlation := 0.
	glcmVariance := 0.

	var value float64

	for i := 0; i < 256; i++ {
		for j := 0; j < 256; j++ {
			value = symmetric[i][j]
			contrast += value * math.Pow(float64(i-j), 2)
			homogeneity += value / (1 + math.Pow(float64(i-j), 2))
			asm += math.Pow(value, 2)
			sumVal += value
			glcmMean += float64(i) * value
			if value != 0 {
				entropy -= value * math.Log(value)
			}
		}
	}

	for i := 0; i < 256; i++ {
		for j := 0; j < 256; j++ {
			glcmVariance += symmetric[i][j] * math.Pow(float64(i)-glcmMean, 2)
		}
	}

	for i := 0; i < 256; i++ {
		for j := 0; j < 256; j++ {
			correlation += symmetric[i][j] * (float64(i) - glcmMean) * (float64(j) - glcmMean) / glcmVariance
		}
	}

	energy = math.Sqrt(asm)
	return [5]float64{contrast, homogeneity, entropy, energy, correlation}
}

func transpose(matrix [256][256]uint) [256][256]uint {
	transposedMatrix := [256][256]uint{}

	for i := 0; i < 256; i++ {
		for j := 0; j < 256; j++ {
			transposedMatrix[j][i] = matrix[i][j]
		}
	}

	return transposedMatrix
}

func cosineSimilarity(featureVector1, featureVector2 [5]float64) float64 {
	result := 0.
	// dot product
	for i := 0; i < 5; i++ {
		result += featureVector1[i] * featureVector2[i]
	}

	// norm
	norm1 := 0.
	norm2 := 0.

	for i := 0; i < 5; i++ {
		norm1 += math.Pow(featureVector1[i], 2)
		norm2 += math.Pow(featureVector2[i], 2)
	}

	norm1 = math.Sqrt(norm1)
	norm2 = math.Sqrt(norm2)

	result /= (norm1 * norm2)
	return result
}

func listDir(path string) []string {
	dir, _ := os.Open(path)
	fileInfos, _ := dir.Readdir(-1)

	var dirList []string
	for _, fileInfo := range fileInfos {
		dirList = append(dirList, fileInfo.Name())
	}

	return dirList
}

func loadImagesFromDir(path string, dirList []string) [][][][3]uint8 {
	var rgbMatrices [][][][3]uint8
	for _, x := range dirList {
		rgbMatrices = append(rgbMatrices, imgToRGB(x))
	}
	return rgbMatrices
}