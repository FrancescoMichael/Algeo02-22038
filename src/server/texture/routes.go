package main

import (
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var executionTime time.Duration
var startTime time.Time
var endTime time.Time

func main() {
	router := gin.Default()

	router.Use(cors.Default())

	router.GET("/images", getSimilarImgs)
	router.GET("/imagescache", getSimilarImgsCache)
	router.GET("/executiontime", getExecutionTime)

	router.Run("localhost:8080")
}

func getSimilarImgs(c *gin.Context) {
	startTime = time.Now()
	c.IndentedJSON(http.StatusCreated, texture())
	executionTime = time.Since(startTime)
}

func getSimilarImgsCache(c *gin.Context) {
	startTime = time.Now()
	c.IndentedJSON(http.StatusCreated, textureWithCache())
	executionTime = time.Since(startTime)
}

func getExecutionTime(c *gin.Context) {
	c.IndentedJSON(http.StatusCreated, gin.H{"id": 1, "executiontime": executionTime.String()})
	executionTime = 0
}
