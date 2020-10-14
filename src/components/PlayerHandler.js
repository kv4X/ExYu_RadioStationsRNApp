import TrackPlayer from 'react-native-track-player';

module.exports = async function() {

  TrackPlayer.addEventListener('remote-play', async() => {
    console.log("#DEBUG remote play #");
    let buffer = await TrackPlayer.getBufferedPosition();
    console.log(buffer);
    await TrackPlayer.seekTo(buffer);
    await TrackPlayer.play();
    // Rjesen problem sa bufferom
    /*let trackId = await TrackPlayer.getCurrentTrack();
    let trackObject = await TrackPlayer.getTrack(trackId);
    await TrackPlayer.reset();
    await TrackPlayer.add(trackObject);*/
   // await TrackPlayer.play();

    //TrackPlayer.play(); 
     /* var counter = 0; 
      let refreshPlay = setInterval(async () => {
        counter = 0;
        let playerState = await TrackPlayer.getState();
        if(playerState !== TrackPlayer.STATE_STOPPED && playerState !== TrackPlayer.STATE_PLAYING){
          await TrackPlayer.play();
        }else{
          if(counter <= 2){
            clearInterval(refreshPlay);
          }
        }
    }, 1000);
    refreshPlay;
    */
    
  });

  TrackPlayer.addEventListener('remote-pause', () => {
    console.log("#DEBUG remote pause #");
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener("remote-duck", async data => {
    console.log("#DEBUG remote duck #");
    let {
      paused: shouldPause,
      ducking: shouldDuck,
      permanent: permanentLoss
    } = data;
  
    let playerState = await TrackPlayer.getState();
  
    if(shouldPause || shouldDuck){
      TrackPlayer.pause();
      if(playerState === TrackPlayer.STATE_PLAYING){
        didPauseTemporarily = !permanentLoss;
        if(didPauseTemporarily){
          didPauseTemporarilyTime = Date.now();
        }
      }else{
        didPauseTemporarily = false;
      }
    }else if(didPauseTemporarily){
      if(playerState === TrackPlayer.STATE_PAUSED){
        let secondsSincePause = (Date.now() - didPauseTemporarilyTime) / 1000;
        if(secondsSincePause < 5){
          TrackPlayer.play();
        }
      }
      didPauseTemporarily = false;
    }
  });

  if(Platform.OS === 'android'){
    TrackPlayer.addEventListener('playback-metadata-received', async (e) =>{
        const currentTrack = await TrackPlayer.getCurrentTrack();
        if(e.title == null || e.title == "" || e.artist == null || e.artist == ""){
          TrackPlayer.updateMetadataForTrack(currentTrack, { title: "Slušate radio uživo", artist: e.title });
        }else{
          TrackPlayer.updateMetadataForTrack(currentTrack, { title: e.title, artist: e.artist });
        }
    });
  } 
  /*
  else {
    setInterval(() => {
        fetch(....).then(r => r.json()).then(data => {
            const currentTrack = await TrackPlayer.getCurrentTrack();
            TrackPlayer.updateMetadataForTrack(currentTrack, { title: data.title, artist: data.artist });
        });
    }, 1000 * 60); // Repeat every minute
  }
  */
};