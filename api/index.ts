import axios from 'axios';
import { urls } from '../constants/urls';

export const instance = axios.create({
    baseURL: urls.baseUrl,
});

export const evotorInstance = axios.create({
    baseURL: urls.evotorUrl,
    headers: {
        'X-Authorization': String(process.env.NEXT_PUBLIC_EVOTOR_TOKEN),
    },
});
