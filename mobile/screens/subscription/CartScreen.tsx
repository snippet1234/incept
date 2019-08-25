import React, { Component } from 'react';
import { SafeAreaView, Image } from 'react-native';
import { withNavigation, NavigationScreenProps } from 'react-navigation';
import { AddPaymentCardForm } from '../addPaymentCardForm.component';
import { Layout, Text, Button } from '@kitten/ui';
import { PALETTE } from '../../constants/colors';
import { PaymentCard } from './PaymentCard';
import { Card } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { Message } from '../../util/message';
class CartScreenView extends Component<NavigationScreenProps> {
  render() {
    const { params } = this.props.navigation.state;
    console.warn(params);
    return (

      <SafeAreaView>

        <Layout style={{ padding: 15, marginBottom: 15 }}>

          <AddPaymentCardForm
            onFormValueChange={() => {
              return;
            }}
          />



          <Button
            onPress={() => {
              Message.show('Please do the payment', 'warning');
            }}
            style={{
              backgroundColor: PALETTE.primary,
              borderColor: PALETTE.primary,
              marginTop: 20
            }}
          >
            CONTINUE TO PAYMENT
          </Button>
          {params && params.website && <Card style={{
            backgroundColor: '#FFDF00',
            margin: 25,
            flexDirection: 'row'
          }}>
            <Image style={{ width: 25, height: 25, marginTop: 10, marginLeft: 10, resizeMode: 'contain', tintColor: 'whitesmoke' }} source={require('../../assets/icons/eva/star-outline.png')} />
            <Text style={{
              padding: 15,
              color: PALETTE.white,
              borderRadius: 100
            }}>
              Includes website
          </Text></Card>}
        </Layout>
      </SafeAreaView>
    );
  }
}

export const CartScreen = withNavigation(CartScreenView);
