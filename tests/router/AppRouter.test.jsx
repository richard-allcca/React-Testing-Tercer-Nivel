
import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../src/auth';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from './../../src/router/AppRouter';

describe('Pruebas en <AppRouter/>', () => {


   // NOTE - Por debug() podemos ver que la palabra esperada viene dos veces en btn y h1, por eso usamos "getAllByText" en lugar de "getByText"

   test('Debe de mostrar login si no esta autenticado', () => {

      const contextValue = {
         logged: false
      }

      render(
         <AuthContext.Provider value={ contextValue }>
            <MemoryRouter initialEntries={ [ '/marvel' ] }>
               <AppRouter />
            </MemoryRouter>
         </AuthContext.Provider>
      )

      screen.debug();
      expect(screen.getAllByText('Login')).toBeTruthy()
      expect(screen.getAllByText('Login').length).toBe(2)
   })

   // NOTE -

   test('Debe de mostar el componente de marvel si esta autenticado', () => {

      const contextValue = {
         logged: true,
         user: {
            name: "Richard",
            id: "ABC123"
         }
      }

      render(
         <AuthContext.Provider value={ contextValue }>
            <MemoryRouter initialEntries={ [ '/login' ] } >
               <AppRouter />
            </MemoryRouter>
         </AuthContext.Provider>
      )

      screen.debug();
      expect(screen.getByText('Asociaciones')).toBeTruthy();
      expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1);
   })
})