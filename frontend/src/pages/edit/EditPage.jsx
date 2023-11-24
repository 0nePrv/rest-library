import React, {useState} from "react"
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {libraryApi} from "../../api/libraryApi";
import {Loading} from "../../ui/Loading";
import {ErrorDisplay} from "../../ui/ErrorDisplay";

const EditPage = ({resource, Component, displayName}) => {

  const {update, get} = libraryApi()

  const {bookId, id} = useParams()

  const navigate = useNavigate();

  const [updateError, setUpdateError] = useState(null);

  const {data, error, isLoading} = useQuery(['update', resource],
      () => get(resource, id))

  const onSubmit = async (data) => {
    try {
      await update(resource, data.id, data);
      setUpdateError(null)
      doNavigate(data)
    } catch (updateError) {
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
        <Component obj={data}
                   handleSubmit={onSubmit}
                   handleCancel={doNavigate}/>
      </div>
  )
}

export default EditPage