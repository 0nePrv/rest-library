import {ListPage} from "../pages/list";
import {EditPage} from "../pages/edit";
import {CreatePage} from "../pages/create";
import React from "react";

const ListPageWrapper = ({config}) => (
    <React.Suspense>
      <ListPage resourceConfig={config}/>
    </React.Suspense>
)

const EditPageWrapper = ({config}) => (
    <React.Suspense>
      <EditPage resourceConfig={config}/>
    </React.Suspense>
)

const CreatePageWrapper = ({config}) => (
    <React.Suspense>
      <CreatePage resourceConfig={config}/>
    </React.Suspense>
)

const NotFoundPage = () => <h1>Page not found</h1>

export {ListPageWrapper, EditPageWrapper, CreatePageWrapper, NotFoundPage}