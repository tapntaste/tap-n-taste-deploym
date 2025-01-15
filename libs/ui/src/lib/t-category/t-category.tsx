import React from 'react';
import styled from 'styled-components';

// Styled Components
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SliderWrapper = styled.div`
  width: 55px;
  height: 28px;
  border: 2px solid #d3d3d3;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f9f9f9;
  position: relative;
  padding: 2px;
  cursor: pointer;
`;

const SliderCircle = styled.div<{ position: 'left' | 'right'; color: string }>`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.color};
  border: 2px solid ${(props) => props.color};
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.position === 'left' ? 'left: 5px;' : 'right: 5px;')}
`;

const Label = styled.div`
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 4px;
`;

interface TCategoryProps {
  isVegActive: boolean;
  setVegActive: (state: boolean) => void;
  isNonVegActive: boolean;
  setNonVegActive: (state: boolean) => void;
}

export const TCategory: React.FC<TCategoryProps> = ({
  isVegActive,
  setVegActive,
  isNonVegActive,
  setNonVegActive,
}) => {
  return (
    <Wrapper>
      <ButtonContainer>
        <Label>Non-Veg</Label>
        <SliderWrapper onClick={() => setNonVegActive(!isNonVegActive)}>
          <SliderCircle color="red" position={isNonVegActive ? 'right' : 'left'} />
        </SliderWrapper>
      </ButtonContainer>

      <ButtonContainer>
        <Label>Veg</Label>
        <SliderWrapper onClick={() => setVegActive(!isVegActive)}>
          <SliderCircle color="green" position={isVegActive ? 'right' : 'left'} />
        </SliderWrapper>
      </ButtonContainer>
    </Wrapper>
  );
};

export default TCategory;
