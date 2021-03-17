import React, { Component } from "react";
import ItemDataService from "../services/itemService";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";

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
      showModal: false,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

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

  showModal() {
    this.setState({
      showModal: true,
    });
  }

  hideModal() {
    this.setState({
      showModal: false,
    });
  }

  render() {
    const {
      title: titleCopy,
      description: descriptionCopy,
      quantity: quantityCopy,
    } = this.state.currentItemCopy;
    const { title, description, quantity } = this.state.currentItem;
    const anyChange = !(
      titleCopy !== title ||
      description !== descriptionCopy ||
      quantity !== quantityCopy
    );
    let style = { pointerEvents: "none" }
    if(!anyChange){
      style={}
    }

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

        <Button variant="danger" onClick={this.showModal} size="sm">
          Delete
        </Button>

        <Modal
          show={this.state.showModal}
          onHide={this.hideModal}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this item ?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideModal}>
              Close
            </Button>
            <Button variant="primary" onClick={this.deleteItem}>
              Delete Item
            </Button>
          </Modal.Footer>
        </Modal>
        <OverlayTrigger
          placement="right-end"
          overlay={<Tooltip id="tooltip-disabled">
          enabled only when there are changes !
        </Tooltip>}
          trigger  = {['hover' ,'click']}
        >
          <span className="d-inline-block">
            <Button
              type="submit"
              variant="success"
              size="sm"
              disabled={anyChange}
              style={style}
              onClick={this.updateItem}
            >
              Update
            </Button>
          </span>
        </OverlayTrigger>

        <p>{this.state.message}</p>
      </div>
    );
  }
}
