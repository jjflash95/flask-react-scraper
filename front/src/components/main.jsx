import React, { useState } from 'react'
import SearchModule from './search-module'
import TrackingsModule from './trackings-module'
import { Pane, Tablist, SidebarTab } from 'evergreen-ui'



export default function Main() {
    const tabs = ['Search', 'Trackings']
    const views = [<SearchModule />, <TrackingsModule refresh={selectedIndex} />]
    const [selectedIndex, setSelectedIndex] = useState(0)

    return (
        <Pane display="flex" height={240}>
            <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
                {tabs.map((tab, index) => (
                    <SidebarTab
                      key={tab}
                      id={tab}
                      onSelect={() => setSelectedIndex(index)}
                      isSelected={index === selectedIndex}
                      aria-controls={`panel-${tab}`}
                    >
                      {tab}
                    </SidebarTab>
                ))}
            </Tablist>
            <Pane padding={16} background="tint1" flex="1">
                {views.map((view, index) => (
                    <Pane
                    key={index}
                    id={`panel-${index}`}
                    role="tabpanel"
                    aria-labelledby={index}
                    aria-hidden={index !== selectedIndex}
                    display={index === selectedIndex ? 'block' : 'none'}
                    >
                        { view }
                    </Pane>
                ))}
            </Pane>
        </Pane>
    )
}