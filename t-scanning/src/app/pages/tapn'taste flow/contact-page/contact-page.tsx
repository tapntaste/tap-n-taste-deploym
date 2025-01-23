import { TButton, TInput } from '@tap-n-taste/ui';
import SuccessScreen from '../../../../assets/success-screen.png';
import {
  Box,
  Checkbox,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextareaAutosize,
} from '@mui/material';
import cardImage from '../../../../assets/master-card.png';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import React from 'react';
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export const ContactPage = () => {
  const [subject, setSubject] = React.useState('Select Subject');

  const handleChange = (event: SelectChangeEvent) => {
    setSubject(event.target.value as string);
  };

  return (
    <Box className="w-full min-h-screen px-[8%] sm:px-[15%] pt-10">
      <Box className="flex items-center">
        <KeyboardArrowLeftOutlinedIcon />
        <h1 className="text-2xl font-semibold">Contact Us</h1>
      </Box>

      <Box className="mt-10 mb-10 flex flex-col gap-4">
        <TInput label="Name" placeHolderText="Full Name" />
        <TInput label="Email" placeHolderText="example@mail.com" />
        <TInput label="Mobile No." placeHolderText="Enter your mobile number" />

        <Box>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Subject
          </InputLabel>
          <Select value="General Inquiry" fullWidth>
            <MenuItem value="General Inquiry">General Inquiry</MenuItem>
            <MenuItem value="reservation">Reservation</MenuItem>
            <MenuItem value="feedback">Feedback</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          </Select>
        </Box>

        <Box>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Table Reservation
          </InputLabel>
          <Select
            fullWidth
            value="Yes" // Pre-selected default
            onChange={(e) => console.log(e.target.value)} // Example handler for demonstration
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </Box>

        <Box>
          <InputLabel>Message</InputLabel>
          <TextareaAutosize
            className="w-full h-60 bg-zinc-200 py-10 px-6 rounded-xl"
            placeholder="Enter your message"
            style={{ height: '150px', resize: 'none' }} // This disables the resizing handle
          />
        </Box>
      </Box>
      <Box className="w-full flex items-center justify-center mb-10">
        <TButton
          text="Submit Message"
          className={{ text: '' }}
          sx={{
            width: '100%',
            backgroundColor: '#F1414F',
            border: '2px solid #F1414F',
            color: 'white',
            '&:hover': {
              backgroundColor: '#DC3D4A',
            },
          }}
        />
      </Box>
      <Divider />
      <Box className="mt-6 mb-10">
        <h1 className="font-semibold text-lg mb-4">Contact Information</h1>
        <Box className="border-2 px-6 py-8 rounded-xl flex flex-col gap-4">
          <h2>
            <CallIcon className="text-primary mr-4" />
            (123) 456-7890
          </h2>
          <h2>
            <MailIcon className="text-primary mr-4" />
            info@stonewater.com
          </h2>
          <h2>
            <LocationOnIcon className="text-primary mr-4" />
            info@stonewater.com
          </h2>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactPage;
