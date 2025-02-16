import { ChangeEvent, FC, useEffect, useState } from 'react';
import { IAddFormProps, IAddFormValues } from './types.ts';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import {
  CATEGORY_OPTIONS,
  INITIAL_ADD_FORM_VALUES,
  INITIAL_ERRORS_VALUES,
} from './constants.ts';
import Grid from '@mui/material/Grid2';
import styles from './styles.module.css';
import { RealEstateForm } from './RealEstateForm';
import { AutoForm } from './AutoForm';
import { ServiceForm } from './ServiceForm';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../store/store.ts';
import { resetSuccess } from '../../store/reducers/Advertisement';

export const AddForm: FC<IAddFormProps> = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const { advertisement, isEdit } = location.state || {};

  const [formValues, setFormValues] = useState<IAddFormValues>(
    advertisement || INITIAL_ADD_FORM_VALUES
  );
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState(INITIAL_ERRORS_VALUES);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors((prevState) => ({
      ...prevState,
      [name]: false,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;

    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors((prevState) => ({
      ...prevState,
      [name]: false,
    }));
  };

  const handleUploadPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;

    setFormValues((prevState) => ({
      ...prevState,
      [name]: files && files.length ? files[0] : '',
    }));
  };

  const handleRealEstateChange = (data: Partial<IAddFormValues>) => {
    setFormValues((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  const handleNextStep = () => {
    if (!formValues.name) {
      setErrors((prevState) => ({
        ...prevState,
        name: true,
      }));
    }

    if (!formValues.description) {
      setErrors((prevState) => ({
        ...prevState,
        description: true,
      }));
    }

    if (!formValues.location) {
      setErrors((prevState) => ({
        ...prevState,
        location: true,
      }));
    }

    if (!formValues.type) {
      setErrors((prevState) => ({
        ...prevState,
        type: true,
      }));
    }

    if (
      formValues.name &&
      formValues.description &&
      formValues.location &&
      formValues.type
    ) {
      setStep(2);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetSuccess());
    };
  }, []);

  return (
    <Box className={styles.wrapper}>
      <Typography component="h1" variant="h4" sx={{ marginBottom: '1rem' }}>
        {isEdit ? 'Редактировать объявление' : 'Разместить объявление'}
      </Typography>

      <Box className={styles.content}>
        {step === 1 && (
          <Grid container spacing={2} direction="column">
            <Grid>
              <TextField
                value={formValues.name}
                name="name"
                onChange={handleInputChange}
                label="Название"
                size="small"
                fullWidth
                required
                helperText={errors.name && 'Заполните поле'}
                error={errors.name}
              />
            </Grid>
            <Grid>
              <TextField
                value={formValues.description}
                name="description"
                onChange={handleInputChange}
                label="Описание"
                size="small"
                multiline
                rows={4}
                fullWidth
                required
                helperText={errors.description && 'Заполните поле'}
                error={errors.description}
              />
            </Grid>
            <Grid>
              <TextField
                value={formValues.location}
                name="location"
                onChange={handleInputChange}
                label="Локация"
                size="small"
                required
                fullWidth
                helperText={errors.location && 'Заполните поле'}
                error={errors.location}
              />
            </Grid>
            <Grid>
              <Button variant="outlined" component="label" fullWidth>
                Загрузить фото
                <input
                  type="file"
                  name="photo"
                  hidden
                  onChange={handleUploadPhoto}
                />
              </Button>
            </Grid>
            <Grid>
              <FormControl fullWidth required>
                <InputLabel size="small" error={errors.type}>
                  Категория
                </InputLabel>
                <Select
                  value={formValues.type}
                  onChange={handleSelectChange}
                  label="Категория"
                  name="type"
                  size="small"
                  error={errors.type}
                >
                  {CATEGORY_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.type && (
                  <FormHelperText sx={{ color: 'red' }}>
                    Выберите категорию
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" onClick={handleNextStep}>
                  Продолжить
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}

        {step === 2 && formValues.type === 'Недвижимость' && (
          <RealEstateForm
            formValues={formValues}
            onDataChange={handleRealEstateChange}
            setStep={setStep}
            errors={errors}
            setErrors={setErrors}
            isEdit={isEdit}
          />
        )}

        {step === 2 && formValues.type === 'Авто' && (
          <AutoForm
            formValues={formValues}
            onDataChange={handleRealEstateChange}
            setStep={setStep}
            errors={errors}
            setErrors={setErrors}
            isEdit={isEdit}
          />
        )}

        {step === 2 && formValues.type === 'Услуги' && (
          <ServiceForm
            formValues={formValues}
            onDataChange={handleRealEstateChange}
            setStep={setStep}
            errors={errors}
            setErrors={setErrors}
            isEdit={isEdit}
          />
        )}
      </Box>
    </Box>
  );
};
