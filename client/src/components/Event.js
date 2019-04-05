import React, { Component } from "react";
import { Icon, Row, Col, Button } from "antd";
import moment from "moment";
import "./event.css";

export default class Event extends Component {
  format = date => moment(date).format("dddd, MMMM Do YYYY");
  render() {
    const event = this.props.event;
    return (
      <Row
        style={{
          margin: "0 auto",
          width: "80%",
          height: "400px",
          overflow: "hidden",
          border: "1px solid transparent",
          boxShadow: "0px 0px 0px 4px #e8e8e8",
          borderRadius: "8px"
        }}
      >
        <Col span={16} style={{}}>
          <img src={`${event.url}`} style={{ width: "100%" }} alt="img" />
        </Col>
        <Col span={8} style={{ padding: "10px 20px 20px", overflow: "hidden" }}>
          <div style={{ height: "35px", overflow: "hidden" }}>
            {this.props.user.permissions.indexOf("remove") > -1 && (
              <Button
                style={{ float: "right" }}
                type="danger"
                shape="circle"
                icon="close"
                onClick={() => {
                  this.props.removeEvent(event._id);
                }}
              />
            )}
          </div>
          <div style={{ fontSize: "24px" }}>{event.title}</div>
          <div style={{ margin: "20px 0" }}>
            @ <span style={{ fontSize: "20px" }}>{event.celebrity}</span>
          </div>
          <div>
            <Icon type="calendar" />{" "}
            <span style={{ fontSize: "20px" }}>{this.format(event.date)}</span>
          </div>
          <div style={{ margin: "20px 0", fontSize: "16px", color: "grey" }}>
            {event.description}
          </div>
        </Col>
      </Row>
    );
  }
}
