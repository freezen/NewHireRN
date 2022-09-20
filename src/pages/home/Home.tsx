/**
 * Sample React Native App
 */

import React, {PropsWithChildren, useState} from 'react';
import { Footer } from '../../components/footer/Footer';
import {Header} from '../../components/header/Header';
import {List} from './components/list/List';

type Props = PropsWithChildren<{
  navigation: any;
  route: any;
}>;

export const Home: React.FC<Props> = ({route, navigation}) => {
  const [isUploaded, setUploaded] = useState(false);
  if (!route) {
    return <></>;
  }
  console.log('route:', route);
  const {refresh} = route?.params ?? false;
  return (
    <>
      <Header setUploaded={setUploaded} navigation={navigation} />
      <List
        navigation={navigation}
        isUploaded={isUploaded}
        setUploaded={setUploaded}
        refresh={refresh}
      />
      <Footer />
    </>
  );
};
