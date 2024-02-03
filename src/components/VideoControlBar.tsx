import { LoadingButton } from '@mui/lab';
import { Stack, IconButton } from '@mui/material';
import { YouTubePlayer } from 'react-youtube';
import { Pause, PlayArrow, Stop } from '@mui/icons-material';
import { TabataOptions, Sequence } from '../types';

interface VideoControlBarProps {
  isReady: boolean;
  player: YouTubePlayer;
  startTime: number;
  videoState: string;
  setVideoState: React.Dispatch<React.SetStateAction<string>>;
  tabataOptions: TabataOptions;
  setTabataOptions: React.Dispatch<React.SetStateAction<TabataOptions>>;
}
function VideoControlBar({
  isReady,
  player,
  startTime,
  videoState,
  tabataOptions,
  setTabataOptions,
}: VideoControlBarProps) {
  const buildTabataSequence = () => {
    const sequence: Sequence[] = [];
    for (let i = 0; i < tabataOptions.cycleCount; i++) {
      sequence.push(
        {
          stage: 'rest',
          time: tabataOptions.restTime,
        },
        {
          stage: 'exercise',
          time: tabataOptions.exerciseTime,
        }
      );
    }
    if (tabataOptions.isExerciseImmediately) {
      sequence.shift();
    }
    setTabataOptions((prevState) => ({
      ...prevState,
      sequence: sequence,
    }));
  };

  const startVideoHandler = () => {
    player.seekTo(startTime);
    // player.playVideo();
    // setVideoState('start');
    buildTabataSequence();
  };

  const playVideoHandler = () => {
    player.playVideo();
    // setVideoState('playing');
  };

  const pauseVideoHandler = () => {
    player.pauseVideo();
    // setVideoState('pausing');
  };

  const stopVideoHandler = () => {
    player.seekTo(99999);
    // setVideoState('ready');
  };

  return (
    <Stack direction={'row'} spacing={2}>
      {videoState === 'ready' && (
        <LoadingButton
          variant="contained"
          color="primary"
          loading={!isReady}
          onClick={startVideoHandler}
          startIcon={<PlayArrow />}
        >
          Start
        </LoadingButton>
      )}
      {videoState !== 'ready' && (
        <>
          <IconButton
            aria-label="Play"
            color="primary"
            onClick={playVideoHandler}
          >
            <PlayArrow />
          </IconButton>
          <IconButton
            aria-label="Pause"
            color="primary"
            onClick={pauseVideoHandler}
          >
            <Pause />
          </IconButton>
          <IconButton
            aria-label="Stop"
            color="primary"
            onClick={stopVideoHandler}
          >
            <Stop />
          </IconButton>
        </>
      )}
    </Stack>
  );
}

export default VideoControlBar;
