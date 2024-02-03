import { useState, useEffect } from 'react';
import './App.css';
import { Typography } from '@mui/material';
import { YouTubePlayer } from 'react-youtube';
import VideoTimer from './components/VideoTimer';
import Video from './components/Video';
import GetVideoUrl from './components/GetVideoUrl';
import TabataController from './components/TabataController';
import VideoControlBar from './components/VideoControlBar';
import TabataTimer from './components/TabataTimer';
import { TabataOptions } from './types';

function App() {
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [ytId, setYtId] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [videoState, setVideoState] = useState('ready');
  const [tabataOptions, setTabataOptions] = useState<TabataOptions>({
    cycleCount: 0,
    exerciseTime: 0,
    restTime: 0,
    isExerciseImmediately: false,
    sequence: [],
  });
  useEffect(() => {
    setIsReady(false);
  }, [ytId]);

  return (
    <>
      <main>
        <Typography variant="h3" gutterBottom>
          Tabata Timer
        </Typography>
        <GetVideoUrl setYtId={setYtId}></GetVideoUrl>
        <Video
          youtubeId={ytId}
          isReady={isReady}
          setIsReady={setIsReady}
          setPlayer={setPlayer}
          setVideoState={setVideoState}
        ></Video>
        <VideoControlBar
          startTime={startTime}
          isReady={isReady}
          player={player}
          setVideoState={setVideoState}
          videoState={videoState}
          tabataOptions={tabataOptions}
          setTabataOptions={setTabataOptions}
        ></VideoControlBar>
        <TabataTimer
          videoState={videoState}
          tabataOptions={tabataOptions}
        ></TabataTimer>
        <VideoTimer setStartTime={setStartTime}></VideoTimer>
        <TabataController
          tabataOptions={tabataOptions}
          setTabataOptions={setTabataOptions}
        ></TabataController>
      </main>
    </>
  );
}

export default App;
