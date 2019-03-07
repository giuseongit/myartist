import { connect } from 'react-redux';
import SearchSection from '../components/searchSection';

import { searchArtist } from "../utils/store";

const mapStateToProps = state => {
  return {
    favs: state.artists.favs,
    results: state.artists.cache,
    token: state.auth.token,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onSearch: (token, value) => searchArtist(dispatch, token, value),
    onSelect: (artistId) => console.log('asd'),
  };
}

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchSection);

export default SearchContainer;
