import { Col, Row } from "antd";
import PropTypes from 'prop-types';
import React, { PureComponent } from "react";

import BaseList from "./baseList";


class FavsSection extends PureComponent {

  render() {

    return (
      <div>
        <Row>
          <Col sm={{offset: 7, span: 10}} xs={{offset: 2, span: 20}}>
            <BaseList
              favs={this.props.favs}
              onSelect={this.props.onSelect}
              list={this.props.favs}
            />
          </Col>
        </Row>
      </div>
    );

  }

}

FavsSection.propTypes = {
  favs: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default FavsSection;
