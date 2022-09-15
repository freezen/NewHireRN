/**
 * Page Footer
 */

import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

enum ESelection {
  HOME = 'Home',
  ME = 'Me',
}

const commonIconStyle = {
  width: 24,
  height: 24,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
    paddingTop: 6,
  },
  tab: {
    alignItems: 'center',
    opacity: 0.4,
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
  },
  selected: {
    opacity: 1,
  },
});

export const Footer: React.FC = () => {
  // refer the useNavigation hook as best practice
  const navigation = useNavigation() as any;
  const router = useRoute();
  const clickTab = (tabName: ESelection) => {
    navigation.navigate(tabName);
  };
  return (
    <View style={styles.container}>
      <View
        onTouchEnd={() => {
          clickTab(ESelection.HOME);
        }}
        style={{
          ...styles.tab,
          ...(router.name === ESelection.HOME ? styles.selected : {}),
        }}>
        <Image
          style={commonIconStyle}
          source={require('../../../assets/home.png')}
        />
        <Text style={styles.text}>Home</Text>
      </View>
      <View
        onTouchEnd={() => {
          clickTab(ESelection.ME);
        }}
        style={{
          ...styles.tab,
          ...(router.name === ESelection.ME ? styles.selected : {}),
        }}>
        <Image
          style={commonIconStyle}
          source={require('../../../assets/me.png')}
        />
        <Text style={styles.text}>Me</Text>
      </View>
    </View>
  );
};
