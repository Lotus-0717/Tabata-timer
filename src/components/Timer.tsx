import { Box, TextField, Typography } from "@mui/material";


function Timer() {

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
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
      />
    </Box>
  );
}

export default Timer;