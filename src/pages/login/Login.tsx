/**
 * Sample React Native App
 */

import React, {PropsWithChildren} from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {setCredentials} from '../../util/login';
import {post} from '../../util/request';

type Props = PropsWithChildren<{
  navigation: any;
}>;

export const Login: React.FC<Props> = ({navigation}) => {
  const styles = StyleSheet.create({
    main: {
      paddingTop: '10%',
      paddingLeft: '8%',
      paddingRight: '8%',
      alignItems: 'center',
    },
    panel: {
      width: '100%',
      alignItems: 'center',
    },
    logo: {
      marginTop: 100,
      marginBottom: 100,
    },
    title: {
      fontFamily: 'Ping Fang SC, SimHei',
      fontWeight: 'bold',
      fontSize: 30,
      color: '#888',
    },
    row: {
      height: 40,
      paddingLeft: 10,
      paddingRight: 10,
      marginBottom: 30,
      width: '60%',
      backgroundColor: 'white',
    },
    login: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      fontSize: 20,
      fontWeight: 'bold',
      color: '#065fd4',
    },
    btnRow: {
      borderColor: '#065fd4',
      borderWidth: 1,
      borderRadius: 4,
      backgroundColor: '#065fd4',
    },
  });

  let username = '';
  let pwd = '';

  const clickLogin = () => {
    login(username, pwd);
  };

  const login = async (name, pwd) => {
    try {
      const res = await post('/login', {
        name,
        pwd,
      });
      const data = res?.data ?? {};
      if (data.success === true) {
        setCredentials(name, data.token, data.auth, data.id);
        navigation.navigate('Home');
      } else {
        Alert.alert(
          'Caution',
          'Login failed.',
          [
            {
              text: 'OK',
              onPress: () => console.log,
              style: 'cancel',
            },
          ],
          {
            cancelable: true,
          },
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Caution',
        'Login failed.',
        [
          {
            text: 'OK',
            onPress: () => console.log,
            style: 'cancel',
          },
        ],
        {
          cancelable: true,
        },
      );
    }
  };

  const usernameChange = val => {
    username = val;
  };

  const pwdChange = val => {
    pwd = val;
  };

  return (
    <View style={styles.main}>
      <View style={styles.logo}>
        <Text style={styles.title}>ABC Training Insight</Text>
      </View>
      <View style={styles.panel}>
        <View style={styles.row}>
          <TextInput onChangeText={usernameChange} placeholder="Username" />
        </View>
        <View style={styles.row}>
          <TextInput
            secureTextEntry={true}
            onChangeText={pwdChange}
            placeholder="Password"
          />
        </View>
        <View style={{...styles.row, ...styles.btnRow}} onTouchEnd={clickLogin}>
          <View style={styles.login}>
            <Text style={{color: '#fff'}}>Login</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
