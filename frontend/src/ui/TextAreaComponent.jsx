import React from 'react';

export const TextAreaComponent = ({
  title,
  state,
  callback,
  register,
  errors
}) => {

  const initState = state ?? ''

  const onValueChange = (e) => {
    console.log('select value changing... ', e.target.value)
    callback(e.target.value)
  }

  return (
      <div className="row" id={`${title} text input row`}>
        <label htmlFor={`${title} text area`}>{title}:</label>
        <textarea
            autoComplete='on'
            id={`${title} text area`}
            placeholder={initState}
            value={state}
            onChange={event => onValueChange(event)}
            {...register}
        />
        {errors && <p className={'validation-errors'}>{errors}</p>}
      </div>
  )
}
