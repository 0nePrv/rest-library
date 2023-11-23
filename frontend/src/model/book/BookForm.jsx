import {libraryApi} from "../../api/libraryApi";
import {useQuery} from "react-query";
import '../../styles/form.css'
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import React, {useEffect} from "react";
import {Loading} from "../../ui/Loading";
import {TextInputComponent} from "../../ui/TextInputComponent";
import {SelectComponent} from "../../ui/SelectComponent";
import {ErrorDisplay} from "../../ui/ErrorDisplay";

export const BookForm = ({
  data: book = {},
  handleSubmit,
  handleCancel
}) => {

  const {getAll: getAllAuthors} = libraryApi('author')

  const {getAll: getAllGenres} = libraryApi('genre')

  const {
    data: authors,
    isLoading: authorsIsLoading,
    error: authorsError
  } = useQuery(['getAll', 'author'], () => getAllAuthors({}))

  const {
    data: genres,
    isLoading: genresIsLoading,
    error: genresError
  } = useQuery(['getAll', 'genre'], () => getAllGenres({}))

  const schema = yup.object().shape({
    name: yup
    .string().required('Name is required')
    .min(2, 'Name is too short')
    .max(50, 'Name is too long'),
    authorId: yup.number().required('Author is required')
    .min(1, 'Author is not chosen'),
    genreId: yup.number().required('Genre is required')
    .min(1, 'Genre is not chosen')
  })

  const {
    register,
    handleSubmit: onFormSubmit,
    setValue,
    watch,
    formState
  } = useForm({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    setValue('name', book?.name ?? '');
    setValue('authorId', book?.authorId ?? 0);
    setValue('genreId', book?.genreId ?? 0);
  }, [book?.name, book?.authorId, book?.genreId, setValue])

  const processForm = (data) => {
    handleSubmit({
      ...book,
      name: data.name,
      authorId: data.authorId,
      genreId: data.genreId
    })
  }

  if (authorsIsLoading || genresIsLoading) {
    return <Loading/>
  }

  if (authorsError) {
    return (
        <ErrorDisplay error={authorsError}/>
    )
  }

  if (genresError) {
    return (
        <ErrorDisplay error={genresError}/>
    )
  }

  // noinspection JSCheckFunctionSignatures
  return (
      <form className={'form-container'}
            onSubmit={onFormSubmit(processForm)}>
        <TextInputComponent
            title={'Name'}
            state={watch('name') ?? ''}
            callback={(name) => setValue('name', name)}
            register={register('name')}
            errors={formState.errors.name?.message}
        />
        <SelectComponent
            title={'Author'}
            state={watch('authorId') ?? 0}
            callback={(id) => setValue('authorId', id)}
            register={register('authorId')}
            errors={formState.errors.authorId?.message}
            items={authors}
            displayField={'name'}
        />
        <SelectComponent
            title={'Gerne'}
            state={watch('genreId') ?? 0}
            callback={(id) => setValue('genreId', id)}
            register={register('genreId')}
            errors={formState.errors.genreId?.message}
            items={genres}
            displayField={'name'}
        />
        <div className="row">
          <input type="submit" value="Submit"/>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
  )
}
