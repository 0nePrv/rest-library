import React, {useEffect} from 'react';
import {libraryApi} from '../../api/libraryApi';
import {useQuery} from 'react-query';
import {Loading} from '../../ui/Loading';
import '../../styles/form.css';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {TextAreaComponent} from '../../ui/TextAreaComponent';
import {SelectComponent} from '../../ui/SelectComponent';
import {ErrorDisplay} from "../../ui/ErrorDisplay";

export const CommentForm = ({
  data: comment = {},
  handleSubmit,
  handleCancel
}) => {

  const {getAll} = libraryApi('book')

  const {data: books, error, isLoading} = useQuery(['getAll', 'book'],
      () => getAll({params: {withRelations: false}}))

  const schema = yup.object().shape({
    text: yup
    .string()
    .required('Text is required')
    .min(5, 'Text is too short')
    .max(300, 'Text is too long'),
    bookId: yup
    .number()
    .required('Book is required')
    .min(1, 'Book is not chosen')
  })

  const {
    register,
    handleSubmit: onFormSubmit,
    setValue,
    formState,
      watch
  } = useForm({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    setValue('text', comment?.text ?? '')
    setValue('bookId', comment?.bookId ?? 0)
  }, [comment?.text, comment?.bookId, setValue])

  const processForm = (data) => {
    handleSubmit({...comment, text: data.text, bookId: data.bookId})
  }

  if (isLoading) {
    return <Loading/>
  }

  if (error) {
    return <ErrorDisplay error={error}/>
  }

  // noinspection JSCheckFunctionSignatures
  return (
      <form className={'form-container'}
            onSubmit={onFormSubmit(processForm)}>
        <TextAreaComponent
            title={'Text'}
            state={watch('text') ?? ''}
            callback={(text) => setValue('text', text)}
            register={register('text')}
            errors={formState.errors.text?.message}
        />
        <SelectComponent
            title={'Book'}
            state={watch('bookId') ?? 0}
            callback={(id) => setValue('bookId', id)}
            register={register('bookId')}
            errors={formState.errors.bookId?.message}
            items={books}
            displayField={'name'}
        />
        <div className="row">
          <input type="submit" value="Submit"/>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
  )
}