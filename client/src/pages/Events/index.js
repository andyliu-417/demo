import React, { Component } from "react";
import { Header } from "../../components/";
import { Event } from "../../components/";
import { BackTop } from "antd";
import { connect } from "react-redux";
import * as actions from "../..//store/actions";
import * as selectors from "../../store/selectors";
import { Redirect } from "react-router-dom";

import "./index.css";

class Events extends Component {
  componentDidMount() {
    if (!this.props.user._id) {
      this.props.getUserInfo();
    }
    this.props.loadEvents();
  }

  removeEvent = id => {
    this.props.removeEvent(id);
  };
  render() {
    const { redirectTo } = this.props.user;

    const eventList =
      this.props.events &&
      this.props.events.map((obj, index) => {
        return (
          <li key={index} className={`event-${index}`}>
            <Event
              event={Object.assign(obj, { index })}
              removeEvent={this.removeEvent}
              user={this.props.user}
            />
          </li>
        );
      });
    return (
      <div className="cp-events">
        {redirectTo === "/login" ? <Redirect to={redirectTo} /> : null}
        <Header />
        <ul className="events-list">{eventList}</ul>
        <BackTop />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: selectors.selectEvents(state) || [],
  user: selectors.selectUser(state) || {}
});

const mapDispatchToProps = dispatch => ({
  loadEvents: () => dispatch(actions.Event.load()),
  addEvent: data => dispatch(actions.Event.add(data)),
  removeEvent: id => dispatch(actions.Event.remove(id)),
  getUserInfo: () => dispatch(actions.User.getUserInfo())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);
