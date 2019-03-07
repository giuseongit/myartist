import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Menu, Typography, Layout, Tabs } from 'antd';
import FavsContainer from "../containers/favsContainer";
import SearchContainer from "../containers/searchContainer";
const { Header, Content } = Layout;
const TabPane = Tabs.TabPane;


const renderTabBar = (props, DefaultTabBar) => <div/>;

class Dashboard extends PureComponent{
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
        <Header style={{backgroundColor: '#222121'}}>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={[ activetab ]}
            style={{ lineHeight: '64px' }}
            onSelect={ this.menuClick }
          >
            <Menu.Item key="1">Search</Menu.Item>
            <Menu.Item key="2">My List</Menu.Item>
          </Menu>
        </Header>
        <Content style={{paddingTop: '5vw'}}>
          <Tabs activeKey={ activetab } renderTabBar={renderTabBar}>
            <TabPane key="1">
              <SearchContainer />
            </TabPane>
            <TabPane key="2">
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