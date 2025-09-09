import { BrowserRouter as Router,Link} from "react-router-dom";
import NavStyle from "./navbar.module.scss"
import {Layout,Menu} from "antd"

const {Header,Footer,Sider,Content} = Layout;

const {Item, SubMenu} = Menu;

function MainLayout({children}) {

  return (
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
                {children}
            </Content>
        </Layout>
          <Footer className={NavStyle.FooterText}>
              This is App New App
            </Footer>
            
      </Layout>
  );
}

export default MainLayout;