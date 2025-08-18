import { BrowserRouter as Router,Routes,Route,Link } from "react-router-dom";
import StuffList from "./components/stuff/stuff-component";
import HomePage from "./page/homepage/home-page";
import StuffAddPage from "./page/stuffpage/stuff-add-page";
import NavStyle from "./navbar.module.scss"

function App() {
  return (
    <Router>
      <form className={NavStyle.NavForm}>
      <nav className={NavStyle.navbar}>
        <ul>
          <p><a><Link to="/">🏠 Home</Link></a></p>
          <p><Link to="/Stuff">📦 Stuff List</Link></p>
          <p><Link to="/AddStuff">📦 Add Stuff </Link></p>
        </ul>
      </nav>
      </form>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Stuff" element={<StuffList />} />
        <Route path="/AddStuff" element={<StuffAddPage />} />
      </Routes>
    </Router>
  );
}

export default App;