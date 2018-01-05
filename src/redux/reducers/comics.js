import * as types from 'marvel_characters/src/redux/types/comics'

const initialState = {
    isFetching: false,
    list: [],
}


export default function reducer(state = initialState, action = {})
{
    switch (action.type) {
    case types.COMICS_FETCH_LIST:
        const processedList = action.value.map(function(character) {
            const comicSecured = character
            comicSecured.thumbnail.path = character.thumbnail.path.replace('http', 'https')
            if (comicSecured.thumbnail.path.indexOf("image_not_available") > 0) {
                comicSecured.thumbnail = null
            }
            return comicSecured
        })
        return {
            ...state,
            list: processedList
        }
    case types.COMICS_SET_FETCHING:
        return {
            ...state,
            isFetching: action.value
        }
    default:
        return state
    }

}