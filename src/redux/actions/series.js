import * as types from 'marvel_characters/src/redux/types/Series'
import { fetch } from 'marvel_characters/src/webservices/marvelApi'

function setSeriesFetching(value) {
    return {
        type: types.Series_SET_FETCHING,
        value
    }
}


function updateSeriesList(value) {
    return {
        type: types.SERIES_FETCH_LIST,
        value
    }
}

export function fetchSeriesList(character) {
    return (dispatch, getState) => {

        dispatch(setSeriesFetching(true))

        const fetchURL = 'characters/' + character.id + '/Series'
        fetch(fetchURL)
        .then((data) => {
            dispatch(setSeriesFetching(false))
            const list = data.results
            dispatch(updateSeriesList(list))
        }).catch((error) => {
            dispatch(setSeriesFetching(false))
            console.log('Error', error)
        })
        
    }
}