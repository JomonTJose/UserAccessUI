import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App, { ProtectedRoute } from '../../src/App';
import { Provider } from 'react-redux';
import { store } from '../../src/store';
import Login from '../../src/component/Login';
import Register from '../../src/component/Register';
import Home from '../../src/component/Home';

jest.mock('../../src/component/Login', () => {
  return function MockLogin() {
    return <div>Login</div>;
  };
});
jest.mock('../../src/component/Register', () => {
  return function MockRegister() {
    return <div>Register</div>;
  };
});

describe('App component', () => { 
  it('renders Login component on /login route', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Provider store={store}>  
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('renders Register component on /register route', () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText('Register')).toBeInTheDocument();
  }); 
});


describe('ProtectedRoute', () => {
  
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render children when user is authenticated',async () => {

    localStorage.setItem('userToken', 'fake-token');
    
    render(
      <MemoryRouter>    
        <Provider store={store}>
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
        expect(screen.getByTestId('home-container')).toBeInTheDocument();
    });
  });

  it('should redirect to login when user is not authenticated', () => {

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Provider store={store}>
          <Routes>
            <Route path="/protected" element={
              <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});