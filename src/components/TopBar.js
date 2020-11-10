import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export const TopBar = () => {
  const [isConnected, setIsConnected] = useState(true);

  if (isConnected) {
    return (
      <></>
    );
    /*return (
      <View style={[styles.container, {backgroundColor: 'green'}]}>
        <Text style={styles.text}> Connected</Text>
      </View>
    );
    */
  }

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}> No Internet Connection</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});