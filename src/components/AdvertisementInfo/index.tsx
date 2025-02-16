import { Box, Button, Card, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { getAdvertisementByIdAsync } from '../../store/actions/Advertisement';
import { useEffect } from 'react';
import PlaceholderPhoto from '../../../public/250.png';
import styles from './styles.module.css';
import { RealEstateAdv } from './RealEstateAdv';
import { AutoAdv } from './AutoAdv';
import { ServiceAdv } from './ServiceAdv';
import { ROUTES } from '../../constants/routes.ts';

export const AdvertisementInfo = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { advertisement } = useAppSelector((state) => state.advertisement);

  const handleGetAdvertisementById = () => {
    if (id) {
      dispatch(getAdvertisementByIdAsync(parseInt(id)));
    }
  };

  const handleEditClick = () => {
    if (advertisement) {
      navigate(ROUTES.form, {
        state: { advertisement, isEdit: true },
      });
    }
  };

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
          <Box sx={{ width: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5">
                <b>{advertisement?.name}</b>
              </Typography>
              <Button
                size="small"
                variant="contained"
                onClick={handleEditClick}
              >
                Редактировать
              </Button>
            </Box>
            <Box>
              <Typography variant="h6">
                <b>Описание:</b>
              </Typography>
              <Typography>{advertisement?.description}</Typography>
            </Box>
            {advertisement?.price && (
              <Box>
                <Typography variant="h6">
                  <b>Цена:</b>
                </Typography>
                <Typography>{advertisement.price} руб</Typography>
              </Box>
            )}
            {advertisement?.cost && (
              <Box>
                <Typography variant="h6">
                  <b>Стоимость услуги:</b>
                </Typography>
                <Typography>{advertisement.cost} руб</Typography>
              </Box>
            )}
            <Box>
              <Typography variant="h6">
                <b>Местоположение:</b>
              </Typography>
              <Typography>{advertisement?.location}</Typography>
            </Box>

            {advertisement?.type === 'Недвижимость' && <RealEstateAdv />}
            {advertisement?.type === 'Авто' && <AutoAdv />}
            {advertisement?.type === 'Услуги' && <ServiceAdv />}
          </Box>
        </Card>
      </Box>
    </Box>
  );
};
