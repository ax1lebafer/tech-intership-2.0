import { Box, Button, Card, Pagination, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { getAdvertisementsAsync } from '../../store/actions/Advertisement';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Grid from '@mui/material/Grid2';
import PlaceholderPhoto from '../../../public/250.png';
import { useNavigate } from 'react-router-dom';

export const AdvertisementList = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { advertisements } = useAppSelector((state) => state.advertisement);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getCurrentPageItems = () => {
    const firstIndex = (currentPage - 1) * itemsPerPage;
    const lastIndex = firstIndex + itemsPerPage;
    return advertisements?.slice(firstIndex, lastIndex) || [];
  };
  const handleGetAdvertisement = () => {
    dispatch(getAdvertisementsAsync());
  };

  useEffect(() => {
    handleGetAdvertisement();
  }, []);

  console.log('advertisements:', advertisements);

  return (
    <Box className={styles.wrapper}>
      <Grid container spacing={2} sx={{ minHeight: '80vh' }}>
        {advertisements &&
          getCurrentPageItems().map((adv) => {
            return (
              <Grid size={3}>
                <Card key={adv.id} className={styles.card}>
                  <img
                    src={adv.photo || PlaceholderPhoto}
                    alt="Фото"
                    className={styles.photo}
                  />
                  <Typography>{adv.name}</Typography>
                  <Typography>{adv.location}</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography>{adv.type}</Typography>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => navigate(`/items/${adv.id}`)}
                    >
                      Открыть
                    </Button>
                  </Box>
                </Card>
              </Grid>
            );
          })}
      </Grid>

      <Box className={styles.pagination}>
        <Pagination
          count={Math.ceil((advertisements?.length || 0) / itemsPerPage)}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          variant="outlined"
          color="primary"
        />
      </Box>
    </Box>
  );
};
