import { Box, Button, Typography } from '@mui/material';

export const Header = () => {
  return (
    <Box
      component={'header'}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem',
      }}
    >
      <Typography sx={{ fontSize: '20px' }}>LOGO</Typography>

      <Button variant="contained">Разместить объявление</Button>
    </Box>
  );
};
