/**
 * Sample React Native App
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Home} from './src/pages/home/Home';
import {Detail} from './src/pages/detail/Detail';
import {User} from './src/pages/user/User';
import {Login} from './src/pages/login/Login';
const Stack = createNativeStackNavigator();
export const App = () => {
  const styles = StyleSheet.create({
    homeStyle: {
      justifyContent: 'space-between',
      height: '100%',
      fontFamily: 'Ping Fang SC, SimHei',
      backgroundColor: 'white',
    },
  });

  const opt = {
    headerShown: false,
  };

  return (
    <SafeAreaView style={styles.homeStyle}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={opt} />
          <Stack.Screen name="Home" component={Home} options={opt} />
          <Stack.Screen name="Detail" component={Detail} options={opt} />
          <Stack.Screen name="Me" component={User} options={opt} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
