/**
 * Sample React Native App
 */

import React, {PropsWithChildren, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import { Footer } from '../../components/footer/Footer';
import {clearLogin, getCredentials} from '../../util/login';

type Props = PropsWithChildren<{
  navigation: any;
}>;

const commonIconStyle = {
  width: 24,
  height: 24,
};

export const User: React.FC<Props> = ({navigation}) => {
  const styles = StyleSheet.create({
    main: {
      backgroundColor: '#f7f7f7',
      flex: 1,
    },
    panel: {
      padding: 20,
      flex: 1,
      justifyContent: 'flex-end',
    },
    quit: {
      justifyContent: 'center',
      alignContent: 'center',
      borderColor: '#ddd',
      borderRadius: 4,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 20,
      borderWidth: 1,
      height: 50,
      backgroundColor: 'white',
    },
    bar: {
      justifyContent: 'space-between',
      backgroundColor: 'white',
      alignItems: 'center',
      flexDirection: 'row',
      height: 50,
      paddingLeft: 10,
      paddingRight: 10,
      borderBottomWidth: 0.5,
      borderBottomColor: '#ccc',
    },
    bigHead: {
      position: 'relative',
    },
    dot: {
      position: 'absolute',
      backgroundColor: 'red',
      width: 8,
      height: 8,
      borderRadius: 4,
      right: 0,
      top: 0,
    },
    head: {
      ...commonIconStyle,
      borderRadius: 16,
    },
    title: {
      fontFamily: 'Ping Fang SC, SimHei',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });

  const quit = () => {
    clearLogin();
    navigation.navigate('Login');
  };

  const heads = {
    Jim: require('../../../assets/Jim.png'),
    Sam: require('../../../assets/Sam.png'),
  } as any;

  return (
    <View style={styles.main}>
      <View style={styles.bar}>
        <View style={styles.bigHead}>
          <Image style={styles.head} source={heads[getCredentials().key]} />
          <View style={styles.dot} />
        </View>
        <Text style={styles.title}>ABC Training Insight</Text>
        <Text> </Text>
      </View>
      <View style={styles.panel}>
        <View style={styles.quit} onTouchEnd={quit}>
          <Text>Quit</Text>
        </View>
      </View>
      <Footer />
    </View>
  );
};
