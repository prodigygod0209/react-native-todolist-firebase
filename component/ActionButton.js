'use strict';
import React, { Component } from 'react';
import styled from 'styled-components/native';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const constants = styles.constants;
const { StyleSheet, Text, View, TouchableHighlight } = ReactNative;

const Button = styled.View`
    width: 100%;
    background-color: #1FBBD2;
`
export default class ActionButton extends Component {
    render() {
        return (
            <Button style={styles.action}>
                <TouchableHighlight
                    underlayColor={constants.actionColor}
                    onPress={this.props.onPress}>
                    <Text style={styles.actionText}>{this.props.title}</Text>
                </TouchableHighlight>
            </Button>
        );
    }
}

