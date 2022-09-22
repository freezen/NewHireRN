/**
 * Item
 */

import React, {PropsWithChildren, useState} from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
    position: 'relative',
  },
  picture: {
    height: 200,
    width: '100%',
    overflow: 'hidden',
  },
  skeleton: {
    position: 'absolute',
    height: 200,
    width: '100%',
    top: 0,
    left: 0,
    backgroundColor: 'white',
  },
  title: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  text: {
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
  const [loaded, setLoaded] = useState(false);
  const {width} = Dimensions.get('window');
  const skeletonWidth = width / 2 - 30;
  const skeletonHeight = 28;
  if (!data || !data.id) {
    return (
      <View style={{...styles.container, ...style}}>
        <ContentLoader style={{...styles.skeleton, height: 260}}>
          <Rect x="10" y="10" width={skeletonWidth} height={skeletonHeight} />
          <Rect x="10" y="50" width={skeletonWidth} height={skeletonHeight} />
          <Rect x="10" y="90" width={skeletonWidth} height={skeletonHeight} />
          <Rect x="10" y="130" width={skeletonWidth} height={skeletonHeight} />
          <Rect x="10" y="170" width={skeletonWidth} height={skeletonHeight} />
          <Rect x="10" y="210" width={skeletonWidth} height={skeletonHeight} />
        </ContentLoader>
      </View>
    );
  }
  let t = 0;
  const clickItem = () => {
    if (Date.now() - t < 300) {
      navigation.navigate('Detail', {
        ...data,
      });
    }
  };
  const clickStart = () => {
    t = Date.now();
  };
  const loadPic = () => {
    setLoaded(true);
  };
  return (
    <View
      style={{...styles.container, ...style}}
      onTouchEnd={clickItem}
      onTouchStart={clickStart}>
      <Image style={styles.picture} source={data.pic} onLoad={loadPic} />
      {loaded === false && (
        <ContentLoader style={styles.skeleton}>
          <Rect x="10" y="10" width={skeletonWidth} height={skeletonHeight} />
          <Rect x="10" y="50" width={skeletonWidth} height={skeletonHeight} />
          <Rect x="10" y="90" width={skeletonWidth} height={skeletonHeight} />
          <Rect x="10" y="130" width={skeletonWidth} height={skeletonHeight} />
          <Rect x="10" y="170" width={skeletonWidth} height={skeletonHeight} />
        </ContentLoader>
      )}
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
