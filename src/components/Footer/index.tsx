import { Box, Typography } from '@mui/material';
import styles from './styles.module.css';

export const Footer = () => {
  return (
    <Box component="footer" className={styles.wrapper}>
      <Box className={styles.content}>
        <Typography variant="h5">
          Проект разработан{' '}
          <a href="https://github.com/ax1lebafer" target="_blank">
            @ax1lebafer
          </a>{' '}
          для тестового задания Avito
        </Typography>
      </Box>
    </Box>
  );
};
