import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar, useTheme, TouchableRipple } from 'react-native-paper';
//import { Icon as MaterialIcons } from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PlayerProvider, PlayerContext } from '../providers/PlayerProvider';
import { TrackPlayer, useTrackPlayerEvents, TrackPlayerEvents, STATE_PLAYING, STATE_PAUSED, STATE_STOPPED, STATE_BUFFERING, STATE_CONNECTING } from 'react-native-track-player';
import { playRadio, pauseRadio, currentIcon, setCurrentSong, currentSong } from '../components/Player';
import AsyncStorage from '@react-native-community/async-storage';

_storeFavourites = async (numberToSave) => {
  //let storedNumbers = await AsyncStorage.getItem('favourites');
  //console.log(storedNumbers);
  let numberArray = [];
  try {
    let storedNumbers = await AsyncStorage.getItem('favourites');
    if(storedNumbers !== null){
      numberArray = JSON.parse(storedNumbers);
      numberArray.push(parseInt(numberToSave));
      await AsyncStorage.setItem('favourites', JSON.stringify(numberArray));
    }else{
      await AsyncStorage.setItem('favourites', JSON.stringify([parseInt(numberToSave)]));
    }
    //await AsyncStorage.clear();
  } catch (error) {
    //console.log(error);
  }
};

_removeFavourites = async (numberToRemove) => {
  /*
  let value = 3;
  let arr = [1, 2, 3, 4, 5, 3];
  arr = arr.filter(item => item !== value);
  console.log(arr);
  */
  let numberArray = [];
  try {
    let storedNumbers = await AsyncStorage.getItem('favourites');
    if(storedNumbers !== null){
      numberArray = JSON.parse(storedNumbers);
      numberArray = numberArray.filter(item => item !== parseInt(numberToRemove));
      await AsyncStorage.setItem('favourites', JSON.stringify(numberArray));
    }
  } catch (error) {
    //console.log(error);
  }
};

const PlayerInfo = () => {
  const { isPlaying, setIsPlaying, currentRadio, setCurrentRadio, setCurrentSong, currentSong } = React.useContext(PlayerContext);
  const { colors } = useTheme();
  var data = false;

  useTrackPlayerEvents(["playback-metadata-received", "playback-state"], async (event) => {
    if(event.type == "playback-metadata-received"){
      if(event.title == ""){
        event.title = null;
      }

      setCurrentSong({title: event.title, artist: event.artist});
    }else if(event.type == "playback-state"){
      //console.log("PLAYBACK STATE: "+ JSON.stringify(event));
      if(event.state == STATE_PLAYING || event.state == STATE_BUFFERING || event.state == STATE_CONNECTING){
        setIsPlaying(true);
      }else if(event.state == STATE_PAUSED){
        setIsPlaying(false);
      }
    }
  });

  if(currentRadio!=null){
    return (
      <View style={[styles.container, {backgroundColor: colors.nav}]}>
        <View style={styles.left}>     
          {currentRadio == null? null: <Avatar.Image size={50} source={{uri: currentRadio.urlLogo}} />}
        </View>
        <View style={styles.middle}>
          <Text style={[styles.stationName, {color: colors.text}]}>
            {currentRadio == null ? "Slušate radio uživo": currentRadio.name}
          </Text>
          <Text style={{color: colors.text}}>
            {(currentSong == null || currentSong.title == null || currentSong.artist == null) ? "Slušate radio uživo": currentSong.title+ ' - '+currentSong.artist}
          </Text>
        </View>
        <View style={styles.left}>
          {isPlaying ? (
            <Icon 
              name="pause-circle-outline" 
              size={40}
              color={colors.text} 
              onPress={() => {
                setCurrentRadio(currentRadio), pauseRadio(currentRadio)             
              }}
            />
          ):(
            <Icon 
              name="play-circle-outline" 
              size={40}
              color={colors.text} 
              onPress={() => {
                setCurrentRadio(currentRadio), playRadio(currentRadio)       
              }}
            />               
          )}   
          {data ? (
            <Icon 
              name="favorite" 
              size={40} 
              color="red" 
              onPress={() => {
                console.log("clicked");
                _removeFavourites(currentRadio.id)
              }}
            />
          ):(
            <Icon 
              name="favorite-border" 
              size={40} 
              color={colors.text} 
              onPress={() => {
                console.log("clicked");
                _storeFavourites(currentRadio.id)
              }}
            />
          )
        }
        </View>
      </View>
    );
  }else{
    return (<View></View>);
  }
}
export default class PlayerScreen extends React.Component {
  render(){
    return (
      <PlayerInfo>
      </PlayerInfo>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 0.15,
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    bottom: 0 ,
    paddingLeft: 10,
    paddingRight: 10,
  },
  middle: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    marginLeft: -20,
    marginRight: 20,
  },
  stationName: {
    fontSize: 20
  },
  left: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center"
  }
});
