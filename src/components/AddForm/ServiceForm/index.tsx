import { ChangeEvent, FC } from 'react';
import { IServiceFormProps } from './types.ts';
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
import { ROUTES } from '../../../constants/routes.ts';
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
import { SERVICE_TYPE } from './constants.ts';

export const ServiceForm: FC<IServiceFormProps> = ({
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

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
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
      serviceType,
      experience,
      cost,
      workSchedule,
    } = formValues;

    if (!serviceType) {
      setErrors((prevState) => ({
        ...prevState,
        serviceType: true,
      }));
    }

    if (!experience) {
      setErrors((prevState) => ({
        ...prevState,
        experience: true,
      }));
    }

    if (!cost) {
      setErrors((prevState) => ({
        ...prevState,
        cost: true,
      }));
    }

    if (!workSchedule) {
      setErrors((prevState) => ({
        ...prevState,
        workSchedule: true,
      }));
    }

    if (serviceType && experience && cost && workSchedule) {
      const newAdv: ICreateAdvertisementData = {
        name,
        description,
        location,
        type,
        serviceType,
        experience: parseInt(String(experience)),
        cost: parseInt(String(cost)),
        workSchedule,
      };

      const updAdv: IUpdateAdvertisementData = {
        id: id!,
        name,
        description,
        location,
        type,
        serviceType,
        experience: parseInt(String(experience)),
        cost: parseInt(String(cost)),
        workSchedule,
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
        <FormControl fullWidth required>
          <InputLabel size="small" error={errors.serviceType}>
            Тип услуги
          </InputLabel>
          <Select
            value={formValues.serviceType}
            onChange={handleSelectChange}
            label="Тип услуги"
            name="serviceType"
            size="small"
            error={errors.serviceType}
          >
            {SERVICE_TYPE.map((option) => (
              <MenuItem key={option.value} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {errors.serviceType && (
            <FormHelperText sx={{ color: 'red' }}>
              Выберите категорию
            </FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid>
        <TextField
          value={formValues.experience}
          name="experience"
          onChange={handleInputChange}
          label="Опыт работы"
          size="small"
          fullWidth
          required
          helperText={errors.experience && 'Заполните поле'}
          error={errors.experience}
          type="number"
        />
      </Grid>
      <Grid>
        <TextField
          value={formValues.cost}
          name="cost"
          onChange={handleInputChange}
          label="Стоимость услуги"
          size="small"
          fullWidth
          required
          type="number"
          helperText={errors.cost && 'Заполните поле'}
          error={errors.cost}
        />
      </Grid>
      <Grid>
        <TextField
          value={formValues.workSchedule}
          name="workSchedule"
          onChange={handleInputChange}
          label="График работы"
          placeholder="Пн-Пт, 9:00-18-00"
          size="small"
          fullWidth
          helperText={errors.workSchedule && 'Заполните поле'}
          error={errors.workSchedule}
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
