import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { v4 as uuidv1 } from "uuid";
import ImagesShowing from "./ImagesShowing";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const initialState = {
  list: [],
  name: "",
  rating: "",
  address: "",
  email: "",
  files: [],
  nameError: "",
  ratingError: "",
  addressError: "",
  emailError: "",
};
export default class ResturantCreate extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  // <-----------------------start------------------->
  // multiple files selection
  // fileSelectorHandler = (event) => {
  //   let files = Array.from(event.target.files);
  //   // console.log(files);

  //   files.forEach((file) => {
  //     let reader = new FileReader();
  //     reader.onload = (event) => {
  //       this.setState({
  //         files: [...this.state.files, file],
  //         list: [...this.state.list, reader.result],
  //       });
  //     };
  //     console.log(file);
  //     reader.readAsDataURL(file);
  //   });
  // };
  // <-------------------------end------------------>

  onDelete = (index) => {
    const res = this.state.list.filter((item, indx) => indx !== index);
    this.setState({
      list: res,
    });
  };

  // <---------------------start-------------------->
  // single file selecton
  fileSelectorHandler = (event) => {
    // console.log(event.target.files[0]);
    // this.setState = {
    //   file: event.target.files[0],
    // };
    const file = this.refs.uploadImg.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      this.setState({
        files: [
          {
            id: uuidv1(),
            src: reader.result,
          },
        ],

        list: [...this.state.list, reader.result],
      });
    };
  };
  // <---------------------end----------------------->

  // <---------------------start------------------->
  // onsubmit form
  handleSubmit = (e) => {
    // console.log(event);
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      // console.log(data);
      fetch("http://localhost:3004/resturants", {
        method: "POST",
        body: JSON.stringify({
          name: this.state.name,
          rating: this.state.rating,
          email: this.state.email,
          address: this.state.address,
          files: this.state.files,
          list: this.state.list,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => {
          // console.log(res.data);
          toast("New Resturant Updated Successfully!", {
            type: "success",
          });

          this.setState((prevState) => ({
            ...initialState,
            list: prevState.list,
          }));

          this.props.history.push("/list");
        })
        .catch((err) => {
          toast("OOPs there is some error!", {
            type: "error",
          });
        });
    }
  };
  // <---------------------end------------------->

  validate = () => {
    let nameError = "";
    let ratingError = "";
    let addressError = "";
    let emailError = "";

    if (!this.state.email.includes("@")) {
      emailError = "Email field cannot be null";
    }
    if (!this.state.name) {
      nameError = "Name field cannot be null!";
    }
    if (!this.state.address) {
      addressError = "Address field cannot be null!";
    }

    if (!this.state.rating) {
      ratingError = "Rating field cannot be null!";
    }

    if (emailError || nameError || addressError || ratingError) {
      this.setState({ emailError, nameError, addressError, ratingError });
      return false;
    }
    return true;
  };

  // <-----------start----------->
  // changing vlaues during selection
  handleNameChange = (evt) => {
    // console.log(evt.target.name);
    // console.log(evt.target.value);
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };
  // <-----------end----------->

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>create react app</h1>
        <div className="container">
          <div className="col-md-12">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <div className="form-group">
                    <input
                      onChange={this.handleNameChange}
                      type="text"
                      name="name"
                      value={this.state.name}
                      placeholder="Add Resturant Name..."
                      className="form-control"
                    />
                    <span
                      style={{
                        color: "red",
                        fontSize: "16px",
                        float: "left",
                      }}
                    >
                      {this.state.nameError}
                    </span>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <div className="form-group">
                    <input
                      onChange={this.handleNameChange}
                      type="email"
                      name="email"
                      value={this.state.email}
                      placeholder="Add Resturant Email..."
                      className="form-control"
                    />
                    <span
                      style={{ color: "red", fontSize: "16px", float: "left" }}
                    >
                      {this.state.emailError}
                    </span>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <div className="form-group">
                    <input
                      onChange={this.handleNameChange}
                      type="text"
                      value={this.state.rating}
                      name="rating"
                      placeholder="Add Resturant rating..."
                      className="form-control"
                    />
                    <span
                      style={{ color: "red", fontSize: "16px", float: "left" }}
                    >
                      {this.state.ratingError}
                    </span>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <div className="form-group">
                    <input
                      onChange={this.handleNameChange}
                      type="text"
                      name="address"
                      value={this.state.address}
                      placeholder="Add Resturant address..."
                      className="form-control"
                    />
                    <span
                      style={{ color: "red", fontSize: "16px", float: "left" }}
                    >
                      {this.state.addressError}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <div className="form-group">
                    <input
                      onChange={this.fileSelectorHandler}
                      type="file"
                      ref="uploadImg"
                      name="selectedFile"
                      className="form-control"

                      // key={this.state.file}
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
            <br />
          </div>
        </div>
        <ImagesShowing list={this.state.list} delete={this.onDelete} />
      </div>
    );
  }
}
