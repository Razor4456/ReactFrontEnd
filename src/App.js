import { BrowserRouter as Router,Routes,Route,Link } from "react-router-dom";
import StuffList from "./components/stuff/stuff-component";
import HomePage from "./page/homepage/home-page";
import NavStyle from "./navbar.module.scss"
import AddStuff from "./components/stuff/stuff-add-component";

function App() {
  return (
    <Router>
      <nav className={NavStyle.navbar}>
        <form className={NavStyle.NavForm}>
        <ul className={NavStyle.Urllist}>
          <p className={NavStyle.TextUrl}><Link className={NavStyle.UrlLink} to="/">Home</Link></p>
          <p className={NavStyle.TextUrl}><Link className={NavStyle.UrlLink} to="/Stuff">Stuff List</Link></p>
          <p className={NavStyle.TextUrl}><Link className={NavStyle.UrlLink} to="/AddStuff">Add Stuff </Link></p>
        </ul>
        </form>
      </nav>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Stuff" element={<StuffList />} />
        <Route path="/AddStuff" element={<AddStuff />} />
      </Routes>
    </Router>
  );
}

export default App;