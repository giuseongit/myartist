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

    const check = (
      <Icon
        className="myartist-check-mark"
        type="check"
      />
    );

    let actions = [this.buildTriggerAction()];
    if(this.props.isFavourite){
      actions = [check, ...actions];
    }

    return (
      <List.Item actions={actions}>
        <List.Item.Meta
          avatar={<Avatar src={imageUrl} />}
          title={this.props.artist.name}
          description={`${this.props.artist.followers.total} followers`}
        />
      </List.Item>
    );
  }

  buildTriggerAction() {
    let callback;
    let iconType;
    if (!this.props.isFavourite) {
      callback = this.addToFavourites;
      iconType = "plus-circle";
    } else {
      callback = this.removeFromFavourites;
      iconType = "minus-circle";
    }

    return (
      <Icon
        style={{fontSize: 16}}
        className="myartist-action-icon"
        onClick={callback}
        type={iconType}
      />
    );
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
