import React, { Component, Fragment } from "react";

class PermissionsRequired extends Component {
  checkUserPermissions = () => {
    const { permissions, userPermissions } = this.props;
    const p = permissions.filter(item => userPermissions.indexOf(item) > -1);
    return p.length === permissions.length;
  };

  render() {
    if (this.checkUserPermissions()) {
      return <Fragment>{this.props.children}</Fragment>;
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  const mapping = {
    userPermissions: StoreSelectors.selectUserPermissions(state)
  };
  return mapping;
};

export default connect(mapStateToProps)(PermissionsRequired);
