import React, { useEffect, useState } from 'react'
import config from './config.js'
const firebase = require('firebase')

function GuestBook() {
    
    // const [h, setData]  = useState([])
    const [shouldRender, setShouldRender] = useState(true)
    // const sample = ["hi", "hello", "how are you "]
    const [data, setData] = useState([])
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [message, setMessage] = useState()
    const [email, setEmail] = useState()
    var success = ""
    
    function createNewGuest(e){
        e.preventDefault()
        const value = [{
            user: name,
            description: description,
            message: message,
            email: email
        }]
        setData(value)
        firebase.database().ref('data').push().set(value)
        success = "Message successfully sent"
    }

    useEffect(() => {
        if (!firebase.apps.length) {
            firebase.initializeApp(config)
         }
         //get a reference to the database
        let ref = firebase.database().ref('data')

        //retrieve its data
        ref.on('value', snapshot => {
            //this is your call back function
                //state will be a JSON object after this
            //set your apps state to contain this data however you like
            const state = snapshot.val()
            const newState = []
            for(let item in state){
                newState.push({
                    id: item,
                    user: state[item].user,
                    description: state[item].description,
                    message: state[item].message
                })
            }
            //since i use react 16, i set my state like this
            //i have previously declared a state variable like this: const [data, setData] = useState([]) so that I can make the below call
            setData(newState)
        })
    }, [shouldRender, setData])
    return(
        <div className="guest-book">
            <h1>Guest Book</h1>
            <div className="guest-book-body">
                <div classname="addEntry">
                    <div className="name">
                        <h3>Enter your name: </h3>
                        <input 
                            type="text" 
                            name="userName"
                            value={name}
                            required 
                            minLength="6"
                            maxLength="19"
                            placeholder="6-19 characters" 
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="description">
                        <h3>Add a short description of yourself (optional): </h3>
                        <input 
                            type="text" 
                            name="description" 
                            value={description}
                            maxLength="99"
                            placeholder="< 100 characters" 
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="message">
                        <h3>Add a short message: </h3>
                        <input 
                            type="text" 
                            name="message" 
                            required 
                            value={message}
                            minLength="16"
                            maxLength="4999"
                            placeholder="16-4999 characters" 
                            onChange={e => setMessage(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3>Would you like your name and message to be viewable to others?</h3>
                        <div className="checkbox">
                            <div>
                                <label for="yesBox">Yes</label>
                                <input type="checkbox" required name="yesBox" value="Yes"/>
                            </div>
                            <div>
                                <label for="noBox">No</label>
                                <input type="checkbox" required name="noBox" value="No"/>
                            </div>
                        </div>
                    </div>
                    <div className="email">
                        <h3>Your email (optional): </h3>
                        <input 
                            type="text" 
                            name="email" 
                            value={email}
                            placeholder="i.e. janedoe@gmail.com" 
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <button onClick={createNewGuest}>Add Entry</button>
                    <div>{success}</div>
                </div>
                <div className="displayed-messages">
                    <h2>Messages:</h2>
                    <div className="message-box">
                        {data.map((item) => (
                            <div className="message">
                                <div>
                                    User: {item.id}
                                </div>
                                <div>
                                    Description: {item.description}
                                </div>
                                <div>
                                    Message: {item.message}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default GuestBook;