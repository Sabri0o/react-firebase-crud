import React, { Component } from "react";
import ItemDataService from "../services/itemService";
import ReactTooltip from "react-tooltip";
import { Button,Modal } from 'react-bootstrap';
 
export default class item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: {
        key: null,
        title: "",
        description: "",
        quantity: "",
      },
      currentItemCopy: {
        title: "",
        description: "",
        quantity: "",
      },
      message: "",
      showModal:false
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);

    

  }

  // componentWillReceiveProps(nextProps) {
  //   console.log("Receiving new props...");
  // }
  // componentDidUpdate() {
  //   console.log("Component re-rendered.");
  // }

  // componentDidMount() {
  //       this.setState({
  //     currentItem: this.props.selected,
  //     currentItemCopy: this.props.selected,
  //   });
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log("prevState: ", prevState);
    // console.log("nextProps: ", nextProps);
    const { selected } = nextProps;
    if (prevState.currentItem.key !== selected.key) {
      return {
        currentItem: selected,
        currentItemCopy: selected,
        message: "",
      };
    }
    return prevState.currentItem;
  }

  handleOnChange(e) {
    this.setState((state) => ({
      currentItem: {
        ...state.currentItem,
        [e.target.name]: e.target.value,
        // anyChange : anyChangeBool
      },
    }));
  }

  updateItem() {
    const data = {
      title: this.state.currentItem.title,
      description: this.state.currentItem.description,
      quantity: this.state.currentItem.quantity,
    };

    ItemDataService.update(this.state.currentItem.key, data)
      .then(() => {
        this.setState((state) => ({
          currentItemCopy: {
            title: state.currentItem.title,
            description: state.currentItem.description,
            quantity: state.currentItem.quantity,
          },
          message: "Item was updated successfully !",
          anyChange: false,
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteItem() {
    ItemDataService.delete(this.state.currentItem.key)
      .then(() => {
        this.props.refresher();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  showModal(){
    this.setState({
      showModal: true
    })
  }

  hideModal(){
    this.setState({
      showModal: false
    })
  }

  render() {
    // console.log('anyChange',this.state.anyChange)
    const {
      title: titleCopy,
      description: descriptionCopy,
      quantity: quantityCopy,
    } = this.state.currentItemCopy;
    const { title, description, quantity } = this.state.currentItem;
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
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              value={this.state.currentItem.quantity}
              onChange={this.handleOnChange}
              name="quantity"
              min="0"
              max="999"
            />
          </div>
        </form>

        <button
          className="badge badge-danger mr-2"
          onClick={this.deleteItem}
        >
          Delete
        </button>
        <span
          data-tip="enabled only when there are changes !"
          data-place="right"
          data-effect="solid"
          data-type="info"
        >

<Button variant="danger" onClick={this.showModal}>
        Delete
      </Button>

      <Modal show={this.state.showModal} onHide={this.hideModal} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.hideModal}>
            Close
          </Button>
          <Button variant="primary" onClick={this.deleteItem}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Button variant="success">Update</Button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={this.updateItem}
            disabled={
              !(
                titleCopy !== title ||
                description !== descriptionCopy ||
                quantity !== quantityCopy
              )
            }
          >
            Update
          </button>
        </span>
        <p>{this.state.message}</p>
        <ReactTooltip offset={{ top: 15, right: 10 }} />
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
