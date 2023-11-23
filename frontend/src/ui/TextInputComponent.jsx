import React from 'react'

export const TextInputComponent = ({
  title,
  state,
  callback,
  register,
  errors,
}) => {

  const initState = state ?? ''

  const onValueChange = (e) => {
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
