import { Col, Row } from "antd";
import PropTypes from 'prop-types';
import React, { PureComponent } from "react";

import BaseList from "./baseList";
import SearchInput from "./searchInput";


class SearchSection extends PureComponent {

  render() {
    const style = this.props.results.length > 0 ? {} : {display: 'none'}

    return (
      <div>
        <Row>
          <Col sm={{offset: 6, span: 12}} xs={{offset: 2, span: 20}}>
            <SearchInput
              onSearch={this.props.onSearch}
              token={this.props.token}
            />
          </Col>
        </Row>
        <Row>
          <Col style={style} sm={{offset: 7, span: 10}} xs={{offset: 2, span: 20}}>
            <BaseList
              favs={this.props.favs}
              onSelect={this.props.onSelect}
              list={this.props.results}
            />
          </Col>
        </Row>
      </div>
    );

  }

}

SearchSection.propTypes = {
  favs: PropTypes.array.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
};

export default SearchSection;
