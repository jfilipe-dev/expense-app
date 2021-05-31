import React from 'react';

import { AuthProvider } from './Auth';
import { Profileprovider } from './Profile';

const AppProvider: React.FC = ({ children }) => (
  <Profileprovider>
    <AuthProvider>{children}</AuthProvider>
  </Profileprovider>
);

export default AppProvider;
