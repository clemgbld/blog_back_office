import Home from "./app/pages/Home/Home";
import Header from "./app/UI/Header/Header";
import CreateArticle from "./app/pages/CreateArticle/CreateArticle";
import UpdateArticle from "./app/pages/UpdateArticle/UpdateArticle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./app/routing/constants";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.HOME}
          element={
            <Header>
              <Home />
            </Header>
          }
        />
        <Route
          path={ROUTES.CREATE}
          element={
            <Header>
              <CreateArticle />
            </Header>
          }
        />
        <Route
          path={`${ROUTES.UPDATE}/:id`}
          element={
            <Header>
              <UpdateArticle />
            </Header>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
