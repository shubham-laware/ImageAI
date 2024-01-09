import "./App.css";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import CreateImage from "./pages/createImage/CreateImage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/createImage" element={<CreateImage/>} />
      </Routes>
    </Router>
  );
}

export default App;
