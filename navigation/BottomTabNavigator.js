import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LimitesScreen from '../screens/LimitesScreen';
import Colors from '../constants/Colors';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator 
        initialRouteName={INITIAL_ROUTE_NAME}
        tabBarOptions={{
            activeTintColor: Colors.tintColor,
            animationEnabled: true,
            keyboardHidesTabBar: true
          }}
        >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Repositories',
          tabBarIcon: ({ color, focused }) => (
                <TabBarIcon 
                    focused={focused} 
                    name="logo-github" 
                    tintColor={color}  
                />
          ),
        }}
      />
      <BottomTab.Screen
        name="Limites"
        component={LimitesScreen}
        options={{
          title: 'API Requests Limits',
          tabBarIcon: ({ focused, color, size }) => <TabBarIcon focused={focused} name="md-alert" tintColor={color} />,
        }}
      />
    </BottomTab.Navigator>

  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Repositories';
    case 'Limites':
        return 'API Requests Limits'
  }
}
