import {Method} from "axios";
import {ResourceType} from "./resourceTypes";
import {DomainType} from "./domainTypes";

export interface ILibraryApiProps {
  resource: ResourceType;
  method: Method;
  pathVar?: string;
  params?: object;
  payload?: object;
}

export interface IMultiResult<T extends DomainType> {
  data: T[]
}

export interface ISingleResult<T extends DomainType> {
  data: T
}

export type ResultType<T extends DomainType> = IMultiResult<T> | ISingleResult<T>