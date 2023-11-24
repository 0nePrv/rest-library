import axios, {Method} from 'axios';
import {ResourceType} from "../types/types";

export interface ILibraryApi {
  resource: ResourceType;
  method: Method;
  pathVar?: string;
  params?: object[];
  payload?: any
}

export const libraryApi = () => {

  const fetchData = async (
      {
        resource,
        method,
        pathVar = '',
        params = [],
        payload = {}
      }: ILibraryApi) => {
    const url = `/api/${resource}${pathVar === '' ? '' : '/' + pathVar}`
    console.log('REQUEST:', method, url, params, payload)
    const response = await axios({
      url, method, params, data: payload
    })
    console.log('RESPONSE:', response)
    return response.data
  }

  const getAll = (resource: ResourceType, params: object[] = []) => fetchData(
      {method: 'GET', params, resource})
  const get = (resource: ResourceType, pathVar: string, params: object[] = []) => fetchData(
      {resource, method: 'GET', pathVar, params})
  const create = (resource: ResourceType, payload: any, params: object[] = []) => fetchData(
      {resource, method: 'POST', params, payload})
  const update = (resource: ResourceType, pathVar: string, payload: any, params: object[] = []) => fetchData(
      {resource, method: 'PUT', pathVar, params, payload})
  const remove = (resource: ResourceType, pathVar: string, params: object[] = []) => fetchData(
      {resource, method: 'DELETE', pathVar, params})

  return {create, getAll, get, update, remove}
}
