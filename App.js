/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native'
import { Actions, Scene, Router } from 'react-native-router-flux';

import CharactersList from 'marvel_characters/src/sections/characters/CharactersList'
import CharacterView from 'marvel_characters/src/sections/characters/CharacterView'

import { Colors, Fonts } from 'marvel_characters/src/commons'

//Redux
// **************************************************
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'

import * as reducers from './src/redux/reducers'
const reducer = combineReducers(reducers)
const store = createStore(
  reducer,
  applyMiddleware(thunk)
)
// ************************************************

export default class App extends Component {

  componentWillMount() {
    StatusBar.setBarStyle('light-content')
  }

  render() {
    console.disableYellowBox = true;

    return (
      <Provider store={ store }>
        <Router>
          <Scene key="root">
            <Scene
              key={ "CharactersList" }
              component={ CharactersList }
              navigationBarStyle={styles.navBar}
              navBarButtonColor={ Colors.ACCENT_COLOR }
              title={ 'Characters list' }
            />
            <Scene
              key={ "CharacterView" }
              component={ CharacterView }
              navigationBarStyle={styles.navBar}
              navBarButtonColor={ Colors.ACCENT_COLOR }
            />
          </Scene>
        </Router>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: Colors.PRIMARY_COLOR,
    
  }
})
