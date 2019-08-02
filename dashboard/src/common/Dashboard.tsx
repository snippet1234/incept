import React from 'react';

import { Layout, Menu, Breadcrumb, Icon, Form } from 'antd';
import { Route } from 'react-router';
import { Forms } from '../screens/Forms';
import { Subscriptions } from '../screens/Subcriptions';
import { FormItems } from '../screens/FormsItems';
import { Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

interface DashboardState {
  collapsed: boolean
}

export class Dashboard extends React.Component<{}, DashboardState>{
  state = {
    collapsed: false
  };

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" style={{ alignContent: 'center', justifyContent: 'center', flex: 1 }} >
            <img style={{ margin: '10%', marginLeft: '20%', }} width="100" src={require('../assets/images/icon.png')} />
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Link to="/">
                <Icon type="pie-chart" />
                <span>Forms</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/subscriptions">
                <Icon type="desktop" />
                <span>Subscriptions</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/users">
                <Icon type="user" />
                <span>Users</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>Stats</span>
                </span>
              }
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="logout" />
              <span>Log Out</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>

            <Route exact path="/" component={Forms} />
            <Route exact path="/form/:formid" component={FormItems} />
            <Route exact path="/subscriptions" component={Subscriptions} />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Loan Incept ©2019
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
