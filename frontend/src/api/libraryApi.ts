import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import {APIError} from "../types/errorTypes";
import {ILibraryApiProps, IMultiResult, ISingleResult, ResultType} from "../types/apiTypes";
import {DomainType} from "../types/domainTypes";
import {ResourceType} from "../types/resourceTypes";


const instance: AxiosInstance = axios.create()

instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      const displayError: APIError = {response: error.response}
      return Promise.reject(displayError)
    }, {
      synchronous: false
    }
);

export function libraryApi() {

  async function fetchData<T extends ResultType<D>, D extends DomainType>(
      {resource, method, pathVar = '', params = {}, payload = {}}: ILibraryApiProps): Promise<T> {
    const url = `/api/${resource}${pathVar === '' ? '' : '/' + pathVar}`
    console.log('REQUEST:', method, url, params, payload)

    return await instance.request<T>({url, method, params, data: payload})
    .then((response: AxiosResponse<T>) => {
      console.log('RESPONSE:', response)
      return {data: response.data} as unknown as T
    })
  }

    function getAll<T extends DomainType>(resource: ResourceType, params: object = {}) {
      return fetchData<IMultiResult<T>, T>({resource, method: 'GET', params})
    }

  function get<T extends DomainType>(resource: ResourceType, pathVar: string, params: object = {}) {
    return fetchData<ISingleResult<T>, T>({resource, method: 'GET', pathVar, params})
  }

  function create<T extends DomainType>(resource: ResourceType, payload: any, params: object = {}) {
    return fetchData<ISingleResult<T>, T>({resource, method: 'POST', params, payload})
  }

  function update<T extends DomainType>(resource: ResourceType, pathVar: string, payload: any, params: object = {}) {
    return fetchData<ISingleResult<T>, T>({resource, method: 'PUT', pathVar, params, payload})
  }

  function remove(resource: ResourceType, pathVar: string, params: object = {}) {
    return fetchData({resource, method: 'DELETE', pathVar, params})
  }

  return {create, getAll, get, update, remove}
}
