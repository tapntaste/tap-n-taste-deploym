import { CircularProgress, Box, Typography } from '@mui/material';

export const TLoadingSpinner = () => {
  return (
    <Box 
      className="flex flex-col items-center justify-center min-h-[200px]"
      sx={{ textAlign: 'center' }}
    >
      <CircularProgress 
        size={60}
        thickness={5}
        sx={{ color: '#F1414F' }} 
      />
      <Typography 
        variant="h6" 
        sx={{ color: '#F1414F', marginTop: '1rem' }}
      >
        Loading...
      </Typography>
    </Box>
  );
};

export default TLoadingSpinner;
