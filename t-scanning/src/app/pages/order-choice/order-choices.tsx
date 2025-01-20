import React, { useState } from 'react';
import bellIcon from '../../../assets/hugeicons_notification-02.png';
import pickDateIcon from '../../../assets/Calender--Streamline-Unicons-Thinline 1.png';
import indoorImage from '../../../assets/image 1.png';
import outdoorImage from '../../../assets/image 1.png';
import privateImage from '../../../assets/image 1.png';

export const OrderChoice1: React.FC = () => {
  const [guestName, setGuestName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSeating, setSelectedSeating] = useState('');
  const [guestCount, setGuestCount] = useState(2);
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  const toggleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const handleSeatingClick = (seating: string) => {
    setSelectedSeating(seating);
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.orderChoiceContainer}>
        <header style={styles.header}>
          <h1 style={styles.headerTitle}>
            <span style={styles.arrow}>&lt;</span> Book a Table
          </h1>
          <img src={bellIcon} alt="Notification Bell" style={styles.bellIcon} />
        </header>

        <section style={styles.contentBox}>
          <h2 style={styles.pickDateTitle} onClick={toggleDatePicker}>
            <img src={pickDateIcon} alt="Pick a Date" style={styles.icon} /> Pick a Date!
          </h2>

          {isDatePickerOpen && (
            <div style={styles.calendarPopup}>
              <h3 style={styles.calendarHeading}>January 2025</h3>
              <table style={styles.dateTable}>
                <thead>
                  <tr>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                      <th key={index} style={styles.tableHeader}>{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['30', '31', '1', '2', '3', '4', '5'],
                    ['6', '7', '8', '9', '10', '11', '12'],
                    ['13', '14', '15', '16', '17', '18', '19'],
                    ['20', '21', '22', '23', '24', '25', '26'],
                    ['27', '28', '29', '30', '31', '01', '02']
                  ].map((week, rowIndex) => (
                    <tr key={rowIndex}>
                      {week.map((date, cellIndex) => (
                        <td
                          key={cellIndex}
                          style={{
                            ...styles.tableCell,
                            backgroundColor: selectedDate === date ? '#ff5757' : '#fff',
                            color: selectedDate === date ? '#fff' : '#000',
                          }}
                          onClick={() => handleDateClick(date)}
                        >
                          {date}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <button style={styles.closeButton} onClick={toggleDatePicker}>Done</button>
            </div>
          )}

          <h3 style={styles.sectionHeading}>Preferred Seating</h3>
          <div style={styles.seatingOptions}>
            {[{ label: 'Indoor', image: indoorImage }, { label: 'Outdoor', image: outdoorImage }, { label: 'Private', image: privateImage }].map((option, index) => (
              <button
                key={index}
                onClick={() => handleSeatingClick(option.label)}
                style={{
                  ...styles.seatingButton,
                  boxShadow: selectedSeating === option.label ? '0px 4px 6px rgba(0, 0, 0, 0.3)' : 'none',
                  backgroundColor: '#fff',
                }}
              >
                <img src={option.image} alt={option.label} style={styles.seatingImage} /> {option.label}
              </button>
            ))}
          </div>

          <h3 style={styles.sectionHeading}>Enter Guest Details</h3>
          <input
            type="text"
            placeholder="Guest Name"
            style={styles.guestInput}
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Mobile No"
            style={styles.guestInput}
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />

          <h3 style={styles.sectionHeading}>Enter Guest Count</h3>
          <div style={styles.guestCountContainer}>
            {[2, 3, 4, 5, 6, 7].map((count) => (
              <button
                key={count}
                style={{
                  ...styles.guestCountButton,
                  backgroundColor: guestCount === count ? '#ff5757' : '#fff',
                  color: guestCount === count ? '#fff' : '#000',
                }}
                onClick={() => setGuestCount(count)}
              >
                {count}
              </button>
            ))}
          </div>

          <h3 style={styles.sectionHeading}>Time</h3>
          <div style={styles.timeContainer}>
            {['Breakfast', 'Lunch', 'Dinner'].map((meal) => (
              <button
                key={meal}
                style={{
                  ...styles.timeButton,
                  backgroundColor: selectedTime === meal ? '#ff5757' : '#fff',
                  color: selectedTime === meal ? '#fff' : '#000',
                }}
                onClick={() => setSelectedTime(meal)}
              >
                {meal}
              </button>
            ))}
          </div>

          <h3 style={styles.sectionHeading}>Enter Notes</h3>
          <textarea
            placeholder="Dietary restrictions, baby chair, etc."
            style={styles.notesInput}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <button style={styles.confirmButton}>Confirm Booking</button>
        </section>
      </div>
    </div>
  );
};



const styles: Record<string, React.CSSProperties> = {
  outerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '10px',
  },
  orderChoiceContainer: {
    fontFamily: 'Poppins, sans-serif',
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: '20px',
  },
  headerTitle: {
    fontSize: '22px',
    fontWeight: 500,
  },
  bellIcon: {
    width: '24px',
    height: '24px',
  },
  contentBox: {
    width: '100%',
  },
  pickDateTitle: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '20px',
    fontWeight: 500,
    marginBottom: '15px',
  },
  icon: {
    marginRight: '10px',
    width: '24px',
    height: '24px',
  },
  dateButtons: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  dateOption: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: '1px solid #000',
    backgroundColor: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
  },
  sectionHeading: {
    fontSize: '18px',
    fontWeight: 500,
    marginBottom: '10px',
  },
  seatingOptions: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  seatingButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '10px 15px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    backgroundColor: '#f5f5f5',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
  },
  seatingImage: {
    width: '24px',
    height: '24px',
  },
  guestInput: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    marginBottom: '20px',
  },
  calendar: {
    marginBottom: '20px',
  },
  calendarHeading: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '18px',
    fontWeight: 500,
    marginBottom: '10px',
  },
  dateTable: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    fontSize: '14px',
    fontWeight: 600,
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '15px',
    textAlign: 'center',
    cursor: 'pointer',
  },
  doneButton: {
    width: '50%',
    padding: '12px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '16px',
    fontWeight: 500,
    textAlign: 'center',
    margin: '0 auto', // Center horizontally
  display: 'block',
  },
  calendarPopup: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
  },
  closeButton: {
    marginTop: '10px',
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: '#ff5757',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
  },
  guestCountContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  guestCountButton: {
    padding: '10px 15px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    cursor: 'pointer',
    fontSize: '14px',
  },
  timeContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  timeButton: {
    padding: '10px 15px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    cursor: 'pointer',
    fontSize: '14px',
  },
  notesInput: {
    width: '100%',
    height: '100px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    marginBottom: '20px',
  },
  confirmButton: {
    width: '100%',
    padding: '12px',
    borderRadius: '5px',
    backgroundColor: '#ff5757',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default OrderChoice1;