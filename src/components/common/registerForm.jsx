import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import { register } from "../../services/userService";
import { loginWithJWT } from "../../services/authService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string()
      .alphanum()
      .min(5)
      .max(12)
      .required()
      .label("Password"),
    name: Joi.string().min(3).required().label("Name"),
  };

  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      loginWithJWT(response.headers["x-auth-token"]);
      this.props.history.push("/");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = err.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="pt-5">
        <div className="text-center pt-2">
          <h1>
            Join{"   "}
            <span className="badge badge-primary">VID</span>
            <span className="badge badge-danger">HUB</span>
            {"   "}Here
            <i className="fa fa-user-circle-o pl-3" />
          </h1>
        </div>
        <div className="container pt-3 w-50">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("name", "Name")}
            {this.renderInput("username", "Username")}
            {this.renderInput("password", "Password")}
            <div className="container">
              {this.renderLoginButton("Join", "user-circle-o")}
              <Link className="btn btn-link btn-lg" to="/login">
                Already a member? Login here.
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
