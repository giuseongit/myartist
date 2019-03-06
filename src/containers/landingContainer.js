import {
  connect
} from 'react-redux'
import LandingPage from '../components/landingPage'

const isLoading = ( token, name ) => {
  console.log(token, name);
  return token !== null && name === null;
}

const mapStateToProps = state => {
  return {
    error: state.error,
    loading: isLoading(state.token, state.name)
  }
}

const mapDispatchToProps = dispatch => {
  return {};
}

const LandingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage)

export default LandingContainer