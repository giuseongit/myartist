import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col, Typography, Spin, Alert } from 'antd';
import { AUTH_URL } from '../redux/store';
const { Title, Text } = Typography;

class LandingPage extends Component{    
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
            <Button type="primary" onClick={this.login}>
                Log in
            </Button>
        );

        const wait = (
            <Spin />
        );

        const action = loading ? wait : login;
        
        return (
            <Modal
                visible={true}
                centered={true}
                closable={false}
                footer={null}
                mask={false}
            >
                <Row>
                    <Col>
                        <Title>Welcome to MyArtists</Title>
                    </Col>
                </Row>
                <Row>
                    <Col span={18}>
                        <Text>
                            This application uses the <a href="https://developer.spotify.com/documentation/web-api/quick-start/">spotify API</a> to build a list of artists of your choice. To begin, login with spotify.
                        </Text>
                        { errorMsg }
                    </Col>
                    <Col offset={18}>
                        { action }
                    </Col>
                </Row>
                
            </Modal>
        );
    }

}


export default LandingPage