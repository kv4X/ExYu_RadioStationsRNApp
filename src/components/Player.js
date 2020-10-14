import React, { useContext } from 'react';
import { PlayerProvider, PlayerContext } from '../providers/PlayerProvider';
import TrackPlayer, {
  useTrackPlayerProgress,
  usePlaybackState,
  useTrackPlayerEvents
} from "react-native-track-player";


const playRadio = async (currentRadio) => {
  TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
    ],
    compactCapabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE
    ]
  });

  await TrackPlayer.reset();
  await TrackPlayer.setupPlayer({
    playBuffer: 0.5,
    maxBuffer: 5,
    minBuffer: 1,
  });
  await TrackPlayer.add({
      id: currentRadio.id,
      url: currentRadio.urlStream,
      title: currentRadio.name,
      artist: currentRadio.name,
      artwork: currentRadio.urlLogo
  });

  await TrackPlayer.play();
};

const pauseRadio = async () => {
  await TrackPlayer.pause();
};

export { playRadio, pauseRadio };