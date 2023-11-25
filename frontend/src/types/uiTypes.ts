import {DomainType} from "./domainTypes";
import {UseFormRegisterReturn} from "react-hook-form";

export interface IActionPanel {
  handleUpdate: () => void;
  handleDelete: () => void;
}

export interface ISelectFormProps<T extends DomainType> {
  title: string;
  state: number;
  callback: (state: number) => void;
  register: UseFormRegisterReturn;
  errors: string;
  items: T[];
  displayField: string
}

export interface ICommonTextInputProps {
  title: string;
  state: string;
  callback: (state: string) => void;
  register: UseFormRegisterReturn;
  errors: string;
}