
import { StatusBar } from 'expo-status-bar';
import React,{useState, useRef, useEffect} from 'react';
import { StyleSheet, Text,Image,ImageBackground, Button, View,Dimensions, TouchableOpacity } from 'react-native';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

import { Audio } from 'expo-av';
import {BlurView} from 'expo-blur'
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

//import TrackPlayer from 'react-native-track-player';
const BACKGROUND_FETCH_TASK = 'background-fetch'
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now();

  alert(`Got background fetch call at date: ${new Date(now).toISOString()}`);

  // Be sure to return the successful result type!
  return BackgroundFetch.Result.NewData;
});


function ChatScreen({ navigation }) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  async function playSound() {
    console.log('Loading Sound');
    const sound = new Audio.Sound();
   
    await sound.loadAsync(require('./assets/music.mp3'));
  
    await Audio.setAudioModeAsync({staysActiveInBackground:true,
    shouldDuckAndroid:false
    });


    console.log('Playing Sound');
    await sound.playAsync();
    await sound.setPositionAsync(0);}
//});
  useEffect(() => {
    registerForPushNotificationsAsync().then(token =>{ setExpoPushToken(token);console.log(token)});
  
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      alert(notification)
      playSound();
        
      //console.log(notification)
    });
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      //alert(response)
    });
  
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>The Chat Section</Text>
    </View>
  );
}
const Colors={
  chatText:'white',
  chatView:'black',
  topChatText:'grey',
  
}
export const ChatView=(props)=>{
  return(
    <View style={styles.chatView}>
    <View style={styles.topChatView}>
    <Text style={styles.topChatViewText}>Jesus is Lord Radio</Text>
    </View>
    <View style={styles.mainChatView}>
    <Image style={styles.chatImage} source={require('./assets/worship.jpeg')}/> <Text style={styles.chatText}>Praise THE LORD</Text>
    </View>
    
    </View>
    )
}
import {windowWidth, windowHeight} from './App'
const style=StyleSheet.create({
  chatView:{
    height:windowHeight/12,
    width:windowWidth/1.02,
    backgroundColor:''
  }
  
})