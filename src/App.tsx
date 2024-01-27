
import { useState, useEffect } from 'react';
import './App.css'
import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';
import { YouTubePlayer } from 'react-youtube';
import Timer from './components/Timer';
import Video from './components/Video';
import GetVideoUrl from './components/GetVideoUrl';
function App() {
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [ytId, setYtId] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const playVideoHandler = () => {
    player.seekTo(startTime);
    player.playVideo();
  };

  useEffect(() => {
    setIsReady(false);
  }, [ytId]);

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Tabata Timer
      </Typography>
      <GetVideoUrl setYtId={setYtId}></GetVideoUrl>
      <Video
        youtubeId={ytId}
        isReady={isReady}
        setIsReady={setIsReady}
        setPlayer={setPlayer}
      >
      </Video>
      {
        isReady && <Timer setStartTime={setStartTime}></Timer>
      }
      <LoadingButton
        variant="contained"
        color='primary'
        loading={!isReady}
        onClick={playVideoHandler}
      >
        Play
      </LoadingButton>
    </>
  )
}

export default App
