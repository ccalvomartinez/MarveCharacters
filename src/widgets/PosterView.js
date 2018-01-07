import React, { Component } from 'react'
import { View, Text, FlatList,  StyleSheet,  ActivityIndicator, Platform, Image } from 'react-native'
import Spinner from 'react-native-spinkit'

import { Actions } from 'react-native-router-flux'

import { Colors, Fonts } from 'marvel_characters/src/commons'

export default class PosterView extends Component {
    
    static defaultProps = {
        list: [],
        character: {},
        isFetching: false,
        label:''
     }

    renderItem(item) {
        const image = item.thumbnail ? { uri: item.thumbnail.path +'.' + item.thumbnail.extension } : require('marvel_characters/src/resources/image_not_available.jpg')
        const name = item.name ? item.name : ''
      
        return (
            <View style={styles.cellContainer}>
            <Image style={ styles.image } source={ image } resizeMode={'cover'}/>
        </View>
        )
    }

    render() {
        const { list, isFetching} = this.props
             return(
                <View style={styles.container}>
                    <View style={ styles.labelContainer }>
                        <Text style={ styles.label }>
                            { this.props.label }
                        </Text>
                    </View> 
                    {isFetching ?
                        <View style={styles.containerActivityIndicator}>
                             <Spinner size={ 40 } color={ Colors.ACCENT_COLOR } isVisible={ isFetching } type={ 'ThreeBounce' } />
                        </View>
                    :
                    <FlatList 
                        data={ this.props.list }
                        horizontal
                        keyExtractor={ (item) => { return item.id } }
                        renderItem={ ({ item }) => this.renderItem(item) }
                    />
                    }
                </View>
            )
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PRIMARY_COLOR
    },
    containerActivityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 75,
        backgroundColor: Colors.PRIMARY_COLOR
    },
    cellContainer:{
        margin: 10,
        width: 60,
        height: 75,
    },
    listContainer: {
        height: 65
    },
    labelContainer: {
       paddingTop: 20,
       paddingLeft: 10
    },
    label:{
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