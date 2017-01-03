//'use strict';
import React, { Component } from 'react';
import BackAndroid from 'react-native';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
   TextInput,
  ScrollView,
  NativeModules
} from 'react-native';

var ApplozicChat = NativeModules.ApplozicChat;


export default class AwesomeProject extends Component {

  constructor(props) {
    super(props);
    this.state = {
                  userId:'',
              		email :'',
              		phoneNumer:'',
              		password:'',
              		displayName:'',
              		blank:'',
                  loggedIn: 'false'
	              };
      this.openChat = this.openChat.bind(this);
      this.isUserLogIn = this.isUserLogIn.bind(this);
  }

  componentDidMount() {
    this.isUserLogIn();
  }

  openChat() {
    ApplozicChat.openChat(
      {},
      (response) => { console.log(response) },
      (error) => { console.log(error) }
    )
  }

  chatLogin() {
  	var a = this.state.userId;
  	var b = this.state.password;
  	var c = this.state.displayName;
	  if (a.length > 0 && b.length > 0 && c.length > 0) {
      ApplozicChat.login(
       {'userId' : this.state.userId, 'email' : '','phoneNumber': '','password' : this.state.password,'displayName' : ''},
  	   (response) => {
                    window.alert('success');
                    this.openChat();
                    this.setState({ loggedIn: 'true' });
                  },
       (error) => { window.alert(error) }
      )
	  }
  }

  initiateChat() {
    ApplozicChat.initiateChat(
      {},
      (response) => { console.log(response) },
      (error) => { console.log(error) }
     )
   }

   logoutUser() {
     ApplozicChat.logoutUser(
       {},
       (response) => {
         //this.setState({userId:'',email:'',phoneNumber:'',password:'',displayName:''});
         alert("logout successful");
         this.setState({loggedIn: 'false'});
       },
       (error) => {
                  alert("logout error");
                  alert(error);
                }
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

   isUserLogIn(){
      ApplozicChat.isUserLogIn(
        {},
        (response) => {
                        alert(response);
                        this.setState({ loggedIn: response });
                      },
        (error) => { console.log(error) },
       )
    }

    render() {
      let display = this.state.loggedIn;
      if (display || display == 'true') {
        return (<View style={styles.container}>
                  <Text style={styles.titleText} onPress={this.logoutUser.bind(this)}>
                  Logout</Text>
              </View>);
      }

      return (
        <View style={styles.container}>
            <ScrollView>
            <Text>LoggedIn: {display}</Text>
        	<Text style={styles.titleText}>
            Applozic
          </Text>
          <Text style={styles.baseText}>
            Demo App
          </Text>

        	<TextInput
        		id="userId"
            style={styles.inputText}
        	  keyboardType="default"
        		placeholder="UserId"
        		underlineColorAndroid='transparent'
            value={this.state.userId}
        		onChangeText={userId => this.setState({userId})}
          />
          <TextInput
        	  id="email"
            style={styles.inputText}
        		placeholder="Email"
        		 keyboardType="email-address"
        		  underlineColorAndroid='transparent'
                 value={this.state.email}
        		 onChangeText={email => this.setState({email})}
              />
         	      <TextInput
        		  id="phoneNo"
                style={styles.inputText}
        		 placeholder="Phone Number"
        		 keyboardType="phone-pad"
        		 underlineColorAndroid='transparent'
        		  maxLength={10}
                 value={this.state.phoneNumber}
        		 onChangeText={phoneNumber => this.setState({phoneNumber})}
              />
                  <TextInput
        		  id="password"
                style={styles.inputText}
        		 placeholder="Password"
        		 keyboardType="default"
        		  underlineColorAndroid='transparent'
                 value={this.state.password}
        		 onChangeText={password => this.setState({password})}
              />

                 <TextInput
        			 id="displayName"
                style={styles.inputText}
        		 placeholder="Display Name"
        		 keyboardType="default"
        		  underlineColorAndroid='transparent'
                 value={this.state.displayName}
        		 onChangeText={displayName=> this.setState({displayName})}
              />
              <Button
                onPress={this.chatLogin.bind(this)}
        	 //  onPress={this.onButtonPress.bind(this)}
                title="Login/SignUp"
        		color ="#20B2AA"
        		marginLeft={20}
        		marginRight={20}
           			/>

         		 </ScrollView>

              </View>
            );
        }
    }

const styles = StyleSheet.create({
   container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#4D394B',
  },
// button: {
// textAlign: 'center',
 // height: 100,
 // marginLeft: 10,
 // marginRight: 100,

// },
  baseText: {
   fontFamily: 'Cochin',
	color:'#fff',
     marginBottom:25,
   alignSelf:'center',


  },
  titleText: {
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
