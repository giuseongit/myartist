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
    const imageUrl = this.props.artist.images[2]
      ? this.props.artist.images[2].url
      : "";

    return (
      <List.Item actions={[this.buildTriggerAction()]}>
        <List.Item.Meta
          avatar={<Avatar src={imageUrl} />}
          title={this.props.artist.name}
          description={`${this.props.artist.followers.total} followers`}
        />
      </List.Item>
    );
  }

  buildTriggerAction() {
    if (!this.props.isFavourite) {
      return (
        <Icon type="plus-circle" onClick={this.addToFavourites} />
      );
    }

    return (
      <Icon type="minus-circle" onClick={this.removeFromFavourites} />
    )
  }

  triggerFavourites(action) {
    this.props.onSelect(action, this.props.artist);
  }

}

ListRow.propTypes = {
  artist: PropTypes.object.isRequired,
  isFavourite: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default ListRow;
