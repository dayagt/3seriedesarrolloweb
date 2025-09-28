import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewPostPage from "./pages/NewPostPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nuevo" element={<NewPostPage />} />
      </Routes>
    </Router>
  );
}

export default App;

