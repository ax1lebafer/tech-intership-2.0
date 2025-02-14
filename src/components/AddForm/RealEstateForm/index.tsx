import Grid from '@mui/material/Grid2';
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
import { ChangeEvent, FC } from 'react';
import { IRealEstateFormProps } from './types.ts';
import { PROPERTY_TYPE_OPTIONS } from './constants.ts';
import { useAppDispatch } from '../../../store/store.ts';
import { createRealEstateAsync } from '../../../store/actions/Advertisement';
import { ICreateRealEstateData } from '../../../store/actions/Advertisement/types.ts';

export const RealEstateForm: FC<IRealEstateFormProps> = ({
  formValues,
  onDataChange,
  setStep,
}) => {
  const dispatch = useAppDispatch();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    onDataChange({ [name]: value });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    onDataChange({ [name]: value });
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

    const newAdv: ICreateRealEstateData = {
      name,
      description,
      location,
      type,
      propertyType,
      area,
      rooms,
      price,
    };

    dispatch(createRealEstateAsync(newAdv));
  };

  return (
    <Grid container spacing={2} direction="column">
      <Grid>
        <FormControl fullWidth required>
          <InputLabel size="small">Тип недвижимости</InputLabel>
          <Select
            value={formValues.propertyType}
            onChange={handleSelectChange}
            label="Тип недвижимости"
            name="propertyType"
            size="small"
          >
            {PROPERTY_TYPE_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
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
    </Grid>
  );
};
