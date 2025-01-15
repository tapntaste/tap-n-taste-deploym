import React, { useState } from 'react';
import styled from 'styled-components';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { RootState } from '@tap-n-taste/utils';
import { useSelector } from 'react-redux';

const StyledFaq = styled.div`
  font-family: Arial, sans-serif;
  max-width: 1800px;
  width: 90%; /* Takes 90% of the screen width */
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;

  h2 {
    font-size: 2.2rem;
    margin-bottom: 1rem;
    font-weight: bold;
    color: #8e8e8e;
    position: relative;
    display: inline-block;
  }

  .faq-line-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .faq-line {
    flex-grow: 1;
    height: 2px;
    background-color: #8e8e8e;
    margin-left: 10px;
  }

  .faq-item {
    margin-bottom: 1rem;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;

    h3 {
      font-size: 1.2rem;
      margin: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      color: #000;
    }

    p {
      font-size: 0.9rem;
      color: #666;
      margin: 5px 0 0;
      display: none;
    }

    &.active p {
      display: block;
    }
  }

  @media (max-width: 900px) {
    max-width: 100%;
    h2 {
      font-size: 1.25rem;
    }

    .faq-item h3 {
      font-size: 0.95rem;
    }

    .faq-item p {
      font-size: 0.85rem;
    }
  }

  @media (max-width: 480px) {
    max-width: 100%;
    padding: 15px;

    h2 {
      font-size: 1.2rem;
    }

    .faq-item h3 {
      font-size: 0.85rem;
    }

    .faq-item p {
      font-size: 0.8rem;
    }
  }
`;

export interface FAQ {
  question: string;
  answer: string;
}

interface TFaqProps {
  faqs?: FAQ[];
}

export function TFaq() {
  const { restaurantData } = useSelector((state: RootState) => state.restaurant);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = restaurantData?.faq||[]

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <StyledFaq>
      <div className="faq-line-container">
        <h2>FAQ's</h2>
        <div className="faq-line"></div>
      </div>
      {faqs.map((faq:any, index:any) => (
        <div
          className={`faq-item ${activeIndex === index ? 'active' : ''}`}
          key={index}
        >
          <h3 onClick={() => toggleFaq(index)}>
            {faq.question}
            <span>
              {activeIndex === index ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </span>
          </h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </StyledFaq>
  );
}

export default TFaq;
