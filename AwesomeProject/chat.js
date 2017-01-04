//'use strict';
import React, { Component } from 'react';
<<<<<<< HEAD
=======
import BackAndroid from 'react-native';
>>>>>>> 4233090d8d85ff9969cc1c2a12c8ad2659897529
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
<<<<<<< HEAD
                    result:false };
	this.openChat = this.openChat.bind(this);
    this.isUserLogIn=this.isUserLogIn.bind(this);
    this.logoutUser=this.logoutUser.bind(this);
	this.initiateChat=this.initiateChat.bind(this);
	this.chatLogin=this.chatLogin.bind(this);  }
=======
                  loggedIn: false
	              };
      this.openChat = this.openChat.bind(this);
      this.isUserLogIn = this.isUserLogIn.bind(this);
  }
>>>>>>> 4233090d8d85ff9969cc1c2a12c8ad2659897529

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
<<<<<<< HEAD
  	if(this.state.userId.length>0 && this.state.pass_word.length>0)
	{
    ApplozicChat.login(
    {'userId':this.state.userId,'email':'','phoneNumber':'','password':this.state.pass_word,'displayName':''},
	(response) => { this.openChat(),this.setState({ result: true })},
    (error) => {console.log(error)},
    )
    }else{alert("Please Enter UserId & Password")};
=======
  	var a = this.state.userId;
  	var b = this.state.password;
  	var c = this.state.displayName;
	  if (a.length > 0 && b.length > 0 && c.length > 0) {
      ApplozicChat.login(
       {'userId' : this.state.userId, 'email' : '','phoneNumber': '','password' : this.state.password,'displayName' : ''},
  	   (response) => {
                    window.alert('success');
                    this.openChat();
                    this.setState({ loggedIn: true });
                  },
       (error) => { window.alert(error) }
      )
	  }
>>>>>>> 4233090d8d85ff9969cc1c2a12c8ad2659897529
  }

  initiateChat() {
    ApplozicChat.initiateChat(
      {},
      (response) => { console.log(response) },
      (error) => { console.log(error) }
     )
   }

<<<<<<< HEAD
   logoutUser(){
    ApplozicChat.logoutUser(
    {},
    (response) => {this.setState({userId:'',email:'',phoneNumber:'',pass_word:'',displayName:''})
	              ,this.setState({result: false})},
    (error) => {console.log(error)},
   )
  }

=======
   logoutUser() {
     ApplozicChat.logoutUser(
       {},
       (response) => {
         //this.setState({userId:'',email:'',phoneNumber:'',password:'',displayName:''});
         alert("logout successful");
         this.setState({loggedIn: false});
       },
       (error) => {
                  alert("logout error");
                  alert(error);
                }
     )
   }
>>>>>>> 4233090d8d85ff9969cc1c2a12c8ad2659897529

   contactUnreadCount(){
     ApplozicChat.contactUnreadCount(
      {'userId':'ak01'},
<<<<<<< HEAD
      (response) => { console.log(response)  },
=======
      (response) => { alert(response)  },
>>>>>>> 4233090d8d85ff9969cc1c2a12c8ad2659897529
      (error) => { console.log(error) },
     )
   }

   channelUnreadCount(){
     ApplozicChat.channelUnreadCount(
      {'channelKey':'1234'},
<<<<<<< HEAD
      (response) => {console.log(response)},
=======
      (response) => { alert(response) },
>>>>>>> 4233090d8d85ff9969cc1c2a12c8ad2659897529
      (error) => { console.log(error) },
     )
   }

   totalUnreadCount(){
     ApplozicChat.totalUnreadCount(
      {},
<<<<<<< HEAD
      (response) => { console.log(response) },
=======
      (response) => { alert(response) },
>>>>>>> 4233090d8d85ff9969cc1c2a12c8ad2659897529
      (error) => { console.log(error) },
     )
   }

<<<<<<< HEAD
  isUserLogIn(){
    ApplozicChat.isUserLogIn(
    {},
    (response) => {this.setState({ result: response });},
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
	  
			  );
      }

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
=======
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
      if (display) {
        return (<View style={styles.container}>
                  <Text style={styles.titleText} onPress={this.logoutUser.bind(this)}>
                  Logout</Text>
              </View>);
      }

      return (
        <View style={styles.container}>
            <ScrollView>
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
>>>>>>> 4233090d8d85ff9969cc1c2a12c8ad2659897529
            );
        }
    }

const styles = StyleSheet.create({
   container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#4D394B',
  },
<<<<<<< HEAD
btn:{
	fontSize: 23,
    fontWeight: 'bold',
    color:'yellow',
    marginTop: 20,
    alignSelf:'center', 
  },

=======
// button: {
// textAlign: 'center',
 // height: 100,
 // marginLeft: 10,
 // marginRight: 100,

// },
>>>>>>> 4233090d8d85ff9969cc1c2a12c8ad2659897529
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
