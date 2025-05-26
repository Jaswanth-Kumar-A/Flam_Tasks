# React Bottom Sheet Demo

A custom React bottom sheet component with spring animations and multiple snap points. This implementation features smooth animations, touch and mouse interactions, and responsive design.

## Features

- Custom bottom sheet implementation with spring animations
- Multiple snap points (closed, half-open, fully open)
- Touch and mouse drag interactions
- Responsive design for all screen sizes
- Smooth spring animations using react-spring
- Control buttons for easy navigation
- Clean and modern UI

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bottom-sheet-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`.

## Usage

- Drag the handle at the top of the bottom sheet to interact
- Use the control buttons (Close, Half, Open) to snap to different positions
- The bottom sheet will automatically snap to the nearest position when released
- Content is scrollable when the sheet is open

## Implementation Details

- Built with React and react-spring for animations
- Uses CSS for styling and responsive design
- Implements touch and mouse event handling
- Custom spring animation configuration for smooth transitions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT 