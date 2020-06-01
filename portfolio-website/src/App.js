import React, { Component } from 'react'
import './App.css'
import TabList from './Components/TabList'
import Body from './Components/Body'
import SimpleReactLightbox from 'simple-react-lightbox'

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
      },
      {
        id: 6,
        title: 'Movies'
      },
      {
        id: 7,
        title: "Add Movie"
      },
      {
        id: 8,
        title: "Create List"
      }
    ]
    return (
      <div className="app">
        <SimpleReactLightbox>
          <div className="nav-bar">
            <TabList tabs={tabs} 
            changeTab={this.changeTab}
            activeTab={this.state.activeTab}/>
          </div>
          <div className="main-body">
            <Body activeTab={this.state.activeTab}/>
          </div>
        </SimpleReactLightbox>
      </div> 
    )
  }
}

export default App;
