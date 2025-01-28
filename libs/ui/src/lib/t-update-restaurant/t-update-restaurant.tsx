import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import {
  AppDispatch,
  fetchRestaurantThunk,
  RootState,
  updateRestaurantThunk,
} from '@tap-n-taste/utils';

interface Tax {
  name: string;
  value: number;
  feeType: string;
  description?: string;
  isActive: boolean;
}

interface RestaurantData {
  name: string;
  location: string;
  contacts: string[];
  openHours: string[];
  media: string[];
  socialLinks: string[];
  features: string[];
  menuItems: string[];
  tagline: string;
  description: string;
  status: string;
  distance: number;
  cuisine: string[];
  facilities: string[];
  categories: string[];
  averageRating: number;
  totalReviews: number;
  tax: Tax[];
}

const UpdateRestaurantForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>(); // Fetch restaurantId from URL params

  const restaurantState = useSelector((state: RootState) => state.restaurant); // Adjust to your actual state
  const { restaurantData, loading, error } = restaurantState;

  const [formData, setFormData] = useState<RestaurantData>({
    name: '',
    location: '',
    contacts: [''],
    openHours: [''],
    media: [''],
    socialLinks: [''],
    features: [''],
    menuItems: [''],
    tagline: '',
    description: '',
    status: 'Open',
    distance: 0,
    cuisine: [],
    facilities: [],
    categories: [],
    averageRating: 0,
    totalReviews: 0,
    tax: [],
  });

  // Fetch the restaurant details when the component mounts or when the id changes
  useEffect(() => {
    if (id) {
      dispatch(fetchRestaurantThunk(id)); // Dispatch action to fetch restaurant details
    }
  }, [dispatch, id]);

  // Populate the form with fetched restaurant data
  useEffect(() => {
    if (restaurantData) {
      setFormData({
        name: restaurantData.name,
        location: restaurantData.location || '',
        contacts: restaurantData.contacts || [''],
        openHours: restaurantData.openHours || [''],
        media: restaurantData.media || [''],
        socialLinks: restaurantData.socialLinks || [''],
        features: restaurantData.features || [''],
        menuItems: restaurantData.menuItems || [''],
        tagline: restaurantData.tagline || '',
        description: restaurantData.description || '',
        status: restaurantData.status || 'Open',
        distance: restaurantData.distance || 0,
        cuisine: restaurantData.cuisine || [],
        facilities: restaurantData.facilities || [],
        categories: restaurantData.categories || [],
        averageRating: restaurantData.averageRating || 0,
        totalReviews: restaurantData.totalReviews || 0,
        tax: restaurantData.tax || [],
      });
    }
  }, [restaurantData]);

  // Handle form input changes
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  // Handle array field changes
  const handleArrayChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof RestaurantData
  ) => {
    const updatedArray = [...(formData[field] as string[])];
    updatedArray[index] = event.target.value;
    setFormData({
      ...formData,
      [field]: updatedArray,
    });
  };

  // Add new field to array
  const handleAddField = (field: keyof RestaurantData) => {
    if (Array.isArray(formData[field])) {
      setFormData({
        ...formData,
        [field]: [...formData[field], ''],
      });
    } else {
      setFormData({
        ...formData,
        [field]: [''],
      });
    }
  };

  // Remove a field from array
  const handleRemoveField = (field: keyof RestaurantData, index: number) => {
    const updatedArray = Array.isArray(formData[field])
      ? formData[field].filter((_, i) => i !== index)
      : formData[field];
    setFormData({
      ...formData,
      [field]: updatedArray,
    });
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(updateRestaurantThunk({ restaurantId: id, restaurantData: formData }));
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Update Restaurant
      </Typography>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Restaurant Name */}
          <Grid item xs={12}>
            <TextField
              label="Restaurant Name"
              variant="outlined"
              fullWidth
              value={formData.name}
              onChange={(e) => handleInputChange(e, 'name')}
            />
          </Grid>

          {/* Tagline */}
          <Grid item xs={12}>
            <TextField
              label="Tagline"
              variant="outlined"
              fullWidth
              value={formData.tagline}
              onChange={(e) => handleInputChange(e, 'tagline')}
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              value={formData.description}
              onChange={(e) => handleInputChange(e, 'description')}
              multiline
              rows={4}
            />
          </Grid>

          {/* Status */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                onChange={(e:any) => handleInputChange(e, 'status')}
              >
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
                <MenuItem value="Temporarily Closed">Temporarily Closed</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Distance */}
          <Grid item xs={12}>
            <TextField
              label="Distance"
              variant="outlined"
              fullWidth
              type="number"
              value={formData.distance}
              onChange={(e) => handleInputChange(e, 'distance')}
            />
          </Grid>

          {/* Cuisine */}
          {formData?.cuisine?.map((cuisine, index) => (
            <Grid item xs={12} key={index}>
              <TextField
                label={`Cuisine ${index + 1}`}
                variant="outlined"
                fullWidth
                value={cuisine}
                onChange={(e:any) => handleArrayChange(e, index, 'cuisine')}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button variant="contained" onClick={() => handleAddField('cuisine')}>
              Add Cuisine
            </Button>
          </Grid>

          {/* Facilities */}
          {formData?.facilities?.map((facility, index) => (
            <Grid item xs={12} key={index}>
              <TextField
                label={`Facility ${index + 1}`}
                variant="outlined"
                fullWidth
                value={facility}
                onChange={(e:any) => handleArrayChange(e, index, 'facilities')}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button variant="contained" onClick={() => handleAddField('facilities')}>
              Add Facility
            </Button>
          </Grid>

          {/* Categories */}
          {formData?.categories?.map((category, index) => (
            <Grid item xs={12} key={index}>
              <TextField
                label={`Category ${index + 1}`}
                variant="outlined"
                fullWidth
                value={category}
                onChange={(e:any) => handleArrayChange(e, index, 'categories')}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button variant="contained" onClick={() => handleAddField('categories')}>
              Add Category
            </Button>
          </Grid>

          {/* Average Rating */}
          <Grid item xs={12}>
            <TextField
              label="Average Rating"
              variant="outlined"
              fullWidth
              type="number"
              value={formData.averageRating}
              onChange={(e) => handleInputChange(e, 'averageRating')}
            />
          </Grid>

          {/* Total Reviews */}
          <Grid item xs={12}>
            <TextField
              label="Total Reviews"
              variant="outlined"
              fullWidth
              type="number"
              value={formData.totalReviews}
              onChange={(e) => handleInputChange(e, 'totalReviews')}
            />
          </Grid>

          {/* Tax */}
          {formData?.tax?.map((tax, index) => (
            <Grid item xs={12} key={index}>
              <TextField
                label={`Tax Name`}
                variant="outlined"
                fullWidth
                value={tax.name}
                onChange={(e:any) => handleArrayChange(e, index, 'tax')}
              />
              {/* Add more tax fields as needed */}
            </Grid>
          ))}

          <Grid item xs={12}>
            <Button variant="contained" onClick={() => handleAddField('tax')}>
              Add Tax
            </Button>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              Update Restaurant
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default UpdateRestaurantForm;
