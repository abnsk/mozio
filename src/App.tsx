import { Routes, Route, Link } from "react-router-dom";
import ResultView from "./views/ResultView";
import SearchView from "./views/SearchView";

function App() {

  return (
    <Routes>
      <Route path="/" element={<SearchView />} />
      <Route path="/result" element={<ResultView />} />
    </Routes>
  )
}

export default App
