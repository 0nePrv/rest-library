import {DomainType} from "./domainTypes";
import {ResourceConfig} from "./resourceTypes";

export interface IFormOptions<T extends DomainType> {
  obj?: T,
  handleSubmit: (obj: T) => void;
  handleCancel: () => void;
}

export interface IDisplayOptions<T extends DomainType> {
  obj: T
}

export interface IPageOptions<T extends DomainType> {
  resourceConfig: ResourceConfig<T>
}
