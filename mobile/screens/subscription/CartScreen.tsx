import { Button, Layout } from '@kitten/ui';
import { Card } from 'native-base';
import React, { Component } from 'react';
import { ActivityIndicator, Image, SafeAreaView, Text } from 'react-native';
import { NavigationScreenProps, withNavigation } from 'react-navigation';
import { PALETTE } from '../../constants/colors';
import { Message } from '../../util/message';
import { CartForm, CartFormDataType } from './CartForm';
import { Networker } from '../../util/networker';
import { API_URLS } from '../../constants/network';

class CartScreenView extends Component<
  NavigationScreenProps<{ plan: string }>
> {
  // componentDidMount() {
  //   this.props.navigation.navigate('payment', {
  //     order_id: 'order_DAg1j6c7qTPMCr'
  //   });
  // }

  createOrder = async (values: CartFormDataType) => {
    Message.show('Please do the payment', 'warning');
    console.warn('CREATING ORDER', {
      ...values,
      amount: values.total,
      plan_id: this.props.navigation.state.params.plan,
      receipt: JSON.stringify(values)
    });
    const plan_id = this.props.navigation.state.params.plan;
    const { data } = await Networker.post(API_URLS.CREATE_ORDER, {
      ...values,
      amount: values.total,
      plan_id: this.props.navigation.state.params.plan,
      receipt: `plan:${plan_id},form_count:${values.form_count}`
    });
    console.warn('ORDER CREATED', data);
    this.props.navigation.navigate('payment', {
      order_id: data.razorpay_order_id
    });
  };

  render() {
    const { params } = this.props.navigation.state;
    console.warn(params);
    if (!params.plan) {
      return <ActivityIndicator />;
    }
    return (
      <SafeAreaView>
        <Layout style={{ padding: 15, marginBottom: 15 }}>
          <CartForm onFormSubmitted={this.createOrder} />

          <Image
            style={{
              width: 25,
              height: 25,
              marginTop: 10,
              marginLeft: 10,
              resizeMode: 'contain',
              tintColor: 'whitesmoke'
            }}
            source={require('../../assets/icons/eva/star-outline.png')}
          />
          <Text
            style={{
              padding: 15,
              color: PALETTE.white,
              borderRadius: 100
            }}
          >
            Includes website
          </Text>
        </Layout>
      </SafeAreaView>
    );
  }
}

export const CartScreen = withNavigation(CartScreenView);
