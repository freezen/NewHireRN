/**
 * Item
 */

import React, {PropsWithChildren} from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {IVideoItem} from '../../../../typing';

type Props = PropsWithChildren<{
  data: IVideoItem<ImageSourcePropType>;
  style?: any;
  navigation: any;
}>;

const commonIconStyle = {
  width: 24,
  height: 24,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 5,
  },
  picture: {
    height: 200,
    width: '100%',
    overflow: 'hidden',
  },
  title: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  text: {
    fontFamily: 'Ping Fang SC, SimHei',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottom: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
  },
  uHead: {
    ...commonIconStyle,
    borderRadius: 12,
  },
  uname: {
    marginLeft: 5,
  },
});

export const Item: React.FC<Props> = ({data, navigation, style}) => {
  if (!data || !data.id) {
    return (
      <View
        style={{...styles.container, ...style, backgroundColor: '#f7f7f7'}}
      />
    );
  }
  const clickItem = () => {
    navigation.navigate('Detail', {
      ...data,
    });
  };
  return (
    <View style={{...styles.container, ...style}} onTouchEnd={clickItem}>
      <Image style={styles.picture} source={data.pic} />
      <View style={styles.title}>
        <Text style={styles.text} ellipsizeMode={'tail'} numberOfLines={1}>
          {data.name}
        </Text>
      </View>
      <View style={styles.bottom}>
        <View style={styles.left}>
          <Image
            style={styles.uHead}
            source={require('../../../../../assets/Sam.png')}
          />
          <Text style={styles.uname}>{data.uname}</Text>
        </View>
        {data.likes ? (
          <Image
            style={commonIconStyle}
            source={require('../../../../../assets/loved.png')}
          />
        ) : (
          <Image
            style={commonIconStyle}
            source={require('../../../../../assets/love.png')}
          />
        )}
      </View>
    </View>
  );
};
