import { Box, Button, TextField } from "@mui/material";
interface GetVideoUrlProps {
  setYtId: React.Dispatch<React.SetStateAction<string>>;
}
function GetVideoUrl({setYtId}: GetVideoUrlProps) {
  const getVideo = () => {
    const videoUrlField = document.querySelector<HTMLInputElement>('#videoUrl');
    if (videoUrlField) {
      const part = videoUrlField.value.split('v=');
      if (part.length > 1) {
        const id = part[1].split('&')[0];
        setYtId(id);
      }
    }
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 1, marginBottom: 4 }}>
      <TextField
        id="videoUrl"
        label="Video Url"
        variant="standard"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
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
  )
}

export default GetVideoUrl;


