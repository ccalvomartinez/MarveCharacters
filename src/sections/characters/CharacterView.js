import React, { Component } from 'react'
import { View, Text, Image,  StyleSheet,  Platform, FlatList, ScrollView } from 'react-native'

import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import { Colors, Fonts } from 'marvel_characters/src/commons'
import PosterView from '../../widgets/PosterView'
import * as ComicsActions from 'marvel_characters/src/redux/actions/comics'
import * as SeriesActions from 'marvel_characters/src/redux/actions/series'
import * as StoriesActions from 'marvel_characters/src/redux/actions/stories'

class CharacterView extends Component {
    
    componentWillMount() {
        this.props.fetchComicsList(this.props.character)
        this.props.fetchSeriesList(this.props.character)
        this.props.fetchStoriesList(this.props.character)
    }

    render() {
        const character = this.props.character
        const image = character.thumbnail ? { uri: character.thumbnail.path +'.' + character.thumbnail.extension } : require('marvel_characters/src/resources/image_not_available.jpg')
        const name = character.name ? character.name : ''
        const description = character.description ? character.description : ''
        
        return (
        <View style={ styles.container } >
        <ScrollView>
            <View style={ styles.nameContainer }>
                <Text style={ styles.name }> { name }</Text>
            </View>
            <Image style={ styles.image } source={ image } resizeMode={'cover'}/>
             {description ? 
            <View style={ styles.descriptionContainer }>
                <Text style={ styles.description }> { description }</Text>
            </View> : null}
           <PosterView
                list= {this.props.list}
                character = { this.props.character }
                label={ 'Series' }
            />
             <PosterView
                list= {this.props.comicList}
                character = { this.props.character }
                isFetching = { this.props.isFetchingComics }
                label={ 'Comics' }
            />

            <PosterView
                list= {this.props.seriesList}
                character = { this.props.character }
                isFetching = { this.props.isFetchingSeries }
                label={ 'Series' }
            />
             <PosterView
                list= {this.props.storiesList}
                character = { this.props.character }
                isFetching = { this.props.isFetchingStories }
                label={ 'Stories' }
            />
            </ScrollView>
        </View>
        )
    }
}

const mapStateToProps = (state) => {
    
        return {
            character: state.characters.item,
            comicList: state.comics.list,
            isFetchingComics: state.comics.isFetching,
            seriesList: state.series.list,
            isFetchingSeries: state.series.isFetching,
            storiesList: state.stories.list,
            isFetchingStories: state.stories.isFetching
        }
    }
    
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchComicsList: (character) => { ComicsActions.fetchComicsList(character) },
        fetchSeriesList: (character) => { SeriesActions.fetchSeriesList(character) },
        fetchStoriesList: (character) => { StoriesActions.fetchStoriesList(character) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterView)

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'rgb(42,42,42)'
        },
        nameContainer: {
            alignItems: 'center',
            padding: 20,
            backgroundColor: 'rgba(0,0,0,0.5)',
            
        },
        descriptionContainer: {
           
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: 6,
            padding: 20
            
        },
        name:{
            fontSize: 18,
            fontWeight: 'bold',
            color: Colors.ACCENT_COLOR,
            ...Platform.select({
                ios: {
                    fontFamily: Fonts.IOS_FONT, 
                },
                android: {
                    fontFamily: Fonts.ANDROID_FONT,
                }
            })
        },
        description: {
            fontSize: 16,
            fontWeight: 'bold',
            color: 'white',
            ...Platform.select({
                ios: {
                  
                    fontFamily: Fonts.IOS_FONT, 
                },
                android: {
                    fontFamily: Fonts.ANDROID_FONT,
                }
            })
        },
        image:{
            width: '100%',
            height: 200
        
        },
      
    })