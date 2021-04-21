import React, { useState } from 'react'
import { Pane, Card, Text, Badge, Checkbox, Popover } from 'evergreen-ui'

const imageProperties = () => {
    return {
        maxWidth: "310px",
        maxHeight: "200px",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
    }
}

const titleProperties = () => {
    return {
        alignItems: "center",
        marginBottom: "5px",
        minHeight: "50px",
    }
}

const cardImageProperties = () => {
    return {
        justifyContent: "center",
        maxWidth: "330px",
        maxHeight: "200px",
    }
}

const paneContainerProperties = () => {
    return {
        width: "330px",
        display: "flex",
        boxSizing: "border-box",
        flexDirection: "column",
        padding: "10px",
    }
}

const getSourceColour = (source) => {
    switch (source.toLowerCase()) {
        case "mercadolibre":
            return "yellow"
        case "olx":
            return "blue"
        default:
            return "neutral"
    }
}


export default function SearchResult({ result, selectedItems, setSelectedItems }) {

    const [elevation, setElevation] = useState(1)
    const [checked, setChecked] = useState(false)

    const handlePaneHover = () => {
        setElevation(3)
    }

    const handlePaneLeave = () => {
        setElevation(1)
    }


    const getItemPusherFunction = (item) => {
        return () => {
            let newSelectedItems = [...selectedItems]
            if (!checked) {
                newSelectedItems.push(item)
            } else {
                const index = newSelectedItems.indexOf(item)
                if (index < 0) return
                newSelectedItems.splice(index, 1)
            }
            setSelectedItems(newSelectedItems)
            setChecked(!checked)
        }
    }

    return (
            <Card
              key={result.title}
              backgroundColor="white"
              float="left"
              width={350}
              height={350}
              margin={14}
              display="flex"
              alignItems="center"
              justifyContent="center"
              elevation={ elevation }
              onMouseOver={ handlePaneHover }
              onMouseLeave={ handlePaneLeave }
              // onClick={ getRedirect(result.item_url) }
              cursor="pointer"
            >
                <Pane style={ paneContainerProperties() }>
                    <div style={ cardImageProperties() }>
                        <img style={ imageProperties() } src={ result.image_url } />
                    </div>
                    <div style={ titleProperties() }>
                        <Text color="default">{ result.title }</Text>
                    </div>
                    <div>
                        <Pane>
                            <Text color="secondary" fontWeight={500} fontSize={20}>{ result.currency } { result.price }</Text>
                        </Pane>
                        <Pane style={ {display:"flex", flexDirection: "row", justifyContent:"space-between"} }>
                            <Checkbox
                              label="Track prices"
                              checked={ checked }
                              onChange={ getItemPusherFunction(result) }
                            />
                            <Pane style={{justifyContent: "center", marginTop: "12px"}}>
                                <Badge color={getSourceColour(result.source)}>{ result.source }</Badge>
                            </Pane>
                        </Pane>
                    </div>
                    
                </Pane>
            </Card>

    )
}