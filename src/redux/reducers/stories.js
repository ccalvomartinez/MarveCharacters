import * as types from 'marvel_characters/src/redux/types/storys'

const initialState = {
    isFetching: false,
    list: [],
}


export default function reducer(state = initialState, action = {})
{
    switch (action.type) {
    case types.STORIES_FETCH_LIST:
        const processedList = action.value.map(function(character) {
            const storySecured = character
            storySecured.thumbnail.path = character.thumbnail.path.replace('http', 'https')
            if (storySecured.thumbnail.path.indexOf("image_not_available") > 0) {
                storySecured.thumbnail = null
            }
            return storySecured
        })
        return {
            ...state,
            list: processedList
        }
    case types.STORIES_SET_FETCHING:
        return {
            ...state,
            isFetching: action.value
        }
    default:
        return state
    }

}