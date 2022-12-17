import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import First from './screens/First';
import Second from './screens/Second';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="First"
          component={First}
          options={{title:'First'}}
        />
        <Stack.Screen 
          name="Second"
          component={Second}
          options={{title:'Second'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
