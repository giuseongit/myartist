import { connect } from 'react-redux';
import Dashboard from '../components/dashboard';

const mapStateToProps = state => {
  return {
    name: state.name
  };
}

const mapDispatchToProps = dispatch => {
  return {};
}

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default DashboardContainer;