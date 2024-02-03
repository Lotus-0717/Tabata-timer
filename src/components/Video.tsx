import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube';
import { Box } from '@mui/material';
import { useState } from 'react';

interface VideoProps {
  youtubeId: string;
  isReady: boolean;
  setIsReady: React.Dispatch<React.SetStateAction<boolean>>;
  setPlayer: React.Dispatch<React.SetStateAction<YouTubePlayer>>;
  setVideoState: React.Dispatch<React.SetStateAction<string>>;
}

interface YouTubeEvent {
  data: number;
  target: YouTubePlayer;
}

function Video({
  youtubeId,
  isReady,
  setIsReady,
  setPlayer,
  setVideoState,
}: VideoProps) {
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const opts: YouTubeProps['opts'] = {
    height: '340',
    width: '600',
    playerVars: {
      autoplay: 1,
    },
  };

  const onStateChange = (event: YouTubeEvent) => {
    console.log(event);
    switch (event.data) {
      case -1:
        console.log(-1);
        setVideoState('ready');
        break;
      case 0:
        console.log(0);
        setVideoState('ready');
        break;
      case 1:
        console.log(1);
        if (!isFirstLoad) {
          setVideoState('playing');
        } else {
          setIsFirstLoad(false);
        }
        break;
      case 2:
        console.log(2);
        setVideoState('pausing');
        break;
      case 3:
        break;
      case 5:
        break;
    }
  };

  const onReady = (event: YouTubePlayer) => {
    setPlayer(event.target);
    setTimeout(() => {
      setIsReady(true);
    }, 1000);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {youtubeId && (
        <YouTube
          videoId={youtubeId}
          opts={opts}
          onReady={onReady}
          onStateChange={onStateChange}
          id="player"
        />
      )}
      {!isReady && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 1,
            height: 1,
          }}
        ></Box>
      )}
    </Box>
  );
}

export default Video;
