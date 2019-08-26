import { Layout } from '@kitten/ui';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  WebView,
  Dimensions
} from 'react-native';
import { NavigationScreenProps, withNavigation } from 'react-navigation';
import { HOSTED_PAYMENT_URL, API_URLS } from '../../constants/network';
import { Networker } from '../../util/networker';
import { User, Plan } from '../../types/models';

export type PaymentScreenProps = {};

export type PaymentScreenSate = {
  user: User;
};

class PaymentScreenView extends Component<
  NavigationScreenProps<{ order_id: string }>
> {
  state: PaymentScreenSate = {
    user: null
  };

  async componentDidMount() {
    const { data } = await Networker.get<{ data: User }>(API_URLS.USER);
    this.setState({ user: data });
    console.warn(data);
  }

  render() {
    const { user } = this.state;
    const { params } = this.props.navigation.state;
    console.warn('RECEIVED PARAMS', params);
    if (!params.order_id || !user) {
      return <ActivityIndicator />;
    }

    const description = `Order for ${user.id}`;
    const paymentUrl = `${HOSTED_PAYMENT_URL}?order_id=${params.order_id}&username=${user.name}&email=${user.email}&description=incept subscription`;
    console.warn(paymentUrl);
    console.warn(paymentUrl);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Layout style={{ padding: 0, marginBottom: 15, flex: 1 }}>
          <WebView
            onError={err => {
              console.warn(err);
            }}
            onLoadEnd={e => {
              console.warn('Loaded');
            }}
            javaScriptEnabled
            style={{
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').height - 10,
              backgroundColor: 'pink',
              flex: 1
            }}
            source={{
              uri: paymentUrl
            }}
          />
        </Layout>
      </SafeAreaView>
    );
  }
}

export const PaymentScreen = withNavigation(PaymentScreenView);
