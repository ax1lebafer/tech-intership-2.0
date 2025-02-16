import {
  Box,
  Button,
  Card,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { getAdvertisementsAsync } from '../../store/actions/Advertisement';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Grid from '@mui/material/Grid2';
import PlaceholderPhoto from '../../../public/250.png';
import { useNavigate } from 'react-router-dom';
import { ITEMS_PER_PAGE } from './constants.ts';
import SearchIcon from '@mui/icons-material/Search';

export const AdvertisementList = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { advertisements } = useAppSelector((state) => state.advertisement);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setSelectedType(event.target.value);
    setCurrentPage(1);
  };

  const filteredAdvertisements = advertisements?.filter((adv) => {
    const matchesSearch = adv.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = selectedType ? adv.type === selectedType : true;
    return matchesSearch && matchesType;
  });

  const getCurrentPageItems = () => {
    const firstIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const lastIndex = firstIndex + ITEMS_PER_PAGE;
    return filteredAdvertisements?.slice(firstIndex, lastIndex) || [];
  };
  const handleGetAdvertisement = () => {
    dispatch(getAdvertisementsAsync());
  };

  useEffect(() => {
    handleGetAdvertisement();
  }, []);

  return (
    <Box className={styles.wrapper}>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          marginBottom: 2,
          justifyContent: 'space-between',
        }}
      >
        <TextField
          label="Поиск по названию"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: '300px' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <InputLabel>Тип объявления</InputLabel>
          <Select
            value={selectedType}
            onChange={handleTypeChange}
            label="Тип объявления"
          >
            <MenuItem value="">Все</MenuItem>
            <MenuItem value="Недвижимость">Недвижимость</MenuItem>
            <MenuItem value="Авто">Авто</MenuItem>
            <MenuItem value="Услуги">Услуги</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2} sx={{ minHeight: '80vh' }}>
        {getCurrentPageItems().map((adv) => {
          return (
            <Grid size={3}>
              <Card key={adv.id} className={styles.card}>
                <img
                  src={adv.photo || PlaceholderPhoto}
                  alt="Фото"
                  className={styles.photo}
                />
                <Typography>
                  <b>{adv.name}</b>
                </Typography>
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
                    onClick={() => navigate(`/item/${adv.id}`)}
                  >
                    Открыть
                  </Button>
                </Box>
              </Card>
            </Grid>
          );
        })}

        {!getCurrentPageItems().length && (
          <Grid
            size={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5">Нет объявлений</Typography>
          </Grid>
        )}
      </Grid>

      {getCurrentPageItems().length > 0 && (
        <Box className={styles.pagination}>
          <Pagination
            count={Math.ceil(
              (filteredAdvertisements?.length || 0) / ITEMS_PER_PAGE
            )}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            variant="outlined"
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};
