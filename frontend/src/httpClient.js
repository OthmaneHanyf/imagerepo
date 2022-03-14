import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'https://photosrepo.herokuapp.com/api/',
})

export default httpClient;