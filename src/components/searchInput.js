import { Input } from 'antd';
import debounce from "lodash.debounce";
import PropTypes from "prop-types";
import React, { PureComponent } from 'react';

class SearchInput extends PureComponent {

  constructor(props) {
      super(props);

      this.onSearch = debounce(this.onSearch.bind(this), 300);
  }

  render() {
    return (
      <Input
        id='input-search'
        placeholder="Search your favourite artists"
        onChange={this.onSearch}
        ref={node => this.artistInput = node}
      />
    );
  }

  onSearch() {
    this.props.onSearch(this.props.token, this.artistInput.state.value);
  }

}

SearchInput.propTypes = {
  token: PropTypes.string.isRequired,
};

export default SearchInput;
