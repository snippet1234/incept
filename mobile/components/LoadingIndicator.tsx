import React from 'react';
import { ActivityIndicator, ActivityIndicatorProperties } from 'react-native';
import { PALETTE } from 'constants/colors';

export const LoadingIndicator = (props: ActivityIndicatorProperties) => (
  <ActivityIndicator color={PALETTE.primary} {...props} />
);
