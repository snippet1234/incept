import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import {
  Layout,
  Text,
  Button,
  Input,
  Avatar,
  ButtonProps
} from 'react-native-ui-kitten';
import { PALETTE } from '../constants/colors';
import { LoadingIndicator } from './LoadingIndicator';

type CustomButtonProps = {
  color?: string;
};

export const getBackgroundColor = (props: ButtonProps & CustomButtonProps) => {
  let color = props.color || PALETTE.primary;

  if (props.disabled) {
    color = PALETTE.faded;
  }
  return color;
};

export const CustomButton = (props: CustomButtonProps & ButtonProps) => (
  <Button
    onPress={() => this.props.navigation.navigate('Register')}
    status="success"
    style={[
      styles.container,
      { backgroundColor: props.color || PALETTE.primary }
    ]}
    {...props}
  >
    <LoadingIndicator />
    REGISTER
  </Button>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 120,
    backgroundColor: PALETTE.primary,
    borderColor: PALETTE.primary
  }
});
