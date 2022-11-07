
import { screen, render, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../src/auth';
import { Navbar } from '../../../src/ui';

const mockedUseNavigate = jest.fn();

// REVIEW - dice, usa todo lo que viene en router-dom y solo modifica el useNavigate
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUseNavigate
}))


describe('Pruebas en <Navbar/>', () => {

   //REVIEW - Importante usar un jes.clearAllMocks para lanzar cada test limpio 

   const contextValue = {
      logged: true,
      user: {
         name: "Cristina V. Rogriguez",
         id: "ABC345"
      },
      logout: jest.fn()
   }

   beforeEach(() => jest.clearAllMocks());

   // NOTE - 

   test('Debe de mostrar el nombre del usuario logeado ', () => {



      render(
         <AuthContext.Provider value={ contextValue }>
            <MemoryRouter>
               <Navbar />
            </MemoryRouter>
         </AuthContext.Provider>
      )

      screen.debug()
      expect(screen.getByText('Cristina V. Rogriguez')).toBeTruthy();
   })

   //  NOTE -

   test('Debe llamar el logout y navigate cuando se hace click en el botón', () => {

      render(
         <AuthContext.Provider value={ contextValue }>
            <MemoryRouter>
               <Navbar />
            </MemoryRouter>
         </AuthContext.Provider>
      )

      const logoutBtnMock = screen.getByRole('button');

      fireEvent.click(logoutBtnMock);

      expect(contextValue.logout).toHaveBeenCalled()
      expect(mockedUseNavigate).toHaveBeenCalledWith("/login", { replace: true })//ln 8
   })
})