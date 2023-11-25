import React, {useState} from "react"
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {libraryApi} from "../../api/libraryApi";
import {Loading} from "../../ui/Loading";
import {ErrorDisplay} from "../../ui/ErrorDisplay";
import {DomainType} from "../../types/domainTypes";
import {IPageOptions} from "../../types/pageFormTypes";
import {APIError} from "../../types/errorTypes";

function EditPage<T extends DomainType>({resourceConfig}: IPageOptions<T>) {

  const {resource, name, Form} = resourceConfig

  const {update, get} = libraryApi()

  const {bookId, id} = useParams()

  const navigate = useNavigate()

  const [apiError, setApiError] = useState<APIError>(null);

  const {data: result, isLoading} = useQuery(['update', resource],
      () => get<T>(resource, id), {
        onError(apiError: APIError) {
          setApiError(apiError)
        }
      })

  const onSubmit = async (data: T) => {
    try {
      await update(resource, data.id.toString(), data);
      setApiError(null)
      doNavigate(data)
    } catch (updateError) {
      setApiError(updateError)
    }
  }

  const doNavigate = (obj: T) => {
    if (resource === 'comment') {
      navigate(`/book/${obj['bookId'] || bookId}/comment`)
    } else {
      navigate(`/${resource}`)
    }
  }

  if (isLoading) {
    return <Loading/>
  }

  if (apiError) {
    return <ErrorDisplay response={apiError.response}/>
  }

  return (
      <div>
        <h1>{name} edit page</h1>
        <Form obj={result.data}
              handleSubmit={onSubmit}
              handleCancel={() => doNavigate(result.data)}/>
      </div>
  )
}

export default EditPage