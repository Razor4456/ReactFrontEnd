import { BrowserRouter as Router,Routes,Route,Link, useLocation} from "react-router-dom";
import StuffList from "./components/stuff/stuff-component";
import HomePage from "./page/homepage/home-page";
import AddStuff from "./components/stuff/stuff-add-component";
import EditStuff from "./components/stuff/stuff-edit-component";
import LoginPage from "./components/login/login-component";
import MainLayout from "./MainLayout";

function App() {
  return (
    <Router>
          <Routes>
          <Route path="/Login" element={<LoginPage />}/>

          <Route
          path="/" 
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          } />

          <Route 
            path="/Stuff" 
            element={
            <MainLayout>
              <StuffList />
            </MainLayout>
            } />

          <Route 
            path="/AddStuff" 
            element={
            <MainLayout>
              <AddStuff />
            </MainLayout>
            } />

          <Route 
            path="/EditStuff/:id" 
            element={
            <MainLayout>
              <EditStuff />
            </MainLayout>
            } />

      </Routes>
    </Router>
  );
}

export default App;