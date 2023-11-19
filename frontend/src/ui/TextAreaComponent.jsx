import React from 'react';

export const TextAreaComponent = ({
  title,
  value,
  callback,
  register,
  errors
}) => (
    <div className="row" id={`${title} text input row`}>
      <label htmlFor={`${title} text area`}>{title}:</label>
      <textarea
          autoComplete='on'
          id={`${title} text area`}
          placeholder={value}
          defaultValue={value}
          onChange={callback}
          {...register}
      />
      {errors && <p className={'validation-errors'}>{errors}</p>}
    </div>
);
