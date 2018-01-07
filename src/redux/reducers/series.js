import * as types from 'marvel_characters/src/redux/types/series'

const initialState = {
    isFetching: false,
    list: [],
}


export default function reducer(state = initialState, action = {})
{
    switch (action.type) {
    case types.SERIES_FETCH_LIST:
        let processedList = []
        if (Array.isArray(action.value)) {
            processedList = action.value.map(function(serie) {
                const serieSecured = serie
                serieSecured.thumbnail.path = serie.thumbnail.path.replace('http', 'https')
                if (serieSecured.thumbnail.path.indexOf("image_not_available") > 0) {
                    serieSecured.thumbnail = null
                }
                return serieSecured
            })
        }
        return {
            ...state,
            list: processedList
        }
    case types.SERIES_SET_FETCHING:
    return {
            ...state,
            isFetching: action.value
        }
    default:
        return state
    }

}