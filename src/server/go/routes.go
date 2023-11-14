package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/images", getSimilarImgs)

	router.Run("localhost:8080")
}

func getSimilarImgs(c *gin.Context) {
	c.IndentedJSON(http.StatusCreated, texture())
}
