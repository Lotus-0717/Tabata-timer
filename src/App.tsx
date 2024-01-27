
import { useState, useEffect } from 'react';
import './App.css'
import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';
import { YouTubePlayer } from 'react-youtube';
import Timer from './components/Timer';
import Video from './components/Video';
import GetVideoUrl from './components/GetVideo';
function App() {
  const [player, setPlayer] = useState(null);
  const [YTId, setYTId] = useState('');
  const [isReady, setIsReady] = useState(false);
  const playVideoHandler = () => {
    (player as YouTubePlayer).playVideo();
  };

  useEffect(() => {
    setIsReady(false);
  }, [YTId]);

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Tabata Timer
      </Typography>
      <GetVideoUrl setYTId={setYTId}></GetVideoUrl>
      <Video
        youtubeId={YTId}
        isReady={isReady}
        setIsReady={setIsReady}
        setPlayer={setPlayer}
      >
      </Video>
      {
        isReady && <Timer></Timer>
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
