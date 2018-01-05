import * as types from 'marvel_characters/src/redux/types/characters'
import { fetch } from 'marvel_characters/src/webservices/marvelApi'

function setCharactersFetching(value) {
    return {
        type: types.CHARACTERS_SET_FETCHING,
        value
    }
}

function updateCharactersList(value) {
    return {
        type: types.CHARACTERS_FETCH_LIST,
        value
    }
}

export function fetchCharactersList() {
    return (dispatch, getState) => {
        
        dispatch(setCharactersFetching(true))
        const fetchURL = 'characters'
        fetch(fetchURL)
        .then((data) => {
            dispatch(setCharactersFetching(false))
            const list = data.results
            dispatch(updateCharactersList(list))
        }).catch((error) => {
            dispatch(setCharactersFetching(false))
            console.log('Error', error)
        })
        
    }
}