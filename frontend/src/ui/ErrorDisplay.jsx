import React from 'react';
import '../styles/error.css';

export const ErrorDisplay = ({error}) => {

  if (error) {
    const {status, statusText, data} = error?.response ?? {};
    const {detail, instance, errors} = data ?? {};

    return (
        <div className='error-container'>
          <h2>Error occurred :(</h2>
          <div className={'error-content'}>
            {status && <p><b>Code:</b> {status}</p>}
            {statusText && <p><b>Status:</b> {statusText}</p>}
            {detail && <p><b>Detail:</b> {detail}</p>}
            {instance && <p><b>Instance:</b> {instance}</p>}
            {errors && errors.length !== 0 && <h3>Errors:</h3>}
            {errors && errors.length !== 0 && errors.map((error, index) => (
                <div key={index}>
                  {error?.message && <p><b>Message:</b> {error.message}</p>}
                  {error?.field && <p><b>Field:</b> {error.field}</p>}
                  {error?.rejectedValue && <p>
                    <b>Value:</b> {error.rejectedValue}</p>}
                </div>
            ))}
          </div>
        </div>
    );

  }
}