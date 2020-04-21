import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

class Logout extends Component {
  render() {
    localStorage.clear();
    this.props.onClick();
    toast("User Logout Successfully!", {
      type: "success",
    });
    return (
      <div>
        <Redirect to="/login" />
      </div>
    );
  }
}

export default Logout;
