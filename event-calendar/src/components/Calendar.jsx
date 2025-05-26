import React, { useState } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import EventForm from './EventForm';
import { useLocalStorage } from '../hooks/useLocalStorage';
import './CalendarStyles.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useLocalStorage('events', []);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setIsFormOpen(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setIsFormOpen(true);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  const handleSaveEvent = (eventData) => {
    if (selectedEvent) {
      setEvents(prev => prev.map(event => 
        event.id === selectedEvent.id ? { ...eventData, id: event.id } : event
      ));
    } else {
      setEvents(prev => [...prev, { ...eventData, id: Date.now() }]);
    }
    setIsFormOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="calendar-root">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      <CalendarGrid
        days={daysInMonth}
        events={events}
        currentDate={currentDate}
        onAddEvent={handleAddEvent}
        onEditEvent={handleEditEvent}
        onDeleteEvent={handleDeleteEvent}
      />
      {isFormOpen && (
        <EventForm
          open={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedEvent(null);
          }}
          onSave={handleSaveEvent}
          event={selectedEvent}
        />
      )}
    </div>
  );
};

export default Calendar; 