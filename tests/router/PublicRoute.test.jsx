import { render, screen } from '@testing-library/react';
import { AuthContext } from './../../src/auth/context/AuthContext';
import { PublicRoute } from './../../src/router/PublicRoute';
import { MemoryRouter, Route, Routes } from 'react-router-dom';


describe('Pruebas en <PublicRoute/>.jsx', () => {


   // NOTE - con logged false, siempre te desvia a la ruta publica que es login pero aqui usamos un h1 para simular la ruta publica

   test('Debe mostrar el children si no esta autenticado', () => {


      const contextValue = {
         logged: false
      }

      render(
         <AuthContext.Provider value={ contextValue } >
            <PublicRoute>
               <h1>Ruta pública</h1>
            </PublicRoute>
         </AuthContext.Provider>
      )

      screen.debug()

      expect(screen.getByText('Ruta pública')).toBeTruthy();
   })

   // NOTE - initialEntries recibe un arreglo con la ruta a la que apuntamos el test
   // para este caso login tiene un desvio y por eso debemos usar el Rotues & Route
   // Ciclo infinito, devido a que el login redirecciona, eso obliga a MemoryRouter a tener el componente destino(en este caso marvel) si esta logeado

   test('Debe de poder navegar si esta logeado', () => {

      const contextValue = {
         logged: true,
         user: {
            name: "Richard",
            id: "ABC123",
         }
      }

      render(
         <AuthContext.Provider value={ contextValue }>
            <MemoryRouter initialEntries={ [ '/login' ] } >

               <Routes>
                  <Route path='login' element={
                     <PublicRoute>
                        <h1>Ruta pública</h1>
                     </PublicRoute>
                  } />

                  <Route path="marvel" element={ <h1>Página Marvel</h1> } />
               </Routes>

            </MemoryRouter>
         </AuthContext.Provider>
      )
      screen.debug()

      expect(screen.getByText('Página Marvel')).toBeTruthy();
   })



})

