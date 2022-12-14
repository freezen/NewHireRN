/**
 * Sample React Native App
 */

import React, {PropsWithChildren, useState} from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import {BackBar} from './backBar/BackBar';
import Video from 'react-native-video';
import {Footer} from '../../components/footer/Footer';
import {get, post} from '../../util/request';
import {getCredentials} from '../../util/login';

type Props = PropsWithChildren<{
  navigation: any;
  route: any;
}>;

const commonIconStyle = {
  width: 24,
  height: 24,
};

export const Detail: React.FC<Props> = ({route, navigation}) => {
  const [loaded, setLoaded] = useState(false);
  const [paused, setPaused] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [like, setLike] = useState();
  const [loading, setLoading] = useState(false);
  if (!route) {
    return <></>;
  }
  const {name, url, uname, id, likes} = route.params;
  if (!name || !uname) {
    return <></>;
  }
  if (url && !videoUrl) {
    setVideoUrl(url);
  }
  if (like === undefined && likes !== undefined && likes !== null) {
    setLike(likes);
  }
  const styles = StyleSheet.create({
    homeStyle: {
      justifyContent: 'space-between',
      height: '100%',
    },
    main: {
      flex: 1,
    },
    wrapper: {
      position: 'relative',
      width: '100%',
      minHeight: '50%',
      borderBottomWidth: 0.5,
      borderTopWidth: 0.5,
      marginBottom: 10,
      backgroundColor: '#222',
      justifyContent: 'center',
      alignItems: 'center',
    },

    title: {
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 10,
      paddingRight: 10,
    },
    text: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    bottom: {
      flexDirection: 'row',
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10,
      paddingBottom: 15,
      borderBottomColor: '#d5d5d5',
      borderBottomWidth: 0.5,
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
    video: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: '100%',
      minHeight: '50%',
      paddingBottom: 0,
      paddingTop: 0,
    },
    status: {
      fontSize: 20,
      color: 'white',
    },
  });

  const onLoad = () => {
    setLoaded(true);
    console.log('onLoad');
  };

  const onVideoError = (e) => {
    console.log('onVideoError:', e);
  };

  const pause = () => {
    setPaused(!paused);
  };

  const clickLike = async () => {
    setLoading(true);
    await post('/favorite/like', {
      id: getCredentials().id,
      videoId: id,
      like: !like,
    });
    await refresh();
    setLoading(false);
    post(
      'https://x48usp9m8e.execute-api.us-east-2.amazonaws.com/dev/i',
      {
        candidate: 'fuhua',
        userId: getCredentials().id,
        mobileType: Platform.OS,
        userName: getCredentials().key,
        videoId: id,
        eventName: like === false ? 'Like' : 'Unlike',
        lastLogin: getCredentials().loginTime,
        eventTime: Date.now(),
      },
      true,
    )
      .then(() => {
        console.log(11111);
      })
      .catch(e => {
        console.error('Req error:', e);
      });
  };

  const refresh = async () => {
    const res = await get('/getVideo?id=' + id);
    if (res.data?.[0]?.url) {
      setVideoUrl(res.data[0].url);
      setLike(res.data[0].likes ? true : false);
    }
  };

  return (
    <View style={styles.homeStyle}>
      <BackBar navigation={navigation} />
      {videoUrl && (
        <View style={styles.main}>
          <View style={styles.wrapper} onTouchEnd={pause}>
            <Video
              source={{uri: videoUrl}}
              style={styles.video}
              paused={paused}
              onLoad={onLoad}
              onError={onVideoError}
            />
            {!loaded && (
              <Image
                style={{width: 80, height: 80}}
                source={require('../../../assets/loading.gif')}
              />
            )}
            {paused && <Text style={styles.status}>| |</Text>}
          </View>
          <View style={styles.title}>
            <Text style={styles.text}>{name}</Text>
          </View>
          <View style={styles.bottom}>
            <View style={styles.left}>
              <Image
                style={styles.uHead}
                source={require('../../../assets/Sam.png')}
              />
              <Text style={styles.uname}>{uname}</Text>
            </View>
            {getCredentials().token && (
              <View onTouchEnd={clickLike}>
                {loading === true ? (
                  <Image
                    style={commonIconStyle}
                    source={require('../../../assets/loading.gif')}
                  />
                ) : like ? (
                  <Image
                    style={commonIconStyle}
                    source={require('../../../assets/loved.png')}
                  />
                ) : (
                  <Image
                    style={commonIconStyle}
                    source={require('../../../assets/love.png')}
                  />
                )}
              </View>
            )}
          </View>
        </View>
      )}
      {!url && (
        <View
          style={{...styles.main, padding: 20, fontSize: 24}}
          onTouchEnd={refresh}>
          <Text>Video not ready. Click me to refresh.</Text>
        </View>
      )}
      <Footer />
    </View>
  );
};
