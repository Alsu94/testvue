import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://rickandmortyapi.com/api/",
});

export const api = {
    getCharacters: (page, count, filter) => axiosInstance.get(`/character?page=${page}&count=${count}${filter ? filter : ''}`),
    getEpisode: (url) => axios.get(`${url}`)
}