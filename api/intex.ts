import axios from 'axios';
import { urls } from '../contsants/urls';

export const instance = axios.create({
    baseURL: urls.baseUrl,
});
