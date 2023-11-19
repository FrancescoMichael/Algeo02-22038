import axios from 'axios';

export const getTextureData = (callback) => {
    // dataset baru
    axios
    .get("http://localhost:8080/images")
    .then((res) => {
        console.log(res.data)
        callback(res.data)
    })
    .catch((err) => {
        console.log(err);
    });
}

export const getTextureOldData = (callback) => {
    // dataset lama
    axios
    .get("http://localhost:8080/imagescache")
    .then((res) => {
        console.log(res.data)
        callback(res.data)
    })
    .catch((err) => {
        console.log(err);
    });
}

export const getTextureDataExecutionTime = (callback) => {
    // execution time
    axios
    .get("http://localhost:8080/executiontime")
    .then((res) => {
        console.log(res.data)
        callback(res.data)
    })
    .catch((err) => {
        console.log(err);
    });
}