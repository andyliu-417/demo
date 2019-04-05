import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { connect } from "react-redux";
import { LOGIN, REGISTER } from "../../store/types";
import { Redirect } from "react-router-dom";
import "./index.css";
import * as selectors from "../../store/selectors";

const FormItem = Form.Item;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.state.isLogin
          ? this.props.login(values)
          : this.props.register(values);
      } else {
        message.error("username or password is required");
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { redirectTo } = this.props.user;
    return (
      <div className="cp-login">
        {redirectTo === "/events" ? <Redirect to={redirectTo} /> : null}
        <div className="login-form">
          <div className="form-title">Celebrity Hologram</div>
          <Form className="form-body" onSubmit={this.handleSubmit}>
            <div className="form-label">Username</div>
            <FormItem>
              {getFieldDecorator("username", {
                rules: [{ required: true, message: "please input username!" }]
              })(<Input className="form-input" placeholder="Username" />)}
            </FormItem>
            <div className="form-label">Password</div>
            <FormItem>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "please input password!" }]
              })(
                <Input
                  className="form-input"
                  type="password"
                  placeholder="Password"
                />
              )}
            </FormItem>
            <FormItem>
              <Button className="form-submit" type="primary" htmlType="submit">
                {this.state.isLogin ? "Sign in" : "Register"}
              </Button>
              <p
                className="form-register"
                onClick={() => {
                  this.setState({ isLogin: !this.state.isLogin });
                }}
              >
                {this.state.isLogin ? "Register" : "Sign in"}
              </p>
              {/* {this.props.user.msg ? message.error(this.props.user.msg) : null} */}
              <p className="form-register" style={{height:"40px"}}>{this.props.user.msg}</p>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: selectors.selectUser(state) || {}
});

const mapDispatchToProps = dispatch => ({
  login: data => dispatch({ type: LOGIN, data }),
  register: data => dispatch({ type: REGISTER, data })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Login));
