import {DomainType} from "./domainTypes";
import {FC} from "react";
import {IDisplayOptions, IFormOptions} from "./pageFormTypes";

export enum ResourceType {
  Book = 'book',
  Comment = 'comment',
  Author = 'author',
  Genre = 'genre',
}

export interface ResourceConfig<T extends DomainType> {
  resource: ResourceType,
  name : string,
  Form: FC<IFormOptions<T>>,
  Display: FC<IDisplayOptions<T>>
}