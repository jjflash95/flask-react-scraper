import React, { useState, useEffect } from 'react'
import { Pane } from 'evergreen-ui'
import Tracking from './tracking'

export default function TrackingsModule({ refresh }) {
    const [trackings, setTrackings] = useState([])

    useEffect(() => {
        fetch("/api/trackings")
            .then(res => res.json())
            .then(setTrackings)
    }, [refresh])

    return (
        <Pane clearfix>
            {trackings.map(tracking => 
                <Tracking tracking={ tracking }/>
            )}
        </Pane>
    )
}