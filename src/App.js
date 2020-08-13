import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getCurrentUser } from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";
import MainPage from "./components/mainPage";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/common/navbar";
import LoginForm from "./components/common/loginForm";
import RegisterForm from "./components/common/registerForm";
import NewMoviesForm from "./components/newMoviesForm";
import Logout from "./components/common/logout";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <div className="row">
          <ToastContainer />
          <NavBar user={user} />
        </div>
        <div className="row">
          <main className="container">
            <Switch>
              <Route path="/login" component={LoginForm}></Route>
              <Route path="/register" component={RegisterForm}></Route>
              <ProtectedRoute path={"/movies/:id"} component={NewMoviesForm} />
              <Route
                path="/movies"
                render={(props) => <Movies {...props} user={user} />}
              ></Route>
              <Route path="/customers" component={Customers}></Route>
              <Route path="/rentals" component={Rentals}></Route>
              <Route path="/not-found" component={NotFound}></Route>
              <Route path="/logout" component={Logout}></Route>
              <Route path="/" exact component={MainPage}></Route>
              <Redirect to="/not-found" />
            </Switch>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
