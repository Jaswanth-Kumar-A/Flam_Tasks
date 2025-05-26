import React from 'react';
import { Paper, Typography, IconButton, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { format } from 'date-fns';

const EventCard = ({ event, onEdit, onDelete }) => {
  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <Paper
      elevation={1}
      sx={{
        padding: 1,
        marginBottom: 0.5,
        backgroundColor: event.color || '#e3f2fd',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: event.color ? `${event.color}dd` : '#bbdefb'
        }
      }}
      onClick={handleEdit}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" noWrap>
          {event.title}
        </Typography>
        <Box>
          <IconButton size="small" onClick={handleEdit}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={handleDelete}>
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      <Typography variant="caption" color="text.secondary">
        {format(new Date(event.date), 'h:mm a')}
      </Typography>
    </Paper>
  );
};

export default EventCard; 