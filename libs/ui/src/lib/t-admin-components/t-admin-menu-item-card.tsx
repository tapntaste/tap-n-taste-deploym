import React from 'react';
import { Card, CardContent, Typography, Grid, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface MenuItemCardProps {
  image: string;
  heading: string;
  description: string;
  price: number;
  onEdit?: () => void; // Make onEdit optional
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  image,
  heading,
  description,
  price,
  onEdit,
}) => {
  return (
    <Card
      className="menu-item-card"
      style={{
        height: '100%', // Ensures content fills the card
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <img src={image} alt={heading} className="menu-item-image object-cover" height={"100%"} width={"100%"} />
        </Grid>
        <Grid item xs={8}>
          <CardContent>
            <Typography variant="h6">{heading}</Typography>
            <Typography variant="body2">{description}</Typography>
            <Box className='flex justify-between'>
            <Typography variant="h6" color="primary">
              ${price.toFixed(2)}
            </Typography>
            {onEdit && (
              <IconButton onClick={onEdit} color="primary">
                <EditIcon />
              </IconButton>
            )}
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default MenuItemCard;
