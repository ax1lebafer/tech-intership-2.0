import { Box, Typography } from '@mui/material';
import { AdvertisementList } from '../../components/AdvertisementList';

export const ListPage = () => {
  return (
    <Box component="main">
      <Typography component="h1" variant="h4" sx={{ marginBottom: '1rem' }}>
        Объявления
      </Typography>

      <AdvertisementList />
    </Box>
  );
};
