import React, {ChangeEvent} from 'react'
import {ICommonTextInputProps} from "../types/uiTypes";

export const TextInputComponent = ({title, state, callback, register, errors}: ICommonTextInputProps) => {

  const initState = state ?? ''

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    callback(e.target.value)
  }

  return (
      <div className="row" id={`${title} text input row`}>
        <label htmlFor={`${title} text input`}>{title}:</label>
        <input
            autoComplete='on'
            type="text"
            id={`${title} text input`}
            placeholder={initState}
            value={state}
            onChange={event => onValueChange(event)}
            {...register}
        />
        {errors && <p className='validation-errors'>{errors}</p>}
      </div>
  )
}
