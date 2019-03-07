import { Avatar, Icon, List } from 'antd';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';


class ListRow extends PureComponent {

  constructor(props) {
    super(props);

    this.addToFavourites = this.triggerFavourites.bind(this, "add");
    this.removeFromFavourites = this.triggerFavourites.bind(this, "remove");
  }

  render() {

    return (
      <List.Item actions={[this.buildTriggerAction()]}>
        <List.Item.Meta
          avatar={<Avatar src={this.props.item.images[3] /* TODO fix image item selection*/} />}
          title={this.props.item.name}
          description={`${this.props.item.followers.total} followers`}
        />
      </List.Item>
    );
  }

  buildTriggerAction() {
    if (this.props.isFavourite) {
      return (
        <Icon type="plus-circle" onClick={this.addToFavourites} />
      );
    }

    return (
      <Icon type="minus-circle" onClick={this.removeFromFavourites} />
    )
  }

  triggerFavourites(action) {
    this.props.onSelect(action, this.props.item.id);
  }

}

ListRow.propTypes = {
  artist: PropTypes.object.isRequired,
  isFavourite: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default ListRow;
