import React from 'react';
import styled from 'styled-components/native';
import * as firebase from 'firebase';
import { 
  AppRegistry, 
  ListView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  AlertIOS,
  StatusBar,
  
} from 'react-native';
import ActionButton from './component/ActionButton';
import Items from './component/items';
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
  color: #fff;
`
const ItemList = styled.ScrollView`
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
      currentlyOpenSwipeable: null,
      list: [],
      list2: [{test:2},{test:3}]
    }
    this.addList = this.addList.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillMount() {
    
    console.log(this.state.list2)
    const preContent = []
    database.on('child_added', snap => {
      preContent.push({
        "id": snap.key,
        "value": snap.val().content
      })
    })
    
    console.log(preContent)
    this.setState({
      list2: preContent,
    })
    // this.setState({
    //   list: this.state.list
    // })
  }

  addList(content) {
  //  database.push().set({ content: content })
   this.setState({
     text: "",
     
   })
  }

  handleScroll = () => {
    const { currentlyOpenSwipeable } = this.state;

    if (currentlyOpenSwipeable) {
      currentlyOpenSwipeable.recenter();
    }
  };

  render(){
    const { currentlyOpenSwipeable } = this.state;
    const itemProps = {
      onOpen: (event, gestureState, swipeable) => {
        if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
          currentlyOpenSwipeable.recenter();
        }

        this.setState({ currentlyOpenSwipeable: swipeable });
      },
      onClose: () => this.setState({ currentlyOpenSwipeable: null })
    };
    let list = this.state.list2.map(function(lists) {
      return <Items />
    })
    return(
      <Container>
        <Top></Top>
        <Header>
          <HeaderTitle>To DO</HeaderTitle>
        </Header>
        <ItemList scrollEventThrottle={16} onScroll={this.handleScroll}>
          {
            list
          }
        </ItemList>
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