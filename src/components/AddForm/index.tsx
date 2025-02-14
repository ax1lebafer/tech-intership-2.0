import { ChangeEvent, FC, useState } from 'react';
import { IAddFormProps, IAddFormValues } from './types.ts';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { CATEGORY_OPTIONS, INITIAL_ADD_FORM_VALUES } from './constants.ts';
import Grid from '@mui/material/Grid2';
import styles from './styles.module.css';
import { RealEstateForm } from './RealEstateForm';

export const AddForm: FC<IAddFormProps> = () => {
  const [formValues, setFormValues] = useState<IAddFormValues>(
    INITIAL_ADD_FORM_VALUES
  );
  const [step, setStep] = useState(1);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;

    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
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

  console.log('formValues:', formValues);

  return (
    <Box className={styles.wrapper}>
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
              <InputLabel size="small">Категория</InputLabel>
              <Select
                value={formValues.type}
                onChange={handleSelectChange}
                label="Категория"
                name="type"
                size="small"
              >
                {CATEGORY_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" onClick={() => setStep(2)}>
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
        />
      )}
    </Box>
  );
};
