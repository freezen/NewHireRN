/**
 * Page Header
 */

import React, {Dispatch, PropsWithChildren, SetStateAction} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ImageSourcePropType,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {getCredentials} from '../../util/login';
import {reqConfig} from '../../util/request';

type Props = PropsWithChildren<{
  setUploaded: Dispatch<SetStateAction<boolean>>;
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
  search: {
    width: 28,
    height: 28,
  },
});

export const Header: React.FC<Props> = ({setUploaded}) => {
  let formData: FormData = null as unknown as FormData;
  const heads: Record<string, ImageSourcePropType> = {
    Jim: require('../../../assets/Jim.png'),
    Sam: require('../../../assets/Sam.png'),
  };
  const clickUpload = async () => {
    const result = await launchImageLibrary({
      mediaType: 'mixed',
      selectionLimit: 2,
    });
    console.log(result);
    if (result.didCancel || !result.assets || result.assets.length < 2) {
      return;
    }
    // upload the files as multipart
    formData = new FormData();
    result.assets?.forEach(item => {
      let name = item.fileName;
      if (name?.includes(':')) {
        const type = item?.type?.split('/')[1];
        name = name.split(':')[0] + '.' + type;
      }
      if (item.fileName) {
        formData.append(item.fileName, {
          ...item,
          name,
        });
      }
    });

    const xhr = new XMLHttpRequest();
    xhr.open('POST', reqConfig.url + '/video/upload');
    // set the token & key from login service
    xhr.setRequestHeader('token', getCredentials().token);
    xhr.setRequestHeader('key', getCredentials().key);
    xhr.onreadystatechange = function () {
      console.log('xhr.readyState:', xhr.readyState, 'xhr.status:', xhr.status);
      if (xhr.readyState === 4 && xhr.status === 200) {
        cleanUploadInput();
        Alert.alert(
          'Info',
          'Upload success.',
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
        setUploaded(true);
      }
    };
    xhr.send(formData);
    Alert.alert('Info', 'Uploading selected files ... ...', [], {
      cancelable: false,
    });
  };
  const cleanUploadInput = () => {
    formData = null as unknown as FormData;
  };
  return (
    <View style={styles.container}>
      <View style={styles.bigHead}>
        <Image style={styles.head} source={heads[getCredentials().key]} />
        <View style={styles.dot} />
      </View>
      <Text style={styles.title}>ABC Training Insight</Text>
      {getCredentials().auth === 'admin' ? (
        <View onTouchEnd={clickUpload}>
          <Image
            style={styles.search}
            source={require('../../../assets/upload.png')}
          />
        </View>
      ) : (
        <Text> </Text>
      )}
    </View>
  );
};
