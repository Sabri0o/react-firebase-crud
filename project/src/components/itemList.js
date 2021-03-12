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
    console.log('items: ',this.state.items)
    return <div></div>;
  }
}
