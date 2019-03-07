import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ListRow from "./row";

class BaseList extends PureComponent {

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  render() {

    return (
      <List
        itemLayout="horizontal"
        dataSource={this.props.list}
        renderItem={this.renderItem}
      />
    );

  }

  renderItem(item) {

    return (
      <ListRow
        artist={item}
        isFavourite={this.isFav(item)}
        onSelect={this.props.onSelect}
      />
    );

  }

  isFav(item) {
    return this.props.favs.filter((fav) => fav.id === item.id).lenth === 1;
  }

}

BaseList.propTypes = {
  favs: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
}

export default BaseList;
