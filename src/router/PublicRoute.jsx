import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../auth';


export const PublicRoute = ({ children }) => {

   const { logged } = useContext(AuthContext);

   return (!logged)// si no esta autenticado muestra sus children que es el login
      ? children
      : <Navigate to="/marvel" />
}
