import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { v4 as uuidv1 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export default class ResturantUpdate extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      name: null,
      rating: null,
      address: null,
      email: null,
      files: [],
    };
  }

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
      });
    };
  };

  componentDidMount() {
    fetch(
      "http://localhost:3004/resturants/" + this.props.match.params.id
    ).then((response) => {
      response
        .json()
        .then((res) => {
          console.log(res);
          this.setState({
            id: res.id,
            name: res.name,
            rating: res.rating,
            email: res.email,
            address: res.address,
            files: res.files,
          });
        })
        .catch((err) => {
          console.log("this is error", err.msg);
        });
    });
  }

  handleNameChange = (evt) => {
    // console.log(evt.target.name);
    // console.log(evt.target.value);
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  update = (e) => {
    e.preventDefault();
    fetch("http://localhost:3004/resturants/" + this.state.id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: this.state.id,
        name: this.state.name,
        email: this.state.email,
        rating: this.state.rating,
        address: this.state.address,
        files: this.state.files,
        list: this.state.list,
      }),
    }).then((response) => {
      response.json().then((res) => {
        toast(" Resturant Updated Successfully!", {
          type: "success",
        });
        this.props.history.push("/list");
      });
    });
  };

  deletehandle(id) {
    // console.log(this.state.files.id);
    const data = this.state.files.filter((item, index) => item.id === id);
    // console.log(data);
    this.setState({
      files: data,
    });
    toast("Image Deleted Successfully!", {
      type: "success",
    });
  }
  render() {
    return (
      <React.Fragment>
        <div>
          <h1>Update Resturant</h1>
          <form onSubmit={this.update}>
            <div className="container">
              <div className="col-md-12">
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
                        name="email"
                        value={this.state.email}
                        placeholder="Add Resturant Email..."
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
                        onChange={this.handleNameChange}
                        type="text"
                        name="rating"
                        value={this.state.rating}
                        placeholder="Add Resturant rating..."
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
                        onChange={this.handleNameChange}
                        type="text"
                        name="address"
                        value={this.state.address}
                        placeholder="Add Resturant address..."
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
                      Update Resturant
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {this.state.files.map((pic, index) => {
                  return (
                    <div className="col-md-3">
                      <img
                        src={pic.src}
                        className="img-thumbnail"
                        style={{
                          width: "100%",
                        }}
                        key={index}
                      />
                      <button
                        onClick={() => {
                          // console.log("this is id", this.props.match.params.id);
                          this.deletehandle(this.props.match.params.id);
                        }}
                        className="btn btn-danger btn-block"
                        role="button"
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
