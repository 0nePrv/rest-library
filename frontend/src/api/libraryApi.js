import axios from 'axios';

// TODO change to localhost
const BASE_API_URL = 'http://192.168.0.106:8080/api';

export const libraryApi = (resource = 'book') => {

  const fetchData = async ({
    endpoint = '',
    method = 'GET',
    params = {},
    payload = null
  }) => {
    const url = `${BASE_API_URL}/${resource}${endpoint === '' ? '' : '/'
        + endpoint}`;
    const response = await axios({
      url, method, params, data: payload
    });
    console.log(method, url, params, payload)
    return response.data
  };

  const getAll = (params = {}) => fetchData({params});
  const get = (id, params = {}) => fetchData(
      {endpoint: id, params});
  const create = (obj) => fetchData(
      {method: 'POST', payload: obj});
  const update = (obj) => fetchData(
      {endpoint: obj.id, method: 'PUT', payload: obj});
  const remove = (id) => fetchData(
      {endpoint: id, method: 'DELETE'});

  return {create, getAll, get, update, remove};
};
