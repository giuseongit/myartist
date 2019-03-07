import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Row, Col, Typography, Spin, Alert, Layout, Tabs } from 'antd';
import FavsContainer from "../containers/favsContainer";
import SearchContainer from "../containers/searchContainer";
const { Title, Text } = Typography;
const { Header, Content, Sider } = Layout;
const TabPane = Tabs.TabPane;


const renderTabBar = (props, DefaultTabBar) => <div/>;

class Dashboard extends Component{
  constructor(props){
    super(props);

    this.state = {
      activetab: '1'
    };
  }

  menuClick = ({ item, key, selectedKey }) => {
    this.setState({
      activetab: key
    });
  }

  render() {
    const { activetab, name } = this.state;
    return (
      <Layout>
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[ activetab ]}
            style={{ lineHeight: '64px' }}
            onSelect={ this.menuClick }
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '50px 50px' }}>
          <Tabs activeKey={ activetab } renderTabBar={renderTabBar}>
            <TabPane tab="Tab 1" key="1">
              <SearchContainer />
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              <FavsContainer />
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    );
  }
}

Dashboard.propTypes = {
  name: PropTypes.string.isRequired
};

export default Dashboard;