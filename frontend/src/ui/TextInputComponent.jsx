import React from 'react';

export const TextInputComponent = ({
  title,
  value,
  callback,
  register,
  errors,
}) => (
    <div className="row" id={`${title} text input row`}>
      <label htmlFor={`${title} text input`}>{title}:</label>
      <input
          autoComplete='on'
          type="text"
          id={`${title} text input`}
          placeholder={value}
          defaultValue={value}
          onChange={callback}
          {...register}
      />
      {errors && <p className='validation-errors'>{errors}</p>}
    </div>
);
