import React, { Component } from 'react'
import { View, Text, Image,  StyleSheet,  Platform } from 'react-native'

import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import { Colors, Fonts } from 'marvel_characters/src/commons'

class CharacterView extends Component {

    render() {
        const character = this.props.character
        console.log('Selecte char', character)
        const image = character.thumbnail ? { uri: character.thumbnail.path +'.' + character.thumbnail.extension } : require('marvel_characters/src/resources/image_not_available.jpg')
        const name = character.name ? character.name : ''
        const description = character.description ? character.description : ''
        return (
        <View style={ styles.container } >
            <View style={ styles.nameContainer }>
                <Text style={ styles.name }> { name }</Text>
            </View>
            <Image style={ styles.image } source={ image } resizeMode={'cover'}/>
            {description ? 
            <View style={ styles.descriptionContainer }>
                <Text style={ styles.description }> { description }</Text>
            </View> : null}
            
        </View>
        )
    }
}

const mapStateToProps = (state) => {
    
        return {
            character: state.characters.item,
        }
    }
    
const mapDispatchToProps = (dispatch, props) => {
    return {
        
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
        image:{
            width: '100%',
            height: 200
        
        },
      
    })