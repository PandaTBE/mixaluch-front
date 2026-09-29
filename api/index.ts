import axios from 'axios';
import { urls } from '../constants/urls';

export const instance = axios.create({
    baseURL: urls.baseUrl,
});
