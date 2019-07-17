import React, { Component } from "react";

import LoginForm from "./LoginForm";
export default class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    loading: false
  };
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = async e => {
    this.setState({ loading: true });
    e.preventDefault();
    try {
      const user = await this.props.loginUser(this.state);

      this.props.setAuthUser(user);
    } catch (e) {
      console.log(e);
      this.setState({ errors: e, loading: false });
    }
  };
  render() {
    return (
      <LoginForm
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
        errors={this.state.errors}
        loading={this.state.loading}
      />
    );
  }
}
