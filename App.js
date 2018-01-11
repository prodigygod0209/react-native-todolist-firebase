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
  justify-content: center;
  align-items: center;
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
   width: 80%;
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
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    }
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    database.on('value' ,snap => {
      let items = [];
      snap.forEach((child) => {
        items.push({
          key: child.key,
          content: child.val().content
        })
      })

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      },function(){
        console.log(this.state.dataSource)
      })
    })
  }

  _addItem() {
    AlertIOS.prompt(
      'Add New Item',
      null, [{
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'Add',
          onPress: (text) => {
            if(text == '') return
            database.push().set({
              content: text
            })
          }
        },
      ],
      'plain-text'
    );
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

    return(
      <Container>
        <Top></Top>
        <Header>
          <HeaderTitle>To DO</HeaderTitle>
        </Header>
        <ItemList scrollEventThrottle={16} onScroll={this.handleScroll}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Items content={rowData.content} id={rowData.key} delete={(text) => { database.child(rowData.key).remove() } } />}
            enableEmptySections={true}
          />
        </ItemList>
        <ActionButton 
          title="Add"
          onPress={this._addItem.bind(this)}
        />
      </Container>
    )
  }
 
  
}