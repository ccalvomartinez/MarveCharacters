/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Actions, Scene, Router } from 'react-native-router-flux';

import CharactersList from 'marvel_characters/src/sections/characters/CharactersList'
import CharacterView from 'marvel_characters/src/sections/characters/CharacterView'

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
              navBarButtonColor={'white'}
              
              />
          </Scene>
        </Router>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'rgb(36,36,36)'
  },
  addButton:{
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButtonText:{
    color: 'white',
    fontSize: 16,
    fontWeight: "600"
  }
})
