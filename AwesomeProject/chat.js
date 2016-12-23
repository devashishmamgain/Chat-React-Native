//'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NativeModules
} from 'react-native';

//module.exports = NativeModules.ImagePicker;
var ImagePicker  = NativeModules.ImagePicker;
var ApplozicChat = NativeModules.ApplozicChat;


export default class AwesomeProject extends Component {
  openImage() {
    ImagePicker.openSelectDialog(
      {}, // no config yet
      (uri) => { console.log(uri) },
      (error) => { console.log(error) }
    )
  }

 chatLogin() {
    ApplozicChat.login(
      {'userId' : 'react', 'displayName' : 'React', 'email' : 'react@applozic.com'},
      (response) => { console.log(response) },
      (error) => { console.log(error) }
    )
  }


 openChat() {
    ApplozicChat.openChat(
      {},
      (response) => { console.log(response) },
      (error) => { console.log(error) }
    )
  }

 initiateChat(){
    ApplozicChat.initiateChat(
    {},
    (response) => { console.log(response) },
    (error) => { console.log(error) }
   )
 }

 logoutUser(){
    ApplozicChat.logoutUser(
     {},
     (response) => { console.log(response) },
     (error) => { console.log(error) },
    )
  }

 contactUnreadCount(){
    ApplozicChat.contactUnreadCount(
    {'userId':'ak01'},
    (response) => { alert(response)  },
    (error) => { console.log(error) },
   )
  }

channelUnreadCount(){
    ApplozicChat.channelUnreadCount(
    {'channelKey':'1234'},
    (response) => { alert(response) },
    (error) => { console.log(error) },
   )
  }

totalUnreadCount(){
    ApplozicChat.totalUnreadCount(
    {},
    (response) => { alert(response) },
    (error) => { console.log(error) },
   )
 }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress={this.openImage.bind(this)}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Ok! Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <Text style={styles.instructions} onPress={this.chatLogin.bind(this)}>
          Login to Chat
         </Text>
         <Text style={styles.instructions} onPress={this.openChat.bind(this)}>
          Open Chat
         </Text>
		 <Text style={styles.instructions} onPress={this.initiateChat.bind(this)}>
		 INITIATE CHAT
	     </Text>
		<Text style={styles.instructions} onPress={this.logoutUser.bind(this)}>
         Logout User
         </Text>
        <Text style={styles.instructions} onPress={this.contactUnreadCount.bind(this)}>
         ContactUnreadCount
         </Text>
        <Text style={styles.instructions} onPress={this.channelUnreadCount.bind(this)}>
         ChannelUnreadCount
         </Text>
        <Text style={styles.instructions} onPress={this.totalUnreadCount.bind(this)}>
         TotalUnreadCount
         </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
