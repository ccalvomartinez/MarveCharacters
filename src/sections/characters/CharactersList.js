import React, { Component } from 'react'
import { View, Text, FlatList,  StyleSheet,  ActivityIndicator } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import * as Colors from 'marvel_characters/src/commons/Colors'
import CharacterCell from './CharacterCell'
import * as CharactersActions from 'marvel_characters/src/redux/actions/characters'

class CharactersList extends Component {
    
    componentWillMount() {
            this.props.fetchCharactersList()
    }

    renderItem(item) {
        return (
            <CharacterCell 
                item={item}
            />
        )
    }

    render() {
        const { list, isFetching} = this.props
        return( 
            <View style={styles.container}>
                <FlatList 
                    data={ this.props.list }
                    keyExtractor={ (item) => { return item.id } }
                    renderItem={ ({ item }) => this.renderItem(item) }
                    numColumns={ 2 }
                    />
            </View>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        list: state.characters.list,
        isFetching: state.characters.isFetching
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchCharactersList: () => {
            dispatch(CharactersActions.fetchCharactersList())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CharactersList)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PRIMARY_COLOR
    },
})