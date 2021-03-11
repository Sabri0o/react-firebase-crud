import React, { Component } from "react";
import ItemDataService from "../services/itemService";

export default class itemList extends Component {
  constructor(props) {
    super(props);    

    this.state = {
        items: [],
    };

    this.onDataChange = this.onDataChange.bind(this);
  }

//   componentDidMount() {
//     ItemDataService.getAll()
//   }

  onDataChange(list) {
    let items = [];

    list.forEach((item) => {
      let key = item.key;
      let data = item.val();
      items.push({
        key: key,
        title: data.title,
        description: data.description,
        quantity: data.quantity,
        published: data.published,
      });
    });

    this.setState({
      items: items,
    });
  }
  render() {
      console.log('data from firebase: ',ItemDataService.getAll())

    return <div></div>;
  }
}
