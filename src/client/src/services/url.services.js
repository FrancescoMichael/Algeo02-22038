import axios from 'axios';

export const url = (data) => {
    axios.post("http://localhost:5000/scrape", data).then((res) => {
        console.log(res);
    }).catch((error) => {
        console.log(error);
    })
}