import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';
import FlashMessage from 'react-native-flash-message';

import AppNavigator from './navigation/AppNavigator';
import { Networker } from './util/axios';
import { API_URLS } from './constants/network';
import { Storage } from './util/storage';
import { ClientData } from 'types/auth';
import { Message, MessageDuration } from './util/message';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
        <FlashMessage position="bottom" />
      </ApplicationProvider>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    loadNetworkDetails(),
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png')
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      'opensans-bold': require('./assets/fonts/opensans-bold.ttf'),
      'opensans-regular': require('./assets/fonts/opensans-regular.ttf'),
      'opensans-semibold': require('./assets/fonts/opensans-semibold.ttf')
    })
  ]);
}

async function loadNetworkDetails() {
  const { data } = await Networker.get<ClientData>(API_URLS.CLIENT);
  Message.show(data.client_id, 'info', MessageDuration.LONG);
  await Storage.setClient(data);
}

function handleLoadingError(error: Error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
