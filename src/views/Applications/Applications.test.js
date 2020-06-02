import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Applications from './Applications';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Applications /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
