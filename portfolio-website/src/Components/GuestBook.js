import React, { useEffect, useState, Component } from 'react'
import config from './config.js'
const firebase = require('firebase')

class GuestBook extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            description: "",
            message: "",
            email: '',
            viewable: true,
            entries: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        }
        let listRef = firebase.database().ref('data')
        listRef.on('value', snapshot => {
            const data = snapshot.val()
            let newState = []
            for(let entry in data){
                newState.push({
                    id: entry,
                    name: data[entry].name,
                    description: data[entry].description,
                    message: data[entry].message,
                    email: data[entry].email,
                    viewable: data[entry].viewable
                })
            }            
            this.setState({
                entries: newState
            })
        })
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit(e){
        e.preventDefault();
        const idRef = firebase.database().ref('data')
        const id = {
            name: this.state.name,
            description: this.state.description,
            message: this.state.message,
            email: this.state.email,
            viewable: this.state.viewable
        }
        idRef.push(id)
        this.setState({
            name: "",
            description: "",
            message: "",
            email: '',
            viewable: true
        })
    }
    
    render(){
        return(
            <div className="guest-book">
                <h1>Guest Book</h1>
                <div className="guest-book-body">
                    <form classname="addEntry" onSubmit={this.handleSubmit}>
                        <div className="name">
                            <h3>Enter your name: </h3>
                            <input 
                                type="text" 
                                name="name"
                                value={this.state.name}
                                required 
                                minLength="6"
                                maxLength="19"
                                placeholder="6-19 characters" 
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="description">
                            <h3>Add a short description of yourself (optional): </h3>
                            <input 
                                type="text" 
                                name="description" 
                                value={this.state.description}
                                maxLength="99"
                                placeholder="< 100 characters" 
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="message">
                            <h3>Add a short message: </h3>
                            <input 
                                type="text" 
                                name="message" 
                                required 
                                value={this.state.message}
                                minLength="16"
                                maxLength="4999"
                                placeholder="16-4999 characters" 
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <h3>Would you like your name and message to be viewable to others?</h3>
                            <div className="checkbox">
                                <div>
                                    <label for="yesBox">Yes</label>
                                    <input type="checkbox" name="yesBox" value={true}/>
                                </div>
                                <div>
                                    <label for="noBox">No</label>
                                    <input type="checkbox" name="noBox" value={false}/>
                                </div>
                            </div>
                        </div>
                        <div className="email">
                            <h3>Your email (optional): </h3>
                            <input 
                                type="text" 
                                name="email" 
                                value={this.state.email}
                                placeholder="i.e. janedoe@gmail.com" 
                                onChange={this.handleChange}
                            />
                        </div>
                        <button>Add Entry</button>
                    </form>
                    <div className="displayed-messages">
                        <h2>Messages:</h2>
                        <div className="message-box">
                            {this.state.entries.map((item) => (
                                <div className="message" key={item.id}>
                                    {this.state.viewable == true ? (
                                        <div>
                                            <div>
                                                User: {item.name}
                                            </div>
                                            <div>
                                                Description: {item.description}
                                            </div>
                                            <div>
                                                Message: {item.message}
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            Message: {item.message}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )}
}
export default GuestBook;