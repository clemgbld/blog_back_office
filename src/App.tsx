import Home from "./app/pages/Home/Home";
import CreateArticle from "./app/pages/CreateArticle/CreateArticle";
import UpdateArticle from "./app/pages/UpdateArticle/UpdateArticle";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="create" element={<CreateArticle />} />
        <Route path="update/:id" element={<UpdateArticle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
