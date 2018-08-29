import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import {Header,Button,Spinner} from './src/components/common';
import LoginForm from './src/components/LoginForm';

export default class App extends React.Component {

   state = {loggedIn: null };

  componentWillMount(){
  // Initialize Firebase
  var config = {
      apiKey: 'AIzaSyBNu_5zALs-bAABCSprrXEu22sT4u2_vz0',
      authDomain: 'authentication-11ee5.firebaseapp.com',
      databaseURL: 'https://authentication-11ee5.firebaseio.com',
      projectId: 'authentication-11ee5',
      storageBucket: 'authentication-11ee5.appspot.com',
      messagingSenderId: '413331172153'
  };
  firebase.initializeApp(config);

  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      this.setState({loggedIn: true})
    }
    else{
      this.setState({loggedIn: false})
    }
  });
  }

  renderContent(){
      switch(this.state.loggedIn){
        case true:
          return (
            <Button onPress={()=>firebase.auth().signOut()}>
              Log Out
            </Button>
            );
        case false:
          return <LoginForm/>
        default:  
          return <Spinner size = 'large'/>
      }
  }

  render() {
    const {container,footStyle}= styles;
    return (
      <View style={styles.container}>
       <Header headerText={'Authentication'}/>
       {this.renderContent()}
       <Text style ={footStyle}>Design by:  Trong Binh Le</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create( 
{
  container: {
    flex: 1,
  },
  footStyle:{
    justifyContent: 'center',
    borderColor: 'red',
    borderWidth: 2,
    paddingTop: 5,
    margin: 5,
    textAlign: 'center',
    fontWeight: 'bold', 
    fontStyle: 'italic',
  }
});
