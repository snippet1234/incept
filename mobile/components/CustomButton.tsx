import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Text, ButtonProps } from 'react-native-ui-kitten';
import { PALETTE } from '../constants/colors';
import { LoadingIndicator } from './LoadingIndicator';
import { TouchableOpacity } from 'react-native-gesture-handler';

type CustomButtonProps = {
  color?: string;
  disabled?: boolean;
  loading?: boolean;
  title?: string;
  onPress?: () => void;
  style?: ViewStyle;
};

export const getBackgroundColor = (props: ButtonProps & CustomButtonProps) => {
  let color = props.color || PALETTE.primary;

  if (props.disabled) {
    color = PALETTE.faded_white;
  }
  return color;
};

export const CustomButton = (props: CustomButtonProps) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[
      styles.container,
      { backgroundColor: getBackgroundColor(props) },
      props.style
    ]}
  >
    <Text style={styles.btnText}>{props.title}</Text>
    {props.loading && <LoadingIndicator style={{ left: 25 }} />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minWidth: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    paddingVertical: 15
  },
  btnText: {
    color: PALETTE.white,
    fontWeight: 'bold',
    fontFamily: 'opensans-bold'
  }
});
