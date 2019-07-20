import React from 'react';
import {
  Layout,
  Text,
  Button,
  Input,
  Avatar,
  InputProps
} from 'react-native-ui-kitten';

type CustomInputProps = {
  error?: string;
};
export const CustomInput = (props: InputProps & CustomInputProps) => (
  <>
    <Input {...props} />
    {props.error && <Text status="error">{props.error}</Text>}
  </>
);
