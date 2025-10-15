import axios from 'axios';
import { data } from 'react-router-dom';

export const getLogin = async (data) => axios.post('http://localhost:3000/api/users/login', data);