import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../../../store/store.ts';

export const RealEstateAdv = () => {
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
          <b>Тип недвижимости</b>
        </Typography>
        <Typography>{advertisement?.propertyType}</Typography>
      </Box>
      <Box>
        <Typography variant="h6">
          <b>Площадь</b>
        </Typography>
        <Typography>{advertisement?.area} кв. м.</Typography>
      </Box>
      <Box>
        <Typography variant="h6">
          <b>Кол-во комнат</b>
        </Typography>
        <Typography>{advertisement?.rooms}-к</Typography>
      </Box>
    </Box>
  );
};
