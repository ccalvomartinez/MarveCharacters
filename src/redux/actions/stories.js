import * as types from 'marvel_characters/src/redux/types/Stories'
import { fetch } from 'marvel_characters/src/webservices/marvelApi'

function setStoriesFetching(value) {
    return {
        type: types.Stories_SET_FETCHING,
        value
    }
}


function updateStoriesList(value) {
    return {
        type: types.STORIES_FETCH_LIST,
        value
    }
}

export function fetchStoriesList(character) {
    return (dispatch, getState) => {

        dispatch(setStoriesFetching(true))

        const fetchURL = 'characters/' + character.id + '/Stories'
        fetch(fetchURL)
        .then((data) => {
            dispatch(setStoriesFetching(false))
            const list = data.results
            dispatch(updateStoriesList(list))
        }).catch((error) => {
            dispatch(setStoriesFetching(false))
            console.log('Error', error)
        })
        
    }
}