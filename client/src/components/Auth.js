import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import * as selectors from "../store/selectors";

class Auth extends React.Component {
  render() {
    const path = this.props.location.pathname;
    const userid = localStorage.getItem("userid");

    if (path === "/login") {
      return null;
    } else {
      return <div>{userid ? null : <Redirect to="/login" />}</div>;
    }
  }
}
const mapStateToProps = state => ({
  user: selectors.selectUser(state) || {}
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Auth)
);
