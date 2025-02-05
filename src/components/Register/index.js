import React, { Component } from "react";
import PropTypes from "prop-types";
import RegisterForm from "./RegisterForm";

export default class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    errors: {},
    loading: false
  };
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    const { registerUser, setAuthUser } = this.props;
    try {
      const data = await registerUser(this.state);
      console.log(data);
      //set user to localhost
      setAuthUser(data);
    } catch (e) {
      console.log(e);

      this.setState({ errors: e, loading: false });
    }
  };
  render() {
    return (
      <RegisterForm
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
        errors={this.state.errors}
        loading={this.state.loading}
      />
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  setAuthUser: PropTypes.func.isRequired
};
