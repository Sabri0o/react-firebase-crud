import React, { Component } from "react";
import ItemDataService from "../services/itemService";

export default class itemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    const list = [];
    ItemDataService.getAll().on("value", (snapshot) => {
      const data = snapshot.val();
      for (var key in data) {
        let item = data[key];
        if (data) {
          list.push({
            key: key,
            title: item.title,
            description: item.description,
            quantity: item.quantity,
            published: item.published,
          });
          this.setState({
            items: list,
          });
        }
      }
    });
  }

  render() {
    console.log("items: ", this.state.items);
    const items = this.state.items;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Items List</h4>

          <ul className="list-group">
            {items &&
              items.map((item, index) => (
                <li
                  className="list-group-item "
                  key={index}
                >
                  {item.title}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h4>Item information</h4>
        </div>
      </div>
    );
  }
}
