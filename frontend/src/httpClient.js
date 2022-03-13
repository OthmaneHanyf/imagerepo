import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'http://localhost:8000/api/', //'https://photosrepo.herokuapp.com/api/',
})

export default httpClient;