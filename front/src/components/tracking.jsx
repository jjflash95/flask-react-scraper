import React, { useState } from 'react'
import { Pane, Card, Text, Badge, Checkbox, Popover } from 'evergreen-ui'


const titleProperties = () => {
    return {
        float: "left",
        marginBottom: "5px",
    }
}

const trackingInfoProperties = () => {
    return {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "5px",
    }
}

const paneContainerProperties = () => {
    return {
        display: "flex",
        boxSizing: "border-box",
        flexDirection: "column",
        padding: "10px",
    }
}

const getSourceColour = (source) => {
    switch (source) {
        case "mercadolibre":
            return "yellow"
        case "olx":
            return "blue"
        default:
            return "neutral"
    }
}

const getLowestPricedItem = (items) => {
    return items.sort((a, b) => {
        return a.price - b.price
    })[0]
}

export default function Tracking({ tracking }) {

    const [elevation, setElevation] = useState(1)
    const [checked, setChecked] = useState(false)

    const handlePaneHover = () => {
        setElevation(3)
    }

    const handlePaneLeave = () => {
        setElevation(1)
    }


    return (
            <Card
              key={tracking.id}
              backgroundColor="white"
              float="left"
              width="80%"
              height={120}
              margin={5}
              elevation={ elevation }
              onMouseOver={ handlePaneHover }
              onMouseLeave={ handlePaneLeave }
              cursor="pointer"
            >
                <Pane style={ paneContainerProperties() }>
                    <div style={ titleProperties() }>
                        <Text color="default" fontSize={20} >Id: </Text><Text color="secondary" fontWeight={400} fontSize={25}>{ tracking.id }</Text>
                    </div>
                    <div style={ trackingInfoProperties() }>
                        <div>
                            <Text color="default" fontSize={20} >Tracking: </Text><Text color="secondary" fontWeight={400} fontSize={20}>{ tracking.title.toUpperCase() }</Text>
                        </div>
                        <div>
                            <Text color="default" fontSize={20} >Total items tracked: </Text><Text color="secondary" fontWeight={400} fontSize={20}>{ tracking.items.length }</Text>
                        </div>                        
                    </div>
                    <div>
                        <Pane>
                            <Text fontSize={20}>Lowest Priced Item is  </Text>
                            <Text color="secondary" fontWeight={500} fontSize={25} color="#47B881"> { getLowestPricedItem(tracking.items).currency } { getLowestPricedItem(tracking.items).price }</Text>
                            <Text color="secondary" fontWeight={500} fontSize={25}>/</Text>
                            <Text color="secondary" fontWeight={500} fontSize={25} color="#EC4C47">{ tracking.currency } { tracking.price }</Text>
                        </Pane>
                        <Pane style={ {display:"flex", flexDirection: "row", justifyContent:"space-between"} }>
                        </Pane>
                    </div>
                    
                </Pane>
            </Card>

    )
}