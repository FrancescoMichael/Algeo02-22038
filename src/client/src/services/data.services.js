import axios from 'axios';
const getData = (callback) => {
    axios
    .get('http://localhost:3000/data')
    .then((res) => {
        callback(res.data)
    })
    .catch((err) => {
        console.log(err);
    });
}