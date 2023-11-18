import axios from 'axios';

export const getColorData = (callback) => {
    // dataset baru
    axios
    .get("http://localhost:5000/load_data")
    .then((res) => {
        console.log(res.data)
        callback(res.data)
    })
    .catch((err) => {
        console.log(err);
    });
}

export const getColorOldData = () => {
    // dataset lama
    axios
    .get("http://localhost:5000/data")
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
    .get("http://localhost:5000/execution_time")
    .then((res) => {
        console.log(res.data)
        // callback(res.data)
    })
    .catch((err) => {
        console.log(err);
    });
}