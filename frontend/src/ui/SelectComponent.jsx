import React, {useEffect, useState} from "react";

export const SelectComponent = ({
  title,
  value,
  callback,
  register,
  errors,
  items,
  displayField
}) => {

  const [valueState, setValueState] = useState(value)

  useEffect(() => {
    console.log(valueState)
  }, [valueState]);
  const onFormChange = (event) => {
    let currentValue = Number.parseInt(event.target.value)
    setValueState(currentValue)
    callback(currentValue)
  }

  return (
      <div className="row" id={`${title} select row`}>
        <label htmlFor={`${title} select`}>{title}</label>
        <select id={`${title} select`} value={valueState}
                onChange={onFormChange} {...register}>
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