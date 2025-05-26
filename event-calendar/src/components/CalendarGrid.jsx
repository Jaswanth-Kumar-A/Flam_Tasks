import React from 'react';
import { format, isToday, isSameMonth } from 'date-fns';
import EventCard from './EventCard';
import './CalendarStyles.css';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const CalendarGrid = ({ days, events, currentDate, onAddEvent, onEditEvent, onDeleteEvent }) => {
  const getEventsForDay = (day) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day.getDate() &&
        eventDate.getMonth() === day.getMonth() &&
        eventDate.getFullYear() === day.getFullYear()
      );
    });
  };

  return (
    <div className="calendar-grid">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 4 }}>
        {WEEKDAYS.map(day => (
          <div className="calendar-weekdays" key={day}>{day}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {days.map((day, index) => {
          const dayEvents = getEventsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          return (
            <div
              className="calendar-day-cell"
              key={index}
              style={{
                opacity: isCurrentMonth ? 1 : 0.4,
                background: isToday(day) ? '#e3f0ff' : '#f7fafd',
                border: isToday(day) ? '2px solid #1976d2' : 'none',
                boxShadow: isToday(day) ? '0 0 0 2px #1976d233' : 'none',
              }}
              onClick={() => onAddEvent(day)}
            >
              <div className="calendar-day-label">
                {isToday(day) ? (
                  <span className="calendar-today">{format(day, 'd')}</span>
                ) : (
                  format(day, 'd')
                )}
              </div>
              <div style={{ marginTop: 2 }}>
                {dayEvents.map(event => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onEdit={() => onEditEvent(event)}
                    onDelete={() => onDeleteEvent(event.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid; 