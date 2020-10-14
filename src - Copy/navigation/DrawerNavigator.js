import * as React from 'react';
import { Image, Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './DrawerContent';
import DrawerItems from './DrawerItems'
import { useTheme, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const theme = useTheme();
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />}>
      {DrawerItems.map((item) => {
        return (
          <Drawer.Screen theme={theme} key={item.id} name={item.label} 
            options={{
              drawerIcon: ({ color, size }) => (
                (() => {                                                      
                  if(item.iconType == 'Ionicons'){
                    return <Icon name={item.icon} size={size} color={color} />
                  }else{
                    return <Image style={{width: size, height: size}} source={item.icon} />
                  }
                })()
              ),
            }}
            component={item.routeComponent} />
        );
      })}
    </Drawer.Navigator>
  );
}
export default DrawerNavigator;