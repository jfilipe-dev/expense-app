import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';

import { useProfile } from '../hooks/Profile';

import Profile from '../screens/Profile';
import NewExpense from '../screens/NewExpense';
import History from '../screens/History';
import { Text, View } from 'react-native';
import { colors } from '../config/styles';

const Tab = createBottomTabNavigator();

const routes: React.FC = () => {
  const { categories } = useProfile();

  return (
    <View style={{ flex: 1, backgroundColor: colors.light }}>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: colors.light }}
        tabBarOptions={{
          labelPosition: 'below-icon',
          style: {
            height: 80,
            borderWidth: 0,
            borderTopWidth: 0,
            elevation: 15,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          activeTintColor: colors.principal,
          labelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
            marginBottom: 12,

          },
          inactiveTintColor: '#B7B7CC',
        }}
      >
        <Tab.Screen
          name="History"
          options={{
            tabBarIcon: ({ color }) => (
              <Feather color={color} name="file-text" size={28} />
            ),
            title: 'History',
          }}
          component={History}
        />
        <Tab.Screen
          name="NewExpense"
          options={{
            tabBarIcon: ({ color }) => (
              <View style={{ backgroundColor: colors.principal, width: 60, height: 60, marginBottom: 20, borderRadius: 30, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: colors.light, fontSize: 32 }}>+</Text>
              </View>
            ),
            title: 'New Expense',
          }}
          component={categories.length === 0 ? Profile : NewExpense}
        />

        <Tab.Screen
          name="Profile"
          options={{
            tabBarIcon: ({ color }) => (
              <Feather color={color} name="user" size={28} />
            ),
            title: 'Profile',
          }}
          component={Profile}
        />
      </Tab.Navigator>
    </View>
  );
};

export default routes;
