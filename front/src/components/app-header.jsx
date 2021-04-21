import React from 'react'
import { Pane, Menu, Heading } from 'evergreen-ui'


const header = () => {
  return {
    width: "100%",
    height: "120px",
  }
}

export default function AppHeader() {
    return (
        <Pane>
            <Heading 
            style={ header() }
            background="tint1"
            size={900} >
                Header
            </Heading>
            <Menu.Divider />
        </Pane>
    )
}