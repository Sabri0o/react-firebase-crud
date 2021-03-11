import React, { Component } from "react";
import itemDataService from "../services/itemService";

export default class addItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      quantity: "",
      published: false,
      submitted: false,
    };
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.newItem = this.newItem.bind(this);
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeQuantity(e) {
    this.setState({
      quantity: e.target.value,
    });
  }

  saveItem(e) {
    e.preventDefault();
    let data = {
      title: this.state.title,
      description: this.state.description,
      quantity: this.state.quantity,
      published: false,
    };

    itemDataService
      .create(data)
      .then(() => {
        console.log("Created new item successfully!");
        this.setState({
          submitted: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newItem() {
    this.setState({
      title: "",
      description: "",
      published: false,
      quantity: "",
      submitted: false,
    });
  }

  render() {
    return (
      <div>
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newItem}>
              Add new item
            </button>
          </div>
        ) : (
          <div>
            <form onSubmit={this.saveItem}>
              <div className="form-group">
                <label htmlFor="title">Item Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                  name="title"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Item Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  name="description"
                />
              </div>

              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  required
                  value={this.state.quantity}
                  onChange={this.onChangeQuantity}
                  name="quantity"
                  min="0"
                  max="999"
                />
              </div>

              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}
