import React, { useEffect, useState, Component } from 'react'
import config from './config.js'

const firebase = require('firebase')

class CreateList extends Component {
    constructor(){
        super();
        this.state = {
            listName: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        }
    }
    componentDidUpdate(prevProps, prevState, snapshoyt){
        //only call set state here if it is wrapped in a condition
        //if you initialize this.state.shouldUpdate and have not changed it yet then this will not run
        if(this.state.shouldUpdate != prevState.shouldUpdate){
            firebase.initializeApp(config)
            this.setState({
                listName: this.state.listName
            })
        }
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit(e){
        e.preventDefault();
        const idRef = firebase.database().ref('listNames')
        console.log("Created list: " + this.state.listName)
        const id = {
            name: this.state.listName
        }
        idRef.push(id)
        this.setState({
            listName: ''
        })
    }
    
    render() {
    return(
        <div className="add_list">
            <h1>Add a New Movie</h1>
            <div className="add-list-body">
                <div classname="addEntry">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Please enter name of the list you would like to create: </h3>
                        <input 
                            type="text" 
                            name="listName"
                            value={this.state.listName}
                            required 
                            placeholder="list name" 
                            onChange={this.handleChange}
                        />
                        <button>Create List</button>
                    </form>
                </div>
            </div>
        </div>
    );
    }
}
export default CreateList;