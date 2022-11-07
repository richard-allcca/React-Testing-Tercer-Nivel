
import { render, screen } from '@testing-library/react';
import { AuthContext } from './../../src/auth/context/AuthContext';
import { MemoryRouter } from 'react-router-dom';
import { PrivateRoute } from '../../src/router/PrivateRoute';

describe('Pruebas en <PrivateRoute/>', () => {

   // NOTE -

   test('Debe de  mostrar el children si esta autenticado', () => { })

   Storage.prototype.setItem = jest.fn();

   const contextValue = {
      logged: true,
      user: {
         id: "abc",
         name: "Test privado"
      }
   }

   render(
      <AuthContext.Provider value={ contextValue }>
         <MemoryRouter initialEntries={ [ '/search?q=batman' ] } >
            <PrivateRoute>
               <h1>Ruta Privada</h1>
            </PrivateRoute>
         </MemoryRouter>
      </AuthContext.Provider>
   )

   expect(screen.getByText('Ruta Privada')).toBeTruthy();
   expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/search?q=batman');
})