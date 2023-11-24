import {ListPage} from "../pages/list";
import {EditPage} from "../pages/edit";
import {CreatePage} from "../pages/create";
import React from "react";

const ListPageWrapper = ({config}) => (
    <React.Suspense>
      <ListPage
          Component={config.Display}
          displayName={config.name}
          resource={config.resource}/>
    </React.Suspense>
)

const EditPageWrapper = ({config}) => (
    <React.Suspense>
      <EditPage
          Component={config.Form}
          displayName={config.name}
          resource={config.resource}/>
    </React.Suspense>
)

const CreatePageWrapper = ({config}) => (
    <React.Suspense>
      <CreatePage
          Component={config.Form}
          displayName={config.name}
          resource={config.resource}/>
    </React.Suspense>
)

const NotFoundPage = () => <h1>Page not found</h1>

export {ListPageWrapper, EditPageWrapper, CreatePageWrapper, NotFoundPage}