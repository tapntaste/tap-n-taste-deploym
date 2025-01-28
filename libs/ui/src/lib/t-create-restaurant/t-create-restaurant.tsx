// import React, { useState } from "react";
// import { TextField, Button, Grid, Typography, MenuItem } from "@mui/material";

// export const RestaurantCreationForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     slug: "",
//     tagline: "",
//     description: "",
//     placeName: "",
//     longitude: "",
//     latitude: "",
//     street: "",
//     city: "",
//     state: "",
//     country: "",
//     countryCode: "",
//     zipCode: "",
//     region: "",
//     timeZone: "UTC",
//     locationType: "restaurant",
//   });

//   const handleInputChange = (e:any) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e:any) => {
//     e.preventDefault();
//     console.log("Form Data Submitted:", formData);
//     // Perform API call to submit data
//   };

//   return (
//     <Grid container spacing={4} padding={4} component="form" onSubmit={handleSubmit}>
//       <Typography variant="h4" gutterBottom>
//         Create Restaurant
//       </Typography>

//       {/* Restaurant Details */}
//       <Grid item xs={12}>
//         <TextField
//           fullWidth
//           required
//           label="Restaurant Name"
//           name="name"
//           value={formData.name}
//           onChange={handleInputChange}
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField
//           fullWidth
//           required
//           label="Slug"
//           name="slug"
//           value={formData.slug}
//           onChange={handleInputChange}
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField
//           fullWidth
//           label="Tagline"
//           name="tagline"
//           value={formData.tagline}
//           onChange={handleInputChange}
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField
//           fullWidth
//           multiline
//           rows={4}
//           label="Description"
//           name="description"
//           value={formData.description}
//           onChange={handleInputChange}
//         />
//       </Grid>

//       {/* Location Details */}
//       <Typography variant="h5" gutterBottom>
//         Location Details
//       </Typography>

//       <Grid item xs={12}>
//         <TextField
//           fullWidth
//           required
//           label="Place Name"
//           name="placeName"
//           value={formData.placeName}
//           onChange={handleInputChange}
//         />
//       </Grid>
//       <Grid item xs={6}>
//         <TextField
//           fullWidth
//           required
//           type="number"
//           label="Longitude"
//           name="longitude"
//           value={formData.longitude}
//           onChange={handleInputChange}
//         />
//       </Grid>
//       <Grid item xs={6}>
//         <TextField
//           fullWidth
//           required
//           type="number"
//           label="Latitude"
//           name="latitude"
//           value={formData.latitude}
//           onChange={handleInputChange}
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField
//           fullWidth
//           required
//           label="Street"
//           name="street"
//           value={formData.street}
//           onChange={handleInputChange}
//         />
//       </Grid>
//       <Grid item xs={6}>
//         <TextField
//           fullWidth
//           required
//           label="City"
//           name="city"
//           value={formData.city}
//           onChange={handleInputChange}
//         />
//       </Grid>
//       <Grid item xs={6}>
//         <TextField
//           fullWidth
//           required
//           label="State"
//           name="state"
//           value={formData.state}
//           onChange={handleInputChange}
//         />
//       </Grid>
//       <Grid item xs={6}>
//         <TextField
//           fullWidth
//           required
//           label="Country"
//           name="country"
//           value={formData.country}
//           onChange={handleInputChange}
//         />
//       </Grid>
//       <Grid item xs={6}>
//         <TextField
//           fullWidth
//           required
//           label="Country Code"
//           name="countryCode"
//           value={formData.countryCode}
//           onChange={handleInputChange}
//         />
//       </Grid>
//       <Grid item xs={6}>
//         <TextField
//           fullWidth
//           label="ZIP Code"
//           name="zipCode"
//           value={formData.zipCode}
//           onChange={handleInputChange}
//         />
//       </Grid>
//       <Grid item xs={6}>
//         <TextField
//           fullWidth
//           label="Region"
//           name="region"
//           value={formData.region}
//           onChange={handleInputChange}
//         />
//       </Grid>
//       <Grid item xs={6}>
//         <TextField
//           fullWidth
//           label="Time Zone"
//           name="timeZone"
//           value={formData.timeZone}
//           onChange={handleInputChange}
//         />
//       </Grid>
//       <Grid item xs={6}>
//         <TextField
//           select
//           fullWidth
//           label="Location Type"
//           name="locationType"
//           value={formData.locationType}
//           onChange={handleInputChange}
//         >
//           <MenuItem value="restaurant">Restaurant</MenuItem>
//           <MenuItem value="office">Office</MenuItem>
//           <MenuItem value="warehouse">Warehouse</MenuItem>
//           <MenuItem value="other">Other</MenuItem>
//         </TextField>
//       </Grid>

