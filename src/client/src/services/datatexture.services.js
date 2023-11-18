import axios from 'axios';

export const getColorData = () => {
    // dataset baru
    axios
    .get("http://localhost:8080/images")
    .then((res) => {
        console.log(res.data)
        // callback(res.data)
    })
    .catch((err) => {
        console.log(err);
    });
}

export const getColorOldData = () => {
    // dataset lama
    axios
    .get("http://localhost:5000/imagescache")
    .then((res) => {
        console.log(res.data)
        // callback(res.data)
    })
    .catch((err) => {
        console.log(err);
    });
}

export const getColorDataExecutionTime = () => {
    // execution time
    axios
    .get("http://localhost:5000/execution time")
    .then((res) => {
        console.log(res.data)
        // callback(res.data)
    })
    .catch((err) => {
        console.log(err);
    });
}