import * as Notifications from 'expo-notifications';
import { useRef, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { 
  useFonts, 
  Inter_400Regular, 
  Inter_600SemiBold, 
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter';
import { Subscription } from 'expo-modules-core';

import './src/configs/notification';

import { Background, Loading } from './src/components';
import { Routes } from './src/routes';
import { NotifiactionHelper } from './src/helpers/notificationHelper';



export default function App() {
  const getNotificationListner = useRef<Subscription>();
  const responseNotificationListner = useRef<Subscription>();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold, 
    Inter_900Black
  });

  useEffect(() => {
    NotifiactionHelper.getPushNotificationToken();
  }, []);

  useEffect(() => {
    getNotificationListner.current = Notifications.addNotificationReceivedListener((notification) => {
      console.log(notification);
    });

    responseNotificationListner.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      if (getNotificationListner.current && responseNotificationListner.current) {
        Notifications.removeNotificationSubscription(getNotificationListner.current);
        Notifications.removeNotificationSubscription(responseNotificationListner.current);
      } 
    }
  }, [])

  return (
    <Background>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent" 
        translucent
      />
      { fontsLoaded ? <Routes /> : <Loading/> }
    </Background>
  );
}
