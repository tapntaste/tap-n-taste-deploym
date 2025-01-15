import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface ErrorComponentProps {
  message?: string;
  onRetry?: () => void;
}

export const TErrorComponent = ({ message = 'Something went wrong.', onRetry }: ErrorComponentProps) => {
  return (
    <Box 
      className="flex flex-col items-center justify-center min-h-[200px]"
      sx={{ textAlign: 'center' }}
    >
      <ErrorOutlineIcon sx={{ color: '#F1414F', fontSize: 60 }} />
      <Typography 
        variant="h6" 
        sx={{ color: '#F1414F', marginTop: '1rem' }}
      >
        {message}
      </Typography>
      {onRetry && (
        <Button 
          variant="contained" 
          onClick={onRetry} 
          sx={{ marginTop: '1.5rem', backgroundColor: '#F1414F', color: '#fff' }}
        >
          Retry
        </Button>
      )}
    </Box>
  );
};

export default TErrorComponent;