//       {/* Submit Button */}
//       <Grid item xs={12}>
//         <Button type="submit" variant="contained" color="primary">
//           Create Restaurant
//         </Button>
//       </Grid>
//     </Grid>
//   );
// };

// export default RestaurantCreationForm;
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Grid, Typography, MenuItem } from "@mui/material";
import { AppDispatch, createRestaurantThunk } from "@tap-n-taste/utils";
import { useDispatch } from "react-redux";

interface FormData {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  placeName: string;
  longitude: string;
  latitude: string;
  street: string;
  city: string;
  state: string;
  country: string;
  countryCode: string;
  zipCode: string;
  region: string;
  timeZone: string;
  locationType: string;
  phone: string;
  email: string;
  contactType: string;
  preferredContactMethod: string;
}

export const RestaurantCreationForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      slug: "",
      tagline: "",
      description: "",
      placeName: "",
      longitude: "",
      latitude: "",
      street: "",
      city: "",
      state: "",
      country: "",
      countryCode: "",
      zipCode: "",
      region: "",
      timeZone: "UTC",
      locationType: "restaurant",
      phone: "",
      email: "",
      contactType: "General",
      preferredContactMethod: "Email",
    },
  });
  const dispatch = useDispatch<AppDispatch>();
  const onSubmit = (data: FormData) => {
    console.log("Form Data Submitted:", data);
    dispatch(createRestaurantThunk(data));
    // Perform API call to submit data
  };

  return (
    <Grid container spacing={4} padding={4} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" gutterBottom>
        Create Restaurant
      </Typography>

      {/* Restaurant Details */}
      <Grid item xs={12}>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Restaurant name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Restaurant Name"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          name="slug"
          control={control}
          rules={{ required: "Slug is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Slug"
              error={!!errors.slug}
              helperText={errors.slug?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          name="tagline"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Tagline"
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              multiline
              rows={4}
              label="Description"
            />
          )}
        />
      </Grid>

      {/* Location Details */}
      <Typography variant="h5" gutterBottom>
        Location Details
      </Typography>

      <Grid item xs={12}>
        <Controller
          name="placeName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Place Name"
            />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          name="longitude"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Longitude"
              type="number"
            />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          name="latitude"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Latitude"
              type="number"
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          name="street"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Street"
            />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="City"
            />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="State"
            />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Country"
            />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          name="countryCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Country Code"
            />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          name="zipCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="ZIP Code"
            />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          name="region"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Region"
            />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          name="timeZone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Time Zone"
            />
          )}
        />
      </Grid>

      {/* Contact Details */}
      <Typography variant="h5" gutterBottom>
        Contact Details
      </Typography>

      <Grid item xs={6}>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Phone"
            />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          name="email"
          control={control}
          rules={{ required: "Email is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Button type="submit" variant="contained" color="primary">
          Create Restaurant
        </Button>
      </Grid>
    </Grid>
  );
};

