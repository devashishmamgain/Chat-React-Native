//'use strict';
import React, {Component} from 'react';
import FCM from 'react-native-fcm';
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
            userId: '',
            email: '',
            phoneNumer: '',
            pass_word: '',
            displayName: '',
            loggedIn: false,
            visible: false,
            title: 'Login/SignUp',
            mytoken: ''
        };
        this.openChat = this.openChat.bind(this);
        this.isUserLogIn = this.isUserLogIn.bind(this);
        this.chatLogin = this.chatLogin.bind(this);
        this.initiateChat = this.initiateChat.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
        this.show = this.show.bind(this);
        this.tokenRefresh = this.tokenRefresh.bind(this);
    }

    componentDidMount() {

        FCM.getFCMToken().then(token => {
            this.setState({mytoken: token});
            console.log(token)
        });

        this.refreshUnsubscribe = FCM.on('refreshToken', (token) => {
            this.refreshToken()

        });

        this.isUserLogIn();

    }

    componentWillUnMount()
    {
        this.refreshUnsubscribe();

    }

    openChat() {
        ApplozicChat.openChat({}, (response) => {
            console.log(response)
        }, (error) => {
            console.log(error)
        })
    }

    chatLogin() {

        if (this.state.userId.length > 0 && this.state.pass_word.length > 0) {
            ApplozicChat.login({
                'userId': this.state.userId,
                'email': '',
                'phoneNumber': '',
                'password': this.state.pass_word,
                'displayName': '',
                'token': this.state.mytoken
            }, (response) => {
                this.setState({loggedIn: true, title: 'Loading...'}),
                this.openChat(),
                console.log(response)
            }, (error) => {
                console.log(error)
            },)
        } else {
            this.setState({title: 'Login/SignUp'});
            alert("Please Enter UserId & Password");
        };
    }

    initiateChat() {
        ApplozicChat.initiateChat({}, (response) => {
            console.log(response)
        }, (error) => {
            console.log(error)
        })
    }

    logoutUser() {
        ApplozicChat.logoutUser({}, (response) => {
            this.setState({
                userId: '',
                email: '',
                phoneNumber: '',
                pass_word: '',
                displayName: '',
                loggedIn: false,
                title: 'Login/SignUp'
            });
        }, (error) => {
            alert("logout error");
        })
    }

    contactUnreadCount() {
        ApplozicChat.contactUnreadCount({
            'userId': 'ak01'
        }, (response) => {
            alert(response)
        }, (error) => {
            console.log(error)
        },)
    }

    channelUnreadCount() {
        ApplozicChat.channelUnreadCount({
            'channelKey': '1234'
        }, (response) => {
            alert(response)
        }, (error) => {
            console.log(error)
        },)
    }

    totalUnreadCount() {
        ApplozicChat.totalUnreadCount({}, (response) => {
            console.log(response)
        }, (error) => {
            console.log(error)
        },)
    }

    isUserLogIn() {
        ApplozicChat.isUserLogIn({}, (response) => {
            this.setState({loggedIn: response});
        }, (error) => {
            console.log(error)
        },)
    }

    show() {
        this.setState({title: 'Loading....!'});
        this.chatLogin();
    }

    tokenRefresh()
    {
        ApplozicChat.tokenRefresh({
            'token': this.state.mytoken
        }, (response) => {
            console.log(response)

        }, (error) => {
            console.log(error)
        },)
    }

    render() {
          let display = this.state.loggedIn;
          if (display) {
            return (
			  <View style = {styles.container}>
        <Text style = { styles.titleText} >
            Applozic </Text>
			  <Text style = {styles.baseText}>
     			  Demo App </Text>
			  <Text style = {styles.btn} onPress = {this.initiateChat}>
				    Chat Logs </Text>
			  <Text style = {styles.btn} onPress = {this.logoutUser}>
     			  LogOut </Text>
		     </View >
            );
        }

        return (
		    <View style ={styles.container}>
            <ScrollView>
              <Text style = {styles.titleText}>
                 Applozic </Text>
			        <Text style = {styles.baseText}>
                 Demo App < /Text>
              <TextInput style ={styles.inputText}
                 keyboardType = "default"
                 placeholder = "UserId"
                 maxLength = {25}
                 underlineColorAndroid = 'transparent'
                 value = {this.state.userId}
                 onChangeText={userId => this.setState({userId})}/>
              <TextInput type = "email-address"
                 style = {styles.inputText}
                 placeholder = "Email"
                 keyboardType = "email-address"
                 maxLength = {30}
                 underlineColorAndroid = 'transparent'
                 value = { this.state.email}
                 onChangeText = {email => this.setState({email})}/>
              <TextInput style = { styles.inputText}
                 placeholder = "Phone Number"
                 keyboardType = "phone-pad"
                 underlineColorAndroid = 'transparent'
                 maxLength = {10}
                 value = {this.state.phoneNumber}
                 onChangeText = {phoneNumber => this.setState({phoneNumber})}/>
              <TextInput id = "password"
                 type = "password"
                 style = {styles.inputText}
                 maxLength = {25}
                 placeholder = "Password"
                 keyboardType = "default"
                 underlineColorAndroid = 'transparent'
                 value = {this.state.pass_word}
                 secureTextEntry = {true}
                 password = "true"
                 onChangeText = {pass_word => this.setState({pass_word})}/>
              <TextInput id = "displayName"
                 style = {styles.inputText}
                 placeholder = "Display Name"
                 keyboardType = "default"
                 underlineColorAndroid = 'transparent'
                 value = {this.state.displayName}
                 maxLength = {25}
                 onChangeText = {displayName => this.setState({displayName})}/>
              <Button title = {this.state.title}
                 onPress = {this.show}
                 color = "#20B2AA"/>
              </ScrollView>
			  </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#4D394B'
    },
    btn: {
        fontSize: 23,
        fontWeight: 'bold',
        color: 'yellow',
        marginTop: 20,
        alignSelf: 'center'
    },
    baseText: {
        fontFamily: 'Cochin',
        color: '#fff',
        marginBottom: 25,
        alignSelf: 'center'
    },
    titleText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 15,
        alignSelf: 'center'
    },
    inputText: {
        width: 330,
        height: 40,
        backgroundColor: '#fff',
        marginBottom: 6,
        padding: 10,
        fontSize: 20,
        marginLeft: 10,
        marginRight: 10
    }
});
