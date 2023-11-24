import {
  CreatePageWrapper,
  EditPageWrapper,
  ListPageWrapper,
  NotFoundPage
} from "../PageWrappers";
import {Route, Routes} from "react-router-dom";
import {authorRouteConfig} from "../config";

export const AuthorRoutes = () => {
  return (
      <Routes>
        <Route
            path={'/'}
            element={<ListPageWrapper config={authorRouteConfig} />}
        />
        <Route
            path={'/edit/:id'}
            element={<EditPageWrapper config={authorRouteConfig} />}
        />
        <Route
            path={'/new'}
            element={<CreatePageWrapper config={authorRouteConfig} />}
        />
        <Route path={'/*'} element={<NotFoundPage />} />
      </Routes>
  );
};
