import React from 'react'
import { Pane } from 'evergreen-ui'
import SearchResult from './search-result'
import SearchResultSkeleton from './search-result-skeleton'

export default function SearchResults({ results, selectedItems, setSelectedItems }) {
    const sortArray = (array) => {
        return array.sort((a, b) => {
            return a.price - b.price
        })
    }

	return results ? (
	    <Pane clearfix>
            {sortArray(results).map(result => (
            	<SearchResult result={ result } selectedItems={ selectedItems } setSelectedItems={ setSelectedItems }/>
            ))}
	    </Pane>
	) : <Pane clearfix>
            {Array.from(Array(50).keys()).map(dummyItem => (
                <SearchResultSkeleton dummy={dummyItem} />
            ))}
        </Pane>
}