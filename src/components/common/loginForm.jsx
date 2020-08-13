import React from "react";
import { Link, Redirect } from "react-router-dom";
import { login, getCurrentUser } from "../../services/authService";
import Form from "./form";
import Joi from "joi-browser";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().min(3).max(30).required().label("Username"),
    password: Joi.string()
      .alphanum()
      .min(6)
      .max(16)
      .required()
      .label("Password"),
  };

  doSubmit = async () => {
    try {
      const { username, password } = this.state.data;
      await login(username, password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = err.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="pt-5">
        <div className="text-center pt-2">
          <h1>
            Login to {"   "}
            <span className="badge badge-primary">VID</span>
            <span className="badge badge-danger">HUB</span>
            {"   "}Here
            <i className="fa fa-id-card-o pl-3" />
          </h1>
        </div>
        <div className="container pt-3 w-50">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username")}
            {this.renderInput("password", "Password", "Password")}
            <div className="container">
              {this.renderLoginButton("Login", "user-circle-o")}
              <Link className="btn btn-link btn-lg" to="/register">
                New to VidHub? Register here.
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
