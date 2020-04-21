import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
toast.configure();

const initialState = {
  name: "",
  password: "",
};

class Login extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  Login = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(
        "http://localhost:3004/login?q=" + this.state.name
      );
      const data = await res.json();
      // console.log(data);
      if (data.length > 0) {
        localStorage.setItem("login", JSON.stringify(data));
        this.props.onSubmit();
        this.props.history.push("/list");
        this.setState({
          ...initialState,
        });
        toast("User Login Successfully!", {
          type: "success",
        });
      } else {
        toast("Wrong password or user name", {
          type: "error",
        });
        this.setState({
          ...initialState,
        });
      }
    } catch (error) {
      toast("Opps there is an error", {
        type: "error",
      });
    }
  };

  onHandleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    // console.log(this.props);
    return (
      <div>
        <h1>Login User</h1>
        <br />
        <div className="container">
          <div className="col-md-12">
            <form onSubmit={this.Login}>
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <div className="form-group">
                    <input
                      type="text"
                      onChange={this.onHandleChange}
                      name="name"
                      value={this.state.name}
                      placeholder="Add User Name"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      onChange={this.onHandleChange}
                      placeholder="Passoword"
                      value={this.state.password}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <Button type="submit" variant="outline-success">
                    Add Resturant
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Login);
