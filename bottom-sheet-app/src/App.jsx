import React from 'react';
import BottomSheet from './components/BottomSheet';
import './App.css';

const HANDLE_HEIGHT = 24; // px
const SHEET_HEIGHT = 600; // px

const snapPoints = {
  closed: HANDLE_HEIGHT, // show just the handle
  half: SHEET_HEIGHT * 0.5,
  open: SHEET_HEIGHT * 0.9,
};

function App() {
  return (
    <div className="App gradient-bg">
      <div className="main-layout">
        <div className="phone-mockup">
          <BottomSheet>
            <div className="sheet-content">
              <span>React</span>
              <span>Spring</span>
              <span>Bottom</span>
              <span>Sheet</span>
              <div className="sheet-message">
                Accessible, Delightful,<br />
                and Performant
              </div>
            </div>
          </BottomSheet>
        </div>
        <div className="right-text">
          <h1>Accessible, Delightful,<br />and Performant</h1>
        </div>
      </div>
    </div>
  );
}

export default App;