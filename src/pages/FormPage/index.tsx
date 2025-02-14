import { Box, Typography } from '@mui/material';
import { AddForm } from '../../components/AddForm';

export const FormPage = () => {
  return (
    <Box component="main">
      <Typography component="h1" variant="h4">
        Разместить объявление
      </Typography>

      <AddForm />
    </Box>
  );
};
