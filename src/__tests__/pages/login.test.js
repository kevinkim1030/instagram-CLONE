import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from '../../pages/login';
import FirebaseContext from '../../context/firebase';
import { BrowserRouter as Router } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { act } from 'react-dom/test-utils';


const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

jest.mock('../../services/firebase');

describe('<Login />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the login page with a form submission and logs the user in', async () => {
    const succeededToLogin = jest.fn(() => Promise.resolve('I am signed in!'))
    const firebase = {
      auth: jest.fn(() => ({
        signInWithEmailAndPassword: succeededToLogin
      }))
    };

    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <Login />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      await fireEvent.change(getByPlaceholderText('Email address'), {
        target: { value: 'kevin@gmail.com' }
      });
      await fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: '123123' }
      });
      fireEvent.submit(getByTestId('login'));
      
      expect(document.title).toEqual('Login - Instagram');
      expect(succeededToLogin).toHaveBeenCalled();
      expect(succeededToLogin).toHaveBeenCalledWith('kevin@gmail.com', '123123');

      await waitFor(() => {
        expect(mockHistoryPush).toHaveBeenCalledWith(ROUTES.DASHBOARD);
        expect(getByPlaceholderText('Email address').value).toBe('kevin@gmail.com');
        expect(getByPlaceholderText('Password').value).toBe('123123');
        expect(queryByTestId('error')).toBeFalsy();
      })
    });
  });

  it('renders the login page with a form submission and fails to login the user', async () => {
    const failToLogin = jest.fn(() => Promise.reject(new Error('Can not sign in')))
    const firebase = {
      auth: jest.fn(() => ({
        signInWithEmailAndPassword: failToLogin
      }))
    };

    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <Login />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      await fireEvent.change(getByPlaceholderText('Email address'), {
        target: { value: 'kevin.com'}
      });
      await fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: '123123'}
      });
      fireEvent.submit(getByTestId('login'));
      
      expect(document.title).toEqual('Login - Instagram');
      expect(failToLogin).toHaveBeenCalled();
      expect(failToLogin).toHaveBeenCalledWith('kevin.com', '123123');
      expect(failToLogin).rejects.toThrow('Can not sign in');

      await waitFor(() => {
        expect(mockHistoryPush).not.toHaveBeenCalledWith(ROUTES.DASHBOARD);
        expect(getByPlaceholderText('Email address').value).toBe('');
        expect(getByPlaceholderText('Password').value).toBe('');
        expect(queryByTestId('error')).toBeTruthy();
      });
    });
  });
});