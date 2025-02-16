import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.ts';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <Box
      component={'header'}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 0',
      }}
    >
      <Box>
        <Typography
          sx={{ fontSize: '20px', cursor: 'pointer' }}
          onClick={() => navigate(ROUTES.list)}
        >
          LOGO
        </Typography>
      </Box>

      <Button variant="contained" onClick={() => navigate(ROUTES.form)}>
        Разместить объявление
      </Button>
    </Box>
  );
};
