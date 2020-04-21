import React, { Component } from "react";
import { Table } from "react-bootstrap";
// import { ProductContext } from "./context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image from "./img/download.png";

toast.configure();
export default class ResturantSearch extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      SearchData: "",
      noData: false,
      lastSearch: "",
    };
  }

  search(key) {
    this.setState({ lastSearch: key });
    // console.log(key);
    fetch("http://localhost:3004/resturants?q=" + key).then((response) => {
      response.json().then((res) => {
        console.log(res);
        if (res.length > 0) {
          this.setState({ SearchData: res, noData: false });
        } else {
          this.setState({ noData: true, SearchData: null });
        }
      });
    });
  }

  delete(id) {
    // console.log("deleted");

    const data = this.state.list.filter((item) => item.id !== id);
    this.setState({
      list: data,
    });
    fetch("http://localhost:3004/resturants/" + id, {
      method: "DELETE",
    }).then((response) => {
      response.json().then((res) => {
        this.search(this.state.lastSearch);
        toast(" Resturant Deleted Successfully!", {
          type: "success",
        });
      });
    });
  }
  render() {
    return (
      <React.Fragment>
        <h1>Resturant search</h1>
        <div className="container">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <div className="form-group">
                  <input
                    onChange={(event) => {
                      this.search(event.target.value);
                    }}
                    type="text"
                    placeholder="Search Resturant ..."
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          {this.state.SearchData ? (
            <div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Rating</th>
                    <th>Address</th>
                    <th>images</th>
                    <th>Operation</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.SearchData.map((item) => (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.rating}</td>
                      <td>{item.address}</td>
                      <td>
                        {item.files.map((pic, indx) => {
                          return (
                            <img
                              style={{ width: "40px", height: "50px" }}
                              key={indx}
                              src={pic.src}
                            />
                          );
                        })}
                        {!item.files.length && (
                          <img
                            style={{ width: "40px", height: "50px" }}
                            src={image}
                          />
                        )}
                      </td>
                      <td>
                        <Link to={"/update/" + item.id}>
                          <FontAwesomeIcon icon={faEdit} className="mx-1" />
                        </Link>
                        <span
                          onClick={() => {
                            this.delete(item.id);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} color="red" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            ""
          )}
          {this.state.noData ? <h3>No data found</h3> : null}
        </div>
      </React.Fragment>
    );
  }
}
