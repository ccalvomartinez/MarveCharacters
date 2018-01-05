import * as types from 'marvel_characters/src/redux/types/characters'
import { fetch } from 'marvel_characters/src/webservices/marvelApi'

function setCharactersFetching(value) {
    return {
        type: types.CHARACTERS_SET_FETCHING,
        value
    }
}

function setSeatchedText(text) {
    return {
        type: types.CHARACTERS_UPDATE_SEARCHED_TEXT,
        value: text
    }
}

function updateCharactersList(value) {
    return {
        type: types.CHARACTERS_FETCH_LIST,
        value
    }
}

export function fetchCharactersList(searchText) {
    return (dispatch, getState) => {

        dispatch(setSeatchedText(searchText))
        dispatch(setCharactersFetching(true))

        const fetchURL = 'characters'
        fetch(fetchURL, searchText)
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

export function updateSelectedCharacter(character) {
    return {
        type: types.CHARACTERS_UPDATE_SELECTED_ITEM,
        character
    }
}