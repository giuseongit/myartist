import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Typography, Spin, Layout, message } from 'antd';
import { AUTH_URL } from '../utils/api';
const { Title, Text } = Typography;
const { Content } = Layout;

class LandingPage extends PureComponent{    
  login = () => {
    window.location.href = AUTH_URL;
  }
  
  render(){
    const { loading, error } = this.props;

    if(error){
      message.error("Cannot login, an error has occourred");
    }

    const login = (
      <Button style={{marginTop: 35}} block type="primary" onClick={this.login}>
        Log in
      </Button>
    );

    const wait = (
      <Spin />
    );

    const style = {
      position: 'relative',
      margin: '0 auto',
      borderRadius: '1.5em',
      padding: '5vh 1vw'
    };

    const action = loading ? wait : login;
    
    return (
      <Layout>
        <div className='ant-modal-wrap ant-modal-centered'>
          <Content style={style} className='ant-modal'>
            <Row>
              <Col sm={{offset: 2, span: 20}} xs={{offset: 2, span: 20}}>
                <Title className="title">Welcome to MyArtists</Title>
              </Col>
            </Row>
            <Row className="modal-row">
              <Col sm={{offset: 2, span: 20}} xs={{offset: 2, span: 20}} style={{marginBottom: '2vh'}}>
                <Text>
                  This application uses the <a href="https://developer.spotify.com/documentation/web-api/quick-start/">spotify API</a> to build a list of artists of your choice. To begin, login with spotify.
                </Text>
              </Col>
            </Row>
            <Row>
              <Col sm={{span: 20}} xs={{offset:2, span: 20}}>
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