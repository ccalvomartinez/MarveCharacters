import React, { Component } from 'react'
import { View, Text, FlatList,  StyleSheet,  ActivityIndicator, TextInput, TouchableOpacity } from 'react-native'
import { SearchBar } from 'react-native-elements'
import Spinner from 'react-native-spinkit'

import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import * as Colors from 'marvel_characters/src/commons/Colors'
import CharacterCell from './CharacterCell'
import * as CharactersActions from 'marvel_characters/src/redux/actions/characters'

class CharactersList extends Component {
    
    componentWillMount() {
            this.props.fetchCharactersList()
    }

    onSelect(character) {
        this.props.updateSelectedCharacter(character)
    }

    onSearch(text) {
        this.props.fetchCharactersList(text)
    }
    renderItem(item) {
        return (
            <CharacterCell 
                item={item}
                onSelect={(item) => { this.onSelect(item) } }
            />
        )
    }

    render() {
            return(
                <View style={styles.container}>
                    <SearchBar
                    noIcon
                    onChangeText={(text) => { this.onSearch(text) }}
                    onClearText={() => {}}
                    placeholder='Search' 
                    value={ this.props.searchedText }/>
                    
                    {this.props.isFetching ?
                        <View style={styles.containerActivityIndicator}>
                        <Spinner size={ 75 } color={ Colors.ACCENT_COLOR } isVisible={ this.props.isFetching } type={ 'ChasingDots' } />
                        </View>
                    :
                        <FlatList 
                            data={ this.props.list }
                            keyExtractor={ (item) => { return item.id } }
                            renderItem={ ({ item }) => this.renderItem(item) }
                            numColumns={ 2 }
                        />
                    }
                </View>
            )
        
    }
}

const mapStateToProps = (state) => {

    return {
        list: state.characters.list,
        isFetching: state.characters.isFetching,
        searchedText: state.characters.searchedText
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchCharactersList: (text) => {
            dispatch(CharactersActions.fetchCharactersList(text))
        },
        updateSelectedCharacter: (character) => {
            dispatch(CharactersActions.updateSelectedCharacter(character))
            Actions.CharacterView()
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CharactersList)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PRIMARY_COLOR
    },
    containerActivityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.PRIMARY_COLOR
    },
})