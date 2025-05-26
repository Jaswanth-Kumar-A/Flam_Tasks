import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material';
import { format } from 'date-fns';

const RECURRENCE_OPTIONS = [
  { value: 'none', label: 'No Recurrence' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'custom', label: 'Custom' }
];

const EventForm = ({ open, onClose, onSave, event }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    recurrence: 'none',
    color: '#e3f2fd'
  });

  useEffect(() => {
    if (event) {
      const eventDate = new Date(event.date);
      setFormData({
        ...event,
        date: format(eventDate, 'yyyy-MM-dd'),
        time: format(eventDate, 'HH:mm')
      });
    } else {
      setFormData({
        title: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        time: format(new Date(), 'HH:mm'),
        description: '',
        recurrence: 'none',
        color: '#e3f2fd'
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dateTime = new Date(`${formData.date}T${formData.time}`);
    onSave({
      ...formData,
      date: dateTime.toISOString()
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {event ? 'Edit Event' : 'Add New Event'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              name="title"
              label="Event Title"
              value={formData.title}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="date"
              label="Date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              name="time"
              label="Time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Recurrence</InputLabel>
              <Select
                name="recurrence"
                value={formData.recurrence}
                onChange={handleChange}
                label="Recurrence"
              >
                {RECURRENCE_OPTIONS.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="color"
              label="Color"
              type="color"
              value={formData.color}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {event ? 'Update' : 'Add'} Event
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EventForm; 