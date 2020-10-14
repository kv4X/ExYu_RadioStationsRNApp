import React, { useContext, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { useTheme, Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';
import { MainStackNavigator, ContactStackNavigator } from './StackNavigator';
import { ThemeContext } from '../providers/ThemeProvider';
import { PlayerProvider, PlayerContext } from '../providers/PlayerProvider';
import RNDateTimePicker  from '@react-native-community/datetimepicker';
import Timer from '../components/Timer';
export function DrawerContent(props) {
  const { theme, setTheme } = React.useContext(ThemeContext);
  const { timer, setTimer, isPickerOpened, setIsPickerOpened } = React.useContext(PlayerContext);
  const onChange = (event, selectedDate) => {
    if(event.type == "set"){
      const diffSeconds = ((new Date(selectedDate).getTime() - new Date().getTime())/60000);
      const seconds = Math.abs(Math.floor(diffSeconds*60));
     //console.log("RAZLIKA: "+Math.abs(Math.floor(diffSeconds*60)));
      Timer(seconds);
      setIsPickerOpened(false);
      Alert.alert("Tajmer", "Radio stanica ce biti pauzirana u: "+selectedDate);
    }else{
      setIsPickerOpened(false);
    }
  };

  return (
    <View style={{flex:1}}>
      <DrawerContentScrollView {...props}>
        <Drawer.Section title="Radio stanice">
          <DrawerItemList {...props} />
        </Drawer.Section>
        <Drawer.Section title="Postavke">
          <TouchableRipple onPress={() => {
            setTheme(!theme)
          }}>
            <View style={styles.preference}>
              <Text>Tamna tema</Text>
              <View pointerEvents="none">
                <Switch value={theme}/>
              </View>
            </View>
          </TouchableRipple>      
          <TouchableRipple onPress={() => {setIsPickerOpened(true)}}>
            <View style={styles.preference}>
              <Text>{'Tajmer\n(automatsko pauziranje radio stanice u zadato vrijeme'}</Text>
              {isPickerOpened && <RNDateTimePicker display="default" is24Hour={true}  mode="time" onChange={onChange} value={new Date().getTime()}/>}
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  }
});