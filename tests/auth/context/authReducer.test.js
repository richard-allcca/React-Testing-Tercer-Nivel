import { fireEvent, render, screen } from "@testing-library/react"
import { authReducer } from "../../../src/auth/context/authReducer"
import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { types } from "../../../src/auth/types/types";


describe('Pruebas en authReducer', () => {

   const initialState = {
      logged: false
   }

   //NOTE -  

   test('Debe retornar el estado inicial', () => {

      const newState = authReducer(initialState, {})
      // expect(newState).toBe(initialState)
      expect(newState).toEqual(initialState)
   })

   //NOTE - Debe ejecutar el proceso interno de login no llamar a la función, y esperar que el retorno sea una copia del retorno de authReducer con el case "login"

   test('Debe (login) autenticar y establecer el user', () => {

      const action = {
         type: types.login,
         payload: {
            name: "Richi",
            id: "123",
         }
      }

      const state = authReducer({ logged: false }, action);

      expect(state).toEqual({
         logged: true,
         user: action.payload
      })
   })

   // NOTE - Debe ejecutar el proceso interno del logout no llamar a la función, y esperar la copia del retorno de authReducer en case logout

   test('Debe (logout) borrar el name del usuario y logged en false', () => {

      const action = {
         type: types.logout,
      }

      const state = authReducer({ logged: true }, action);

      expect(state).toEqual({
         logged: false
      })
   })

})