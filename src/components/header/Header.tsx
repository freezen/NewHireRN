/**
 * Page Header
 */

import { useIsFocused } from '@react-navigation/native';
import React, {Dispatch, PropsWithChildren, SetStateAction, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ImageSourcePropType,
  Modal,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {getCredentials} from '../../util/login';
import {reqConfig} from '../../util/request';

type Props = PropsWithChildren<{
  setUploaded: Dispatch<SetStateAction<boolean>>;
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
    fontWeight: 'bold',
    fontSize: 16,
  },
  search: {
    width: 28,
    height: 28,
  },
  uploadContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  progressBar: {
    height: '20%',
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 30,
    padding: 30,
  },
  progressTitle: {
    marginBottom: 10,
  },
  progressTitleText: {
    fontSize: 18,
  },
  progress: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#f1f1f1',
    borderRadius: 4,
    height: 8,
  },
  progressInner: {
    height: 8,
    borderRadius: 4,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'rgb(170, 200, 222)',
  },
  progressNumerText: {
    marginTop: 10,
    fontSize: 18,
  },
  panel: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '40%',
  },
  closeBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 40,
    paddingRight: 10,
    paddingTop: 10,
    marginBottom: 30,
  },
  closeIcon: {
    width: 18,
    height: 18,
  },
  modalTitle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 18,
  },
  titleText: {
    fontSize: 20,
    color: 'rgb(74, 123, 157)',
  },
  boxs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  boxBlock: {
    alignItems: 'center',
  },
  picFile: {
  },
  videoFile: {
    
  },
  box: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: 80,
    width: 80,
    position: 'relative',
  },
  boxPic: {
    backgroundColor: 'rgb(236, 252, 245)',
  },
  boxVideo: {
    backgroundColor: 'rgb(248, 236, 254)',
  },
  checkedIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 24,
    height: 24,
  },
  cameraIcon: {
    width: 40,
    height: 40,
  },
  videoIcon: {
    width: 40,
    height: 30,
  },
  label: {
    marginTop: 5,
  },
  labelText: {
    color: 'rgb(46, 94, 129)',
  },
  btn: {
    height: 76,
    paddingTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bar: {
    height: 6,
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  cancel: {
    marginTop: 14,
    borderRadius: 10,
  },
  cancelText: {
    color: 'rgb(122, 179, 219)',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export const Header: React.FC<Props> = ({setUploaded, navigation}) => {
  let formData = useRef<FormData | null>(null);
  let [progress, setProgress] = useState(0);
  const [picInfo, setPicInfo] = useState({
    name: '',
    type: '',
  });
  const [videoInfo, setVideoInfo] = useState({
    name: '',
    type: '',
  });
  const isFocused = useIsFocused();
  const [focus, setFocus] = useState(true);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  useEffect(() => {
    if (isFocused !== focus) {
      setFocus(isFocused);
    }
  }, [isFocused]);
  const cleanUploadInput = () => {
    setPicInfo({
      name: '',
      type: '',
    });
    setVideoInfo({
      name: '',
      type: '',
    });
    formData.current = null;
  };
  const heads: Record<string, ImageSourcePropType> = {
    Jim: require('../../../assets/Jim.png'),
    Sam: require('../../../assets/Sam.png'),
    default: require('../../../assets/default.png'),
  };
  const login = () => {
    navigation.navigate('Login');
  };
  const clickUploadModal = () => {
    setProgress(0);
    setUploadModalVisible(true);
  };
  const cancelUpload = () => {
    cleanUploadInput();
    setProgress(0);
    setUploadModalVisible(false);
  };
  const selectPic = async () => {
    const picResult = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    console.log('selectPic:==', picResult);
    if (
      picResult.didCancel ||
      !picResult.assets ||
      picResult.assets.length < 1
    ) {
      Alert.alert(
        'Warning',
        'Please select a picture',
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
      return;
    }
    if (picResult.assets[0]) {
      if (!formData.current) {
        // upload the files as multipart
        formData.current = new FormData();
      }
      let name = picResult.assets[0].fileName ?? '';

      if (name) {
        let type = picResult.assets[0].type?.split('/')[1] ?? '';
        if (name.includes(':')) {
          type = picResult.assets[0]?.type?.split('/')[1] ?? '';
          name = name.split(':')[0] + '.' + type;
        }
        setPicInfo({
          name,
          type,
        });
        formData.current.append(name, {
          ...picResult.assets[0],
          name,
        });
      }
    }
  };
  const selectVideo = async () => {
    const videoResult = await launchImageLibrary({
      mediaType: 'video',
      selectionLimit: 1,
    });
    console.log('selectVideo:', videoResult);
    if (
      videoResult.didCancel ||
      !videoResult.assets ||
      videoResult.assets.length < 1
    ) {
      Alert.alert(
        'Warning',
        'Please select a video',
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
      return;
    }
    if (videoResult.assets[0]) {
      if (!formData.current) {
        // upload the files as multipart
        formData.current = new FormData();
      }
      let name = videoResult.assets[0].fileName ?? '';

      if (name) {
        let type = videoResult.assets[0].type?.split('/')[1] ?? '';
        if (name.includes(':')) {
          type = videoResult.assets[0]?.type?.split('/')[1] ?? '';
          name = name.split(':')[0] + '.' + type;
        }
        if (!name.includes('.')) {
          name = name + '.' + type;
        }
        setVideoInfo({
          name,
          type,
        });
        formData.current.append(name, {
          ...videoResult.assets[0],
          name,
        });
      }
    }
  };
  const clickUpload = async () => {
    if (!formData.current || formData.current.getParts().length < 2) {
      Alert.alert(
        'Warning',
        'Please select all the files',
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
      return;
    }
    setProgress(0);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', reqConfig.url + '/video/upload');
    // set the token & key from login service
    xhr.setRequestHeader('token', getCredentials().token);
    xhr.setRequestHeader('key', getCredentials().key);
    xhr.onerror = () => {
      Alert.alert(
        'Error',
        'Upload fails:' + xhr.responseText,
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
    };
    xhr.onreadystatechange = function () {
      console.log('xhr.readyState:', xhr.readyState, 'xhr.status:', xhr.status);
      if (xhr.readyState === 4 && xhr.status === 200) {
        try {
          const res = JSON.parse(xhr.responseText) as any;
          if (res.success !== true) {
            Alert.alert(
              'Error',
              'Upload failed: ' + res.message,
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
          } else {
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
            cleanUploadInput();
            setProgress(0);
            setUploadModalVisible(false);
            setUploaded(true);
          }
        } catch (e) {}
      }
    };
    xhr.send(formData.current);
    let p = 0;
    let interval = setInterval(() => {
      if (p >= 76) {
        clearInterval(interval);
      } else {
        p += parseInt(Math.random() * 10 + '', 10);
        console.log('p:', p);
        setProgress(p > 76 ? 76 : p);
      }
    }, parseInt(Math.random() * 10 + '', 10) * 100);
  };
  return (
    <View style={styles.container}>
      <View style={styles.bigHead} onTouchEnd={login}>
        <Image
          style={styles.head}
          source={heads[getCredentials().key || 'default']}
        />
        {getCredentials().key && <View style={styles.dot} />}
      </View>
      <Text style={styles.title}>ABC Training Insight</Text>
      {getCredentials().auth === 'admin' ? (
        <View onTouchEnd={clickUploadModal}>
          <Image
            style={styles.search}
            source={require('../../../assets/upload.png')}
          />
        </View>
      ) : (
        <Text> </Text>
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={uploadModalVisible}
        onRequestClose={() => {
          setUploadModalVisible(false);
        }}>
        <View style={styles.uploadContainer}>
          {progress !== 0 && (
            <View style={styles.progressBar}>
              <View style={styles.progressTitle}>
                <Text style={styles.progressTitleText}>Upload 2 files</Text>
              </View>
              <View style={styles.progress}>
                <View
                  style={{...styles.progressInner, width: progress + '%'}}
                />
              </View>
              <Text style={styles.progressNumerText}>
                {progress < 100 ? progress + '%' : 'Done'}
              </Text>
            </View>
          )}
          <View style={styles.panel}>
            <View style={styles.closeBar}>
              <View style={styles.modalTitle}>
                <Text style={styles.titleText}>Upload files</Text>
              </View>
              <View onTouchEnd={cancelUpload}>
                <Image
                  style={styles.closeIcon}
                  source={require('../../../assets/close.png')}
                />
              </View>
            </View>
            <View style={styles.boxs}>
              <View
                style={{...styles.picFile, ...styles.boxBlock}}
                onTouchEnd={selectPic}>
                <View style={{...styles.box, ...styles.boxPic}}>
                  <Image
                    style={styles.cameraIcon}
                    source={require('../../../assets/camera.png')}
                  />
                  {picInfo.name && (
                    <Image
                      style={styles.checkedIcon}
                      source={require('../../../assets/checked.png')}
                    />
                  )}
                </View>
                <View style={styles.label}>
                  <Text style={styles.labelText}>Select the cover picture</Text>
                </View>
              </View>
              <View
                style={{...styles.videoFile, ...styles.boxBlock}}
                onTouchEnd={selectVideo}>
                <View style={{...styles.box, ...styles.boxVideo}}>
                  <Image
                    style={styles.videoIcon}
                    source={require('../../../assets/video.png')}
                  />
                  {videoInfo.name && (
                    <Image
                      style={styles.checkedIcon}
                      source={require('../../../assets/checked.png')}
                    />
                  )}
                </View>
                <View style={styles.label}>
                  <Text style={styles.labelText}>Select training video</Text>
                </View>
              </View>
            </View>
            <View style={styles.btn}>
              <View style={styles.bar} />
              <View style={styles.cancel} onTouchEnd={clickUpload}>
                <Text style={styles.cancelText}>Upload</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
