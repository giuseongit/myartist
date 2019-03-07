import { connect } from 'react-redux';
import LandingPage from '../components/landingPage';

const isLoading = ( token, name ) => {
  return token !== null && name === null;
}

const mapStateToProps = state => {
  const { token, name, error } = state.auth;
  return {
    error,
    loading: isLoading(token, name)
  };
}

const mapDispatchToProps = dispatch => {
  return {};
}

const LandingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);

export default LandingContainer;