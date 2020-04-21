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

export default class ResturantList extends Component {
  constructor() {
    super();
    this.state = {
      list: null,
    };
  }

  componentDidMount() {
    fetch("http://localhost:3004/resturants").then((response) => {
      response.json().then((res) => {
        // console.log(res);
        this.setState({ list: res });
      });
    });
  }

  delete(id) {
    // console.log("deleted");
    const data = this.state.list.filter((item) => item.id !== id);
    // console.log(data);
    this.setState({
      list: data,
    });

    fetch("http://localhost:3004/resturants/" + id, {
      method: "DELETE",
    }).then((response) => {
      response.json().then((res) => {
        toast(" Resturant Deleted Successfully!", {
          type: "success",
        });
      });
    });
  }
  render() {
    // console.log(this.state.img);
    return (
      <div>
        <h1>Resturent List</h1>
        {this.state.list ? (
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
                {this.state.list.map((item, index) => {
                  // console.log(this.state.img);

                  return (
                    <tr>
                      <td key={index}>{item.id}</td>
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
                  );
                })}
              </tbody>
            </Table>
          </div>
        ) : (
          <p>loading please wait....</p>
        )}
      </div>
    );
  }
}
