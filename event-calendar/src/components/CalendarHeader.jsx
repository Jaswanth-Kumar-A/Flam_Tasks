import React from 'react';
import { IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { format } from 'date-fns';
import './CalendarStyles.css';

const CalendarHeader = ({ currentDate, onPrevMonth, onNextMonth }) => {
  return (
    <div className="calendar-header">
      <IconButton onClick={onPrevMonth} size="small">
        <ChevronLeft />
      </IconButton>
      <span className="calendar-title">
        {format(currentDate, 'MMMM, yyyy')}
      </span>
      <IconButton onClick={onNextMonth} size="small">
        <ChevronRight />
      </IconButton>
    </div>
  );
};

export default CalendarHeader; 