import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'https://photosrepo.herokuapp.com/api/', //'http://localhost:8000/api/',
})

export default httpClient;