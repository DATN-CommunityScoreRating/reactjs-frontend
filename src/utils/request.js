import axios from "axios";

const getLocalToken = () => {
  const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
  return token;
}

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getLocalToken()}`
  }
})

export const get = async (path, options = {}) => {
  const response = await instance.get(path, { params: options });
  return response.data;
};

export const post = async (path, options = {}) => {
  const response = await instance.post(path, options);
  return response.data;
};

export default instance