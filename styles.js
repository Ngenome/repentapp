import { StyleSheet, Text,Image,ImageBackground, Button, View,Dimensions, TouchableOpacity } from 'react-native';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

 var backgroundColor= "#0b0c2b";
 var topTextColor='aqua'
 var  borderBottomColor ='red'
 var CardTitleColor='#94ffb8'
 var CardTextColor ='white'
 
export const styles = StyleSheet.create({
  flexCardView:{
    flexWrap:'wrap',
    flexDirection:'row',
    justifyContent:'space-evenly'
    
  },
  container: {
    flex: 1,
    backgroundColor: backgroundColor
    
  },
  topView:{
    
  },
  topText:{
    color:topTextColor,
    textAlign:'center',
    borderBottomColor:borderBottomColor,
    borderWidth:2,
  },
  CardBackgroundImage:{
    margin:5,
    
    height:windowHeight/5,
    width:140,
    borderRadius:10,
    overflow:'hidden'
    
  }
  ,CardView:{
    height:100,
    width:100,
  },
  absolute:{
    position:'absolute',
    
  }
  ,CardTitle:{
    color:CardTitleColor
  },
  floatText:{
    color:CardTextColor
  }
  
  
});
