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

TaskManager.defineTask('playAudyio', () => {
  setInterval(  ()=>{console.log('played');},2000)
});


async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 15 * 1, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}
async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

export function BackgroundFetchScreen() {
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [status, setStatus] = React.useState(null);

  React.useEffect(() => {
    checkStatusAsync();
  }, []);

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    setStatus(status);
    setIsRegistered(isRegistered);
  };

  const toggleFetchTask = async () => {
    if (isRegistered) {
      await unregisterBackgroundFetchAsync();
    } else {
      await registerBackgroundFetchAsync();
    }

    checkStatusAsync();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.textContainer}>
        <Text>
          Background fetch status:{' '}
          <Text style={styles.boldText}>{status ? BackgroundFetch.Status[status] : null}</Text>
        </Text>
        <Text>
          Background fetch task name:{' '}
          <Text style={styles.boldText}>
            {isRegistered ? BACKGROUND_FETCH_TASK : 'Not registered yet!'}
          </Text>
        </Text>
      </View>
      <View style={styles.textContainer}></View>
      <Button
        title={isRegistered ? 'Unregister BackgroundFetch task' : 'Register BackgroundFetch task'}
        onPress={toggleFetchTask}
      />
    </View>
  );
}
function Card(props){
  const Blur = React.useRef(null)
  const navigation = useNavigation();
  return(
    <TouchableOpacity onPress={()=>navigation.navigate(props.parent)
    }>
    <ImageBackground style={styles.CardBackgroundImage}source={{
      uri:props.uri
    }}>
    
    <BlurView intensity={20} tint='dark' style={styles.blurContainer}>
    
    <View 
    
    style={styles.CardView}>
    <View  style={styles.topCardView}>
  {  // <BlurView
    //           style={styles.absolute}
    //           viewRef={Blur}
    //           blurType="light"
    //           blurAmount={10}
    //           reducedTransparencyFallbackColor="white"
    //         />
  }
     <Text style={styles.CardTitle}>{props.title}</Text>
    </View>
    
    <View style={styles.floatView}>
    <Text style={styles.floatText}>{props.description}</Text>
    
    </View>
    </View>
     </BlurView>
    </ImageBackground>
    
    </TouchableOpacity>
    )
}
function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.topText}>Home Screen</Text>
      
      <View style={styles.topView}>
      <Text>Preparing the way for the coming of The Messiah Screen</Text>
      
      </View>
      <View style={styles.flexCardView}>
      <Card uri='https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80' title='worship' parent='worship'
      description='Listen to and watch refreshing Holy Worships'
      />
      <Card uri='https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80' title='Live Updates' parent='liveupdates'
            description='Get live updates'
            />
      <Card uri='https://static.wixstatic.com/media/a5f063_42d56c1d9b384e52a8037dac475626bc~mv2.png/v1/fit/w_2500,h_1330,al_c/a5f063_42d56c1d9b384e52a8037dac475626bc~mv2.png' title='Radio' parent='radio'
            description='Listen to and watch refreshing Holy Worships'
            />
      <Card uri='https://images.unsplash.com/photo-1497621122273-f5cfb6065c56?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80'  title='Departments' parent='departments'
            description='Listen to and watch refreshing Holy Worships'
            />
            <Card uri='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrNTymWB1kkYJbHQPax05feEgA3dy5pPFKZg&usqp=CAU' title='teachings' parent='teachings'
                        description='Listen to and watch refreshing Holy Worships'
                        />
        <Card uri='https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80' title='Messages' parent='chat'
                    description='Listen to and watch refreshing Holy Worships'
                    />
      
      </View>
      
      
      
    </View>
  );
}


function WorshipScreen({navigation}) {
  
  return (
    <View style={styles.container}>
      <Text>Holy Worships</Text>
    </View>
  );
}
function TeachingsScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <Text>Holy Teachings</Text>
    </View>
  );
}

function RadioScreen({ navigation }) {
  const [sound, setSound] = React.useState();
    async function playSound() {
    console.log('Loading Sound');
    const sound = new Audio.Sound();
   
    await sound.loadAsync({uri:'https://s3.radio.co/s97f38db97/listen'});
  
    await Audio.setAudioModeAsync({staysActiveInBackground:true,
    shouldDuckAndroid:false
    });
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
    await sound.setPositionAsync(0);}
//});
 // }
  return (
    <View style={styles.container}>
      <Text>The Endtime Radio</Text><View>
      <Button onPress={playSound} title='Play Radio' color='blue'/>
      </View>
    </View>
  );
}
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
function DepartmentsScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <Text>The Various Departments</Text>
    </View>
  );
}
const Stack = createNativeStackNavigator();

  
function App() {
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
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        
        <Stack.Screen name="departments" component={DepartmentsScreen} />
        
        <Stack.Screen name="chat" component={ChatScreen} />
        
        <Stack.Screen name="radio" component={RadioScreen} />
        
        <Stack.Screen name="worship" component={WorshipScreen} />
        
        
        <Stack.Screen name="teachings" component={TeachingsScreen} />
        
        
        <Stack.Screen name="liveupdates" component={BackgroundFetchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


import * as Calendar from 'expo-calendar';

export  function AlarmNotify() {
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        console.log('Here are all your calendars:');
        alert({ calendars });
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Calendar Module Example</Text>
      <Button title="Create a new calendar" onPress={createCalendar} />
    </View>
  );
}

async function getDefaultCalendarSource() {
  const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
  const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
  return defaultCalendars[0].source;
}

async function createCalendar() {
  const defaultCalendarSource =
    Platform.OS === 'ios'
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: 'Expo Calendar' };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: 'Live Notification',
    color: 'blue',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: 'isLiveAlert',
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
  alert(`Your new calendar ID is: ${newCalendarID}`);
}

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

