import React, {useState} from "react"
import {useNavigate, useParams} from "react-router-dom";
import {libraryApi} from "../../api/libraryApi";
import {ErrorDisplay} from "../../ui/ErrorDisplay";

const CreatePage = ({resource, Component, displayName}) => {

  const [createError, setCreateError] = useState(null);

  const navigate = useNavigate()

  const {bookId} = useParams()

  const {create} = libraryApi()

  const onSubmit = async (data) => {
    try {
      await create(resource, data);
      setCreateError(null)
      doNavigate(false, data)
    } catch (error) {
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

export default CreatePage