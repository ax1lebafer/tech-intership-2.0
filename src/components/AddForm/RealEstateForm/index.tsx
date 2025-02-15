import Grid from '@mui/material/Grid2';
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { ChangeEvent, FC } from 'react';
import { IRealEstateFormProps } from './types.ts';
import { PROPERTY_TYPE_OPTIONS } from './constants.ts';
import { useAppDispatch, useAppSelector } from '../../../store/store.ts';
import { createRealEstateAsync } from '../../../store/actions/Advertisement';
import { ICreateRealEstateData } from '../../../store/actions/Advertisement/types.ts';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes.ts';

export const RealEstateForm: FC<IRealEstateFormProps> = ({
  formValues,
  onDataChange,
  setStep,
  errors,
  setErrors,
}) => {
  const dispatch = useAppDispatch();

  const { success } = useAppSelector((state) => state.advertisement);

  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    onDataChange({ [name]: value });

    setErrors((prevState) => ({
      ...prevState,
      [name]: false,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    onDataChange({ [name]: value });

    setErrors((prevState) => ({
      ...prevState,
      [name]: false,
    }));
  };

  const handleCreateAdvertisement = () => {
    const {
      name,
      description,
      location,
      type,
      propertyType,
      area,
      rooms,
      price,
    } = formValues;

    if (!propertyType) {
      setErrors((prevState) => ({
        ...prevState,
        propertyType: true,
      }));
    }

    if (!area) {
      setErrors((prevState) => ({
        ...prevState,
        area: true,
      }));
    }

    if (!rooms) {
      setErrors((prevState) => ({
        ...prevState,
        rooms: true,
      }));
    }

    if (!price) {
      setErrors((prevState) => ({
        ...prevState,
        price: true,
      }));
    }

    if (propertyType && area && rooms && price) {
      const newAdv: ICreateRealEstateData = {
        name,
        description,
        location,
        type,
        propertyType,
        area: parseInt(String(area)),
        rooms: parseInt(String(rooms)),
        price: parseInt(String(price)),
      };

      try {
        dispatch(createRealEstateAsync(newAdv));
        navigate(ROUTES.list);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Grid container spacing={2} direction="column">
      <Grid>
        <FormControl fullWidth required>
          <InputLabel size="small" error={errors.propertyType}>
            Тип недвижимости
          </InputLabel>
          <Select
            value={formValues.propertyType}
            onChange={handleSelectChange}
            label="Тип недвижимости"
            name="propertyType"
            size="small"
            error={errors.propertyType}
          >
            {PROPERTY_TYPE_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {errors.propertyType && (
            <FormHelperText sx={{ color: 'red' }}>
              Выберите категорию
            </FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid>
        <TextField
          value={formValues.area}
          name="area"
          onChange={handleInputChange}
          label="Площадь"
          size="small"
          fullWidth
          required
          type="number"
          helperText={errors.area && 'Заполните поле'}
          error={errors.area}
        />
      </Grid>
      <Grid>
        <TextField
          value={formValues.rooms}
          name="rooms"
          onChange={handleInputChange}
          label="Кол-во комнат"
          size="small"
          fullWidth
          required
          type="number"
          helperText={errors.rooms && 'Заполните поле'}
          error={errors.rooms}
        />
      </Grid>
      <Grid>
        <TextField
          value={formValues.price}
          name="price"
          onChange={handleInputChange}
          label="Цена"
          size="small"
          fullWidth
          required
          type="number"
          helperText={errors.price && 'Заполните поле'}
          error={errors.price}
        />
      </Grid>

      <Grid>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" onClick={() => setStep(1)}>
            Назад
          </Button>
          <Button variant="contained" onClick={handleCreateAdvertisement}>
            Разместить
          </Button>
        </Box>
      </Grid>
      {success && <Alert severity="success">Объявление размещено</Alert>}
    </Grid>
  );
};
