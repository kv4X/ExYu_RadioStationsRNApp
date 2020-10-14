import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

function ContactScreen(){
  const { colors } = useTheme();
  return (
    <View style={styles.container} >
      <Text style={{ color: colors.text }}>
        CONTACT SCREEN
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }
});
export default ContactScreen;