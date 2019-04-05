import React, { Component } from "react";
import "./header.css";
import { Button, Modal, Input, DatePicker } from "antd";
import { connect } from "react-redux";
import * as actions from "../store/actions";

const { TextArea } = Input;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      date: "",
      title: "",
      celebrity: "",
      description: "",
      url: ""
    };
  }
  onChange = (date, dateString) => {
    this.setState({ date });
  };

  handleOk = () => {
    this.props.addEvent({
      title: this.state.title,
      celebrity: this.state.celebrity,
      description: this.state.description,
      date: this.state.date,
      url: this.state.url
    });
    this.setState({
      visible: false,
      title: "",
      celebrity: "",
      description: "",
      date: "",
      url: ""
    });
  };

  render() {
    return (
      <div className="component-header">
        Celebrity Hologram
        <Button
          style={{ float: "right", margin: "25px 80px 25px 20px" }}
          type="primary"
          shape="circle"
          icon="logout"
          onClick={this.props.logout}
        />
        <Button
          style={{ float: "right", margin: "25px 20px" }}
          type="primary"
          shape="circle"
          icon="plus"
          onClick={() => {
            this.setState({ visible: true });
          }}
        />
        <Modal
          title="Add Celebrity Event"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={() => {
            this.setState({
              visible: false,
              title: "",
              celebrity: "",
              description: "",
              date: "",
              url: ""
            });
          }}
        >
          <Input
            style={{ marginBottom: "20px" }}
            size="large"
            placeholder="Event Title"
            type="text"
            onChange={e => {
              this.setState({ title: e.target.value });
            }}
            value={this.state.title}
          />
          <Input
            style={{ marginBottom: "20px" }}
            size="large"
            placeholder="Event Celebrity"
            onChange={e => {
              this.setState({ celebrity: e.target.value });
            }}
            value={this.state.celebrity}
            type="text"
          />
          <DatePicker
            style={{ marginBottom: "20px" }}
            onChange={this.onChange}
            placeholder="Event Date"
            value={this.state.date}
          />
          <Input
            style={{ marginBottom: "20px" }}
            size="large"
            placeholder="Image URL"
            type="text"
            onChange={e => {
              this.setState({ url: e.target.value });
            }}
            value={this.state.url}
          />
          <TextArea
            style={{ marginBottom: "20px" }}
            placeholder="Event Description"
            type="text"
            onChange={e => {
              this.setState({ description: e.target.value });
            }}
            value={this.state.description}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // events: selectors.selectEvents(state) || []
});

const mapDispatchToProps = dispatch => ({
  addEvent: data => dispatch(actions.Event.add(data)),
  logout: () => dispatch(actions.User.logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
