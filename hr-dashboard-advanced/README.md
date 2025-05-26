# HR Dashboard (Advanced)

A modern HR dashboard built with React, Vite, and Tailwind CSS for managing employee performance, bookmarks, and analytics.

## Features

- 📊 **Dashboard Homepage**
  - Employee cards with performance ratings
  - Search and filter functionality
  - Bookmark and promote actions

- 👤 **Employee Details**
  - Detailed profile information
  - Performance history
  - Projects and feedback tabs

- 📌 **Bookmark Manager**
  - List of bookmarked employees
  - Quick actions (view, promote, remove)
  - Promotion confirmation modal

- 📈 **Analytics Dashboard**
  - Department-wise performance charts
  - Bookmark trends
  - Key metrics summary

## Tech Stack

- React (with Vite)
- Tailwind CSS
- Zustand (State Management)
- Chart.js
- React Router
- Heroicons

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd hr-dashboard-advanced
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Features Implemented

- [x] Responsive design (Mobile to Desktop)
- [x] Dark/Light mode toggle
- [x] Employee search and filtering
- [x] Performance ratings with star display
- [x] Bookmark management
- [x] Analytics with charts
- [x] Dynamic routing
- [x] State persistence with Zustand

## Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── pages/         # Page components
├── store/         # Zustand store
└── utils/         # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
