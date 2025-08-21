import { BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import StuffList from "./components/stuff/stuff-component";
import HomePage from "./page/homepage/home-page";
import NavStyle from "./navbar.module.scss"
import AddStuff from "./components/stuff/stuff-add-component";
import {Layout,Menu} from "antd"
import EditStuff from "./components/stuff/stuff-edit-component";

const {Header,Footer,Sider,Content} = Layout;

const {Item, SubMenu} = Menu;

function App() {

  return (
    <Router>
      <Layout className={NavStyle.Layoutstyle}>

        <Header>
          <h1 className={NavStyle.Textheader}> APP TEST </h1>
        </Header>

      <Layout>
        <Sider className={NavStyle.navbar}>
          
        <Menu mode="inline">
            <form className={NavStyle.NavForm}>
              <Item>
                <Link className={NavStyle.UrlLink} to="/">Home</Link>
              </Item>

              <SubMenu key="Stuff" title="Stuff" className={NavStyle.UrlLink}>
              <Item className={NavStyle.TextUrl}>
                <Link className={NavStyle.UrlLink} to="/Stuff">Stuff List</Link>
              </Item>

              <Item className={NavStyle.TextUrl}>
                <Link className={NavStyle.UrlLink} to="/AddStuff">Add Stuff </Link>
              </Item>
              </SubMenu>
              </form>
            </Menu>
        </Sider>
                    <Content className={NavStyle.ContentStyle}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/Stuff" element={<StuffList />} />
                    <Route path="/AddStuff" element={<AddStuff />} />
                    <Route path="/EditStuff/:id" element={<EditStuff />} />
                </Routes>
            </Content>
        </Layout>
          <Footer className={NavStyle.FooterText}>
              This is App New App
            </Footer>
            
      </Layout>
      
      

    </Router>
  );
}

export default App;

<Router>
  <Layout style={{ minHeight: '100vh' }}>
    {/* HEADER */}
    <Header className={NavStyle.HeaderStyle}>
      <h1>App Test</h1>
    </Header>

    {/* BODY: SIDEBAR + CONTENT */}
    <Layout>
      <Sider width={200} className={NavStyle.navbar}>
        <Menu mode="inline">
          <form className={NavStyle.NavForm}>
            <Item>
              <Link className={NavStyle.UrlLink} to="/">Home</Link>
            </Item>
            <SubMenu key="Stuff" title="Stuff" className={NavStyle.UrlLink}>
              <Item className={NavStyle.TextUrl}>
                <Link className={NavStyle.UrlLink} to="/Stuff">Stuff List</Link>
              </Item>
              <Item className={NavStyle.TextUrl}>
                <Link className={NavStyle.UrlLink} to="/AddStuff">Add Stuff</Link>
              </Item>
            </SubMenu>
          </form>
        </Menu>
      </Sider>

      <Layout style={{ padding: '0 24px 24px' }}>
        <Content className={NavStyle.ContentStyle}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Stuff" element={<StuffList />} />
            <Route path="/AddStuff" element={<AddStuff />} />
          </Routes>
        </Content>

        <Footer className={NavStyle.FooterText}>
          This is App New App
        </Footer>
      </Layout>
    </Layout>
  </Layout>
</Router>