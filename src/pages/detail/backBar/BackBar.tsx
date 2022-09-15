/**
 * Page Backbar
 */

import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

type Props = PropsWithChildren<{
  navigation: any;
}>;

const commonIconStyle = {
  width: 32,
  height: 32,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
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
  head: {
    ...commonIconStyle,
    borderRadius: 16,
  },
  title: {
    fontFamily: 'Ping Fang SC, SimHei',
    fontWeight: 'bold',
    fontSize: 16,
  },
  search: {
    width: 28,
    height: 28,
  },
});

export const BackBar: React.FC<Props> = ({navigation}) => {
  const clickBack = () => {
    navigation.navigate('Home', {
      refresh: Date.now(),
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.bigHead} onTouchEnd={clickBack}>
        <Image
          style={styles.head}
          source={require('../../../../assets/back.png')}
        />
      </View>
      <Text style={styles.title}>ABC Training Insight</Text>
      <Text> </Text>
    </View>
  );
};
