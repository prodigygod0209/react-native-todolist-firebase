import React from 'react';
import styled from 'styled-components/native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-swipeable';

const Item = styled.View`
   margin-top: 20px;
   width: 100%;
   height: 60px;
   padding-left: 5px;
   background: lightskyblue;
   justify-content: center;
   align-items: center;
   shadowColor: rgba(0,0,0,0.30);
   shadowOpacity: .9;
   shadowOffset: 1px 2px ;
   shadowRadius: 1;
`
const ItemName = styled.Text`
   font-size: 24px;
   color: #fff;
`
const Delete = styled.TouchableOpacity`
   margin-top: 20px;
   height: 60px;
   padding-left: 20px;
   background: #1FBBD2;
   justify-content: center;
   shadowColor: rgba(0,0,0,0.30);
   shadowOpacity: .9;
   shadowOffset: 1px 2px ;
   shadowRadius: 1;
`

export default class Items extends React.Component{
    render() {
        return (
            <Swipeable
                rightButtons={[
                    <Delete onPress = {this.props.delete}>
                        <Text>Delete</Text>
                    </Delete>
                ]}
                onRightButtonsOpenRelease={this.props.onOpen}
                onRightButtonsCloseRelease={this.props.onClose}
                >
                <Item>
                    <ItemName>{this.props.content}</ItemName>
                </Item>
            </Swipeable>
        );
    }
}
