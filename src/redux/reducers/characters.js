import * as types from 'marvel_characters/src/redux/types/characters'

const initialState = {
    isFetching: false,
    list: [],
    item: null,
    searchedText: ''
}


export default function reducer(state = initialState, action = {})
{
    switch (action.type) {
    case types.CHARACTERS_FETCH_LIST:
        const processedList = action.value.map(function(character) {
            const characterSecured = character
            characterSecured.thumbnail.path = character.thumbnail.path.replace('http', 'https')
            if (characterSecured.thumbnail.path.indexOf("image_not_available") > 0) {
                characterSecured.thumbnail = null
            }
            return characterSecured
        })
        return {
            ...state,
            list: processedList
        }
    case types.CHARACTERS_UPDATE_SELECTED_ITEM:
        return {
            ...state,
            item: action.character
        }
    case types.CHARACTERS_SET_FETCHING:
        return {
            ...state,
            isFetching: action.value
        }
    case types.CHARACTERS_UPDATE_SEARCHED_TEXT:
        return {
            ...state,
            searchedText: action.value
        }
    default:
        return state
    }

}