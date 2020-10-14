import React, { useState}  from 'react';

const PlayerContext = React.createContext();

const PlayerProvider = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentRadio, setCurrentRadio] = useState(null);
  const [playbackState, setPlaybackState] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [timer, setTimer] = useState(null);
  const [isPickerOpened, setIsPickerOpened] = useState(false);
  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        currentRadio,
        setCurrentRadio,
        playbackState,
        setPlaybackState,
        currentSong,
        setCurrentSong,
        timer,
        setTimer,
        isPickerOpened,
        setIsPickerOpened
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  )
}

export { PlayerProvider, PlayerContext };