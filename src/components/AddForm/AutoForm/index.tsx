import Grid from '@mui/material/Grid2';
import { Alert, Box, Button, TextField } from '@mui/material';
import { ChangeEvent, FC } from 'react';
import { IAutoFormProps } from './types.ts';
import { ROUTES } from '../../../constants/routes.ts';
import { useAppDispatch, useAppSelector } from '../../../store/store.ts';
import { useNavigate } from 'react-router-dom';
import {
  ICreateAdvertisementData,
  IUpdateAdvertisementData,
} from '../../../store/actions/Advertisement/types.ts';
import {
  createAdvertisementAsync,
  updateAdvertisementAsync,
} from '../../../store/actions/Advertisement';

export const AutoForm: FC<IAutoFormProps> = ({
  formValues,
  onDataChange,
  setStep,
  errors,
  setErrors,
  isEdit,
}) => {
  const dispatch = useAppDispatch();

  const { success, error } = useAppSelector((state) => state.advertisement);

  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    onDataChange({ [name]: value });

    setErrors((prevState) => ({
      ...prevState,
      [name]: false,
    }));
  };

  const handleCreateAdvertisement = async () => {
    const {
      id,
      name,
      description,
      location,
      type,
      brand,
      model,
      year,
      mileage,
    } = formValues;

    if (!brand) {
      setErrors((prevState) => ({
        ...prevState,
        brand: true,
      }));
    }

    if (!model) {
      setErrors((prevState) => ({
        ...prevState,
        model: true,
      }));
    }

    if (!year) {
      setErrors((prevState) => ({
        ...prevState,
        year: true,
      }));
    }

    if (!mileage) {
      setErrors((prevState) => ({
        ...prevState,
        mileage: true,
      }));
    }

    if (brand && model && year && mileage) {
      const newAdv: ICreateAdvertisementData = {
        name,
        description,
        location,
        type,
        brand,
        model,
        year: parseInt(String(year)),
        mileage: parseInt(String(mileage)),
      };

      const updAdv: IUpdateAdvertisementData = {
        id: id!,
        name,
        description,
        location,
        type,
        brand,
        model,
        year: parseInt(String(year)),
        mileage: parseInt(String(mileage)),
      };

      try {
        if (isEdit) {
          await dispatch(updateAdvertisementAsync(updAdv)).unwrap();
        } else {
          await dispatch(createAdvertisementAsync(newAdv)).unwrap();
        }
        navigate(ROUTES.list);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Grid container spacing={2} direction="column">
      <Grid>
        <TextField
          value={formValues.brand}
          name="brand"
          onChange={handleInputChange}
          label="Марка"
          size="small"
          fullWidth
          required
          helperText={errors.brand && 'Заполните поле'}
          error={errors.brand}
        />
      </Grid>
      <Grid>
        <TextField
          value={formValues.model}
          name="model"
          onChange={handleInputChange}
          label="Модель"
          size="small"
          fullWidth
          required
          helperText={errors.model && 'Заполните поле'}
          error={errors.model}
        />
      </Grid>
      <Grid>
        <TextField
          value={formValues.year}
          name="year"
          onChange={handleInputChange}
          label="Год выпуска"
          size="small"
          fullWidth
          required
          type="number"
          helperText={errors.year && 'Заполните поле'}
          error={errors.year}
        />
      </Grid>
      <Grid>
        <TextField
          value={formValues.mileage}
          name="mileage"
          onChange={handleInputChange}
          label="Пробег"
          size="small"
          fullWidth
          type="number"
          required
          helperText={errors.mileage && 'Заполните поле'}
          error={errors.mileage}
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
      {error && <Alert severity="error">{error}</Alert>}
    </Grid>
  );
};
