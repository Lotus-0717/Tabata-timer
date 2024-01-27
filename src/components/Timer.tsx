import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface TimerProps{
  setStartTime: React.Dispatch<React.SetStateAction<number>>;
}

function Timer({setStartTime}: TimerProps) {
  const [HH, setHH] = useState(0);
  const [MM, setMM] = useState(0);
  const [SS, setSS] = useState(0);
  const getTotalTime = () => {
    setStartTime((HH * 3600) + (MM * 60) + SS);
  }

  useEffect(getTotalTime, [HH, MM, SS]);
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      marginBottom: 2,
      '& > :not(style)': { m: 1, width: '15ch' },
    }}>
      <Typography variant="body1" gutterBottom sx={{
        width: 'auto !important'
      }}>
        Start Time:
      </Typography>
      <TextField
        id="videoHH"
        label="Video Hours"
        variant="standard"
        type="number"
        InputProps={{
          inputProps: {
            min: 0
          }
        }}
        onChange={(event) => {
          setHH(Number(event.target.value));
          getTotalTime();
        }}
      />
      <Typography variant="body1" gutterBottom sx={{
        width: 'auto !important'
      }}>
        :
      </Typography>
      <TextField
        id="videoMM"
        label="Video minutes"
        variant="standard"
        type="number"
        InputProps={{
          inputProps: {
            min: 0
          }
        }}
        onChange={(event) => {
          setMM(Number(event.target.value));
          getTotalTime();
        }}
      />
      <Typography variant="body1" gutterBottom sx={{
        width: 'auto !important'
      }}>
        :
      </Typography>
      <TextField
        id="videoSS"
        label="Video seconds"
        variant="standard"
        type="number"
        InputProps={{
          inputProps: {
            min: 0
          }
        }}
        onChange={(event) => {
          setSS(Number(event.target.value));
          getTotalTime();
        }}
      />
    </Box>
  );
}

export default Timer;