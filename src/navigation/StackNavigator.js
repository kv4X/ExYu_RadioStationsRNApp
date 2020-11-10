import React, { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import BaScreen from '../screens/BaScreen';
import RsScreen from '../screens/RsScreen';
import HrScreen from '../screens/HrScreen';
import MeScreen from '../screens/MeScreen';
import SiScreen from '../screens/SiScreen';
import MkScreen from '../screens/MkScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Appbar, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { SearchBarProvider, SearchBarContext } from '../providers/SearchBarProvider';

const Stack = createStackNavigator();

function screenOptionStyle(props) {
  const { searchStatus, setSearchStatus } = React.useContext(SearchBarContext);
  const navigation = useNavigation();
  const { colors } = useTheme();
  const screenOptionStyle = {
    header: ({ navigation, scene, previous }) => {
      const { options } = scene.descriptor;
      const title =
        options.headerTitle !== undefined
          ? options.headerTitle
          : options.title !== undefined
          ? options.title
          : scene.route.name;

      return (
        <Appbar.Header style={{backgroundColor: colors.nav}}>
          {previous ? (
            <Appbar.BackAction onPress={() => navigation.goBack()} />
          ):(
            <Appbar.Action
              icon="menu"
              onPress={() => {
                navigation.openDrawer(),
                setSearchStatus(false)
              }}
              color={colors.text}
            />
          )}
          {options.type == "image" ? (
            <Image style={{width: 20, height: 20}} source={options.image} />
          ):(
            <Icon name={options.image} size={20} color={colors.text} />
          )}
          <Appbar.Content color={colors.text} title={title} />
          {searchStatus ? (
           <Appbar.Action icon="close" onPress={() => setSearchStatus(!searchStatus)} />
          )
          :(
          <Appbar.Action icon="magnify" onPress={() => setSearchStatus(!searchStatus)} />
          )}
        </Appbar.Header>
      );
    },
    headerStyle: {
      backgroundColor: "red",
      opacity: 1,
    },
    headerTintColor: colors.text,
    headerBackTitle: "Back",
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  };

  return screenOptionStyle;
}

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle()}>
      <Stack.Screen 
      options={{
        type: "icon",
        image: "md-radio"
      }}
      name="Sve radio stanice" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const BaStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle()}>
      <Stack.Screen 
        options={{
          type: "image",
          image: require('../../assets/flags/ba.png')
        }}
        name="Bosna i Hercegovina" component={BaScreen} />
    </Stack.Navigator>
  );
}

const RsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle()}>
      <Stack.Screen 
        options={{
          type: "image",
          image: require('../../assets/flags/rs.png')
        }}
        name="Srbija" component={RsScreen} />
    </Stack.Navigator>
  );
}

const HrStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle()}>
      <Stack.Screen 
        options={{
          type: "image",
          image: require('../../assets/flags/hr.png')
        }}
        name="Hrvatska" component={HrScreen} />
    </Stack.Navigator>
  );
}

const MeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle()}>
      <Stack.Screen 
        options={{
          type: "image",
          image: require('../../assets/flags/me.png')
        }}
        name="Crna Gora" component={MeScreen} />
    </Stack.Navigator>
  );
}
const SiStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle()}>
      <Stack.Screen 
        options={{
          type: "image",
          image: require('../../assets/flags/si.png')
        }}
        name="Slovenija" component={SiScreen} />
    </Stack.Navigator>
  );
}

const MkStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle()}>
      <Stack.Screen 
        options={{
          type: "image",
          image: require('../../assets/flags/mk.png')
        }}
        name="Makedonija" component={MkScreen} />
    </Stack.Navigator>
  );
}

const FaStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle()}>
      <Stack.Screen 
        options={{
          type: "image",
          image: require('../../assets/flags/fa2.png')
        }}
        name="Vaše omiljene radio stanice" component={FavouritesScreen} />
    </Stack.Navigator>
  );
}

export { MainStackNavigator, FaStackNavigator, BaStackNavigator, RsStackNavigator, HrStackNavigator, MeStackNavigator, SiStackNavigator, MkStackNavigator };