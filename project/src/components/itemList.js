import React, { Component } from "react";
import ItemDataService from "../services/itemService";
import Item from "./item"
export default class itemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      selectedItemKey : ''
    };

    this.selectedItem = this.selectedItem.bind(this)
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

  selectedItem(item){
    console.log(item)
    this.setState({
      selectedItemKey : item
    })
  }

  render() {
    // console.log("items: ", this.state.items);
    const items = this.state.items;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Items List</h4>

          <ul className="list-group">
            {items.map((item, index) => (
              <li className="list-group-item " key={index} onClick={()=>this.selectedItem(item)}>
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h4>Item information</h4>
          <Item selected={this.state.selectedItemKey}/>
        </div>
      </div>
    );
  }
}
