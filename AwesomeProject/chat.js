//'use strict';
import React, { Component } from 'react';
import { hardwareBackPress, exitApp } from 'react-native-back-android';
import { BackAndroid } from 'react-native';
import {
  AppRegistry,
  StyleSheet,
  AppState,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  NativeModules
} from 'react-native';

//module.exports = NativeModules.ImagePicker;
var ImagePicker  = NativeModules.ImagePicker;
var ApplozicChat = NativeModules.ApplozicChat;

export default class AwesomeProject extends React.Component{

	constructor(props) {
    super(props);
    this.state = 
		{userId:'',
		 email :'',
		 phoneNumer:'',
		 pass_word:'',
		 displayName:'',		 
         result:false };
	this.openChat = this.openChat.bind(this);
    this.isUserLogIn=this.isUserLogIn.bind(this);
    this.logoutUser=this.logoutUser.bind(this);
	this.initiateChat=this.initiateChat.bind(this);
	this.chatLogin=this.chatLogin.bind(this);
  }
  
componentDidMount() {
    this.isUserLogIn;
  }
  
openImage() {
    ImagePicker.openSelectDialog(
    {}, // no config yet
    (uri) => { console.log(uri) },
    (error) => { console.log(error) },
   )
 }

chatLogin() {
	if(this.state.userId.length>0 && this.state.pass_word.length>0)
	{
    ApplozicChat.login(
    {'userId':this.state.userId,'email':'','phoneNumber':'','password':this.state.pass_word,'displayName':''},
	(response) => { this.openChat(),this.setState({ result: true })},
    (error) => {console.log(error)},
    )
    }else{alert("Please Enter UserId & Password")};
  }
 
isUserLogIn(){
    ApplozicChat.isUserLogIn(
    {},
    (response) => {this.setState({ result: response });},
    (error) => { console.log(error) },
   )
  }
 
logoutUser(){
    ApplozicChat.logoutUser(
    {},
    (response) => {this.setState({userId:'',email:'',phoneNumber:'',pass_word:'',displayName:''})
	              ,this.setState({result: false})},
    (error) => {console.log(error)},
   )
  }

openChat() {
    ApplozicChat.openChat(
    {},
    (response) => {console.log(response)},
    (error) => {console.log(error)},
   )
  }
  
initiateChat(){
    ApplozicChat.initiateChat(
    {},
    (response) => {console.log(response)},
    (error) => {console.log(error)},
   )
  }

contactUnreadCount(){
    ApplozicChat.contactUnreadCount(
    {'userId':'ak01'},
    (response) => {console.log(response)},
    (error) => {console.log(error)},
   )
  }

channelUnreadCount(){
    ApplozicChat.channelUnreadCount(
    {'channelKey':'1234'},
    (response) => {console.log(response)},
    (error) => {console.log(error)},
   )
  }

totalUnreadCount(){
    ApplozicChat.totalUnreadCount(
    {},
    (response) => { console.log(response) },
    (error) => { console.log(error) },
   )
 }

render() {
      let display = this.state.result;
      if (display) {
        return (    
        <View style={styles.container}>		
		<Text style={styles.titleText}>  Applozic </Text>
        <Text style={styles.baseText} > Demo App   </Text>
        <Text style={styles.btn} onPress={this.initiateChat}> Chat Logs  </Text>
		<Text style={styles.btn} onPress={this.logoutUser}> LogOut </Text>	
        </View>
	   );}

       return (
        <View  style={styles.container}>
        <ScrollView>
	    <Text style={styles.titleText}>Applozic </Text>
        <Text style={styles.baseText}> Demo App </Text>
	    
		<TextInput
        style={styles.inputText} 
	    keyboardType="default"
		placeholder="UserId"
		maxLength={25}
		underlineColorAndroid='transparent'
        value={this.state.userId}
		onChangeText={userId => this.setState({userId})}/>
        
		<TextInput
		type="email-address"
        style={styles.inputText}
		placeholder="Email"
		keyboardType="email-address"
		maxLength={30}
		underlineColorAndroid='transparent'
        value={this.state.email}
		onChangeText={email => this.setState({email})}/> 
 	     
		<TextInput
        style={styles.inputText}
		placeholder="Phone Number"
		keyboardType="phone-pad"
		underlineColorAndroid='transparent'
		maxLength={10}
        value={this.state.phoneNumber}
		onChangeText={phoneNumber => this.setState({phoneNumber})}/> 
          
		<TextInput
		id="password"
		type="password"
        style={styles.inputText}
		maxLength={25}
		placeholder="Password"
		keyboardType="default"
		underlineColorAndroid='transparent'
        value={this.state.pass_word}
		secureTextEntry={true}
		onChangeText={pass_word => this.setState({pass_word})}/> 

        <TextInput
	    id="displayName"
        style={styles.inputText}
		placeholder="Display Name"
		keyboardType="default"
		underlineColorAndroid='transparent'
        value={this.state.displayName}
		onChangeText={displayName=> this.setState({displayName})}/> 
      
	    <Button
        onPress={this.chatLogin}
        title="Login/SignUp"
		color ="#20B2AA"
		marginLeft={20}
		marginRight={20}/>
    	
 		</ScrollView>	      
        </View> 
	  );
   }
}

const styles = StyleSheet.create({

container:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#4D394B',
  },
  
btn:{
	fontSize: 23,
    fontWeight: 'bold',
    color:'yellow',
    marginTop: 20,
    alignSelf:'center', 
  },

baseText:{
    fontFamily: 'Cochin',
	color:'#fff',
    marginBottom:25,
    alignSelf:'center',
  },
  
titleText:{
    fontSize: 25,
    fontWeight: 'bold',
    color:'#fff',
    marginTop: 15,
    alignSelf:'center',
  },
   
inputText:{
    width:330,
    height: 40, 
    backgroundColor:'#fff',
    marginBottom: 6,
	padding: 10,   
    fontSize: 20,
    marginLeft: 10,
    marginRight:10,
  },
});
