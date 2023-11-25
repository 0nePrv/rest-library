import React, {useState} from "react"
import {To, useNavigate, useParams} from "react-router-dom";
import {libraryApi} from "../../api/libraryApi";
import {ErrorDisplay} from "../../ui/ErrorDisplay";
import {DomainType} from "../../types/domainTypes";
import {IPageOptions} from "../../types/pageFormTypes";
import {APIError} from "../../types/errorTypes";

function CreatePage<T extends DomainType>({resourceConfig}: IPageOptions<T>) {

  const {resource, name, Form} = resourceConfig

  const [apiError, setApiError] = useState<APIError>(null);

  const navigate = useNavigate()

  const {bookId} = useParams()

  const {create} = libraryApi()

  const onSubmit = async (data: T) => {
    try {
      await create<T>(resourceConfig.resource, data);
      setApiError(null)
      doNavigate(data)
    } catch (error) {
      setApiError(error)
    }
  }

  const onCancel = () => {
    let url: To = `/${resource}`
    if (resource === 'comment') {
      url = `/book/${bookId}/comment`
    }
    navigate(url)
  }

  const doNavigate = (data: T) => {
    let url: To = `/${resource}`
    if (resource === 'comment') {
      url = `/book/${data['bookId']}/comment`
    }
    navigate(url)
  }


  if (apiError) {
    return <ErrorDisplay response={apiError.response}/>
  }

  return (
      <div>
        <h1>{name} create page</h1>
        <Form handleSubmit={onSubmit} handleCancel={onCancel}/>
      </div>
  )
}

export default CreatePage