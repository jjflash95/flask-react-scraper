import React from 'react'
import Main from './components/main'
import UserMenu from './components/user-menu'
import AppHeader from './components/app-header'

import { Pane } from 'evergreen-ui'
import {
  Route,
  Switch
} from "react-router-dom"


const wrap = () => {
  return {
    width: "100%",             
    margin: "auto",
  }
}

const menu = () => {
  return {
    width: "10%",             
    float: "left",
  }
}

const main = () => {
    return {
    width: "90%",             
    float: "left",
  }
}

function App() {
  return (
    <Pane clearfix className="App" background="tint2">
      <header className="App-header">
      </header>
        <AppHeader />
        <Pane style={ wrap() } >
          <Pane style={ main() } >
            <Main />
          </Pane>
          <Pane style={ menu() } >
          </Pane>
        </Pane>
        <Pane>
        </Pane>
    </Pane>
  );
}

export default App;
