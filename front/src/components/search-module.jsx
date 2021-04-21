import React, { useState, useEffect } from 'react'
import { Pane, SearchInput } from 'evergreen-ui'

import SearchResults from './search-results'
import SaveConfiguration from './save-config'


const headerStyle = () => {
    return {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    }
}

export default function SearchModule() {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState(null)
    const [onLoad, setOnLoad] = useState(true)
    const [selectedItems, setSelectedItems] = useState([])

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchInput(search)
        }
    }

    const searchInput = (search) => {
        setOnLoad(false)
        setResults(null)
        fetch("/?q=" + search)
        .then(res => res.json())
        .then(setResults)
    }

    return (
        <div>
            <Pane display="flex" padding={16} background="tint2" borderRadius={3} style={ headerStyle() }>
                <SearchInput placeholder="Search" height={40} onChange={handleSearchChange} onKeyDown={handleKeyDown}/>
                {selectedItems && !!selectedItems.length && <SaveConfiguration search={ search } selectedItems={ selectedItems } />}
            </Pane> 
            { !onLoad && <SearchResults results={ results } selectedItems={ selectedItems } setSelectedItems={ setSelectedItems } /> }
        </div> 
       )
}