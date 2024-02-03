import { Box, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface VideoTimerProps {
  setStartTime: React.Dispatch<React.SetStateAction<number>>;
}

function VideoTimer({ setStartTime }: VideoTimerProps) {
  const [HH, setHH] = useState(0);
  const [MM, setMM] = useState(0);
  const [SS, setSS] = useState(0);
  const getTotalTime = () => {
    setStartTime(HH * 3600 + MM * 60 + SS);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(getTotalTime, [HH, MM, SS]);
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        '& > :not(style)': { m: 1, width: '15ch' },
      }}
    >
      <Typography
        variant="body1"
        gutterBottom
        sx={{
          width: 'auto !important',
        }}
      >
        Start Time:
      </Typography>
      <TextField
        id="videoHH"
        label="Video Hours"
        variant="standard"
        type="number"
        InputProps={{
          inputProps: {
            min: 0,
          },
        }}
        onChange={(event) => {
          setHH(Number(event.target.value));
          getTotalTime();
        }}
      />
      <Typography
        variant="body1"
        gutterBottom
        sx={{
          width: 'auto !important',
        }}
      >
        :
      </Typography>
      <TextField
        id="videoMM"
        label="Video minutes"
        variant="standard"
        type="number"
        InputProps={{
          inputProps: {
            min: 0,
          },
        }}
        onChange={(event) => {
          setMM(Number(event.target.value));
          getTotalTime();
        }}
      />
      <Typography
        variant="body1"
        gutterBottom
        sx={{
          width: 'auto !important',
        }}
      >
        :
      </Typography>
      <TextField
        id="videoSS"
        label="Video seconds"
        variant="standard"
        type="number"
        InputProps={{
          inputProps: {
            min: 0,
            max: 59,
          },
        }}
        onChange={(event) => {
          setSS(Number(event.target.value));
          getTotalTime();
        }}
      />
    </Box>
  );
}

export default VideoTimer;
