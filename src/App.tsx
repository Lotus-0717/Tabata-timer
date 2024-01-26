
import { useState, useEffect } from 'react';
import './App.css'
import { LoadingButton } from '@mui/lab';
import { Typography, Button, TextField, Box } from '@mui/material';
import { YouTubePlayer } from 'react-youtube';
import Timer from './components/Timer';
import Video from './components/Video'
function App() {
  const [player, setPlayer] = useState(null);
  const [YTId, setYTId] = useState('');
  const [isReady, setIsReady] = useState(false);
  const getVideo = () => {
    const videoUrlField = document.querySelector<HTMLInputElement>('#videoUrl');
    if (videoUrlField) {
      const part = videoUrlField.value.split('v=');
      if (part.length > 1) {
        const id = part[1].split('&')[0];
        setYTId(id);
      }
    }
  }
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
      <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 1, marginBottom: 4 }}>
        <TextField
          id="videoUrl"
          label="Video Url"
          variant="standard"
          onKeyDown={(e) => {
            if(e.key === 'Enter') {
              getVideo();
            }
          }}
        />
        <Button variant="contained" color='primary' onClick={() => {
          getVideo();
        }}>
          Get!
        </Button>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Video
          youtubeId={YTId}
          isReady={isReady}
          setIsReady={setIsReady}
          setPlayer={setPlayer}
        >
        </Video>
      </Box>
      <LoadingButton
        variant="contained"
        color='primary'
        loading={!isReady}
        onClick={playVideoHandler}
      >
        Play
      </LoadingButton>
      {
        isReady && <Timer></Timer>
      }
    </>
  )
}

export default App
