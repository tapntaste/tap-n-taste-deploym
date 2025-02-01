import React from "react";
import styled from "styled-components";
import eventimg from "./event.jpg";
import barcode from "./barcode.avif";
import { TButton } from "../t-button";
import { Download } from "@mui/icons-material";

interface TTicketProps {
  eventName: string;
  location: string;
  attendeeName: string;
  date: string;
  ticketType: string;
  ticketPrice: number;
  time: string;
}

const StyledTTicket = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  .ticket-content {
    padding: 16px;
  }
  .ticket-title {
    font-size: 20px;
    margin-bottom: 12px;
    text-align: center;
    color:#616161;
  }
  .ticket-info {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #444;
    margin-bottom: 8px;
  }
  .ticket-info div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    
  }
  .ticket-info-right {
    text-align: right;
    width: 50%; 
  }
  .ticket-info span {
    font-weight: bold;
  }
  .dashed-line {
    height: 1px;
    border-top: 2px dashed #ccc;
    margin: 16px 0;
  }
  .barcode {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 16px 0;
  }
  .barcode img {
    height: 40px;
  }
  .barcode p {
    margin-top: 8px;
    font-size: 12px;
    color: #777;
  }
  .responsive-btn {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 12px auto;
  }
`;

export function TTicket({
  eventName,
  location,
  attendeeName,
  date,
  ticketType,
  ticketPrice,
  time,
}: TTicketProps) {
  return (
    <StyledTTicket>
      <img src={eventimg} alt="Event" />
      <div className="ticket-content">
        <div className="ticket-title">{eventName}</div>
        <div className="dashed-line"></div>
        <div className="ticket-info">
          <div>
            <span>Location:</span>
            <p>{location}</p>
          </div>
        </div>
        <div className="ticket-info">
          <div>
            <span>Name:</span>
            <p>{attendeeName}</p>
          </div>
        </div>
        <div className="ticket-info">
          <div>
            <span>Date:</span>
            <p>{date}</p>
          </div>
          <div className="ticket-info-right">
            <span>Ticket Type:</span>
            <p>{ticketType}</p>
          </div>
        </div>
        <div className="ticket-info">
          <div>
            <span>Ticket Price:</span>
            <p>₹{ticketPrice}</p>
          </div>
          <div className="ticket-info-right">
            <span>Time:</span>
            <p>{time}</p>
          </div>
        </div>
        <div className="dashed-line"></div>
        <div className="barcode">
          <img src={barcode} alt="Barcode" />
          <p>Scan the barcode</p>
        </div>
        <div className="responsive-btn">
          <TButton
            icon={<Download sx={{ color: "white" }} />}
            text="Download Ticket"
            className={{
              root: "!bg-[#F1414F] text-white w-full flex items-center justify-center py-[10px]",
              text: "!text-white my-[8px]",
            }}
          />
        </div>
      </div>
    </StyledTTicket>
  );
}

export default TTicket;