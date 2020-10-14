import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { useTheme, Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';
import { MainStackNavigator, ContactStackNavigator } from './StackNavigator';
import { ThemeContext } from '../providers/ThemeProvider';

export function DrawerContent(props) {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <View style={{flex:1}}>
      <DrawerContentScrollView {...props}>
        <Drawer.Section title="Radio stanice">
          <DrawerItemList {...props} />
        </Drawer.Section>
        <Drawer.Section title="Preferences">
          <TouchableRipple onPress={() => {
            setTheme(!theme)
          }}>
            <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={theme}/>
                </View>
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