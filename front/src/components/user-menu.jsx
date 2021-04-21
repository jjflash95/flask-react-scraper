import React from 'react'
import { Menu } from 'evergreen-ui'
import { useHistory } from 'react-router-dom'



export default function UserMenu() {
  const history = useHistory()
  return (
    <Menu>
      <Menu.Group>
          <Menu.Item 
          onClick={() => history.push('/')}
          >
            Search
          </Menu.Item>
          <Menu.Item 
          onClick={() => history.push('/trackings')}
          >
            Trackings
          </Menu.Item>
      </Menu.Group>
    </Menu>
  )
}