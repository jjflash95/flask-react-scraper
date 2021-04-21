import React, { useState } from 'react'
import {
    Pane,
    SideSheet,
    Paragraph,
    Popover,
    Button,
    Text,
    TextInput,
    TextInputField,
    Select,
    Code,
    Heading,
    toaster
} from 'evergreen-ui'

import { setCookie, getCookie, deleteCookie } from '../utils/cookies'

const saveConfigProperties = () => {
    return {
        marginRight: "15px",
    }
}

const configButtonDivProperties = () => {
    return {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "10px",
    }
}

const loginContainerProperties = () => {
    return {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginRight: "auto",
        marginLeft: "auto",
        width: "350px",
        height: "350px",
    }
}

const loginButtonProperties = () => {
    return {
        marginRight: "auto",
        marginLeft: "auto",
    }
}

const getLoggedUser = () => {
    let session = getCookie()
    console.log(session)
    return fetch(`/api/me?session_token=${session}`)
}

export default function SaveConfiguration({ search, selectedItems }) {
    const [priceline, setPriceline] = useState(null)
    const [selectedCurrency, setSelectedCurrency] = useState("ARS")
    const [saveDisabled, setSaveDisabled] = useState(true)
    const [showLogin, setShowLogin] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handlePriceChange = (e) => {
        setPriceline(e.target.value)
        setSaveDisabled(false)
    } 

    const handleCurrencyChange = (e) => setSelectedCurrency(e.target.value)

    const saveConfig = () => {
        getLoggedUser()
        .then(res => res.json())
        .then(data => {
            if (data) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: search,
                    trackingPrice: priceline,
                    trackingCurrency: selectedCurrency,
                    selectedItems: selectedItems,
                })
            }

            fetch('/api/save', requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.saved) {
                        toaster.success("Your items are now being tracked", { duration: 5 })
                    } else {
                        toaster.danger("Something went wrong trying to create your audience", { duration: 5 })
                    }
                })

            } else {
                setShowLogin(true)
            }
        })

    }

    const handleLogin = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        }
        fetch('/login', requestOptions)
            .then(response => response.json())
            .then(data => {
                setCookie(data.token)
                setShowLogin(false)
            })

    }

    return (
        <Pane>
            <SideSheet
            isShown={ showLogin }
            onCloseComplete={() => setShowLogin(false)}
            >
                <Pane
                style={ loginContainerProperties() }
                >
                    <TextInputField
                      label="Username"
                      type="text"
                      onChange={ (e) => setUsername(e.target.value) }
                    />
                    <TextInputField
                      label="Password"
                      type="password"
                      onChange={ (e) => setPassword(e.target.value) }
                    />
                    <Pane style={ loginButtonProperties() } >
                        <Button height={40} onClick={ handleLogin }>Login</Button>
                    </Pane> 
                </Pane>
            </SideSheet>
            <Pane style={ saveConfigProperties() }>
                <Popover
                    shouldCloseOnExternalClick={false}
                    content={({ close }) => (
                        <Pane
                            width={520}
                            height={140}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexDirection="column"
                        >
                            <Pane>
                                <Heading>Tracking Prices for  <Code size={500} marginLeft="5px" marginRight="5px">{ selectedItems.length }</Code>  items</Heading>
                                <Pane>
                                    <Text fontSize={16}>Notify me when any item goes below </Text>
                                    <TextInput width={120} onChange={ handlePriceChange }/>
                                    <Select onChange={ handleCurrencyChange }>
                                      <option value="ARS" selected>ARS</option>
                                      <option value="USD">USD</option>
                                    </Select>
                                </Pane>
                                <Pane margin="5px" style={ configButtonDivProperties() }>
                                    <Button intent="success" justifyContent="center" appearance="primary" height={40} width={140} disabled={ saveDisabled } onClick={ saveConfig }>Save</Button>
                                    <Button height={40} width={140} onClick={close}>Close</Button>
                                </Pane>
                            </Pane>
                        </Pane>
                        )
                    }
                >
                    <Button height={40} iconBefore="edit">Track settings</Button>
                </Popover>
            </Pane>
        </Pane>
    )
}