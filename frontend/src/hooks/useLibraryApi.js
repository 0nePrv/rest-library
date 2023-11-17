import {useState} from 'react';
import axios from 'axios';

// TODO change to localhost
const BASE_API_URL = 'http://192.168.0.106:8080/api';

export const useLibraryApi = (resource = 'book') => {
  const URL_WITH_RESOURCE = `${BASE_API_URL}/${resource}`;
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async ({
    endpoint = '',
    method = 'GET',
    params = {},
    payload = null
  }) => {
    setLoading(true);
    try {
      const url = `${URL_WITH_RESOURCE}${endpoint === '' ? '' : '/'
          + endpoint}`;
      const response = await axios({
        url, method, params, data: payload
      });
      setData(response.data);
      console.log(method, url, params, payload)
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
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

  return {data, error, loading, getAll, get, create, update, remove};
};
