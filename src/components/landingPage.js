import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col, Typography, Spin, Alert, Layout } from 'antd';
import { AUTH_URL } from '../utils/api';
const { Title, Text } = Typography;
const { Content } = Layout;

class LandingPage extends PureComponent{    
  login = () => {
    window.location.href = AUTH_URL;
  }
  
  render(){
    const { loading, error } = this.props;

    const errorMsg = error ? (
      <Alert
      description="Cannot login, an error has occourred"
      type="error"
      closable/>
    ) : <div/>;

    const login = (
      <Button block type="primary" onClick={this.login}>
        Log in
      </Button>
    );

    const wait = (
      <Spin />
    );

    const style = {
      backgroundColor: '#FFFFFF',
      position: 'relative',
      margin: '0 auto',
      borderRadius: '1.5em',
      padding: '5vh 1vw'
    };

    const action = loading ? wait : login;
    
    return (
      <Layout>
        <div class='ant-modal-wrap ant-modal-centered'>
          <Content style={style} className='ant-modal'>
            <Row style={{}}>
              <Col sm={{offset: 5, span: 14}} xs={{offset: 2, span: 20}}>
                <Title>Welcome to MyArtists</Title>
              </Col>
            </Row>
            <Row>
              <Col sm={{offset: 2, span: 14}} xs={{offset: 2, span: 20}} style={{marginBottom: '2vh'}}>
                <Text>
                  This application uses the <a href="https://developer.spotify.com/documentation/web-api/quick-start/">spotify API</a> to build a list of artists of your choice. To begin, login with spotify.
                </Text>
                { errorMsg }
              </Col>
              <Col sm={{span: 4}} xs={{offset:2, span: 20}}>
                { action }
              </Col>
            </Row>
          </Content>
        </div>
      </Layout>
    );
  }
}

LandingPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired
};


export default LandingPage;