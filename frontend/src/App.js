import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import backgroundVideo from "./background.mp4";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoMainPage from "./components/TodoMainPage";
import TodoLandingPage from "./components/TodoLandingPage";

function App() {
  return (
    <Router>
      <div className="App ">
        <Routes>
          <Route path="/" exact element={<TodoLandingPage />} />
          <Route path="/main" element={<TodoMainPage />} />
        </Routes>
        {/* VIDEO BACKGROUND */}
        <video autoPlay loop muted>
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      </div>
    </Router>
  );
}

export default App;
