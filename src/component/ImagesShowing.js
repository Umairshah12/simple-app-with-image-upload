import React, { Component } from "react";

class ImagesShowing extends Component {
  render() {
    const { props } = this;
    let fileData;
    return this.props.list.length > 0
      ? (fileData = (
          <div className="container">
            <div className="col-md-12">
              <div className="row">
                {this.props.list.map(function (imgSrc, index) {
                  // console.log(index);
                  return (
                    <div className="col-md-3">
                      <div key={index}>
                        <img
                          src={imgSrc}
                          alt="description of image"
                          className="img-thumbnail"
                          style={{
                            width: "100%",
                          }}
                        />
                        <button
                          className="btn btn-danger btn-block"
                          role="button"
                          onClick={() => {
                            props.delete(index);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))
      : (fileData = (
          <div className="text-center">
            <p>there are no posts to show</p>
          </div>
        ));
  }
}
const column = {
  flex: "33.33%",
  padding: "5px",
};
const row = {
  display: "flex",
};
export default ImagesShowing;
