import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export const ItemPage = () => {
  const { id } = useParams();

  return (
    <Box component="main">
      <Typography variant="h4" component="h1" sx={{ marginBottom: '1rem' }}>
        Объявление #{id}
      </Typography>
    </Box>
  );
};
