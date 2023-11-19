import React from "react"
import {useNavigate, useParams} from "react-router-dom";
import {libraryApi} from "../api/libraryApi";
import {BookForm} from "../model/book/BookForm";
import {useState} from "react";
import {ErrorDisplay} from "../ui/ErrorDisplay";

export const CreatePage = ({
  resource = 'book',
  Component = BookForm,
  displayName = 'Books'
}) => {

  const [createError, setCreateError] = useState(null);

  const navigate = useNavigate()

  const {bookId} = useParams()

  const {create} = libraryApi(resource)

  const onSubmit = async (data) => {
    try {
      const createResponse = await create({payload: data});
      console.log('CREATE RESPONSE:', createResponse)
      setCreateError(null)
      doNavigate(false, data)
    } catch (error) {
      console.error('CREATE ERROR:', error)
      setCreateError(error)
    }
  }

  const onCancel = () => {
    doNavigate(true)
  }

  const doNavigate = (canceled = false, data = {}) => {
    let url
    if (resource === 'comment') {
      if (canceled) {
        url = `/book/${bookId}/comment`
      }
      else {
        url = `/book/${data?.bookId ?? bookId}/comment`
      }
    } else {
      url = `/${resource}`
    }
    navigate(url)
  }


  if (createError) {
    return <ErrorDisplay error={createError}/>
  }

  return (
      <div>
        <h1>{displayName} create page</h1>
        <Component handleSubmit={onSubmit} handleCancel={onCancel}/>
      </div>
  )
}