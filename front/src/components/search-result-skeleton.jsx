import React from 'react'
import { Pane, Card, Text, Badge } from 'evergreen-ui'


export default function SearchResultSkeleton({ dummyItem }) {
    const imageProperties = () => {
        return {
            maxWidth: "330px",
            maxHeight: "200px",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
        }
    }

    const titleProperties = () => {
        return {
            alignItems: "center",
            marginBottom: "5px",
            minHeight: "50px",
        }
    }

    const infoProperties = () => {
        return {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "5px",
            bottom: "0",
        }
    }

    const cardImageProperties = () => {
        return {
            alignItems: "center",
            padding: "10px",
            width: "330px",
            height: "200px",
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

    return (
         <Card
          key={dummyItem}
          elevation={1}
          backgroundColor="white"
          float="left"
          width={350}
          height={350}
          margin={14}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
            <Pane background="tint2" style={ paneContainerProperties() }>
                <Pane style={ cardImageProperties() }>
                </Pane>
                <div style={ titleProperties() }>
                    <Text color="default"></Text>
                </div>
                <div style={ infoProperties() }>
                    <Text color="secondary"></Text>
                    <Badge color="neutral" style={{alignSelf: "flex-end"}}></Badge>
                </div>
                
            </Pane>
        </Card>
    )
}