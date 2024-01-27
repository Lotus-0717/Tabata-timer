
import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube';
import { Box } from "@mui/material";

interface VideoProps {
  youtubeId: string;
  isReady: boolean;
  setIsReady: React.Dispatch<React.SetStateAction<boolean>>;
  setPlayer: React.Dispatch<React.SetStateAction<YouTubePlayer>>;
}


function Video({ youtubeId, isReady, setIsReady, setPlayer }: VideoProps) {

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
  };

  const onReady = (event: YouTubePlayer) => {
    setPlayer(event.target);
    setTimeout(() => {
      setIsReady(true);
    }, 1000)
  };

  return (
    <Box sx={{ position: 'relative', marginBottom: 1 }}>
      {youtubeId && <YouTube
        videoId={youtubeId}
        opts={opts}
        onReady={onReady}
      />}
      {
        !isReady &&
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 1,
          height: 1
        }}></Box>
      }
    </Box>
  );
}

export default Video;