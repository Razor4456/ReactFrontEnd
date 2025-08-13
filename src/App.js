import { BrowserRouter as Router,Routes,Route,Link } from "react-router-dom";
import StuffList from "./components/stuff/stuff-component";
import HomePage from "./page/homepage/home-page";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">🏠 Home</Link></li>
          <li><Link to="/Stuff">📦 Stuff List</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Stuff" element={<StuffList />} />
      </Routes>
    </Router>
  );
}

export default App;