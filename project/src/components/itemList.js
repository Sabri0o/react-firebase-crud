import React, { Component } from "react";
import ItemDataService from "../services/itemService";
import Item from "./item";
export default class itemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      selectedItemKey: null,
    };

    this.selectedItem = this.selectedItem.bind(this);
    // this.refreshList = this.refreshList.bind(this);
    this.onDataChange = this.onDataChange.bind(this);
  }

  // componentDidMount() {
  //   const list = [];
  //   ItemDataService.getAll().on("value", (snapshot) => {
  //     const data = snapshot.val();
  //     for (var key in data) {
  //       let item = data[key];
  //       if (data) {
  //         list.push({
  //           key: key,
  //           title: item.title,
  //           description: item.description,
  //           quantity: item.quantity,
  //           published: item.published,
  //         });
  //         this.setState({
  //           items: list,
  //         });
  //       }
  //     }
  //   });
  // }

  componentDidMount() {
    ItemDataService.getAll().on("value", this.onDataChange);
  }

  // componentWillUnmount() {
  //   console.log('unmounted')
  //   ItemDataService.getAll().off("value", this.onDataChange);
  // }

  onDataChange(items) {
    let list = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();
      list.push({
        key: key,
        title: data.title,
        description: data.description,
        quantity: data.quantity,
      });
    });

    this.setState({
      items: list,
    });
  }

  

  selectedItem(item) {
    console.log('selected',item)
    this.setState({
      selectedItemKey: item,
    });
  }

  // refreshList() {
  //   this.setState({
  //     selectedItemKey: null,
  //   });
  // }

  render() {
    // console.log("items: ", this.state.items);
    const items = this.state.items;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Items List</h4>

          <ul className="list-group">
            {items.map((item, index) => (
              <li
                className="list-group-item "
                key={index}
                onClick={() => this.selectedItem(item)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h4>Item information</h4>
          {this.state.selectedItemKey ? (
            <Item
              selected={this.state.selectedItemKey}
              // refresher={this.state.refreshList}
            />
          ) : (
            <div>
              <br />
              <p>Please click on an Item...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
