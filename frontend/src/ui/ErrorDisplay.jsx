import React from 'react';
import '../styles/error.css';

export const ErrorDisplay = ({error}) => {

  if (error) {
    const response = error.response
    const data = response?.data
    const errors = data?.errors

    return (
        <div className='error-container'>
          <h2>Error occurred :(</h2>
          <div className={'error-content'}>
            <p><b>Code:</b> {response.status}</p>
            <p><b>Status:</b> {response.statusText}</p>
            {data?.detail && <p><b>Detail:</b> {data.detail}</p>}
            {data?.instance && <p><b>Instance:</b> {data.instance}</p>}
            {errors && errors.length !== 0 && <h3>Errors:</h3>}
            {errors && errors.length !== 0 && errors.map((err, index) => (
                <div key={index}>
                  <p><b>Message:</b> {err?.message}</p>
                  <p><b>Field:</b> {err?.field}</p>
                  <p><b>Value:</b> {err?.rejectedValue}</p>
                </div>
            ))}
          </div>
        </div>
    );

  }
}