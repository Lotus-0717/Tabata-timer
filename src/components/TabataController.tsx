import { Checkbox, FormControlLabel, TextField, Stack } from '@mui/material';
import { TabataOptions } from '../types';

interface TabataControllerProps {
  tabataOptions: TabataOptions;
  setTabataOptions: React.Dispatch<React.SetStateAction<TabataOptions>>;
}

function TabataController({ setTabataOptions }: TabataControllerProps) {
  return (
    <div className="tabataController">
      <Stack
        direction="column"
        spacing={2}
        sx={{
          typography: 'body1',
        }}
      >
        <Stack
          direction="row"
          alignItems="flex-end"
          justifyContent="space-between"
          spacing={2}
        >
          <p>Cycle Count</p>
          <TextField
            label="Cycle Count"
            variant="standard"
            type="number"
            inputProps={{
              min: 0,
            }}
            sx={{
              width: 100,
            }}
            onChange={(event) => {
              setTabataOptions((prevState) => ({
                ...prevState,
                cycleCount: parseInt(event.target.value),
              }));
            }}
          />
        </Stack>
        <Stack
          direction="row"
          alignItems="flex-end"
          justifyContent="space-between"
          spacing={2}
        >
          <p>Rest Seconds</p>
          <TextField
            id="videoSS"
            label="Rest Seconds"
            variant="standard"
            type="number"
            inputProps={{
              min: 0,
            }}
            sx={{
              width: 100,
            }}
            onChange={(event) => {
              setTabataOptions((prevState) => ({
                ...prevState,
                restTime: parseInt(event.target.value),
              }));
            }}
          />
        </Stack>
        <Stack
          direction="row"
          alignItems="flex-end"
          justifyContent="space-between"
          spacing={2}
        >
          <p>Exercise Seconds</p>
          <TextField
            id="videoSS"
            label="Exercise Seconds"
            variant="standard"
            type="number"
            inputProps={{
              min: 0,
            }}
            sx={{
              width: 100,
            }}
            onChange={(event) => {
              setTabataOptions((prevState) => ({
                ...prevState,
                exerciseTime: parseInt(event.target.value),
              }));
            }}
          />
        </Stack>
        <FormControlLabel
          control={<Checkbox />}
          label="Start Exercising Immediately"
          onChange={(_event, checked) => {
            setTabataOptions((prevState) => ({
              ...prevState,
              isExerciseImmediately: checked,
            }));
          }}
        />
      </Stack>
    </div>
  );
}

export default TabataController;
