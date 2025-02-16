import { useAppSelector } from '../../../store/store.ts';
import { Box, Typography } from '@mui/material';

export const ServiceAdv = () => {
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
          <b>Тип услуги</b>
        </Typography>
        <Typography>{advertisement?.serviceType}</Typography>
      </Box>
      {/*<Box>*/}
      {/*  <Typography variant="h6">*/}
      {/*    <b>Модель</b>*/}
      {/*  </Typography>*/}
      {/*  <Typography>{advertisement?.model}</Typography>*/}
      {/*</Box>*/}
      <Box>
        <Typography variant="h6">
          <b>График работы</b>
        </Typography>
        <Typography>{advertisement?.workSchedule}</Typography>
      </Box>
    </Box>
  );
};
