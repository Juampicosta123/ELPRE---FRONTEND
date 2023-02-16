import axios from "axios";
const baseUrl = "https://elpre-backend.onrender.com/api/student";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.get(baseUrl, config).then(response => {
    const {data} = response.data
  });
  return request
};

const createOne = async (newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = await axios.post(baseUrl, newObject, config);
  return request.then((response) => response.data);
};

const updateOne = async (id, newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return request.then((response) => response);
};

const deleteOne = async (id) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};

const getOne = async (id) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = await axios.get(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};

export default {getAll, createOne, updateOne, deleteOne, getOne, setToken};
