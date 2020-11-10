import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Platform,
  Image,
  ScrollView,
  Alert
} from 'react-native';
import { Searchbar, List, Avatar, useTheme, useNavigationParam, ActivityIndicator, Colors } from 'react-native-paper';
//import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
//import { Icon as MaterialIcons } from 'react-native-vector-icons/MaterialIcons';

import { SearchBarProvider, SearchBarContext } from '../providers/SearchBarProvider';
import { PlayerProvider, PlayerContext } from '../providers/PlayerProvider';

import { playRadio, pauseRadio } from '../components/Player';
import RNBootSplash from "react-native-bootsplash";
import config from '../api/config';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';
import SyncStorage from 'sync-storage';

const activeUrl = config.getActiveConfigUrl();
const RadioItem = ({radio}) => {
  const { isPlaying, setIsPlaying, currentRadio, setCurrentRadio } = React.useContext(PlayerContext);
  const {colors} = useTheme();
  const activeColor = currentRadio != null ?(radio.name == currentRadio.name ? (colors.nav): ("transparent")):"transparent";
  return (
    <View style={[styles.row, {height: 80, backgroundColor: activeColor, borderBottomColor: colors.nav, borderBottomWidth: 1}]}>
      <View style={[styles.content, styles.left, {marginLeft: 20}]}>
        <Avatar.Image size={50} source={{uri: radio.urlLogo}} />
      </View>
      <View style={[styles.content, {marginLeft: 5}]}>
        <Text style={[styles.title, {color: colors.primary}]}>
          {radio.name}
        </Text>
        <Text style={{color: colors.text2}}>{radio.genres}</Text>
      </View>
      <View style={[styles.content, styles.left]}>
        {isPlaying ? (
          radio.name == currentRadio.name ? (
            <Icon 
              name="pause-circle-outline" 
              size={40}
              color={colors.navText} 
              onPress={() => {
                setIsPlaying(false), setCurrentRadio(radio), pauseRadio(radio), console.log("play_home")             
              }}
            />
          ):(
            <Icon 
              name="play-circle-outline" 
              size={40}
              color={colors.text} 
              onPress={() => {
                setIsPlaying(true), setCurrentRadio(radio), playRadio(radio), console.log("play_home")             
              }}
            />                  
          )
        ):(
          <Icon 
            name="play-circle-outline" 
            size={40}
            color={colors.text} 
            onPress={() => {
              setIsPlaying(true), setCurrentRadio(radio), playRadio(radio), console.log("play_home")             
            }}
          />               
        )}
      </View>
    </View>
  )
}


export default class FavouritesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, search: '' };
    this.arrayholder = [];
  }
  async UNSAFE_componentWillMount(){
    //await AsyncStorage.clear();

    const data = await SyncStorage.init();
   }
  async componentMount() {
    //HELPED: https://stackoverflow.com/questions/50290818/react-navigation-detect-when-screen-tabbar-is-activated-appear-focus-blu
    const { navigation } = this.props;
    var str;
    this.focusListener = navigation.addListener("focus", async () => {
      RNBootSplash.hide({ duration: 250 });
     // let favouriteIDs = await AsyncStorage.getItem('favourites2');
      let favouriteIDs = SyncStorage.get('favourites2');
      if(favouriteIDs !== null){
        favouriteIDs = JSON.parse(favouriteIDs);
        var length = favouriteIDs.length;
        str = '';
        for(var i=0;i<length;i++){
          str += favouriteIDs[i];
          if(i < (length-1) ){
            str += ',';  // add separator
          }
        }
      }else{
        str = 0;
      }

      if(str != 0){
        fetch(activeUrl+'/getRS.php?ids='+str)
          .then(response => response.json())
          .then(responseJson => {
          // console.log(responseJson.data),
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
      }else{
        this.setState(
          {
            isLoading: false,
            dataSource: [],
          },
          function() {
            this.arrayholder = [];
          },
        )
      }
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
    //Alert.alert("Tajmer", "Radio stanica ce biti pauzirana u: ");

    if(this.state.isLoading){
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator animating={true} color={Colors.red800} />
        </View>
      );
    }else if(this.arrayholder.length == 0 || this.arrayholder === undefined){
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{color: Colors.red800}}>Nemate nijednu radio stanicu u omiljenim!</Text>
        </View>
      );     
    }else{
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
          <FlatList
            data={this.state.dataSource}
            renderItem={({item}) => <RadioItem radio = {item} />}
            enableEmptySections={true}
            style={{ marginTop: 10 }}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      );
    }
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
  },
  container: {
    width: '100%',
    padding: 8,
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
  },
  description: {
    fontSize: 14,
  },
  marginVerticalNone: { marginVertical: 0 },
  iconMarginLeft: { marginLeft: 0, marginRight: 16 },
  iconMarginRight: { marginRight: 0 },
  item: {
    marginVertical: 6,
    paddingLeft: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  left: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center"
  }
});