import React from 'react';

import { useAuth } from '../hooks/Auth';

import AppRoutes from './AppRoutes.routes';
import Auth from './Auth.routes';

// import { Container } from './styles';

const Routes: React.FC = () => {
  const { user } = useAuth();

  return user ? <AppRoutes /> : <Auth />;
};

export default Routes;
