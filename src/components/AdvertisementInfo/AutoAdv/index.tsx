import { useAppSelector } from '../../../store/store.ts';
import { Box, Typography } from '@mui/material';

export const AutoAdv = () => {
  const { advertisement } = useAppSelector((state) => state.advertisement);

  return (
    <Box sx={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
      <Box>
        <Typography variant="h6">
          <b>Тип</b>
        </Typography>
        <Typography>{advertisement?.type}</Typography>
      </Box>
      <Box>
        <Typography variant="h6">
          <b>Марка</b>
        </Typography>
        <Typography>{advertisement?.brand}</Typography>
      </Box>
      <Box>
        <Typography variant="h6">
          <b>Модель</b>
        </Typography>
        <Typography>{advertisement?.model}</Typography>
      </Box>
      <Box>
        <Typography variant="h6">
          <b>Пробег</b>
        </Typography>
        <Typography>{advertisement?.mileage} км.</Typography>
      </Box>
    </Box>
  );
};
