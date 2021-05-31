import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './hooks';

import Routes from './routes';
import { colors } from './config/styles';

// import { Container } from './styles';

const src: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.principal} />
      <SafeAreaView style={{ flex: 1 }}>
        <AppProvider>
          <Routes />
        </AppProvider>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default src;
