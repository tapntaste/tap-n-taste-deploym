import { Typography } from '@mui/material';
import { RootState } from '@tap-n-taste/utils';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export function TCounter({ count, setCount ,disabled}: any) {
  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <CounterWrapper>
      <CounterContainer>
        {disabled&&<Typography>quantity: </Typography>}
        {!disabled&&<CounterButton disabled={disabled} onClick={handleDecrement}>-</CounterButton>}
        <CounterValue>{count}</CounterValue>
        {!disabled&&<CounterButton disabled={disabled} onClick={handleIncrement}>+</CounterButton>}
      </CounterContainer>
    </CounterWrapper>
  );
}

const CounterWrapper = styled.div`
  background-color: #edebeb;
  display: inline-flex;
  padding: 8px; /* Reduced padding */
  border-radius: 8px;
`;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CounterButton = styled.button`
  width: 24px; /* Reduced width */
  height: 24px; /* Reduced height */
  border: none;
  border-radius: 8px;
  background-color: #edebeb;
  color: #757575;
  font-size: 14px; /* Reduced font size */
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #dcdcdc;
  }

  &:focus {
    outline: none;
  }
`;

const CounterValue = styled.div`
  font-size: 14px; /* Reduced font size */
  font-weight: 500;
  color: #424242;
  min-width: 20px; /* Adjusted to match reduced font size */
  text-align: center;
`;

export default TCounter;
