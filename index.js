import React, { useContext, useState } from 'react';
import {AppRegistry} from 'react-native';
import { NavigationContainer, DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { DefaultTheme, Provider as PaperProvider, DefaultTheme as PaperDefaultTheme, DarkTheme as PaperDarkTheme } from 'react-native-paper';
import App from './App';
import {name as appName} from './app.json';
import { ThemeProvider, ThemeContext } from './src/providers/ThemeProvider';
import { SearchBarProvider, SearchBarContext } from './src/providers/SearchBarProvider';
import PlayerScreen from './src/components/PlayerScreen';
import { PlayerProvider, PlayerContext } from './src/providers/PlayerProvider';
import TrackPlayer from 'react-native-track-player';
import {TopBar} from './src/components/TopBar';

const CustomDefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    background: '#ffffff',
    text: '#22252a',
    text2: '#adaeb2',
    primary: '#000000',
    nav: '#f5f6fa',
    navText: '#000000',
    navIcon: '#000000',
  } 
}

const CustomDarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    background: '#141414',
    primary: '#ffffff',
    text: '#fff',
    text2: '#adaeb2',
    nav: '#1f1f1f',
    navText: '#ffffff',
    navIcon: '#ffffff',
  }
}


export default function Main() {
  return (
    <ThemeProvider>
      <TopBar />
      <ThemeContext.Consumer>
      {({theme, setTheme}) => (
        <PlayerProvider>
          <PaperProvider theme={theme ? CustomDarkTheme: CustomDefaultTheme}>
              <NavigationContainer theme={theme ? CustomDarkTheme: CustomDefaultTheme}>
                <SearchBarProvider>
                  <App/>
                </SearchBarProvider>
              </NavigationContainer>
              <PlayerScreen></PlayerScreen>
          </PaperProvider>
        </PlayerProvider>
      )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}
AppRegistry.registerComponent(appName, () => Main);
TrackPlayer.registerPlaybackService(() => require('./src/components/PlayerHandler'));

