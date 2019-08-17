import React from 'react';
import { Text, StyleSheet } from 'react-native';
import {
  Layout,
  Button,
  Input,
  Avatar,
  InputProps
} from 'react-native-ui-kitten';
import { PALETTE } from '../constants/colors';
// primary, success, info, warning or danger.

type CustomInputProps = {
  error?: string;
  hidden?: boolean;
};
const getHiddenValue = (value: string) => {
  let hiddenValue = '';
  Array(value).fill(0).map(c => {
    hiddenValue += '*';
  })

  return hiddenValue;
}

export const CustomInput = (props: InputProps & CustomInputProps) => (
  <>
    <Input status={props.error ? 'danger' : undefined} {...props} textStyle={{ color: 'black' }} />
    <Text style={styles.errorText}>{props.error}</Text>
    {/* {props.error && <Text status="error">{props.error}</Text>} */}
  </>
);

const styles = StyleSheet.create({
  errorText: {
    color: PALETTE.errorBackground,
    width: '100%',
    marginBottom: 5,
    fontSize: 11
    // flex: 1,
    // justifyContent: 'flex-start'
  }
})