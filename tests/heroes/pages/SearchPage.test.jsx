
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({ // REVIEW - usar un jest.clearAllMocks
   ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUseNavigate
}))

describe('Pruebas en <SearchPage/>', () => {

   beforeEach(() => jest.clearAllMocks());

   // NOTE -

   test('Debe mostrarse con valores por defecto ', () => {

      const { container } = render(
         <MemoryRouter>
            <SearchPage />
         </MemoryRouter>
      )

      // screen.debug();
      expect(container).toMatchSnapshot();
   })

   // NOTE -

   test('Debe mostrar a Batman y el input con el valor del querystring', () => {

      render(
         <MemoryRouter initialEntries={ [ '/search?q=batman' ] } >
            <SearchPage />
         </MemoryRouter>
      )

      const inputElement = screen.getByRole('textbox');
      expect(inputElement.value).toBe('batman');

      const imgElement = screen.getByRole('img');
      expect(imgElement.src).toContain('/assets/heroes/dc-batman.jpg')
      screen.debug();

      const divErrorElement = screen.getByLabelText('div')
      expect(divErrorElement.style.display).toBe('none');
      // console.log(divErrorMock)
   })

   // NOTE -

   test('Debe mostrar un error si no se encuentra el hero', () => {

      render(
         <MemoryRouter initialEntries={ [ '/search?q=batman123' ] }>
            <SearchPage />
         </MemoryRouter>
      )

      const divErrorElement = screen.getByLabelText('div');
      expect(divErrorElement.style.display).toBe('')
   })

   //  NOTE - Este test es principalmente para ejecutar un funcion y esta ejecute un useNavigate de react-router-dom

   test('Debe llamar al navigate a la pantalla nueva', () => {

      const inputValue = 'superman';

      render(
         <MemoryRouter initialEntries={ [ '/search' ] }>
            <SearchPage />
         </MemoryRouter>
      )

      const inputElement = screen.getByRole('textbox');
      fireEvent.change(inputElement, { target: { name: 'searchText', value: inputValue } })

      const formElement = screen.getByLabelText('form');
      fireEvent.submit(formElement)

      expect(mockedUseNavigate).toHaveBeenCalled();
      expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`);

   })

})