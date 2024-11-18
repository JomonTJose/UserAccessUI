import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../../src/component/Login';
import '@testing-library/jest-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';

const mockStore = configureStore({
  reducer: {
    auth: (state = { user: null, error: null, loading: false }, action) => state,
  }
})

describe('Login Component', () => {
  it('renders login form', () => {
    render(
      <BrowserRouter>
        <Provider store={mockStore}>
          <Login />
        </Provider>
      </BrowserRouter>
    );
    
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  

});
