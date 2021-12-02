import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'

import './App.css';

import GridBoard from './components/GridBoard'
import NextBlock from './components/NextBlock'
import HoldBlock from './components/HoldBlock'
import ScoreBoard from './components/ScoreBoard'
import Controls from './components/Controls'
import MessagePopup from './components/MessagePopup'

const store = createStore(reducers)

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <GridBoard />
        <div className='block-info'>
          <NextBlock />
          <HoldBlock />
        </div>
        <ScoreBoard />
        <Controls />
        <MessagePopup />
      </div>
    </Provider>
  );
}

export default App;
