import React, {ChangeEvent} from "react";
import {DomainType} from "../types/domainTypes";
import {ISelectFormProps} from "../types/uiTypes";

export function SelectComponent<T extends DomainType>(
    {title, state, callback, register, errors, items, displayField}: ISelectFormProps<T>) {

  const onValueChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const currentValue = Number.parseInt(e.target.value)
    callback(currentValue)
  }

  return (
      <div className="row" id={`${title} select row`}>
        <label htmlFor={`${title} select`}>{title}</label>
        <select id={`${title} select`}
                value={state}
                onChange={event => onValueChange(event)}
                {...register}>
          <option value={0}>Select {title}</option>
          {items && items.map((item) => (
              <option key={item.id} value={item.id}>
                {item[displayField]}
              </option>
          ))}
        </select>
        {errors && <p className={'validation-errors'}>{errors}</p>}
      </div>
  )
}