import React from 'react';
import styled from 'styled-components';
import TuneIcon from '@mui/icons-material/Tune';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Container, Dialog } from '@mui/material';
import { TFilterPopUp } from '../t-filter-popup';
import { TSortPopUp } from '../t-sort-popup';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const TManage = () => {
  const [openFilter, setOpenFilter] = React.useState(false);
  const [openSort, setOpenSort] = React.useState(false);

  const handleFilterOpen = () => setOpenFilter(true);
  const handleFilterClose = () => setOpenFilter(false);

  const handleSortOpen = () => setOpenSort(true);
  const handleSortClose = () => setOpenSort(false);

  return (
    <>
    <Box className='flex md:flex-row flex-col justify-center items-center'>
    <StyledTManage >
          <StyledButton onClick={handleFilterOpen} className='h-[100px'>
            <TuneIcon style={{ fontSize: '16px' }} />
            <span>Filters</span>
          </StyledButton>
          <Divider />
          <StyledButton onClick={handleSortOpen}>
            <SwapVertIcon style={{ fontSize: '16px' }} />
            <span>Sort</span>
          </StyledButton>
      </StyledTManage>
    </Box>

      {/* Filter Dialog */}
      <Dialog
        open={openFilter}
        TransitionComponent={Transition}
        onClose={handleFilterClose}
        className="rounded-2xl"
      >
        <TFilterPopUp />
      </Dialog>

      {/* Sort Dialog */}
      <Dialog
        open={openSort}
        TransitionComponent={Transition}
        onClose={handleSortClose}
        className="rounded-2xl"
      >
        <TSortPopUp />
      </Dialog>
    </>
  );
};

// Styled Components
const StyledTManage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f94f4f;
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: fit-content;
`;


const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: transparent;
  border: none;
  color: white;
  font-size: 12px;
  cursor: pointer;
  padding: 1px 8px;
  height:50px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  span {
    font-weight: 400;
  }

  @media (max-width: 768px) {
    font-size: 10px;
    padding: 6px 10px;
     height:30px;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 20px;
  background-color: white;
  opacity: 1;
`;
