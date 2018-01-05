import * as types from 'marvel_characters/src/redux/types/comics'
import { fetch } from 'marvel_characters/src/webservices/marvelApi'

function setComicsFetching(value) {
    return {
        type: types.COMICS_SET_FETCHING,
        value
    }
}


function updateComicsList(value) {
    return {
        type: types.COMICS_FETCH_LIST,
        value
    }
}

export function fetchComicsList(character) {
    return (dispatch, getState) => {

        dispatch(setComicsFetching(true))

        const fetchURL = 'characters/' + character.id + '/comics'
        fetch(fetchURL)
        .then((data) => {
            dispatch(setComicsFetching(false))
            const list = data.results
            dispatch(updateComicsList(list))
        }).catch((error) => {
            dispatch(setComicsFetching(false))
            console.log('Error', error)
        })
        
    }
}