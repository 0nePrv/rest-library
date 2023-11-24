import {
  CreatePageWrapper,
  EditPageWrapper,
  ListPageWrapper,
  NotFoundPage
} from "../PageWrappers";
import {Route, Routes} from "react-router-dom";
import {gerneRouteConfig} from "../config";

export const GenreRoutes = () => {
  return (
      <Routes>
        <Route
            path={'/'}
            element={<ListPageWrapper config={gerneRouteConfig}/>}
        />
        <Route
            path={'/edit/:id'}
            element={<EditPageWrapper config={gerneRouteConfig}/>}
        />
        <Route
            path={'/new'}
            element={<CreatePageWrapper config={gerneRouteConfig}/>}
        />
        <Route path={'/*'} element={<NotFoundPage/>}/>
      </Routes>
  );
};

