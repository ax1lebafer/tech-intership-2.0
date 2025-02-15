import { Box, Card, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { getAdvertisementByIdAsync } from '../../store/actions/Advertisement';
import { useEffect } from 'react';
import PlaceholderPhoto from '../../../public/250.png';
import styles from './styles.module.css';
import { RealEstateAdv } from './RealEstateAdv';

export const AdvertisementInfo = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { advertisement } = useAppSelector((state) => state.advertisement);

  const handleGetAdvertisementById = () => {
    if (id) {
      dispatch(getAdvertisementByIdAsync(parseInt(id)));
    }
  };

  console.log(advertisement);

  useEffect(() => {
    handleGetAdvertisementById();
  }, [id]);

  return (
    <Box>
      <Box>
        <Card className={styles.card}>
          <Box>
            <img
              className={styles.photo}
              src={advertisement?.photo || PlaceholderPhoto}
              alt="Фото"
            />
          </Box>
          <Box>
            <Typography variant="h5">
              <b>{advertisement?.name}</b>
            </Typography>
            <Box>
              <Typography variant="h6">
                <b>Описание:</b>
              </Typography>
              <Typography>{advertisement?.description}</Typography>
            </Box>
            <Box>
              <Typography variant="h6">
                <b>Цена:</b>
              </Typography>
              <Typography>{advertisement?.price} руб</Typography>
            </Box>
            <Box>
              <Typography variant="h6">
                <b>Местоположение:</b>
              </Typography>
              <Typography>{advertisement?.location}</Typography>
            </Box>

            {advertisement?.type === 'Недвижимость' && <RealEstateAdv />}
          </Box>
        </Card>
      </Box>
    </Box>
  );
};
