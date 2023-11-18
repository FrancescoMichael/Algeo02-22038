import axios from 'axios';

export const getData = () => {
    axios
    .get("")
    .then((res) => {
        console.log(res.data)
        // callback(res.data)
    })
    .catch((err) => {
        console.log(err);
    });
}