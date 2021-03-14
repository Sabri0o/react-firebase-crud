
import React, { Component } from "react";
export default class item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem : {
        key:null,
        title: "",
        description: "",
      },
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
  componentWillReceiveProps(nextProps) {
    console.log('Receiving new props...');
  }
  componentDidUpdate() {
    console.log('Component re-rendered.');
  }
  
  componentDidMount() {
    console.log('hfhfhf')
    this.setState({
      currentItem: this.props.selected,
    });
  }
  
  
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('prevState: ',prevState)
    console.log('nextProps: ',nextProps)
    const { selected } = nextProps;
    if (prevState.currentItem.key !== selected.key) {
      return {
        currentItem: selected
      };
    }

    return prevState.currentItem;
  }

 
  render() {
    const currentItem = this.state.currentItem
    console.log(currentItem)
    return (
        <div className="edit-form">
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={currentItem.title}
              name='title'
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={currentItem.description}
              name='description'

            />
          </div>
        </form>
        </div>
    );
  }
}

