import React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Grid,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppDispatch, RootState } from '@tap-n-taste/utils';
import { useDispatch, useSelector } from 'react-redux';
import { createMenuItemThunk } from 'libs/utils/src/store/menuCreateSlice';

// Zod schema for validation
const menuSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  banner: z.string().url('Invalid URL').optional(),
  price: z.string().min(0, 'Price must be positive'),
  category: z.string().min(1, 'Category is required'),
  isAvailable: z.boolean().optional(),
  preparationTime: z.number().min(1, 'Preparation time must be at least 1 minute').optional(),
  spiceLevel: z.enum(['Mild', 'Medium', 'Spicy', 'Extra Spicy']),
  isVeg: z.boolean().optional(),
});

type MenuFormData = z.infer<typeof menuSchema>;

const categories = ['Starter', 'Main Course', 'Dessert', 'Beverage'];
const spiceLevels = ['Mild', 'Medium', 'Spicy', 'Extra Spicy'];
export const MenuCreationForm: React.FC = () => {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<MenuFormData>({
        resolver: zodResolver(menuSchema),
        defaultValues: {
            name: '',
            description: '',
            banner: '',
            price: '0',
            category: '',
            isAvailable: true,
            preparationTime: 10,
            spiceLevel: 'Mild',
            isVeg: false,
        },
    });
    
    const { isAuthenticated, userData } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: MenuFormData) => {
    try {
      const response = await dispatch(
        createMenuItemThunk({
          restaurantId: userData?.user?.restaurantId || '12345', // Replace with dynamic ID if needed
          menuItem: data,
        })
      ).unwrap();
      console.log('Menu item created:', response);
      reset();
      alert('Menu item created successfully!');
    } catch (error) {
      console.error('Error creating menu item:', error);
      alert(error);
    }
  };
  

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Create a Menu Item
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Name */}
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                />
              )}
            />
          </Grid>

          {/* Banner */}
          <Grid item xs={12}>
            <Controller
              name="banner"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Banner URL"
                  fullWidth
                  error={!!errors.banner}
                  helperText={errors.banner?.message}
                />
              )}
            />
          </Grid>

          {/* Price */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Price"
                  fullWidth
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              )}
            />
          </Grid>

          {/* Category */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Category"
                  select
                  fullWidth
                  error={!!errors.category}
                  helperText={errors.category?.message}
                >
                  {categories.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          {/* Is Available */}
          <Grid item xs={12}>
            <Controller
              name="isAvailable"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Available"
                />
              )}
            />
          </Grid>

          {/* Preparation Time */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="preparationTime"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Preparation Time (minutes)"
                  fullWidth
                  error={!!errors.preparationTime}
                  helperText={errors.preparationTime?.message}
                />
              )}
            />
          </Grid>

          {/* Spice Level */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="spiceLevel"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Spice Level"
                  select
                  fullWidth
                >
                  {spiceLevels.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          {/* Is Vegetarian */}
          <Grid item xs={12}>
            <Controller
              name="isVeg"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Vegetarian"
                />
              )}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Menu Item
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default MenuCreationForm;
