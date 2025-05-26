# Event Calendar

A dynamic, interactive event calendar built with React and Material-UI that allows users to manage their schedule. Users can add, edit, delete, and view events, with support for recurring events and drag-and-drop functionality.

## Features

- Monthly calendar view with current day highlighting
- Add, edit, and delete events
- Event recurrence options (Daily, Weekly, Monthly, Custom)
- Color-coded events
- Responsive design
- Local storage persistence
- Drag-and-drop event rescheduling
- Event conflict management

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd event-calendar
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Adding an Event
1. Click on any day in the calendar
2. Fill in the event details in the form
3. Click "Add Event"

### Editing an Event
1. Click on the event you want to edit
2. Modify the details in the form
3. Click "Update Event"

### Deleting an Event
1. Click on the event you want to delete
2. Click the delete icon in the event card

### Recurring Events
1. When adding or editing an event, select a recurrence option from the dropdown
2. Choose from:
   - No Recurrence
   - Daily
   - Weekly
   - Monthly
   - Custom

## Technologies Used

- React
- Material-UI
- date-fns
- Vite
- Local Storage API

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
