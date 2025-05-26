import React from 'react';
import { CssBaseline, Container, ThemeProvider, createTheme } from '@mui/material';
import Calendar from './components/Calendar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Calendar />
      </Container>
    </ThemeProvider>
  );
}

export default App;
