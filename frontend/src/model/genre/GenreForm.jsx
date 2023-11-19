import React from 'react';
import {TextInputComponent} from '../../ui/TextInputComponent';
import '../../styles/form.css';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

export const GenreForm = ({data: genre = {}, handleSubmit, handleCancel}) => {

  const schema = yup.object().shape({
    name: yup
    .string()
    .required('Name is required')
    .min(4, 'Name too short')
    .max(30, 'Name too long'),
  });

  const {
    register,
    handleSubmit: onFormSubmit,
    setValue,
    getValues,
    formState
  } = useForm({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    setValue('name', genre?.name || '');
  }, [genre?.name, setValue]);

  const processForm = async (formData) => {
    await handleSubmit({...genre, name: formData.name});
  };

  return (
      <form className={'form-container'}
            onSubmit={onFormSubmit(processForm)}>
        <TextInputComponent
            title={'Name'}
            value={getValues().name}
            callback={(name) => setValue('name', name)}
            register={register('name')}
            errors={formState.errors.name?.message}
        />
        <div className="row">
          <input type="submit" value="Submit"/>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
  );
};
