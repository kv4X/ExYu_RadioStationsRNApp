import TrackPlayer from 'react-native-track-player';
export default function Timer(seconds){
  setTimeout(() => {
    console.log("pauza");
    TrackPlayer.pause()
  }, seconds*1000);
}