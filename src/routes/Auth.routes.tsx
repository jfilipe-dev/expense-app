import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Auth from '../screens/Auth';

// import { Container } from './styles';

const routes: React.FC = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Auth" component={Auth} />
    </Stack.Navigator>
  );
};

export default routes;
