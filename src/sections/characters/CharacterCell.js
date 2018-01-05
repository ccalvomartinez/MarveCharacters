import React, { Component } from 'react'
import { TouchableOpacity, Image, StyleSheet, View, Text, Dimensions, Platform } from 'react-native'

import { Colors, Fonts } from 'marvel_characters/src/commons'

export default class CharacterCell extends Component {

    static defaultProps = {
        onSelect: () => {},
        item: {},
     }
    render() {
        const { item, onSelect } = this.props
        const image = item.thumbnail ? { uri: item.thumbnail.path +'.' + item.thumbnail.extension } : require('marvel_characters/src/resources/image_not_available.jpg')
        const name = item.name ? item.name : ''
         return (
            <TouchableOpacity style={styles.container}  onPress={ () => { onSelect(item) } }>
                <Image style={ styles.image } source={ image } resizeMode={'cover'}/>
                <View style={ styles.textContainer }>
                    <Text style={ styles.name }> { name }</Text>
                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        margin: 10,
        width: Dimensions.get('window').width / 2 - 20, //proporción de las imágenes: 857/600,
        height: (Dimensions.get('window').width / 2 - 20) * (857/600),
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(255,255,255,0.1)',
                shadowOpacity: 1,
                shadowOffset: { height: 4, width: 4 },
                shadowRadius: 2,
            },
            android: {
                elevation: 4,
            }
        })
    },
    textContainer: {
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.7)',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0, 
        left: 0
    },
    name:{
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
        height: '100%'
    
    },
    
})