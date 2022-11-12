import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "./core/auth/selectors/selectors";

import Header from "./app/UI/Header/Header";
import Home from "./app/pages/Home/Home";
import CreateArticle from "./app/pages/CreateArticle/CreateArticle";
import UpdateArticle from "./app/pages/UpdateArticle/UpdateArticle";
import Auth from "./app/pages/Auth/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./app/routing/ProtectedRoute/ProtectedRoute";
import { ROUTES } from "./app/routing/constants";

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.AUTH}
          element={
            <ProtectedRoute isAllowed={!isLoggedIn} redirectPath={ROUTES.HOME}>
              <Auth />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.HOME}
          element={
            <ProtectedRoute isAllowed={isLoggedIn} redirectPath={ROUTES.AUTH}>
              <Header>
                <Home />
              </Header>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.CREATE}
          element={
            <ProtectedRoute isAllowed={isLoggedIn} redirectPath={ROUTES.AUTH}>
              <Header>
                <CreateArticle />
              </Header>
            </ProtectedRoute>
          }
        />
        <Route
          path={`${ROUTES.UPDATE}/:id`}
          element={
            <ProtectedRoute isAllowed={isLoggedIn} redirectPath={ROUTES.AUTH}>
              <Header>
                <UpdateArticle />
              </Header>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
