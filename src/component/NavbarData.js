import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faList,
  faSearch,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
export default class NavbarData extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand>Resto</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link>
                  <Link exact to="/">
                    <FontAwesomeIcon icon={faHome} className="mx-1" />
                    Home
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/create">
                    <FontAwesomeIcon icon={faPlus} className="mx-1" />
                    Create
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/search" className="mx-1">
                    <FontAwesomeIcon icon={faSearch} className="mx-1" />
                    Search
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/list" className="mx-1">
                    <FontAwesomeIcon icon={faList} className="mx-1" />
                    List
                  </Link>
                </Nav.Link>
                {this.props.isLogin ? (
                  <Nav.Link>
                    <Link to="/logout" className="mx-1">
                      <FontAwesomeIcon icon={faUser} className="mx-1" />
                      {this.props.onClick}
                      Logout
                    </Link>
                  </Nav.Link>
                ) : (
                  <Nav.Link>
                    <Link to="/login" className="mx-1">
                      <FontAwesomeIcon icon={faUser} className="mx-1" />
                      Login
                    </Link>
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </React.Fragment>
    );
  }
}
