import React from "react";
import {Route, Routes} from "react-router-dom";
import {CreatePageWrapper, EditPageWrapper, ListPageWrapper, NotFoundPage} from "../PageWrappers";
import {bookRouteConfig, commentRouteConfig} from "../config";

export const BookRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<ListPageWrapper config={bookRouteConfig}/>}/>
        <Route path="/edit/:id" element={<EditPageWrapper config={bookRouteConfig}/>}/>
        <Route path="/new" element={<CreatePageWrapper config={bookRouteConfig}/>}/>

        <Route path="/:bookId/comment"
               element={<ListPageWrapper config={commentRouteConfig}/>}/>
        <Route path="/:bookId/comment/edit/:id"
               element={<EditPageWrapper config={commentRouteConfig}/>}/>
        <Route path="/:bookId/comment/new"
               element={<CreatePageWrapper config={commentRouteConfig}/>}/>

        <Route path="/*" element={<NotFoundPage/>}/>
      </Routes>
  );
};
