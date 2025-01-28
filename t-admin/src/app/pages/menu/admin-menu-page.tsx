import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Modal,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Checkbox,
  FormControlLabel,
  Chip,
} from '@mui/material';
import { MenuItemCard } from '@tap-n-taste/ui';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@tap-n-taste/utils';
import {
  fetchMenuItemsThunk,
  updateMenuItemThunk,
} from 'libs/utils/src/store/menuItemsSlice';
import { fetchUser, setUser } from 'libs/utils/src/store/authSlice';
import { useParams } from 'react-router-dom';
import { useMenuItems } from '@tap-n-taste/hooks';

export const AdminMenuPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: RootState) => state.auth);
  const [selectedItem, setSelectedItem] = useState<any>();
  const [open, setOpen] = useState(false);
  const { restaurantId } = useParams();
  const { menuItems, loading } = useMenuItems(restaurantId || '');
  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      dispatch(setUser(userData));
    } else {
      dispatch(fetchUser());
    }

    dispatch(
      fetchMenuItemsThunk({
        restaurantId: restaurantId || userData?.user?.restaurantId,
      })
    );
  }, [dispatch]);

  const handleOpen = (item: any) => {
    setSelectedItem(item);
    reset(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: any) => {
    if (!selectedItem || !restaurantId) return;

    const payload = {
      restaurantId,
      menuItemId: selectedItem._id,
      data,
    };

    dispatch(updateMenuItemThunk(payload))
      .unwrap()
      .then(() => setOpen(false))
      .catch((err) => console.error('Error updating menu item:', err));
  };

  if (loading) {
    return (
      <Box>
        <Typography variant="h4">Admin Menu</Typography>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box className="mb-5 flex flex-col gap-8 mt-5 items-center">
      <Typography variant="h4" className="mb-5">
        Admin Menu
      </Typography>
      {/* <Grid container spacing={2}>
        {menuItems.map((item: any) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <MenuItemCard
              image={item.banner}
              heading={item.name}
              description={item.description}
              price={item.price}
              onEdit={() => handleOpen(item)}
            />
          </Grid>
        ))}
      </Grid> */}
      <Grid container spacing={2}>
        {menuItems.map((item: any) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%', // Ensures all cards have the same height
              }}
            >
              <MenuItemCard
                image={item.banner}
                heading={item.name}
                description={item.description}
                price={item.price}
                onEdit={() => handleOpen(item)}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      <Modal open={open} onClose={handleClose}>
        <Box
          style={{
            padding: 20,
            backgroundColor: 'white',
            maxWidth: 700,
            maxHeight: '90vh', // Limit the modal height
            overflowY: 'auto', // Enable scrolling for overflowing content
            margin: 'auto',
            marginTop: 50,
            borderRadius: '8px', // Optional: Add rounded corners
          }}
        >
          <Typography variant="h6">Edit Menu Item</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Name" fullWidth margin="normal" />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Price"
                  type="number"
                  fullWidth
                  margin="normal"
                />
              )}
            />
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
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Category"
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <Controller
              name="calories"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Calories"
                  type="number"
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Tags (comma-separated)"
                  fullWidth
                  margin="normal"
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.split(',').map((tag) => tag.trim())
                    )
                  }
                />
              )}
            />
            <Controller
              name="allergens"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Allergens (comma-separated)"
                  fullWidth
                  margin="normal"
                  onChange={(e) =>
                    field.onChange(
                      e.target.value
                        .split(',')
                        .map((allergen) => allergen.trim())
                    )
                  }
                />
              )}
            />
            <Controller
              name="preparationTime"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Preparation Time (minutes)"
                  type="number"
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <Controller
              name="banner"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Banner URL"
                  fullWidth
                  margin="normal"
                />
              )}
            />
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: 20 }}
            >
              Save Changes
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClose}
              fullWidth
              style={{ marginTop: 10 }}
            >
              Cancel
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminMenuPage;
