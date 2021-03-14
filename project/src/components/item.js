import React, { Component } from "react";
import ItemDataService from '../services/itemService'
export default class item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: {
        key: null,
        title: "",
        description: "",
      },
      message :''

    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.updateItem = this.updateItem.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    console.log("Receiving new props...");
  }
  componentDidUpdate() {
    console.log("Component re-rendered.");
  }
  
  componentDidMount() {
    this.setState({
      currentItem: this.props.selected,
    });
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("prevState: ", prevState);
    console.log("nextProps: ", nextProps);
    const { selected } = nextProps;
    if (prevState.currentItem.key !== selected.key) {
      return {
        currentItem: selected,
      };
    }
    
    return prevState.currentItem;
  }
  
  handleOnChange(e) {
    this.setState((state) => ({
      currentItem: {
        ...state.currentItem,
        [e.target.name]: e.target.value,
      },
    }));
  }
  
  updateItem() {
    const data = {
      title: this.state.currentItem.title,
      description: this.state.currentItem.description,
    };
    
    ItemDataService.update(this.state.currentItem.key, data)
    .then(() => {
      this.setState({
        currentItem: {
          key: null,
          title: "",
          description: "",
        },
        message : 'Item was updated successfully !'
      });
    })
    .catch((e) => {
      console.log(e);
    });
  }
  
  render() {
    // console.log('currentItem: ',currentItem)
    return (
      <div className="edit-form">
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={this.state.currentItem.title}
              name="title"
              onChange={this.handleOnChange}
              />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={this.state.currentItem.description}
              name="description"
              onChange={this.handleOnChange}
              />
          </div>
        </form>

        <button
          className="badge badge-danger mr-2"
          >
          Delete
        </button>

        <button
          type="submit"
          className="badge badge-success"
          onClick={this.updateItem}
          >
          Update
        </button>
        <p>{this.state.message}</p>
      </div>
    );
  }
}


  // shouldComponentUpdate(nextProps, prevState) {
  //   console.log('Should I update?');
  //   // Change code below this line
  //   console.log('prevState: ',prevState)
  //   console.log('nextProps: ',nextProps)
  //   // Change code above this line
  //   if (prevState.currentItem.key !== nextProps.selected.key) {
  //     this.setState({
  //       currentItem: nextProps.selected
  //     })
  //     return true
  //   }
  //   else{

  //     return false
  //     }
  // }
  