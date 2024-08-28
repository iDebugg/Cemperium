import React, { useState, useEffect } from 'react';
import '../styles/CustomCalendar.css';

const CustomCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [displayDate, setDisplayDate] = useState(new Date());
    const [selectedDates, setSelectedDates] = useState([]);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentDate(new Date());
      }, 60000); // Update the current date every minute
      return () => clearInterval(interval);
    }, []);
  
    const daysInMonth = (month, year) => {
      return new Date(year, month + 1, 0).getDate();
    };
  
    const handleDateClick = (date) => {
      if (!selectedDates.includes(date)) {
        setSelectedDates([...selectedDates, date]);
      }
    };
  
    const handlePrevMonth = () => {
      const newDate = new Date(displayDate);
      newDate.setMonth(newDate.getMonth() - 1);
      setDisplayDate(newDate);
    };
  
    const handleNextMonth = () => {
      const newDate = new Date(displayDate);
      newDate.setMonth(newDate.getMonth() + 1);
      setDisplayDate(newDate);
    };
  
    const renderCalendar = () => {
      const month = displayDate.getMonth();
      const year = displayDate.getFullYear();
      const days = [];
      const totalDays = daysInMonth(month, year);
      const firstDayOfMonth = new Date(year, month, 1).getDay();
  
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
      }
  
      for (let day = 1; day <= totalDays; day++) {
        const date = new Date(year, month, day);
        const isToday =
          date.getDate() === currentDate.getDate() &&
          date.getMonth() === currentDate.getMonth() &&
          date.getFullYear() === currentDate.getFullYear();
        const isSelected = selectedDates.includes(day);
        const isPast = date < new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  
        days.push(
          <div
            key={day}
            className={`calendar-day ${isToday ? 'today' : ''} ${
              isSelected ? 'selected' : ''
            } ${isPast ? 'past' : ''}`}
            onClick={() => handleDateClick(day)}
          >
            {day}
          </div>
        );
      }
  
      return days;
    };
  
    return (
      <div className="calendar-container">
        <div className="calendar-header">
          <button className="nav-button" onClick={handlePrevMonth}>&lt;</button>
          <span className="calendar-title">
            {displayDate.toLocaleString('default', { month: 'long' })}{' '}
            {displayDate.getFullYear()}
          </span>
          <button className="nav-button" onClick={handleNextMonth}>&gt;</button>
        </div>
        <div className="calendar-grid">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="calendar-day-name">
              {day}
            </div>
          ))}
          {renderCalendar()}
        </div>
      </div>
    );
  };
  
  export default CustomCalendar;