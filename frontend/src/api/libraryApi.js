import axios from 'axios';

export const libraryApi = (resource = 'book') => {

  const fetchData = async ({
    method = 'GET',
    id = '',
    params = {},
    payload = {}
  }) => {
    const url = `/api/${resource}${id === '' ? '' : '/' + id}`;
    console.log('REQUEST:', method, url, params, payload)
    const response = await axios({
      url, method, params, data: payload
    })
    console.log('RESPONSE:', response)
    return response.data
  }

  const getAll = ({params = {}}) => fetchData(
      {method: 'GET', params})
  const get = ({id, params = {}}) => fetchData(
      {method: 'GET', id, params})
  const create = ({payload, params = {}}) => fetchData(
      {method: 'POST', params, payload})
  const update = ({id, payload, params = {}}) => fetchData(
      {method: 'PUT', id, params, payload})
  const remove = ({id, params = {}}) => fetchData(
      {method: 'DELETE', id, params})

  return {create, getAll, get, update, remove}
}
