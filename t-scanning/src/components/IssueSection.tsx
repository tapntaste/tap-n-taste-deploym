import { Box, Divider } from '@mui/material';
import { TButton } from '@tap-n-taste/ui';
import CallIcon from '@mui/icons-material/Call';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@tap-n-taste/utils';
import { useSelector } from 'react-redux';

const IssueSection = () => {
  const navigate=useNavigate()
  const {restaurantData} = useSelector((state: RootState) => state.restaurant)
  const handleContact = () => {
    navigate( `/restaurant/${restaurantData?._id}/contact`)
  }
  return (
    <Box className="mt-6 mb-6">
      <Divider
        textAlign="left"
        className="text-2xl text-zinc-700 font-semibold mb-6"
      >
        Having an issue?
      </Divider>
      <Box className="mt-8 mb-8"></Box>
      <TButton
        text="Contact Us"
        className={{
          root: 'w-full mt-8 bg-white',
          text: 'text-primary',
        }}
        styles={{
          border: '2px solid #F1414F',
        }}
        onClick={handleContact}
        icon={<CallIcon className="text-primary" />}
      />
    </Box>
  );
};

export default IssueSection;
