import * as React from 'react';
import { View, Text } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ContactScreen from '../screens/ContactScreen';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Appbar, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

function screenOptionStyle(props) {
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
              onPress={() =>
                navigation.openDrawer()
              }
              color={colors.text}
            />
          )}
          <Appbar.Content color={colors.text} title={title} />
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
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const ContactStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle()}>
      <Stack.Screen name="Contact" component={ContactScreen} />
    </Stack.Navigator>
  );
}

export { MainStackNavigator, ContactStackNavigator };