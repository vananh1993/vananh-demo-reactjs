
import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
var update = require('immutability-helper');

const categories =  [
      {
          "name": "To do 1",
          "description": "Mô tả thông tin",
          "checked" : false
      },
      {
          "name": "To do 2",
          "description": "Mô tả thông tin",
          "checked" : false
      },
      {
          "name": "To do 3",
          "description": "Mô tả thông tin",
          "checked" : false
      },
      {
          "name": "To do 4",
          "description": "Mô tả thông tin",
          "checked" : false
      },
      {
          "name": "To do 5",
          "description": "Mô tả thông tin",
          "checked" : false
      },
      {
          "name": "To do 6",
          "description": "Mô tả thông tin",
          "checked" : false
      },
      {
          "name": "To do 7",
          "description": "Mô tả thông tin"
      },
      {
          "name": "To do 8",
          "description": "Mô tả thông tin"
      }
  ];
const Header = () => (<h1 className='text-white bg-primary p-3'>Vân Anh To Do App</h1>);

const ListItem = (props) => {
  // console.log(props);
  return (<div className='list-item text-left'>
        <div className='row'>
            <div className='col-md-7'>
                <p>
                  <span>{props.title}</span> <br/>
                  <span>{props.description}</span>
                </p>
            </div>
            <div className='col-md-5'>
                <button className='btn btn-danger' onClick={() => props.onDelete()}>Delete</button> &nbsp; &nbsp;  &nbsp;
                <button className='btn btn-info'  onClick={() => props.onDone()}>Done</button>
            </div>
        </div>
  </div>)
};

class Form extends Component  {
    constructor(props) {
      super(props);
      this.state = {
          name: "",
          description: ""
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
      // console.log(event.target.name);
      // console.log(event.target.value);
      // this.setState({
      //   name: event.target.name,
      // })
      const name = event.target.name;
      const value = event.target.value;
      const obj = {};
      obj[name] = value;
      this.setState(obj)
    }

    handleSubmit(event) {
        // alert('Your favorite flavor is: ' + this.state.name);
        // console.log(this.state.name);
        this.props.onSubmit({
          name: this.state.name,
          description: this.state.description
        })
        event.preventDefault();

    }

    render() {
      return (
          <div className='col-sm-6 mx-auto py-4'>
            <h1>Form</h1>
            <form onSubmit={this.handleSubmit}>
              <input className='form-control' placeholder="Nhập tiêu đề" name="name" onChange={this.handleChange}/><br/>
              <input className='form-control' placeholder="Nhập mô tả" name="description" onChange={this.handleChange}/><br/>
              <button className='btn btn-primary'  type="submit">Save</button>
            </form>
          </div>
      )
    }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories : categories
    };
  }
    HandleDelete(index) {

      // console.log(this.state);
       const arCategories = [...this.state.categories];
       arCategories.splice(index,1);
        this.setState({
          categories: arCategories
        });
    }
    handleSubmit(formData) {
      console.log(formData);
      const arCategories = [...this.state.categories];
      arCategories.push(formData);
      this.setState({
        categories: arCategories
      })
    }
    handleDone(index) {
      this.setState({
          categories: update(this.state.categories, {[index] : { checked : {$set: true}}})
      })
    }
    render() {
      const { categories } = this.state;
      return (
        <div className="App container vh-100 gradient-custom-2 ">
            <div className='container py-5 h-100'>
              <Header/>
              <Form
                  onSubmit={this.handleSubmit.bind(this)}
               />
               <div className='col-sm-6 mx-auto py-4'>
                   {categories.map((cate,index) => (
                     <div key={index} className={ cate.checked ? "checked" : "uncheck"}>
                         <ListItem

                           title={cate.name}
                           description={cate.description}
                           onDelete={() => this.HandleDelete(index)}
                           onDone={() => this.handleDone(index)}
                         />
                     </div>
                   ))}
               </div>
                 <br/>
              </div>
        </div>
      )
  }
}
