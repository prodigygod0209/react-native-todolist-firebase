import React from 'react';
import styled from 'styled-components/native';
import * as firebase from 'firebase';
import { 
  AppRegistry, 
  ListView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  AlertIOS,
  StatusBar,
  
} from 'react-native';
import ActionButton from './component/ActionButton';
import style from './styles.js';

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Top = styled.View`
  width: 100%;
  height: 20px;
  background-color: #1FBBD2 ;
`
const Header = styled.View`
  width: 100%;
  height: 80px;
  background: #8CE6ED;
  justify-content: center;
  align-items: center;
`
const HeaderTitle = styled.Text`
  font-size: 22px;
`
const ItemList = styled.View`
  flex: 1;
`
const Input = styled.TextInput`
  width: 100%;
  height: 40px;
  font-size: 24px;
  background-color: #f7f7f7;  
`


var config = {
  apiKey: "AIzaSyBtcv1KzNKusLXMPyouxk7t6uhKjPt_EDg",
  authDomain: "react-native-10e5b.firebaseapp.com",
  databaseURL: "https://react-native-10e5b.firebaseio.com",
  projectId: "react-native-10e5b",
  storageBucket: "react-native-10e5b.appspot.com",
  messagingSenderId: "994865934085"
};
const firebaseApp = firebase.initializeApp(config);
const database = firebaseApp.database().ref().child('list')


export default class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      text: "",
      list: []
    }
    this.addList = this.addList.bind(this);
  }

  addList(content) {
   database.push().set({ content: content })
   this.setState({
     text: "",
   })
  }

  componentDidMount() {
    let content = [];
    database.on('child_added',snap => {
      content.push({
        id: snap.key,
        value: snap.val()
      })
    })
  }
  

  render(){
    return(
      <Container>
        <Top></Top>
        <Header>
          <HeaderTitle>To DO</HeaderTitle>
        </Header>
        <ItemList />

        <Input 
          placeholder=" type item..."
          onChangeText = { (text) => this.setState({text})}
          ref={input => { this.textInput = input }} 
          value={this.state.text}
        />
        <ActionButton 
          title="submit"
          onPress={() => this.addList(this.state.text)}
        />
      </Container>
    )
  }
}