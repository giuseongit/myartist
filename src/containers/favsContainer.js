import { connect } from 'react-redux';
import FavsSection from '../components/favsSection';

import { handleArtist } from "../utils/store";

const mapStateToProps = state => {
  return {
    favs: state.artists.favs,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onSelect: (action, artist) => handleArtist(dispatch, action, artist),
  };
}

const FavsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FavsSection);

export default FavsContainer;
