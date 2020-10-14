import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
  Image,
  ScrollView
} from 'react-native';
import { Searchbar, List, Avatar, useTheme, useNavigationParam } from 'react-native-paper';
//import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
//import { Icon as MaterialIcons } from 'react-native-vector-icons/MaterialIcons';

import { SearchBarProvider, SearchBarContext } from '../providers/SearchBarProvider';
import { PlayerProvider, PlayerContext } from '../providers/PlayerProvider';

import { playRadio, pauseRadio } from '../components/Player';
import RNBootSplash from "react-native-bootsplash";
import config from '../api/config';
import { useNavigation } from '@react-navigation/native';

const activeUrl = config.getActiveConfigUrl();

const RadioListRender = (props) => {
  const data = props.data;
  const { isPlaying, setIsPlaying, currentRadio, setCurrentRadio } = React.useContext(PlayerContext);
  const {colors} = useTheme();
  
  return (
    <View>
    {data.map((item, index) => {
      const activeColor = currentRadio != null ?(item.name == currentRadio.name ? (colors.nav): ("transparent")):"transparent";
      return(
        <List.Item
          style={{
            borderBottomColor: colors.nav,
            borderBottomWidth: 1,
            backgroundColor: activeColor
          }}
          key={index}
          title={item.name}
          description={item.genres}
          left={props => <Avatar.Image size={50} source={{uri: item.logoUrl}} />}
          right={
            props => 
            <View style={styles.listleft}>
              {isPlaying ? (
                item.name == currentRadio.name ? (
                  <Icon 
                    name="pause-circle-outline" 
                    size={40}
                    color={colors.navText} 
                    onPress={() => {
                      setIsPlaying(false), setCurrentRadio(item), pauseRadio(item), console.log("play_home")             
                    }}
                  />
                ):(
                  <Icon 
                    name="play-circle-outline" 
                    size={40}
                    color={colors.text} 
                    onPress={() => {
                      setIsPlaying(true), setCurrentRadio(item), playRadio(item), console.log("play_home")             
                    }}
                  />                  
                )
              ):(
                <Icon 
                  name="play-circle-outline" 
                  size={40}
                  color={colors.text} 
                  onPress={() => {
                    setIsPlaying(true), setCurrentRadio(item), playRadio(item), console.log("play_home")             
                  }}
                />               
              )}
            </View>
          }          
        />
      );
    })}
    </View>
  );
}
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, search: '' };
    this.arrayholder = [];
  }

  async componentDidMount() {
    return fetch(activeUrl+'?stations')
      .then(response => response.json())
      .then(responseJson => {
        RNBootSplash.hide({ duration: 250 });
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.data,
          },
          function() {
            this.arrayholder = responseJson.data;
          },
          
        )
      })
      .catch(error => {
        console.error(error);
      });
  }

  search = text => {
    console.log(text);
  };

  clear = () => {
    this.search.clear();
  };

  SearchFilterFunction(text) {

    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.viewStyle}>
        <SearchBarContext.Consumer>
        {({searchStatus, setSearchStatus}) => 
          searchStatus ?(
              <Searchbar
                onChangeText={text => this.SearchFilterFunction(text)}
                onClear={text => this.SearchFilterFunction('')}
                placeholder="Type Here..."
                value={this.state.search}
              />
          ):(
            null
          )
        }
        </SearchBarContext.Consumer>
        <ScrollView>
         <RadioListRender data={this.state.dataSource}></RadioListRender>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    marginTop: Platform.OS == 'ios' ? 30 : 0,
  },
  textStyle: {
    padding: 10,
  },
  listleft: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '5%'
  }
});