export default RestaurantCreationForm;

    //   <Typography variant="h5" gutterBottom>
    //     Location Details
    //   </Typography>

    //   <Grid item xs={6}>
    //     <TextField
    //       fullWidth
    //       required
    //       label="Place Name"
    //       name="placeName"
    //       value={formData.placeName}
    //       onChange={handleInputChange}
    //     />
    //   </Grid>
    //   <Grid item xs={6}>
    //     <TextField
    //       fullWidth
    //       required
    //       type="number"
    //       label="Longitude"
    //       name="longitude"
    //       value={formData.longitude}
    //       onChange={handleInputChange}
    //     />
    //   </Grid>
    //   <Grid item xs={6}>
    //     <TextField
    //       fullWidth
    //       required
    //       type="number"
    //       label="Latitude"
    //       name="latitude"
    //       value={formData.latitude}
    //       onChange={handleInputChange}
    //     />
    //   </Grid>
    //   <Grid item xs={12}>
    //     <TextField
    //       fullWidth
    //       required
    //       label="Street"
    //       name="street"
    //       value={formData.street}
    //       onChange={handleInputChange}
    //     />
    //   </Grid>
    //   <Grid item xs={6}>
    //     <TextField
    //       fullWidth
    //       required
    //       label="City"
    //       name="city"
    //       value={formData.city}
    //       onChange={handleInputChange}
    //     />
    //   </Grid>
    //   <Grid item xs={6}>
    //     <TextField
    //       fullWidth
    //       required
    //       label="State"
    //       name="state"
    //       value={formData.state}
    //       onChange={handleInputChange}
    //     />
    //   </Grid>
    //   <Grid item xs={6}>
    //     <TextField
    //       fullWidth
    //       required
    //       label="Country"
    //       name="country"
    //       value={formData.country}
    //       onChange={handleInputChange}
    //     />
    //   </Grid>
    //   <Grid item xs={6}>
    //     <TextField
    //       fullWidth
    //       required
    //       label="Country Code"
    //       name="countryCode"
    //       value={formData.countryCode}
    //       onChange={handleInputChange}
    //     />
    //   </Grid>
    //   <Grid item xs={6}>
    //     <TextField
    //       fullWidth
    //       label="ZIP Code"
    //       name="zipCode"
    //       value={formData.zipCode}
    //       onChange={handleInputChange}
    //     />
    //   </Grid>
    //   <Grid item xs={6}>
    //     <TextField
    //       fullWidth
    //       label="Region"
    //       name="region"
    //       value={formData.region}
    //       onChange={handleInputChange}
    //     />
    //   </Grid>
    //   <Grid item xs={6}>
    //     <TextField
    //       fullWidth
    //       label="Time Zone"
    //       name="timeZone"
    //       value={formData.timeZone}
    //       onChange={handleInputChange}
    //     />
    //   </Grid>
    //   <Grid item xs={6}>
    //     <TextField
    //       select
    //       fullWidth
    //       label="Location Type"
    //       name="locationType"
    //       value={formData.locationType}
    //       onChange={handleInputChange}
    //     >
    //       <MenuItem value="restaurant">Restaurant</MenuItem>
    //       <MenuItem value="office">Office</MenuItem>
    //       <MenuItem value="warehouse">Warehouse</MenuItem>
    //       <MenuItem value="other">Other</MenuItem>
    //     </TextField>
    //   </Grid>

    //   {/* Contact Details */}
    //   <Typography variant="h5" gutterBottom>
    //     Contact Details
    //   </Typography>

    //   <Grid item xs={6}>
    //     <TextField
    //       fullWidth
    //       required
    //       label="Phone"
    //       name="phone"
    //       value={formData.phone}
    //       onChange={handleInputChange}
    //     />
    //   </Grid>
    //   <Grid item xs={6}>
    //     <TextField
    //       fullWidth
    //       required
    //       type="email"
    //       label="Email"
    //       name="email"
    //       value={formData.email}
    //       onChange={handleInputChange}
    //     />
    //   </Grid>
    //   <Grid item xs={6}>
    //     <TextField
    //       select
    //       fullWidth
    //       label="Contact Type"
    //       name="contactType"
    //       value={formData.contactType}
    //       onChange={handleInputChange}
    //     >
    //       <MenuItem value="General">General</MenuItem>
    //       <MenuItem value="Support">Support</MenuItem>
    //       <MenuItem value="Sales">Sales</MenuItem>
    //       <MenuItem value="Marketing">Marketing</MenuItem>
    //       <MenuItem value="Other">Other</MenuItem>
    //     </TextField>
    //   </Grid>
    //   <Grid item xs={6}>
    //     <TextField
    //       select
    //       fullWidth
    //       label="Preferred Contact Method"
    //       name="preferredContactMethod"
    //       value={formData.preferredContactMethod}
    //       onChange={handleInputChange}
    //     >
    //       <MenuItem value="Email">Email</MenuItem>
    //       <MenuItem value="Phone">Phone</MenuItem>
    //       <MenuItem value="SMS">SMS</MenuItem>
    //       <MenuItem value="WhatsApp">WhatsApp</MenuItem>
    //       <MenuItem value="Other">Other</MenuItem>
    //     </TextField>
    //   </Grid>
