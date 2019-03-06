import React, { Component } from 'react';
import { Modal, Button } from 'antd';

import {
  Form, Icon, Input, Checkbox,
} from 'antd';

class LoginModal extends React.Component {
  state = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
  }

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }


  ok = () => {
    var clientId = '1ae47e4ba78d435ca3a3a2fd48f4312d';
    var url = 'https://accounts.spotify.com/authorize?response_type=code&client_id=' + clientId + "&redirect_uri=http://localhost:3000";
    window.location.href = url;
  }

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <div>
        <Modal
          visible={true}
          onOk={this.handleOk}
          centered={true}
          confirmLoading={confirmLoading}
          closable={false}
          footer={null}
        >
          <Button type="primary" onClick={this.ok}>
            Log in
          </Button>
        </Modal>
      </div>
    );
  }
}

export default LoginModal;