// import axios from 'axios';
import axios from './customize-axios';
////
const fetchAllUser = (pageNum) => {
  return axios.get(`/api/users?page=${pageNum}`);
};

const postCreateUser = (name, job) => {
  return axios.post('/api/users', { name, job }); //{name:name, job:job}
};

const putUpdateUser = (name, job) => {
  return axios.put(`/api/users/1`, { name, job });
};

const deleteUser = (id) => {
  return axios.delete(`/api/users/${id}`);
};

const loginApi = (email, password) => {
  return axios.post('/api/login', { email, password });
};
export { fetchAllUser, postCreateUser, putUpdateUser, deleteUser, loginApi };
