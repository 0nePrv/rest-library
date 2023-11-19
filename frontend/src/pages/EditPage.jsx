import React from "react"
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {libraryApi} from "../api/libraryApi";
import {BookForm} from "../model/book/BookForm";
import {Loading} from "../ui/Loading";
import {useState} from "react";
import {ErrorDisplay} from "../ui/ErrorDisplay";

export const EditPage = ({
  resource = 'book',
  Component = BookForm,
  displayName = 'Books'
}) => {

  const {update, get} = libraryApi(resource)

  const {bookId, id} = useParams()

  const navigate = useNavigate();

  const [updateError, setUpdateError] = useState(null);

  const {data, error, isLoading} = useQuery(['update', resource],
      () => get({id}))

  const onSubmit = async (data) => {
    try {
      const updateResponse = await update({id: data.id, payload: data});
      console.log('UPDATE RESPONSE:', updateResponse)
      setUpdateError(null)
      doNavigate(data)
    } catch (updateError) {
      console.error('UPDATE ERROR:', error)
      setUpdateError(updateError)
    }
  }

  const doNavigate = (obj = data) => {
    if (resource === 'comment') {
      navigate(`/book/${obj?.bookId ?? bookId}/comment`)
    } else {
      navigate(`/${resource}`)
    }
  }

  if (isLoading) {
    return <Loading/>
  }

  if (error) {
    return <ErrorDisplay error={error}/>
  }

  if (updateError) {
    return <ErrorDisplay error={updateError}/>
  }

  return (
      <div>
        <h1>{displayName} edit page</h1>
        <Component data={data}
                   handleSubmit={onSubmit}
                   handleCancel={doNavigate}/>
      </div>
  )
}