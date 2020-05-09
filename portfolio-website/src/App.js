import React, { Component } from 'react'
import './App.css'
import TabList from './Components/TabList'
import Body from './Components/Body'

export class App extends Component {
  constructor(){
    super();
    this.state = {
      activeTab: 1
    }
    this.changeTab = (id) => {
      this.setState({
        activeTab: id
      })
    }
  }
  render() {
    const tabs = [
      {
        id: 1,
        title: 'Home'
      },
      {
        id: 2,
        title: 'Travels'
      },
      {
        id: 3,
        title: 'Stress Relief'
      },
      {
        id: 4,
        title: 'Extra'
      },
      {
        id: 5,
        title: 'Guest Book'
      }
    ]
    return (
      <div className="app">
        <div className="nav-bar">
          <TabList tabs={tabs} 
          changeTab={this.changeTab}
          activeTab={this.state.activeTab}/>
        </div>
        <div className="main-body">
          <Body activeTab={this.state.activeTab}/>
        </div>
      </div> 
    )
  }
}

export default App;
